import { getPath } from "./getPath";

describe("function getPath", () => {
  it("getPath to be instance of Function", () => {
    expect(getPath).toBeInstanceOf(Function);
  });

  it("getPath don't work with non Element object", () => {
    const el = {};
    expect(getPath(el)).toBe("");
  });

  it("getPath works", () => {
    const arrEl = [...document.querySelectorAll("p")].filter((a) =>
      a.textContent.includes("Тест3")
    );
    const testEl = arrEl[0];
    const finedPath = getPath(testEl);
    const elChek = document.querySelector(finedPath);

    expect(elChek.toBe("<p>Тест3</p>"));
  });
});
