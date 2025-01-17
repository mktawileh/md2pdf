import { HLJSApi } from "highlight.js";

/**
 * Highlight.js syntax definition for ANTLR4 grammar files
 * Language: ANTLR4
 * Requires: highlight.js v10.0.0 or later
 */
export default function antler(hljs: HLJSApi) {
    const ALPHA = "[A-Za-z]";
    const ALPHA_NUM = "[A-Za-z0-9_]";

    return {
        name: "ANTLR4",
        case_insensitive: false,
        keywords: {
            keyword:
                "grammar lexer parser import fragment returns locals throws catch finally mode options tokens channels",
            built_in: "skip more mode push pop type channel",
        },

        contains: [
            // Comments
            hljs.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
            hljs.C_LINE_COMMENT_MODE,

            // Strings
            {
                className: "string",
                begin: "'",
                end: "'",
                contains: [{ begin: "\\\\[\\s\\S]", relevance: 0 }],
            },

            // Rule references
            {
                className: "function",
                begin: `${ALPHA}${ALPHA_NUM}*\\s*:`,
                end: ";|=>",
                returnBegin: true,
                contains: [
                    {
                        className: "title",
                        begin: `${ALPHA}${ALPHA_NUM}*`,
                        relevance: 0,
                    },
                    {
                        className: "params",
                        begin: "\\[",
                        end: "\\]",
                        contains: [
                            hljs.APOS_STRING_MODE,
                            hljs.QUOTE_STRING_MODE,
                        ],
                    },
                ],
            },

            // Token references
            {
                className: "variable",
                begin: `\\$${ALPHA}${ALPHA_NUM}*`,
            },

            // Labels
            {
                className: "symbol",
                begin: "#",
                end: `${ALPHA}${ALPHA_NUM}*`,
            },

            // Actions
            {
                className: "code",
                begin: "{",
                end: "}",
                contains: [
                    {
                        begin: "[^{}]",
                        end: "[^{}]",
                    },
                ],
            },

            // Parser rule references
            {
                className: "title",
                begin: `[A-Z]${ALPHA_NUM}*`,
            },

            // Lexer rule definitions
            {
                className: "string",
                begin: "\\[",
                end: "\\]",
                contains: [hljs.BACKSLASH_ESCAPE],
            },

            // Operators
            {
                className: "operator",
                begin: "->|\\||\\+|\\*|\\?|\\.\\.|\\.|~|!|&|\\:|\\=|\\+=|\\-=|\\*=",
            },

            // Arguments
            {
                className: "attribute",
                begin: "\\<",
                end: "\\>",
                contains: [
                    hljs.APOS_STRING_MODE,
                    hljs.QUOTE_STRING_MODE,
                    {
                        className: "number",
                        begin: hljs.NUMBER_RE,
                    },
                ],
            },

            // Character ranges
            {
                className: "regexp",
                begin: "\\[",
                end: "\\]",
                illegal: "\\n",
                contains: [hljs.BACKSLASH_ESCAPE],
            },
        ],
    };
}
