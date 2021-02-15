<template>
  <div class="output-block">
    <div class="output-block__stat">
      <span class="stat__title">ATK: </span
      ><span class="stat__value" :class="{ active: ATK > 0 }">{{
        ATK.toFixed()
      }}</span>
    </div>
    <div class="output-block__stat">
      <span class="stat__title">DEF: </span
      ><span class="stat__value" :class="{ active: DEF > 0 }">{{
        DEF.toFixed()
      }}</span>
    </div>
    <div class="output-block__stat">
      <span class="stat__title">HP: </span
      ><span class="stat__value" :class="{ active: HP > 0 }">{{
        HP.toFixed()
      }}</span>
    </div>
    <div class="output-block__stat">
      <span class="stat__title">DMG Multiplier: </span
      ><span class="stat__value" :class="{ active: DMGMulti > 0 }">{{
        +DMGMulti
      }}</span>
    </div>
    <div class="output-block__stat">
      <span class="stat__title">Monster DEF: </span
      ><span
        class="stat__value"
        :class="{
          needValue: monsterDEF === 0,
          active: monsterDEF > 0.5 && monsterDEF < 1,
          bad: monsterDEF < 0.5 && monsterDEF > 0,
          normal: monsterDEF === 0.5
        }"
        >{{
          monsterDEF > 0
            ? +(+(1 - monsterDEF.toFixed(5)) * 100).toFixed(2) + "%"
            : "Enter levels"
        }}</span
      >
    </div>
    <div class="output-block__stat">
      <span class="stat__title">Incoming DMG Multiplier: </span
      ><span
        class="stat__value"
        :class="{
          needValue: DMGMultiWithDEF === 0,
          active: DMGMultiWithDEF > 0.5,
          bad: DMGMultiWithDEF < 0.5 && DMGMultiWithDEF > 0,
          normal: DMGMultiWithDEF === 0.5
        }"
        >{{
          DMGMultiWithDEF.toFixed(2) > 0
            ? DMGMultiWithDEF.toFixed(2)
            : "Enter levels"
        }}</span
      >
    </div>
    <table class="output-block__stat output-block__stat--table">
      <tr class="table-row">
        <th class="table-col--number">#</th>
        <th class="table-col">No crit</th>
        <th class="table-col">AVG</th>
        <th class="table-col">Crit</th>
      </tr>
      <div class="table-warn" v-if="!abilityNoCrit[0]">Enter ability DMG</div>
      <tr class="table-row" v-for="(abil, idx) in abilityNoCrit" :key="idx">
        <td class="table-col--number">{{ idx + 1 }}</td>
        <td class="table-col">
          <div class="output-block__stat">
            <span class="stat__value">{{
              abilityNoCrit[idx] ? abilityNoCrit[idx].toFixed() : 0
            }}</span>
          </div>
        </td>
        <td class="table-col">
          <div class="output-block__stat">
            <span
              class="stat__value active"
              :class="{ needValue: !abilityAVG[idx] }"
              >{{
                abilityAVG[idx]
                  ? abilityAVG[idx].toFixed()
                  : data.critRate
                  ? "Enter crit DMG"
                  : "Enter crit rate"
              }}</span
            >
          </div>
        </td>
        <td class="table-col">
          <div class="output-block__stat">
            <span
              class="stat__value"
              :class="{ needValue: !abilityCrit[idx] }"
              >{{
                abilityCrit[idx] ? abilityCrit[idx].toFixed() : "Enter crit DMG"
              }}</span
            >
          </div>
        </td>
      </tr>
    </table>

    <div class="output-block__stat" v-if="abilityNoCrit[0]">
      <span class="stat__title">Rotation time: </span>
      <span class="stat__value" :class="{ needValue: !abilityCrit[idx] }">{{
        rotationTime > 0 ? rotationTime : "Enter all ability speed"
      }}</span>
    </div>

    <table
      class="output-block__stat output-block__stat--table"
      v-if="rotationTime > 0"
    >
      <tr class="table-row">
        <th class="table-col--number"></th>
        <th class="table-col">No crit</th>
        <th class="table-col">AVG</th>
        <th class="table-col">Crit</th>
      </tr>
      <tr class="table-row">
        <td class="table-col--number">DPS</td>
        <td class="table-col">
          <div class="output-block__stat">
            <span class="stat__value">{{ rotationDPSNoCrit.toFixed() }}</span>
          </div>
        </td>
        <td class="table-col">
          <div class="output-block__stat">
            <span
              class="stat__value active"
              :class="{ needValue: !abilityAVG[idx] }"
              >{{ rotationDPSAVG.toFixed() }}</span
            >
          </div>
        </td>
        <td class="table-col">
          <div class="output-block__stat">
            <span
              class="stat__value"
              :class="{ needValue: !abilityCrit[idx] }"
              >{{ rotationDPSCrit.toFixed() }}</span
            >
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import getAVGDMG from "@/static/AVG";
export default {
  data: () => {
    return {
      data: 0,

      ATK: 0,
      DEF: 0,
      HP: 0,
      attr: "",

      DMGMulti: 1,
      monsterDEF: 0,
      DMGMultiWithDEF: 0,

      vaporize: 2,
      melt: 1.5,

      abilityNoCrit: [],
      abilityCrit: [],
      abilityAVG: [],

      rotationAVG: 0,
      rotationNoCrit: 0,
      rotationCrit: 0,

      rotationDPSAVG: 0,
      rotationDPSNoCrit: 0,
      rotationDPSCrit: 0,

      rotationTime: 0
    };
  },
  props: ["input"],
  watch: {
    input: {
      handler(val) {
        this.data = JSON.parse(JSON.stringify(val));
        //?========================ATK
        if (
          !this.data.ATK &&
          !this.data.baseATK &&
          !this.data.percentATK &&
          !this.data.flatATK
        ) {
          this.ATK = 0;
        } else if (
          this.data.baseATK ||
          this.data.percentATK ||
          this.data.flatATK
        ) {
          if (!this.data.baseATK) {
            this.data.baseATK = 0;
          }
          if (!this.data.percentATK) {
            this.data.percentATK = 0;
          }
          if (!this.data.flatATK) {
            this.data.flatATK = 0;
          }
          this.ATK =
            this.data.baseATK * (1 + this.data.percentATK / 100) +
            +this.data.flatATK;
        } else if (this.data.ATK) {
          this.ATK = +this.data.ATK;
        }

        //?========================/ATK
        //?========================DEF
        if (
          !this.data.DEF &&
          !this.data.baseDEF &&
          !this.data.percentDEF &&
          !this.data.flatDEF
        ) {
          this.DEF = 0;
        } else if (
          this.data.baseDEF ||
          this.data.percentDEF ||
          this.data.flatDEF
        ) {
          if (!this.data.baseDEF) {
            this.data.baseDEF = 0;
          }
          if (!this.data.percentDEF) {
            this.data.percentDEF = 0;
          }
          if (!this.data.flatDEF) {
            this.data.flatDEF = 0;
          }
          this.DEF =
            this.data.baseDEF * (1 + this.data.percentDEF / 100) +
            +this.data.flatDEF;
        } else if (this.data.DEF) {
          this.DEF = +this.data.DEF;
        }
        this.DEF = +this.DEF.toFixed();
        //?========================/DEF
        //?========================DEF
        if (
          !this.data.HP &&
          !this.data.baseHP &&
          !this.data.percentHP &&
          !this.data.flatHP
        ) {
          this.HP = 0;
        } else if (
          this.data.baseHP ||
          this.data.percentHP ||
          this.data.flatHP
        ) {
          if (!this.data.baseHP) {
            this.data.baseHP = 0;
          }
          if (!this.data.percentHP) {
            this.data.percentHP = 0;
          }
          if (!this.data.flatHP) {
            this.data.flatHP = 0;
          }
          this.HP =
            this.data.baseHP * (1 + this.data.percentHP / 100) +
            +this.data.flatHP;
        } else if (this.data.HP) {
          this.HP = +this.data.HP;
        }
        this.HP = +this.HP.toFixed();
        //?========================/HP
        //?========================DMGMulti
        this.DMGMulti = 1 + (+this.data.elemDMG + +this.data.addDMG) / 100;
        this.DMGMulti = this.DMGMulti.toFixed(3);
        //?========================/DMGMulti
        //?========================Monster DEF
        if (!this.data.charLVL) {
          this.data.charLVL = null;
          this.monsterDEF = 0;
        }
        if (!this.data.monsterLVL) {
          this.data.monsterLVL = null;
          this.monsterDEF = 0;
        }
        if (this.data.charLVL && this.data.monsterLVL) {
          if (this.data.monsterDEFReduc) {
            this.monsterDEF =
              (+this.data.charLVL + 100) /
              ((1 - +this.data.monsterDEFReduc / 100) *
                (+this.data.monsterLVL + 100) +
                +this.data.charLVL +
                100);
          } else {
            this.monsterDEF =
              (+this.data.charLVL + 100) /
              (+this.data.charLVL + +this.data.monsterLVL + 200);
          }
        }
        //?========================/Monster DEF
        //?========================Special.Noelle
        if (
          this.data.special.Noelle &&
          +this.data.special.level > 0 &&
          this.ATK &&
          this.DEF
        ) {
          this.ATK +=
            this.$store.state.skills.Noelle[+this.data.special.level - 1] *
            this.DEF;
        }
        //?========================/Special.Noelle
        //?========================DMGMultiWithDEF
        if (!this.data.monsterRES || this.monsterDEF === 0) {
          this.DMGMultiWithDEF = 0;
        } else if (
          (this.monsterDEF != 0 &&
            this.DMGMulti &&
            this.data.monsterRES != "-") ||
          Number.isNaN(this.data.monsterRES)
        ) {
          this.DMGMultiWithDEF = this.monsterDEF * this.DMGMulti;
          if (this.data.monsterRES < 0) {
            this.DMGMultiWithDEF =
              this.DMGMultiWithDEF *
              (1 - (+this.data.monsterRES - +this.data.monsterRESReduc) / 200);
          } else if (this.data.monsterRES >= 75) {
            this.DMGMultiWithDEF =
              this.DMGMultiWithDEF *
              (1 /
                ((4 * (+this.data.monsterRES - +this.data.monsterRESReduc)) /
                  100 +
                  1));
          } else {
            this.DMGMultiWithDEF =
              this.DMGMultiWithDEF *
              (1 - (+this.data.monsterRES - +this.data.monsterRESReduc) / 100);
          }
        }
        //?========================/DMGMultiWithDEF
        //?========================Reactions
        if (!this.data.mastery) {
          this.vaporize = 2;
          this.melt = 1.5;
        }
        this.vaporize =
          2 * (1 + 2.78 * (+this.data.mastery / (+this.data.mastery + 1400)));
        this.melt =
          1.5 * (1 + 2.78 * (+this.data.mastery / (+this.data.mastery + 1400)));
        //?========================/Reactions
        //?========================AbilityNoCrit
        this.abilityNoCrit = this.data.abilityDMG
          .slice(1)
          .filter((item, index) => {
            if (item !== null && this.DMGMultiWithDEF !== 0 && item > 0) {
              if (!this.data.abilityATTR[index + 1]) {
                this.input.abilityATTR[index + 1] = "ATK";
                this.data.abilityATTR[index + 1] = "ATK";
              }
              if (this[this.data.abilityATTR[index + 1]] > 0) {
                return true;
              }
            }
          });
        this.abilityNoCrit.forEach((item, index) => {
          //TODO: Переписать позже
          if (item === null) {
            this.abilityNoCrit[index] = 0;
          } else {
            if (
              this.DMGMultiWithDEF !== 0 &&
              this[this.data.abilityATTR[index + 1]] !== 0 &&
              this.monsterDEF !== 0 &&
              this.DMGMulti
            ) {
              //?========================Special.Zhongli
              if (this.data.special.Zhongli) {
                console.log(
                  this.$store.state.skills.Zhongli[this.data.special.type],
                  this.data.special.type
                );
                this.abilityNoCrit[index] =
                  (+this.abilityNoCrit[index] / 100) *
                    this.DMGMultiWithDEF *
                    this[this.data.abilityATTR[index + 1]] +
                  (+this.$store.state.skills.Zhongli[this.data.special.type] /
                    100) *
                    this.DMGMultiWithDEF *
                    this.HP;
              }
              //?========================/Special.Zhongli
              else {
                this.abilityNoCrit[index] =
                  (+this.abilityNoCrit[index] / 100) *
                  this.DMGMultiWithDEF *
                  this[this.data.abilityATTR[index + 1]];
              }
            } else {
              this.abilityNoCrit[index] = +this.abilityNoCrit[index];
            }
          }
        });
        //?========================/AbilityNoCrit
        //?========================AbilityCrit
        if (this.abilityNoCrit.length) {
          this.abilityCrit.length = this.abilityNoCrit.length;
          this.abilityAVG.length = this.abilityNoCrit.length;
        } else {
          this.abilityCrit.length = 0;
          this.abilityAVG.length = 0;
        }
        for (let index = 0; index < this.abilityNoCrit.length; index++) {
          if (this.data.critDMG) {
            this.abilityCrit[index] =
              this.abilityNoCrit[index] * (1 + +this.data.critDMG / 100);
            //?========================AbilityAVG
            if (
              this.data.critRate &&
              this[this.data.abilityATTR[index + 1]] !== 0 &&
              this.DMGMultiWithDEF
            ) {
              if (this.abilityNoCrit[index] !== 0) {
                let avg = getAVGDMG(
                  this.abilityNoCrit[index],
                  this.data.critRate,
                  this.data.critDMG
                );
                this.abilityAVG[index] = +avg;
              }
            } else {
              this.abilityAVG[index] = 0;
            }
          } else {
            this.abilityCrit[index] = 0;
            this.abilityAVG[index] = 0;
          }
        }
        //?========================/AbilityAVG
        //?========================/AbilityCrit
        //?========================Rotation
        //!Time
        this.rotationTime = this.data.abilitySPD.slice(1).filter(item => {
          return +item > 0;
        });
        if (
          this.rotationTime.length > 0 &&
          this.rotationTime.length === this.abilityNoCrit.length
        ) {
          this.rotationTime = this.rotationTime.reduce((acc = 0, val) => {
            return acc + +val;
          });
        } else {
          this.rotationTime = 0;
        }
        //!AVG
        if (this.abilityAVG.length > 0) {
          this.rotationAVG = this.abilityAVG.reduce((acc, val) => {
            return acc + +val;
          });
          if (this.rotationTime > 0) {
            this.rotationDPSAVG = this.rotationAVG / this.rotationTime;
          } else {
            this.rotationDPSAVG = 0;
          }
        } else {
          this.rotationAVG = 0;
        }
        //!Crit
        if (this.abilityCrit.length > 0) {
          this.rotationCrit = this.abilityCrit.reduce((acc, val) => {
            return acc + +val;
          });
          if (this.rotationTime > 0) {
            this.rotationDPSCrit = this.rotationCrit / this.rotationTime;
          } else {
            this.rotationDPSCrit = 0;
          }
        } else {
          this.rotationCrit = 0;
        }
        //!NoCrit
        if (this.abilityNoCrit.length > 0) {
          this.rotationNoCrit = this.abilityNoCrit.reduce((acc, val) => {
            return acc + +val;
          });
          if (this.rotationTime > 0) {
            this.rotationDPSNoCrit = this.rotationNoCrit / this.rotationTime;
          } else {
            this.rotationDPSNoCrit = 0;
          }
        } else {
          this.rotationNoCrit = 0;
        }

        //?========================/Rotation
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/vars.scss";

.output-block {
  width: 18%;
  margin: 25px 0;
  background-color: lighten($thirtyColor, 1%);
  box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.493);
  padding: 5px;
  overflow: auto;
  &__stat {
    position: relative;
    width: 100%;
    margin: 5px;
    &--table {
      position: relative;
      width: 100%;
      .table-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .table-col {
        width: 30%;
        text-align: center;
        padding: 0;
      }
      .table-col--number {
        width: 5%;
        text-align: left;
        padding: 0;
      }
      padding-right: 15px;
    }
  }
  .stat__title {
    font-weight: 700;
  }
  .stat__value {
    font-weight: 400;
    font-family: "Josefin Sans", sans-serif;
    &.active {
      color: rgb(100, 230, 74);
    }
    &.needValue {
      color: rgb(228, 113, 36);
    }
    &.bad {
      color: rgb(212, 40, 40);
    }
    &.normal {
      color: rgb(219, 219, 71);
    }
  }
  .table-warn {
    margin-top: 10px;
    font-weight: 700;
    color: rgb(228, 113, 36);
    font-size: 24px;
    width: 100%;
    text-align: center;
  }
}
</style>
