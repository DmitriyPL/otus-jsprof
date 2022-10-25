import { getByText } from "@testing-library/dom";
import { getPath } from "./getPath";

function getExampleDOM() {
  const myHTML = `
  <html lang="en">
  <body>
      <main>
          <div class="content-wrapper">
              <section>
                  <ol>
                      <li>
                          <p>Тест1</p>
                      </li>
                      <li>
                          <p>Тест2</p>
                      </li>
                      <li>
                          <p>Тест3</p>
                      </li>
                      <li>
                          <p>Тест4</p>
                      </li>
                  </ol>
              </section>
          </div>
      </main>
  </body>
  </html>`;

  const div = document.createElement("div");
  div.innerHTML = myHTML;

  return div;
}

describe("function getPath", () => {
  it("getPath to be instance of Function", () => {
    expect(getPath).toBeInstanceOf(Function);
  });

  it("getPath don't work with non Element object", () => {
    const el = {};
    expect(getPath(el)).toBe("");
  });

  it("getPath works", async () => {
    const container = getExampleDOM();
    const testEl = getByText(container, "Тест3");
    const finedPath = getPath(testEl);
    const elChek = container.querySelector(finedPath);

    expect(elChek).toBe(testEl);
    expect(container.querySelectorAll(finedPath).length).toBe(1);
  });
});
