import { getPath } from "./js/getPath";

const arrEl = [...document.querySelectorAll("p")].filter((a) =>
  a.textContent.includes("Тест3")
);

const testEl = arrEl[0];
console.log(testEl);

const finedPath = getPath(testEl);
console.log(finedPath);

const elChek = document.querySelector(finedPath);
console.log(elChek);
