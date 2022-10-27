import { tree } from "./tree";

describe("function tree", () => {
  it("tree to be instance of Function", () => {
    expect(tree).toBeInstanceOf(Function);
  });

  it("tree works", async () => {
    process.argv[2] = "./foo";
    const fsTree = await tree();

    expect(fsTree).toEqual({
      files: [
        "foo\\bar\\bar1.txt",
        "foo\\bar\\bar2.txt",
        "foo\\f1.txt",
        "foo\\f2.txt",
      ],
      folders: ["./foo", "foo\\bar", "foo\\bar\\baz"],
    });
  });
});
