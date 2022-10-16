import { bildProcessMap, findMaxSet } from "./task1";

describe("function findMaxSet", () => {
  it("findMaxSet to be instance of Function", () => {
    expect(findMaxSet).toBeInstanceOf(Function);
  });

  it("sum works", () => {
    const items1 = [
      ["a", "b"],
      ["a", "c"],
      ["d", "e"],
    ];

    const items2 = [
      ["q", "w", "a"],
      ["a", "b"],
      ["a", "c"],
      ["q", "e"],
      ["q", "r"],
    ];

    expect(findMaxSet(bildProcessMap(items1))).toEqual(["a", "b", "c"]);
    expect(findMaxSet(bildProcessMap(items2))).toEqual([
      "a",
      "b",
      "c",
      "e",
      "q",
      "r",
      "w",
    ]);
  });
});
