export default function antler () {
    return {
        keywords: {
            keyword:
                "grammar | rule | options | tokens | import | fragment | returns | catch | try | mode | lexer | parser",
            built_in: "true false null",
        },
        contains: [
            {
                className: "comment",
                begin: "//",
                end: "$",
            },
            {
                className: "comment",
                begin: "/\\*",
                end: "\\*/",
            },
            {
                className: "string",
                begin: '"',
                end: '"',
            },
            {
                className: "string",
                begin: "'",
                end: "'",
            },
            {
                className: "number",
                begin: "\\b\\d+\\b",
            },
            {
                className: "symbol",
                begin: "\\b(EVENT_ATTRIBUTE|STAR_ATTRIBUTE|EQUALS|ATTRIBUTE_VALUE)\\b",
            },
            {
                className: "operator",
                begin: "=",
                end: "=",
            },
            {
                className: "meta",
                begin: "\\b(rule|grammar|options|tokens|import|fragment|returns|catch|try|mode|lexer|parser)\\b",
            },
            {
                className: "variable",
                begin: "\\b[a-zA-Z_][a-zA-Z0-9_]*\\b",
            },
        ],
    };
}
