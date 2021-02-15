export default function getAVGDMG(arrAttacks, critRate = 5, critDMG = 50) {
  function rotations(
    arrAttacks,
    critRate,
    critDMG,
    AVGIterator,
    rotationIterator,
    attacks
  ) {
    let avg = 0;
    let rotationAVG = [];
    for (let x = 0; x < AVGIterator; x++) {
      for (let i = 0; i < rotationIterator; i++) {
        for (let y = 0; y < attacks; y++) {
          if (critRate / 100 > Math.random()) {
            avg += arrAttacks[y] * (1 + critDMG / 100);
          } else {
            avg += arrAttacks[y];
          }
        }
      }

      rotationAVG.push(avg / (rotationIterator * attacks));
      avg = 0;
    }
    return rotationAVG;
  }
  function setMap(item, frequencyMap) {
    if (frequencyMap.has(item)) {
      let iterator = frequencyMap.entries();
      let arrIt = [];
      while (true) {
        let it = iterator.next();
        arrIt.push(it.value);
        if (it.done === true) {
          break;
        }
      }
      for (let index = 0; index < arrIt.length; index++) {
        if (arrIt[index] != undefined) {
          if (item == arrIt[index][0]) {
            let val = arrIt[index][1] + 1;
            frequencyMap.set(item, val);
          }
        }
      }
    } else {
      frequencyMap.set(item, 1);
    }
  }
  function MapToArr(frequencyMap) {
    let iterator = frequencyMap.entries();
    let arr = [];
    while (true) {
      let it = iterator.next();
      if (it.value != undefined) {
        arr.push(it.value);
      }
      if (it.done === true) {
        break;
      }
    }
    return arr;
  }
  function normalizeMap(frequencyMap, arr, AVGIterator) {
    let normalizeArr = [];
    let frequencyAVG = AVGIterator / arr.length;
    for (let i = 0; i < normalizeArr.length; i++) {
      if (arr[i][1] < frequencyAVG) {
        frequencyMap.delete(arr[i][0]);
      }
    }
  }
  function AVG(arr) {
    let AVG = 0;
    let newAVGIterator = 0;
    for (let i = 0; i < arr.length; i++) {
      AVG += arr[i][0] * arr[i][1];
      newAVGIterator += arr[i][1];
    }
    return (AVG / newAVGIterator).toFixed();
  }
  if (typeof arrAttacks === "number") {
    arrAttacks = [arrAttacks];
    arrAttacks = arrAttacks.filter(item => {
      return item > 0;
    });
  }
  let attacks = arrAttacks.length;
  let AVGIterator = 100;
  let rotationIterator = 100;
  let frequencyMap = new Map();

  rotations(
    arrAttacks,
    critRate,
    critDMG,
    AVGIterator,
    rotationIterator,
    attacks
  ).forEach(item => setMap(item, frequencyMap));
  normalizeMap(frequencyMap, MapToArr(frequencyMap), AVGIterator);

  return AVG(MapToArr(frequencyMap));
}
