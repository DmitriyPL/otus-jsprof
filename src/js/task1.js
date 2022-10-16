// const items = [
//   ["a", "b"],
//   ["a", "c"],
//   ["d", "e"]
// ]

const items = [
    ["q", "w", 'a'],
    ["a", "b"],
    ["a", "c"],
    ["q", "e"],
    ["q", "r"],
]

// const items = [
//   ["Bread", "Butter", "Milk"],
//   ["Bread", "Butter"],
//   ["Beer", "Cookies", "Diapers"],
//   ["Milk", "Diapers", "Bread", "Butter"],
//   ["Beer", "Diapers"],
// ]

// ************ Пытался реализовать классический априорный алгоритм  *******************

function findFrequences(items, arrUniqEl) {
  
  const freqTable = new Map();

  items.forEach( order => {
    arrUniqEl.forEach( el => {

      let elFreq = freqTable.get(el);
        
      if ( elInArr(order, el) ) { 
          
        if (elFreq) {
          elFreq += 1;  
          freqTable.set(el, elFreq);
        } else {
          freqTable.set(el, 1);
        }
      }

    });
  })

  return freqTable; 

}

function elInArr(arrA, arrB) {  
    if ( arrB.every( el => arrA.includes(el) )) {
      return true;
    }    
    return false;
}

function sortFreqTable(table){
  return new Map(
    [...table.entries()].sort((item1, item2) => item2[1] - item1[1])
  );
}

function filterFreqTable(table, minSupportCount) {
  return new Map([...table].filter(([key, val]) => val >= minSupportCount));
}

function permutation(arr, combLen) {
    
  const res = [];

  if (combLen == 1) {
    return arr.map( el => [el]);
  }

  for ( let i = 0; i <= arr.length - combLen; i++ ){
    for ( let j = combLen - 1 + i; j < arr.length; j++ ) {
      const sub = arr.slice(i, i + combLen - 1).map( el => el[0]);
      sub.push( arr[j][0] );
      res.push(sub);
    }
  }

  // return res.map( el => [el]
  return res;
}

export function main2() {

  const minSupport = 0.4;
  const minConfidence = 0.7;

  console.log("Data - ", items);
  let uniqEl = Array.from(new Set(items.flat()));

  // const minSupportCount = minSupport * uniqEl.length;
  const minSupportCount = 2;


  let arrUniqEl = uniqEl.map( el => [el])

  let step = 2;
  let count = 0;

  const processMap = [];

  while (true) {

    if (count > 10){
      break;
    }

    let freqTable = findFrequences(items, arrUniqEl);
    let freqTableSorted = sortFreqTable(freqTable);
    let freqTableFiltered = filterFreqTable(freqTableSorted, minSupportCount);

    if (freqTableFiltered.size == 0){
      break;
    }

    let keys = [...freqTableFiltered.keys()]
    uniqEl = [...new Set(keys.flat())].map(el=>[el]);
    arrUniqEl = permutation(uniqEl, step);
  
    step += 1;
    count +=1;

    processMap.push(freqTableFiltered);

  }

  console.log(processMap);

}

// ************ Дошел до построения правил ассоциации, но не совсем понимаю как их применить к тек задаче .... *******************

// ************ Поэтому решил в лоб 

export function bildProcessMap(items) {

  const uniqEl = Array.from(new Set(items.flat()));

  const processMap = new Map();

  uniqEl.forEach( el => {
    items.forEach( order => {

      let asociations = processMap.get(el);
        
      if ( order.includes(el) ) { 
          
        if (asociations) {
          asociations.push(order);  
          processMap.set(el, asociations);
        } else {
          processMap.set(el, order);
        }
      }

    });
  }) 

  return processMap;

}

export function findMaxSet(processMap) {

  let maxSet = [];

  processMap.forEach( set => {
    
    const currSet = [ ... new Set(set.flat()) ];

    if (currSet.length > maxSet.length) {
      maxSet = currSet;
    }
    
  });

  return maxSet.sort();

}

export function main() {

  const processMap  = bildProcessMap(items)

  const maxSet = findMaxSet(processMap);

  console.log(maxSet);

}