import { sum } from "./ts/task2";

console.log(sum(1, 2, 3, 4, 5)());
console.log(sum(2, 3, 4)(5, 6)());
console.log(sum(3, 4)(5, 6)(7)());
console.log(sum(4, 5)(6)(7, 8)());
console.log(sum(5)(6)(7)(8)(9)());
