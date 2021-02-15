<template>
  <div class="input-block">
    <div class="input-block__left">
      <!-- abilityDMG -->
      <h2 class="input-block__description input-block__description--outblock">
        Rotation abilities
      </h2>
      <div class="input-block__stat" v-for="index in 10" :key="index">
        <transition name="fade">
          <div
            v-if="
              abilityDMG[index - 1] ||
                abilityATTR[index - 1] ||
                abilitySPD[index - 1]
            "
            class="input-block__inputs"
          >
            <div class="input-block__item">
              <input
                autocomplete="off"
                :id="'ability-dmg_' + index"
                :class="{ active: isAbilityDMG[index] }"
                @focus="isAbilityDMG.splice(index, 1, !isAbilityDMG[index])"
                @blur="isAbilityDMG.splice(index, 1, !isAbilityDMG[index])"
                v-model="abilityDMG[index]"
                type="text"
              />
              <label
                :for="'ability-dmg_' + index"
                :class="{ active: isAbilityDMG[index] || abilityDMG[index] }"
              >
                % DMG
              </label>
            </div>

            <div class="input-block__item">
              <input
                autocomplete="off"
                :id="'ability-attr_' + index"
                class="attr"
                :class="{ active: isAbilityATTR[index] }"
                maxlength="0"
                :value="abilityATTR[index]"
                @focus="openATTRList(index)"
                @blur="tabList"
                type="text"
              />
              <label
                :for="'ability-attr_' + index"
                :class="{ active: isAbilityATTR[index] || abilityATTR[index] }"
              >
                ATTR
              </label>
              <transition name="fastfade">
                <div
                  class="attr-list"
                  v-if="isAbilityATTR[index]"
                  v-click-outside="closeATTRList"
                >
                  <div
                    tabindex="1"
                    class="attr-list__item"
                    @click="changeAbilityATTR(index, 'ATK')"
                    @keydown.space.enter="changeAbilityATTR(index, 'ATK', true)"
                    @keydown.escape="closeATTRList"
                    :class="{ active: isAbilityATTR[index] }"
                  >
                    ATK
                  </div>
                  <div
                    tabindex="1"
                    class="attr-list__item"
                    @click="changeAbilityATTR(index, 'DEF')"
                    @keydown.space.enter="changeAbilityATTR(index, 'DEF', true)"
                    @keydown.escape="closeATTRList"
                    :class="{ active: isAbilityATTR[index] }"
                  >
                    DEF
                  </div>
                  <div
                    tabindex="1"
                    class="attr-list__item"
                    @click="changeAbilityATTR(index, 'HP')"
                    @blur="closeATTRListFromList(index)"
                    @keydown.space.enter="changeAbilityATTR(index, 'HP', true)"
                    @keydown.escape="closeATTRList"
                    :class="{ active: isAbilityATTR[index] }"
                  >
                    HP
                  </div>
                </div>
              </transition>
            </div>
            <div class="input-block__item">
              <input
                autocomplete="off"
                :id="'ability-spd_' + index"
                :class="{ active: isAbilitySPD[index] }"
                @focus="isAbilitySPD.splice(index, 1, !isAbilitySPD[index])"
                @blur="isAbilitySPD.splice(index, 1, !isAbilitySPD[index])"
                v-model="abilitySPD[index]"
                type="text"
              />
              <label
                :for="'ability-spd_' + index"
                :class="{ active: isAbilitySPD[index] || abilitySPD[index] }"
              >
                Speed
              </label>
            </div>
          </div>
        </transition>
      </div>
      <!-- /abilityDMG -->
    </div>
    <div class="input-block__center">
      <!-- ATK -->
      <div class="input-block__stat">
        <h2 class="input-block__description">
          Enter base, flat and percent ATK
        </h2>
        <div class="input-block__inputs">
          <div class="input-block__item">
            <input
              autocomplete="off"
              id="base_atk"
              :class="{ active: isBaseATK }"
              @focus="isBaseATK = !isBaseATK"
              @blur="isBaseATK = !isBaseATK"
              v-model="baseATK"
              type="text"
            />
            <label for="base_atk" :class="{ active: isBaseATK || baseATK }">
              Base ATK
            </label>
          </div>
          <div class="input-block__item">
            <input
              autocomplete="off"
              id="percent_atk"
              :class="{ active: isPercentATK }"
              @focus="isPercentATK = !isPercentATK"
              @blur="isPercentATK = !isPercentATK"
              v-model="percentATK"
              type="text"
            />
            <label
              for="percent_atk"
              :class="{ active: isPercentATK || percentATK }"
              >Percent ATK</label
            >
          </div>
          <div class="input-block__item">
            <input
              autocomplete="off"
              id="flat_atk"
              :class="{ active: isFlatATK }"
              @focus="isFlatATK = !isFlatATK"
              @blur="isFlatATK = !isFlatATK"
              v-model="flatATK"
              type="text"
            />
            <label for="flat_atk" :class="{ active: isFlatATK || flatATK }"
              >Flat ATK</label
            >
          </div>
        </div>
      </div>
      <!-- /ATK -->
      <!-- DEF -->
      <div class="input-block__stat">
        <h2 class="input-block__description">
          Enter base, flat and percent DEF
        </h2>
        <div class="input-block__inputs">
          <div class="input-block__item">
            <input
              autocomplete="off"
              id="base_def"
              :class="{ active: isBaseDEF }"
              @focus="isBaseDEF = !isBaseDEF"
              @blur="isBaseDEF = !isBaseDEF"
              v-model="baseDEF"
              type="text"
            />
            <label for="base_def" :class="{ active: isBaseDEF || baseDEF }">
              Base DEF
            </label>
          </div>
          <div class="input-block__item">
            <input
              autocomplete="off"
              id="percent_def"
              :class="{ active: isPercentDEF }"
              @focus="isPercentDEF = !isPercentDEF"
              @blur="isPercentDEF = !isPercentDEF"
              v-model="percentDEF"
              type="text"
            />
            <label
              for="percent_def"
              :class="{ active: isPercentDEF || percentDEF }"
              >Percent DEF</label
            >
          </div>
          <div class="input-block__item">
            <input
              autocomplete="off"
              id="flat_def"
              :class="{ active: isFlatDEF }"
              @focus="isFlatDEF = !isFlatDEF"
              @blur="isFlatDEF = !isFlatDEF"
              v-model="flatDEF"
              type="text"
            />
            <label for="flat_def" :class="{ active: isFlatDEF || flatDEF }"
              >Flat DEF</label
            >
          </div>
        </div>
      </div>
      <!-- /DEF -->
      <!-- HP -->
      <div class="input-block__stat">
        <h2 class="input-block__description">
          Enter base, flat and percent HP
        </h2>
        <div class="input-block__inputs">
          <div class="input-block__item">
            <input
              autocomplete="off"
              id="base_hp"
              :class="{ active: isBaseHP }"
              @focus="isBaseHP = !isBaseHP"
              @blur="isBaseHP = !isBaseHP"
              v-model="baseHP"
              type="text"
            />
            <label for="base_hp" :class="{ active: isBaseHP || baseHP }">
              Base HP
            </label>
          </div>
          <div class="input-block__item">
            <input
              autocomplete="off"
              id="percent_hp"
              :class="{ active: isPercentHP }"
              @focus="isPercentHP = !isPercentHP"
              @blur="isPercentHP = !isPercentHP"
              v-model="percentHP"
              type="text"
            />
            <label
              for="percent_hp"
              :class="{ active: isPercentHP || percentHP }"
              >Percent HP</label
            >
          </div>
          <div class="input-block__item">
            <input
              autocomplete="off"
              id="flat_hp"
              :class="{ active: isFlatHP }"
              @focus="isFlatHP = !isFlatHP"
              @blur="isFlatHP = !isFlatHP"
              v-model="flatHP"
              type="text"
            />
            <label for="flat_hp" :class="{ active: isFlatHP || flatHP }"
              >Flat HP</label
            >
          </div>
        </div>
      </div>
      <!-- /HP -->
      <!-- CRIT -->
      <div class="input-block__stat">
        <div class="input-block__inputs">
          <div class="input-block__item input-block__item--two-columns">
            <input
              autocomplete="off"
              id="crit-rate"
              :class="{ active: isCritRate }"
              @focus="isCritRate = !isCritRate"
              @blur="isCritRate = !isCritRate"
              v-model="critRate"
              type="text"
            />
            <label for="crit-rate" :class="{ active: isCritRate || critRate }">
              Crit Rate
            </label>
          </div>
          <div class="input-block__item input-block__item--two-columns">
            <input
              autocomplete="off"
              id="crit-dmg"
              :class="{ active: isCritDMG }"
              @focus="isCritDMG = !isCritDMG"
              @blur="isCritDMG = !isCritDMG"
              v-model="critDMG"
              type="text"
            />
            <label for="crit-dmg" :class="{ active: isCritDMG || critDMG }">
              Crit DMG
            </label>
          </div>
        </div>
      </div>
      <!-- /CRIT -->
      <!-- addDMG -->
      <div class="input-block__stat">
        <!-- <h2 class="input-block__description">
          Enter elemental/Physical DMG and additional DMG such as Normall Attack
          DMG and also
        </h2> -->
        <div class="input-block__inputs">
          <div class="input-block__item input-block__item--two-columns">
            <input
              autocomplete="off"
              id="elem-dmg"
              :class="{ active: isElemDMG }"
              @focus="isElemDMG = !isElemDMG"
              @blur="isElemDMG = !isElemDMG"
              v-model="elemDMG"
              type="text"
            />
            <label for="elem-dmg" :class="{ active: isElemDMG || elemDMG }">
              Elemental/Physical DMG
            </label>
          </div>
          <div class="input-block__item input-block__item--two-columns">
            <input
              autocomplete="off"
              id="add-dmg"
              :class="{ active: isAddDMG }"
              @focus="isAddDMG = !isAddDMG"
              @blur="isAddDMG = !isAddDMG"
              v-model="addDMG"
              type="text"
            />
            <label for="add-dmg" :class="{ active: isAddDMG || addDMG }">
              Additional DMG
            </label>
          </div>
        </div>
      </div>
      <!-- /addMDG -->
      <!-- LVL -->
      <div class="input-block__stat">
        <div class="input-block__inputs">
          <div class="input-block__item input-block__item--two-columns">
            <input
              autocomplete="off"
              id="char-lvl"
              :class="{ active: isCharLVL }"
              @focus="isCharLVL = !isCharLVL"
              @blur="isCharLVL = !isCharLVL"
              v-model="charLVL"
              type="text"
            />
            <label for="char-lvl" :class="{ active: isCharLVL || charLVL }">
              Character LVL
            </label>
          </div>
          <div class="input-block__item input-block__item--two-columns">
            <input
              autocomplete="off"
              id="monster-lvl"
              :class="{ active: isMonsterLVL }"
              @focus="isMonsterLVL = !isMonsterLVL"
              @blur="isMonsterLVL = !isMonsterLVL"
              v-model="monsterLVL"
              type="text"
            />
            <label
              for="monster-lvl"
              :class="{ active: isMonsterLVL || monsterLVL }"
            >
              Monster LVL
            </label>
          </div>
        </div>
      </div>
      <!-- /LVL -->
      <!-- RES -->
      <div class="input-block__stat">
        <div class="input-block__inputs">
          <div class="input-block__item input-block__item--one-column">
            <input
              autocomplete="off"
              id="monster-res"
              :class="{ active: isMonsterRES }"
              @focus="isMonsterRES = !isMonsterRES"
              @blur="isMonsterRES = !isMonsterRES"
              v-model="monsterRES"
              type="text"
            />
            <label
              for="monster-res"
              :class="{ active: isMonsterRES || monsterRES }"
            >
              Monster RES
            </label>
          </div>
        </div>
      </div>
      <div class="input-block__stat">
        <div class="input-block__inputs">
          <div class="input-block__item input-block__item--two-columns">
            <input
              autocomplete="off"
              id="monster-DEF-reduc"
              :class="{ active: isMonsterDEFReduc }"
              @focus="isMonsterDEFReduc = !isMonsterDEFReduc"
              @blur="isMonsterDEFReduc = !isMonsterDEFReduc"
              v-model="monsterDEFReduc"
              type="text"
            />
            <label
              for="monster-DEF-reduc"
              :class="{ active: isMonsterDEFReduc || monsterDEFReduc }"
            >
              Monster DEF Reduction
            </label>
          </div>
          <div class="input-block__item input-block__item--two-columns">
            <input
              autocomplete="off"
              id="monster-res-reduc"
              :class="{ active: isMonsterRESReduc }"
              @focus="isMonsterRESReduc = !isMonsterRESReduc"
              @blur="isMonsterRESReduc = !isMonsterRESReduc"
              v-model="monsterRESReduc"
              type="text"
            />
            <label
              for="monster-res-reduc"
              :class="{ active: isMonsterRESReduc || monsterRESReduc }"
            >
              Monster RES Reduction
            </label>
          </div>
        </div>
      </div>
      <!-- /RES -->
      <!-- mastery -->
      <div class="input-block__stat">
        <div class="input-block__inputs">
          <div class="input-block__item input-block__item--one-column">
            <input
              autocomplete="off"
              id="mastery"
              :class="{ active: isMastery }"
              @focus="isMastery = !isMastery"
              @blur="isMastery = !isMastery"
              v-model="mastery"
              type="text"
            />
            <label for="mastery" :class="{ active: isMastery || mastery }">
              Elemental mastery
            </label>
          </div>
        </div>
      </div>
      <!-- /mastery -->
    </div>
    <div class="input-block__right">
      <!-- ATK -->
      <div class="input-block__stat">
        <h2 class="input-block__description">
          Or enter calculated ATK
        </h2>
        <div class="input-block__inputs">
          <div class="input-block__item input-block__item--one-column">
            <input
              autocomplete="off"
              id="atk"
              :class="{ active: isATK }"
              @focus="isATK = !isATK"
              @blur="isATK = !isATK"
              v-model="ATK"
              type="text"
            />
            <label for="atk" :class="{ active: isATK || ATK }">
              ATK
            </label>
          </div>
        </div>
      </div>
      <!-- /ATK -->
      <!-- DEF -->
      <div class="input-block__stat">
        <h2 class="input-block__description">
          Or enter calculated DEF
        </h2>
        <div class="input-block__inputs">
          <div class="input-block__item input-block__item--one-column">
            <input
              autocomplete="off"
              id="def"
              :class="{ active: isDEF }"
              @focus="isDEF = !isDEF"
              @blur="isDEF = !isDEF"
              v-model="DEF"
              type="text"
            />
            <label for="def" :class="{ active: isDEF || DEF }">
              DEF
            </label>
          </div>
        </div>
      </div>
      <!-- /DEF -->
      <!-- HP -->
      <div class="input-block__stat">
        <h2 class="input-block__description">
          Or enter calculated HP
        </h2>
        <div class="input-block__inputs">
          <div class="input-block__item input-block__item--one-column">
            <input
              autocomplete="off"
              id="hp"
              :class="{ active: isHP }"
              @focus="isHP = !isHP"
              @blur="isHP = !isHP"
              v-model="HP"
              type="text"
            />
            <label for="hp" :class="{ active: isHP || HP }">
              HP
            </label>
          </div>
        </div>
      </div>
      <!-- /HP -->
      <!-- Special -->
      <div class="input-block__stat input-block__stat--special">
        <h2 class="input-block__description">
          Add to calculations (Beta)
        </h2>
        <div
          class="input-block__inputs input-block__inputs--special"
          :class="{ active: special.Noelle || special.Zhongli }"
        >
          <div
            class="input-block__item input-block__item--one-column"
            v-if="special.Noelle"
          >
            <input
              autocomplete="off"
              id="special_level"
              :class="{ active: isSpecialLevel }"
              @focus="isSpecialLevel = !isSpecialLevel"
              @blur="isSpecialLevel = !isSpecialLevel"
              v-model="special.level"
              type="text"
            />
            <label
              for="special_level"
              :class="{ active: isSpecialLevel || special.level }"
            >
              Level ability
            </label>
          </div>
          <div
            class="input-block__item input-block__item--one-column"
            v-if="special.Zhongli"
          >
            <input
              autocomplete="off"
              id="special-type"
              :class="{ active: isSpecialType }"
              maxlength="0"
              @click="isSpecialType = !isSpecialType"
              v-model="special.type"
              type="text"
            />
            <label
              for="special-type"
              :class="{ active: isSpecialType || special.type }"
            >
              Type ability
            </label>
            <transition name="fastfade">
              <div class="attr-list" v-if="isSpecialType">
                <div
                  class="attr-list__item"
                  @click="changeType('Normall attack')"
                  @keydown.space.enter="changeType('Normall attack')"
                  @keydown.escape="isSpecialType = !isSpecialType"
                  :class="{ active: isSpecialType }"
                >
                  Normall attack
                </div>
                <div
                  class="attr-list__item"
                  @click="changeType('Elemental Skill')"
                  @keydown.space.enter="
                    changeAbilityATTR(index, 'Elemental Skill', true)
                  "
                  @keydown.escape="isSpecialType = !isSpecialType"
                  :class="{ active: isSpecialType }"
                >
                  Elemental Skill
                </div>
                <div
                  class="attr-list__item"
                  @click="changeType('Elemental Burst')"
                  @keydown.space.enter="chachangeType('Elemental Burst')"
                  @keydown.escape="isSpecialType = !isSpecialType"
                  :class="{ active: isSpecialType }"
                >
                  Elemental Burst
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="special-calculations">
          <div
            class="special-calculations__item"
            @click="setSpecial('Zhongli')"
            :class="{ active: special.Zhongli }"
          >
            <div>
              <span>
                <img
                  src="@/static/image/Zhongli_2nd_passive_skill.png"
                  alt="Zhongli 2nd passive skill"
              /></span>
              <span>Zhongli 2nd Passive Skill</span>
            </div>
          </div>
          <div
            class="special-calculations__item"
            @click="setSpecial('Noelle')"
            :class="{ active: special.Noelle }"
          >
            <div>
              <span
                ><img
                  src="@/static/image/Noelle_elemental_burst.png"
                  alt="Noelle Elemental Burst"/></span
              ><span>Noelle Elemental Burst</span>
            </div>
          </div>
        </div>
      </div>
      <!-- /Special -->
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  data: () => {
    return {
      isSpecialLevel: false,
      isSpecialType: false,
      special: {
        Zhongli: false,
        Noelle: false,
        level: undefined,
        oldLevel: undefined,
        type: "Normall attack"
      },
      showList: false,

      isBaseATK: false,
      isPercentATK: false,
      isFlatATK: false,

      baseATK: null,
      percentATK: null,
      flatATK: null,

      isATK: false,
      ATK: null,
      //
      isBaseDEF: false,
      isPercentDEF: false,
      isFlatDEF: false,

      baseDEF: null,
      percentDEF: null,
      flatDEF: null,

      isDEF: false,
      DEF: null,
      //
      isBaseHP: false,
      isPercentHP: false,
      isFlatHP: false,

      baseHP: null,
      percentHP: null,
      flatHP: null,

      isHP: false,
      HP: null,
      //
      isCritRate: false,
      isCritDMG: false,

      critRate: null,
      critDMG: null,
      //
      isElemDMG: false,
      isAddDMG: false,

      elemDMG: null,
      addDMG: null,
      //
      isCharLVL: false,
      isMonsterLVL: false,

      charLVL: null,
      monsterLVL: null,
      //
      isMonsterDEFReduc: false,
      isMonsterRESReduc: false,
      isMonsterRES: false,

      monsterDEFReduc: null,
      monsterRESReduc: null,
      monsterRES: null,
      //
      isMastery: false,

      mastery: null,
      //

      isAbilityDMG: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],

      abilityDMG: [
        1,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],

      isAbilityATTR: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],

      abilityATTR: [
        1,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ],

      isAbilitySPD: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],

      abilitySPD: [
        1,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    };
  },
  watch: {
    ATK(val) {
      this.deleteChar("ATK", val);
      this.clearAlternative("ATK", val);
      this.checkLimit("ATK", val, 30000);
      this.toParent();
    },
    baseATK(val) {
      this.deleteChar("baseATK", val);
      this.clearAlternative("baseATK", val);
      this.checkLimit("baseATK", val, 2000);
      this.toParent();
    },
    percentATK(val) {
      this.deleteChar("percentATK", val);
      this.clearAlternative("percentATK", val);
      this.checkLimit("percentATK", val, 300);
      this.toParent();
    },
    flatATK(val) {
      this.deleteChar("flatATK", val);
      this.clearAlternative("flatATK", val);
      this.checkLimit("flatATK", val, 2000);
      this.toParent();
    },
    DEF(val) {
      this.deleteChar("DEF", val);
      this.clearAlternative("DEF", val);
      this.checkLimit("DEF", val, 30000);
      this.toParent();
    },
    baseDEF(val) {
      this.deleteChar("baseDEF", val);
      this.clearAlternative("baseDEF", val);
      this.checkLimit("baseDEF", val, 2000);
      this.toParent();
    },
    percentDEF(val) {
      this.deleteChar("percentDEF", val);
      this.clearAlternative("percentDEF", val);
      this.checkLimit("percentDEF", val, 300);
      this.toParent();
    },
    flatDEF(val) {
      this.deleteChar("flatDEF", val);
      this.clearAlternative("flatDEF", val);
      this.checkLimit("flatDEF", val, 2000);
      this.toParent();
    },
    HP(val) {
      this.deleteChar("HP", val);
      this.clearAlternative("HP", val);
      this.checkLimit("HP", val, 100000);
      this.toParent();
    },
    baseHP(val) {
      this.deleteChar("baseHP", val);
      this.clearAlternative("baseHP", val);
      this.checkLimit("baseHP", val, 20000);
      this.toParent();
    },
    percentHP(val) {
      this.deleteChar("percentHP", val);
      this.clearAlternative("percentHP", val);
      this.checkLimit("percentHP", val, 300);
      this.toParent();
    },
    flatHP(val) {
      this.deleteChar("flatHP", val);
      this.clearAlternative("flatHP", val);
      this.checkLimit("flatHP", val, 20000);
      this.toParent();
    },
    critRate(val) {
      this.deleteChar("critRate", val);
      this.checkLimit("critRate", val, 200);
      this.toParent();
    },
    critDMG(val) {
      this.deleteChar("critDMG", val);
      this.checkLimit("critDMG", val, 600);
      this.toParent();
    },
    charLVL(val) {
      this.deleteChar("charLVL", val);
      this.checkLimit("charLVL", val, 90);
      this.toParent();
    },
    monsterLVL(val) {
      this.deleteChar("monsterLVL", val);
      this.checkLimit("monsterLVL", val, 110);
      this.toParent();
    },
    elemDMG(val) {
      this.deleteChar("elemDMG", val);
      this.checkLimit("elemDMG", val, 300);
      this.toParent();
    },
    addDMG(val) {
      this.deleteChar("addDMG", val);
      this.checkLimit("addDMG", val, 200);
      this.toParent();
    },
    monsterDEFReduc(val) {
      this.deleteChar("monsterDEFReduc", val);
      this.checkLimit("monsterDEFReduc", val, 53);
      this.toParent();
    },
    monsterRESReduc(val) {
      this.deleteChar("monsterRESReduc", val);
      this.checkLimit("monsterRESReduc", val, 100);
      this.toParent();
    },
    monsterRES(val) {
      this.deleteChar("monsterRES", val);
      this.checkLimit("monsterRES", val, 260);
      this.toParent();
    },
    mastery(val) {
      this.deleteChar("mastery", val);
      this.checkLimit("mastery", val, 3000);
      this.toParent();
    },
    abilityDMG(val) {
      for (let i = 1; i < 11; i++) {
        this.deleteChar("abilityDMG", val[i], i);
        this.checkLimit("abilityDMG", val[i], 2000, i);
        this.toParent();
      }
    },
    abilityATTR(val) {
      for (let i = 1; i < 11; i++) {
        this.deleteChar("abilityATTR", val[i], i);
        this.checkLimit("abilityATTR", val[i], 2000, i);
        this.toParent();
      }
    },
    abilitySPD(val) {
      for (let i = 1; i < 11; i++) {
        this.deleteChar("abilitySPD", val[i], i);
        this.checkLimit("abilitySPD", val[i], 10, i);
        this.toParent();
      }
    },
    special: {
      handler(val) {
        if (val.oldLevel !== val.level) {
          this.deleteChar("special", val.level, "level");
          this.checkLimit("special", val.level, 15, "level");
          val.oldLevel = val.level;
        }
        this.toParent();
      },
      deep: true
    }
  },
  methods: {
    changeType(type) {
      this.special.type = type;
      this.isSpecialType = !this.isSpecialType;
    },
    toParent() {
      this.$emit("inputStat", this.$data);
    },
    setSpecial(char) {
      for (let i in this.special) {
        if (i === "level" || i === "type") {
        } else if (i !== char) {
          this.special[i] = false;
        }
      }
      this.special[char] = !this.special[char];
    },
    tabList() {
      if (this.showList > -1) {
        this.showList++;
        document.getElementsByClassName("attr-list__item")[0].focus(); //TODO: ломается фокус
      }
    },
    openATTRList(index) {
      this.showList = 0;
      this.isAbilityATTR.splice(index, 1, true);
    },
    closeATTRList(click) {
      if (this.showList > 0) {
        for (let i = 1; i < this.isAbilityATTR.length; i++) {
          this.isAbilityATTR.splice(i, 1, false);
        }
      }
      this.showList++;
    },
    closeATTRListFromList(index) {
      if (this.showList > -1) {
        document.getElementById("ability-spd_" + index).focus();
        this.isAbilityATTR.splice(index, 1, false);
      }
    },

    changeAbilityATTR(index, attr, to) {
      this.abilityATTR[index] = attr;
      this.abilityATTR = this.abilityATTR;

      document.getElementById("ability-attr_" + index).focus();
      document.getElementById("ability-attr_" + index).blur();
      this.isAbilityATTR.splice(index, 1, false);
      if (to) {
        document.getElementById("ability-spd_" + index).focus();
      }
    },
    deleteChar(attr, string, index) {
      if (string != null) {
        string = string.toString();
        let start = 0;
        let matches = 0;
        for (let i = 0; i < string.length; i++) {
          if (string.indexOf(".", start) !== -1) {
            start = string.indexOf(".", start) + 1;
            matches++;
          } else {
            break;
          }
        }
        if (matches > 1) {
          string = string.slice(0, string.length - 1);
        }

        if (
          string.split("")[0] === "-" &&
          string.split("")[1] &&
          (string.split("")[1] === "0" || string.split("")[1] === ".")
        ) {
          string = string.slice(0, string.length - 1);
        }
        if (
          string.split("")[0] === "0" &&
          string.split("")[1] &&
          string.split("")[1] !== "."
        ) {
          string = string.slice(0, string.length - 1);
        }

        let clearStr = string
          .split("")
          .filter((char, index) => {
            if (
              (char === "0" && index === 0 && attr === "baseATK") ||
              (char === "0" && index === 0 && attr === "ATK") ||
              (char === "0" && index === 0 && attr === "DEF") ||
              (char === "0" && index === 0 && attr === "baseDEF") ||
              (char === "0" && index === 0 && attr === "HP") ||
              (char === "0" && index === 0 && attr === "baseHP") ||
              (char === "0" && index === 0 && attr === "critRate") ||
              (char === "0" && index === 0 && attr === "critDMG") ||
              (char === "0" && index === 0 && attr === "abilityDMG") ||
              (char === "0" && index === 0 && attr === "charLVL") ||
              (char === "0" && index === 0 && attr === "monsterLVL") ||
              (char === "0" && index === 0 && attr === "special")
            ) {
              return false;
            }
            if (char === "-" && index === 0 && attr === "monsterRES") {
              return true;
            }
            if (
              (char === "." && index !== 0 && attr === "percentDEF") ||
              (char === "." && index !== 0 && attr === "percentATK") ||
              (char === "." && index !== 0 && attr === "percentHP") ||
              (char === "." && index !== 0 && attr === "critRate") ||
              (char === "." && index !== 0 && attr === "critDMG") ||
              (char === "." && index !== 0 && attr === "abilityDMG") ||
              (char === "." && index !== 0 && attr === "elemDMG") ||
              (char === "." && index !== 0 && attr === "addDMG") ||
              (char === "." && index !== 0 && attr === "abilitySPD")
            ) {
              return true;
            }
            if (char === " ") {
              return false;
            }
            if (!Number.isNaN(+char)) {
              return true;
            }
          })
          .join("");
        if (Number.isNaN(clearStr)) {
          clearStr = "";
        }
        if (index) {
          this[attr][index] = clearStr;
        } else {
          this[attr] = clearStr;
        }
      }
    },
    clearAlternative(attr, val) {
      if (val === null) {
        return;
      } else {
        val = +val;
        if (val > -Infinity) {
          if (
            attr.search("base") != -1 ||
            attr.search("percent") != -1 ||
            attr.search("flat") != -1
          ) {
            attr = attr.replace("base", "");
            attr = attr.replace("percent", "");
            attr = attr.replace("flat", "");
            this[attr] = null;
            this["is" + attr] = false;
          } else {
            this["base" + attr] = null;
            this["percent" + attr] = null;
            this["flat" + attr] = null;

            this["isBase" + attr] = false;
            this["isPercent" + attr] = false;
            this["isFlat" + attr] = false;
          }
        }
      }
    },
    checkLimit(attr, val, limit, index) {
      val = +val;
      if (!Number.isInteger(val) && !Number.isNaN(val)) {
        val = val.toString();
        let dot = val.indexOf(".") + 1;
        if (attr === "abilitySPD") {
          if (val.length - dot > 3) {
            this[attr][index] = (+val - +val.slice(dot + 3) * 0.0001).toFixed(
              3
            );
          }
        } else {
          if (val.length - dot > 1) {
            if (index) {
              this[attr][index] = (+val - +val.slice(dot + 1) * 0.01).toFixed(
                1
              );
            } else {
              this[attr] = (+val - +val.slice(dot + 1) * 0.01).toFixed(1);
            }
          }
        }
      }
      if (val >= limit) {
        if (index) {
          this[attr][index] = limit;
        } else {
          this[attr] = limit;
        }
      }
      if (val <= -limit) {
        if (index) {
          this[attr][index] = -limit;
        } else {
          this[attr] = -limit;
        }
      }
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/vars.scss";

.input-block {
  position: relative;
  margin: 25px 0;
  width: 80%;
  display: flex;
  justify-content: space-between;
  &__left {
    width: 30%;
    box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.493);
    background-color: lighten($thirtyColor, 1%);
    overflow: auto;
  }
  &__center {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.493);
    background-color: lighten($thirtyColor, 1%);
    overflow: auto;
  }
  &__right {
    width: 25%;
    box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.493);
    background-color: lighten($thirtyColor, 1%);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
  }
  &__stat {
    width: 100%;
    padding: 15px;

    &--special {
      position: relative;
      height: 45%;
    }
    .special-calculations {
      height: 100%;
      width: 100%;
      background-color: $mainColor;
      overflow: auto;
      &__item {
        position: relative;
        height: 15%;
        padding: 15px;

        font-family: "Josefin Sans", sans-serif;
        font-size: 14px;

        & div {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          span {
            margin-right: 10px;
            height: 100%;
            display: flex;
            align-items: center;
            & img {
              height: 80%;
              width: auto;
            }
          }
        }
        &:hover {
          background-color: lighten($mainColor, 10%);
        }
        &.active {
          background-color: lighten($mainColor, 15%);
        }
      }
    }
  }
  &__description {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: 400;
    &--outblock {
      padding: 15px;
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }
  &__inputs {
    display: flex;
    justify-content: space-between;
    &--special {
      max-height: 0;
      opacity: 0;
      transition: 0.3s ease;
      &.active {
        max-height: 100px;
        opacity: 1;
      }
    }
  }
  &__item {
    box-sizing: border-box;
    position: relative;
    width: 32%;
    height: 40px;

    .attr-list {
      position: absolute;
      width: 100%;
      height: 240%;
      top: 100%;
      transition: height 0.2s linear;
      z-index: 10;
      color: $mainColor;
      cursor: pointer;

      &__item {
        position: relative;
        height: 33.3%;
        width: 100%;
        transition: background-color 0.2s linear;
        cursor: pointer;
        text-align: center;
        padding: 5px;
        border-top: 1px solid $secondaryColor;
        background-color: $mainFontColor;

        &:hover {
          background-color: darken($mainFontColor, 30%);
        }

        &:focus {
          background-color: darken($mainFontColor, 30%);
        }
      }
    }

    & input {
      position: absolute;
      font-family: inherit;
      width: 100%;
      height: 80%;
      border: 0;
      background-color: transparent;
      border-bottom: 1px solid $secondaryFontColor;
      font-size: 14px;
      color: $mainFontColor;
      transition: border-bottom 0.4s ease;
      bottom: 0;
      &.attr {
        caret-color: transparent;
        cursor: default;
      }
      &.active {
        border-bottom: 3px solid $mainFontColor;
      }
    }
    & label {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      padding: 15px;
      padding-left: 0;
      transition: 0.4s ease;
      font-size: 14px;
      cursor: text;
      transition: color transform 0.2s linear;

      &.active {
        transform: translateY(-20px);
        font-size: 12px;
        color: $mainFontColor;
      }
    }

    &--two-columns {
      width: 49%;
    }
    &--one-column {
      width: 100%;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fastfade-enter-active,
  .fastfade-leave-active {
    transition: opacity 0.1s;
  }
  .fastfade-enter,
  .fastfade-leave-to {
    opacity: 0;
  }
}
</style>
