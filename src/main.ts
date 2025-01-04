import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import sql from "highlight.js/lib/languages/sql";
import css from "highlight.js/lib/languages/css";

import 'highlight.js/styles/default.css';

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("css", css);

import "./styles/main.css";
import "./styles/font.css";
import "./styles/reset.css";

const state = {
    direction: "ltr",
};

type State = typeof state;

const markdownit = new MarkdownIt({
    highlight: (str, lang) => {
        if (hljs.listLanguages().includes(lang)) {
            const validLang = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(str, { language: validLang }).value;
        } else {
            return str;
        }
    },
});

const textarea = document.getElementById(
    "editor"
) as HTMLTextAreaElement | null;
if (textarea?.addEventListener("input", render) === null) {
    console.error(
        "Error adding an input event listener for the textarea `#editor`"
    );
}

const content = document.querySelector(
    "#printable .content"
) as HTMLDivElement | null;
const dirbutton = document.getElementById("dir-button");

if (dirbutton?.addEventListener("click", handleDirButton) === null) {
    console.error(
        "Error adding an input event listener for the textarea `#editor`"
    );
}

function handleDirButton() {
    updateState(state.direction == "rtl" ? "ltr" : "rtl");
}

function updateState(direction: "ltr" | "rtl"): any {
    state.direction = direction;
    updateDom(state);
}

function updateDom(state: State) {
    if (content) {
        content.dir = state.direction;
    }
    if (dirbutton) {
        dirbutton.innerText =
            "Switch To " +
            (state.direction == "ltr" ? "rtl" : "ltr").toUpperCase();
    }
}

function render() {
    if (textarea == null)
        console.error("Error No textarea `#editor` was found");
    if (content == null)
        console.error(
            "Error: No element with id `printable` and a div `.content` was found"
        );
    content!.innerHTML = markdownit.render(textarea!.value);
}

// document.body.innerHTML = markdownit.render(markdown);
