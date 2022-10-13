//** types description */

type Items = string[][];

//** Test data */

const items: Items = [
  ["q", "w", "a"],
  ["a", "b"],
  ["a", "c"],
  ["q", "e"],
  ["q", "r"],
];

//** find items frequences */

function findFrequences(items: Items): Map<string, number> {
  const freqTable = new Map();

  items.forEach((order) => {
    order.forEach((item) => {
      let itemFreq = freqTable.get(item);
      if (itemFreq) {
        itemFreq += 1;
        freqTable.set(item, itemFreq);
      } else {
        freqTable.set(item, 1);
      }
    });
  });

  return freqTable;
}

function sortFreqTable(table: Map<string, number>): Map<string, number> {
  return new Map(
    [...table.entries()].sort((item1, item2) => item2[1] - item1[1])
  );
}

function filterFreqTable(table: Map<string, number>): Map<string, number> {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return new Map([...table].filter(([key, val]) => val >= 1));
}

function sortCurrentOrder(order: string[], sortTemplate: Map<string, number>) {
  const sortedOrder = order.slice();
  const template = Array.from(sortTemplate.keys());

  const sortFunc = (a: string, b: string) => {
    return template.indexOf(a) - template.indexOf(b);
  };

  sortedOrder.sort(sortFunc);

  return sortedOrder;
}

function sortItemsByFreqTable(
  items: Items,
  freqTableFiltered: Map<string, number>
): Items {
  const sortedItems: Items = [];

  items.forEach((order) => {
    sortedItems.push(sortCurrentOrder(order, freqTableFiltered));
  });

  return sortedItems;
}

// type TreeNode = {
//   item: string;
//   repeat: number;
// };

// class Node {
//   item: string;
//   repeat: number;
//   parent: null;
//   children: [];

//   constructor(item: string) {
//     this.item = item;
//     this.repeat = 1;
//     this.parent = null;
//     this.children = [];
//   }

//   getRepeat() {
//     return this.repeat;
//   }
// }

// class Tree {
//   _root: Node;

//   constructor(node: Node) {
//     this._root = node;
//   }
// }

// function Node(data:TreeNode) {
//   this.data = data;
//   this.parent = null;
//   this.children = [];
// }

export function main() {
  const freqTable = findFrequences(items);
  console.log(freqTable);

  const freqTableSorted = sortFreqTable(freqTable);
  console.log(freqTableSorted);

  const freqTableFiltered = filterFreqTable(freqTableSorted);
  console.log(freqTableFiltered);

  const itemsSorted = sortItemsByFreqTable(items, freqTableFiltered);
  console.log(itemsSorted);
}
