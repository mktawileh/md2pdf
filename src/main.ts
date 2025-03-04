import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import sql from "highlight.js/lib/languages/sql";
import yaml from "highlight.js/lib/languages/yaml";
import css from "highlight.js/lib/languages/css";
import dart from "highlight.js/lib/languages/dart";
import antler from "./languages/antler";

import 'highlight.js/styles/default.css';

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("css", css);
hljs.registerLanguage("dart", dart);
hljs.registerLanguage('antlr', antler);

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

const appElement = document.getElementById("app");

const content = document.querySelector(
    "#printable .content"
) as HTMLDivElement | null;

// Control Buttons.
const dirButton = document.getElementById("dir-button");
const filpButton = document.getElementById("flip-button");

if (dirButton?.addEventListener("click", handleDirButton) === null) {
    console.error(
        "Error adding an input event listener for the textarea `#editor`"
    );
}

if (filpButton?.addEventListener("click", handleFlipButton) === null) {
    console.error(
        "Error adding an input event listener for the textarea `#editor`"
    );
}


function handleDirButton() {
    updateState(state.direction == "rtl" ? "ltr" : "rtl");
}

function handleFlipButton() {
    appElement?.classList.toggle("flipped");
}

function updateState(direction: "ltr" | "rtl"): any {
    state.direction = direction;
    updateDom(state);
}

function updateDom(state: State) {
    if (content) {
        content.dir = state.direction;
    }
    if (dirButton) {
        dirButton.innerText = (state.direction == "ltr" ? "rtl" : "ltr").toUpperCase();
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
