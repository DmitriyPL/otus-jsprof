import { JSDOM } from "jsdom";

const myHtml = `
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

const dom = new JSDOM(myHtml);

global.window = dom.window;
global.document = dom.window.document;