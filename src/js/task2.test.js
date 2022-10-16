import { sum } from "./task2";

describe("function sum", () => {
  it("hof to be instance of Function", () => {
    expect(sum).toBeInstanceOf(Function);
  });

  it("sum works", () => {
    expect(sum(1, 2, 3, 4, 5)()).toBe(15);
    expect(sum(2, 3, 4)(5, 6)()).toBe(20);
    expect(sum(3, 4)(5, 6)(7)()).toBe(25);
    expect(sum(4, 5)(6)(7, 8)()).toBe(30);
    expect(sum(5)(6)(7)(8)(9)()).toBe(35);
  });
});
