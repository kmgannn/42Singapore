// Configuration of exercises and conceptual guides
const EXERCISE_GUIDES = {
    ft_strcpy: {
        title: "ft_strcpy (ex00)",
        pitfalls: "Copies the string pointed to by <code>src</code> (including the terminating null byte <code>'\\0'</code>) to the buffer pointed to by <code>dest</code>.",
        questions: [
            "What happens to the characters in <code>dest</code> after the null terminator?",
            "What if the <code>dest</code> buffer is smaller than <code>src</code>? (Buffer overflow risk!)",
            "Why must we copy the null terminator? What would happen if we skipped it?"
        ]
    },
    ft_strncpy: {
        title: "ft_strncpy (ex01)",
        pitfalls: "Copies at most <code>n</code> bytes. <strong>Key trap:</strong> If there is no null byte among the first <code>n</code> bytes of <code>src</code>, the string placed in <code>dest</code> will not be null-terminated! If <code>src</code> length is less than <code>n</code>, <code>dest</code> is padded with null bytes.",
        questions: [
            "Observe what happens when the source string is shorter than <code>n</code>. How does padding work?",
            "Why is <code>ft_strncpy</code> considered risky for creating safe C-strings?",
            "What is the difference between <code>src[i] = dest[i]</code> and <code>dest[i] = src[i]</code>?"
        ]
    },
    ft_str_is_alpha: {
        title: "ft_str_is_alpha (ex02)",
        pitfalls: "Returns <code>1</code> if the string contains only alphabetical characters. Otherwise returns <code>0</code>.",
        questions: [
            "Why does an empty string return <code>1</code>?",
            "How does the code instantly exit with <code>0</code> upon encountering the first invalid character?",
            "How do we represent alphabetical bounds? (e.g. <code>c >= 'a' && c <= 'z'</code>)"
        ]
    },
    ft_str_is_numeric: {
        title: "ft_str_is_numeric (ex03)",
        pitfalls: "Returns <code>1</code> if the string contains only digits. Otherwise returns <code>0</code>.",
        questions: [
            "What is the ASCII range for numeric digits? (<code>'0'</code> to <code>'9'</code>)",
            "Does a minus sign <code>'-'</code> or decimal dot <code>'.'</code> count as numeric in this function? (Hint: check the exercise instructions!)"
        ]
    },
    ft_str_is_lowercase: {
        title: "ft_str_is_lowercase (ex04)",
        pitfalls: "Returns <code>1</code> if the string contains only lowercase letters. Otherwise returns <code>0</code>.",
        questions: [
            "What is the condition to check if a single character is lowercase?"
        ]
    },
    ft_str_is_uppercase: {
        title: "ft_str_is_uppercase (ex05)",
        pitfalls: "Returns <code>1</code> if the string contains only uppercase letters. Otherwise returns <code>0</code>.",
        questions: [
            "What is the condition to check if a single character is uppercase?"
        ]
    },
    ft_str_is_printable: {
        title: "ft_str_is_printable (ex06)",
        pitfalls: "Returns <code>1</code> if the string contains only printable characters. Otherwise returns <code>0</code>.",
        questions: [
            "What are the boundary ASCII codes for printable characters? (Dec: <code>32</code> (space) to <code>126</code> (tilde))",
            "Is the null terminator <code>'\\0'</code> (ASCII 0) checked or does it signal the end of iteration?"
        ]
    },
    ft_strupcase: {
        title: "ft_strupcase (ex07)",
        pitfalls: "Converts every letter of the string to uppercase in-place.",
        questions: [
            "How is the string modified directly in memory without creating a new array?",
            "What is the arithmetic difference between <code>'a'</code> and <code>'A'</code> in ASCII? (Hint: 32)"
        ]
    },
    ft_strlowcase: {
        title: "ft_strlowcase (ex08)",
        pitfalls: "Converts every letter of the string to lowercase in-place.",
        questions: [
            "What range of characters must we verify before adding 32?"
        ]
    },
    ft_strcapitalize: {
        title: "ft_strcapitalize (ex09)",
        pitfalls: "Capitalizes the first letter of each word and converts all other letters to lowercase. <strong>A word is a sequence of alphanumeric characters.</strong>",
        questions: [
            "How can we identify if we are at the start of a word? (Hint: Look at the previous character)",
            "How does the character capitalizer handle numbers like in <code>42words</code>?",
            "What state flags do you need to keep track of as you iterate?"
        ]
    },
    ft_strlcpy: {
        title: "ft_strlcpy (ex10)",
        pitfalls: "Copies <code>src</code> to <code>dest</code> up to <code>size - 1</code> bytes, and guarantees null-termination if <code>size > 0</code>. Returns the total length of <code>src</code>.",
        questions: [
            "Why does it return the length of <code>src</code> instead of <code>dest</code>?",
            "If <code>size</code> is 5, how many characters from <code>src</code> are copied?",
            "Why is this function preferred over <code>strncpy</code> in modern secure C programming?"
        ]
    },
    ft_putstr_non_printable: {
        title: "ft_putstr_non_printable (ex11)",
        pitfalls: "Prints a string. Non-printable characters are shown as hexadecimal (lowercase, preceded by backslash, e.g., <code>\\0a</code>).",
        questions: [
            "How do you convert a decimal ASCII value into two hexadecimal characters? (High nibble & Low nibble)",
            "What standard library function are we mimicking for output? (<code>write</code>)"
        ]
    }
};

const EXERCISE_CODE = {
    ft_strcpy: [
        "char *ft_strcpy(char *dest, char *src)",
        "{",
        "    int i = 0;",
        "",
        "    while (src[i] != '\\0')",
        "    {",
        "        dest[i] = src[i];",
        "        i++;",
        "    }",
        "    dest[i] = '\\0';",
        "    return (dest);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char src[] = \"Hello\";",
        "    char dest[50];",
        "    ft_strcpy(dest, src);",
        "    return (0);",
        "}"
    ],
    ft_strncpy: [
        "char *ft_strncpy(char *dest, char *src, unsigned int n)",
        "{",
        "    unsigned int i = 0;",
        "",
        "    while (src[i] != '\\0' && i < n)",
        "    {",
        "        dest[i] = src[i];",
        "        i++;",
        "    }",
        "    while (i < n)",
        "    {",
        "        dest[i] = '\\0';",
        "        i++;",
        "    }",
        "    return (dest);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char src[] = \"Hello\";",
        "    char dest[50];",
        "    ft_strncpy(dest, src, 5);",
        "    return (0);",
        "}"
    ],
    ft_strlcpy: [
        "unsigned int ft_strlcpy(char *dest, char *src, unsigned int size)",
        "{",
        "    unsigned int i = 0;",
        "    unsigned int src_len = 0;",
        "",
        "    while (src[src_len] != '\\0')",
        "        src_len++;",
        "    if (size == 0)",
        "        return (src_len);",
        "    while (src[i] != '\\0' && i < (size - 1))",
        "    {",
        "        dest[i] = src[i];",
        "        i++;",
        "    }",
        "    dest[i] = '\\0';",
        "    return (src_len);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char src[] = \"Hello\";",
        "    char dest[50];",
        "    ft_strlcpy(dest, src, 5);",
        "    return (0);",
        "}"
    ],
    ft_str_is_alpha: [
        "int ft_str_is_alpha(char *str)",
        "{",
        "    int i = 0;",
        "",
        "    while (str[i] != '\\0')",
        "    {",
        "        if (!((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')))",
        "            return (0);",
        "        i++;",
        "    }",
        "    return (1);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"HelloWorld\";",
        "    ft_str_is_alpha(str);",
        "    return (0);",
        "}"
    ],
    ft_str_is_numeric: [
        "int ft_str_is_numeric(char *str)",
        "{",
        "    int i = 0;",
        "",
        "    while (str[i] != '\\0')",
        "    {",
        "        if (!(str[i] >= '0' && str[i] <= '9'))",
        "            return (0);",
        "        i++;",
        "    }",
        "    return (1);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"12345\";",
        "    ft_str_is_numeric(str);",
        "    return (0);",
        "}"
    ],
    ft_str_is_lowercase: [
        "int ft_str_is_lowercase(char *str)",
        "{",
        "    int i = 0;",
        "",
        "    while (str[i] != '\\0')",
        "    {",
        "        if (!(str[i] >= 'a' && str[i] <= 'z'))",
        "            return (0);",
        "        i++;",
        "    }",
        "    return (1);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"hello\";",
        "    ft_str_is_lowercase(str);",
        "    return (0);",
        "}"
    ],
    ft_str_is_uppercase: [
        "int ft_str_is_uppercase(char *str)",
        "{",
        "    int i = 0;",
        "",
        "    while (str[i] != '\\0')",
        "    {",
        "        if (!(str[i] >= 'A' && str[i] <= 'Z'))",
        "            return (0);",
        "        i++;",
        "    }",
        "    return (1);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"HELLO\";",
        "    ft_str_is_uppercase(str);",
        "    return (0);",
        "}"
    ],
    ft_str_is_printable: [
        "int ft_str_is_printable(char *str)",
        "{",
        "    int i = 0;",
        "",
        "    while (str[i] != '\\0')",
        "    {",
        "        if (!(str[i] >= 32 && str[i] <= 126))",
        "            return (0);",
        "        i++;",
        "    }",
        "    return (1);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"Hello World!\";",
        "    ft_str_is_printable(str);",
        "    return (0);",
        "}"
    ],
    ft_strupcase: [
        "char *ft_strupcase(char *str)",
        "{",
        "    int i = 0;",
        "",
        "    while (str[i] != '\\0')",
        "    {",
        "        if (str[i] >= 'a' && str[i] <= 'z')",
        "            str[i] -= 32;",
        "        i++;",
        "    }",
        "    return (str);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"hello\";",
        "    ft_strupcase(str);",
        "    return (0);",
        "}"
    ],
    ft_strlowcase: [
        "char *ft_strlowcase(char *str)",
        "{",
        "    int i = 0;",
        "",
        "    while (str[i] != '\\0')",
        "    {",
        "        if (str[i] >= 'A' && str[i] <= 'Z')",
        "            str[i] += 32;",
        "        i++;",
        "    }",
        "    return (str);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"HELLO\";",
        "    ft_strlowcase(str);",
        "    return (0);",
        "}"
    ],
    ft_strcapitalize: [
        "char *ft_strcapitalize(char *str)",
        "{",
        "    int i = 0;",
        "    int word_start = 1;",
        "",
        "    while (str[i] != '\\0')",
        "    {",
        "        if (is_alphanumeric(str[i]))",
        "        {",
        "            if (word_start)",
        "                make_upper(&str[i]);",
        "            else",
        "                make_lower(&str[i]);",
        "            word_start = 0;",
        "        }",
        "        else",
        "            word_start = 1;",
        "        i++;",
        "    }",
        "    return (str);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"salut, comment tu vas ? 42mots\";",
        "    ft_strcapitalize(str);",
        "    return (0);",
        "}"
    ],
    ft_putstr_non_printable: [
        "void ft_putstr_non_printable(char *str)",
        "{",
        "    int i = 0;",
        "",
        "    while (str[i] != '\\0')",
        "    {",
        "        if (is_printable(str[i]))",
        "            write(1, &str[i], 1);",
        "        else",
        "            print_hex(str[i]);",
        "        i++;",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"Coucou\\ntu vas bien ?\";",
        "    ft_putstr_non_printable(str);",
        "    return (0);",
        "}"
    ]
};

// State Variables for Simulation
let simulationHistory = [];
let currentStateIndex = -1;
let currentGenerator = null;
let playbackInterval = null;
let simulationSpeed = 600; // ms

// Helper: Parse string with support for escape sequences
function parseInputString(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '\\' && i + 1 < str.length) {
            const nextChar = str[i + 1];
            if (nextChar === 'n') {
                result.push({ char: '\n', display: '\\n', ascii: 10, isPrintable: false });
                i++;
            } else if (nextChar === 't') {
                result.push({ char: '\t', display: '\\t', ascii: 9, isPrintable: false });
                i++;
            } else if (nextChar === '\\') {
                result.push({ char: '\\', display: '\\', ascii: 92, isPrintable: true });
                i++;
            } else if (nextChar === '0') {
                result.push({ char: '\0', display: '\\0', ascii: 0, isPrintable: false });
                i++;
            } else if (nextChar === 'x' && i + 3 < str.length) {
                const hex = str.slice(i + 2, i + 4);
                const code = parseInt(hex, 16);
                if (!isNaN(code)) {
                    result.push({
                        char: String.fromCharCode(code),
                        display: '\\x' + hex,
                        ascii: code,
                        isPrintable: code >= 32 && code <= 126
                    });
                    i += 3;
                } else {
                    result.push({ char: '\\', display: '\\', ascii: 92, isPrintable: true });
                }
            } else {
                result.push({ char: nextChar, display: nextChar, ascii: nextChar.charCodeAt(0), isPrintable: nextChar.charCodeAt(0) >= 32 && nextChar.charCodeAt(0) <= 126 });
                i++;
            }
        } else {
            const code = str.charCodeAt(i);
            result.push({
                char: str[i],
                display: str[i],
                ascii: code,
                isPrintable: code >= 32 && code <= 126
            });
        }
    }
    // Always append an implicit null terminator for C representation
    result.push({ char: '\0', display: '\\0', ascii: 0, isPrintable: false });
    return result;
}

// Generate an uninitialized cell block
function createGarbageBuffer(size) {
    let result = [];
    for (let i = 0; i < size; i++) {
        // Mocking unitialized memory garbage
        result.push({ char: '?', display: '?', ascii: 63, isPrintable: false, isUninitialized: true });
    }
    return result;
}

// // --- JS Generators representing Step-by-Step C Code execution ---

function* simulate_ft_strcpy(srcStr, destSize) {
    const src = parseInputString(srcStr);
    let dest = createGarbageBuffer(destSize);
    let i = 0;

    yield {
        src: [...src], dest: [...dest], activeI: i, activeSrc: i, activeDest: i,
        log: "C function entry: char *ft_strcpy(char *dest, char *src). Initialized index i = 0.",
        logType: "system",
        activeLine: 3
    };

    while (true) {
        if (i >= destSize) {
            yield {
                src: [...src], dest: [...dest], activeI: i, activeSrc: null, activeDest: null,
                log: `WARNING: Index i (${i}) reached destination buffer boundary! If we write further, we cause a segmentation fault / buffer overflow!`,
                logType: "warning",
                activeLine: 5
            };
            break;
        }

        const currentChar = src[i];
        
        // Visualizing the copy action
        dest[i] = { ...currentChar, isCopied: true, isUninitialized: false };

        yield {
            src: [...src], dest: [...dest], activeI: i, activeSrc: i, activeDest: i,
            log: `Step ${i + 1}: Copying character src[${i}] ('${currentChar.char === '\0' ? '\\0' : currentChar.char}') to dest[${i}].`,
            logType: "step",
            action: { type: "write", index: i },
            activeLine: 7
        };

        if (currentChar.char === '\0') {
            yield {
                src: [...src], dest: [...dest], activeI: i, activeSrc: null, activeDest: null,
                log: "Encountered null terminator '\\0'. Copying completed successfully. Returning dest pointer.",
                logType: "success",
                activeLine: 10
            };
            break;
        }

        i++;
        yield {
            src: [...src], dest: [...dest], activeI: i, activeSrc: i, activeDest: i,
            log: `Incrementing index i to ${i}.`,
            logType: "system",
            activeLine: 8
        };
    }
}

function* simulate_ft_strncpy(srcStr, destSize, n) {
    const src = parseInputString(srcStr);
    let dest = createGarbageBuffer(destSize);
    let i = 0;
    let srcExhausted = false;

    yield {
        src: [...src], dest: [...dest], activeI: i, activeSrc: i, activeDest: i,
        log: `C function entry: ft_strncpy(dest, src, n = ${n}). Initialized index i = 0.`,
        logType: "system",
        activeLine: 3
    };

    while (i < n) {
        if (i >= destSize) {
            yield {
                src: [...src], dest: [...dest], activeI: i, activeSrc: null, activeDest: null,
                log: `CRITICAL: Index i (${i}) exceeded dest buffer size (${destSize})! Program crashes or memory is corrupted if we write.`,
                logType: "warning",
                activeLine: 5
            };
            break;
        }

        let currentChar;
        if (!srcExhausted) {
            currentChar = src[i];
            if (currentChar.char === '\0') {
                srcExhausted = true;
            }
        }

        if (!srcExhausted) {
            // Normal copy
            dest[i] = { ...currentChar, isCopied: true, isUninitialized: false };
            yield {
                src: [...src], dest: [...dest], activeI: i, activeSrc: i, activeDest: i,
                log: `i = ${i} < n (${n}): Copying src[${i}] ('${currentChar.char}') to dest[${i}].`,
                logType: "step",
                action: { type: "write", index: i },
                activeLine: 7
            };
            i++;
        } else {
            // Padding with null bytes
            dest[i] = { char: '\0', display: '\\0', ascii: 0, isPrintable: false, isCopied: true, isUninitialized: false };
            yield {
                src: [...src], dest: [...dest], activeI: i, activeSrc: null, activeDest: i,
                log: `i = ${i} < n (${n}): Source is exhausted. Padding dest[${i}] with '\\0'.`,
                logType: "warning",
                action: { type: "write", index: i },
                activeLine: 12
            };
            i++;
        }
    }

    if (i === n) {
        let logMsg = `Finished copying n = ${n} characters.`;
        // Check if destination is null-terminated
        let hasNull = false;
        for (let idx = 0; idx < Math.min(n, destSize); idx++) {
            if (dest[idx] && dest[idx].char === '\0') hasNull = true;
        }
        if (!hasNull) {
            logMsg += " WARNING: Destination is NOT null-terminated because src length >= n!";
            yield {
                src: [...src], dest: [...dest], activeI: null, activeSrc: null, activeDest: null,
                log: logMsg,
                logType: "warning",
                activeLine: 15
            };
        } else {
            yield {
                src: [...src], dest: [...dest], activeI: null, activeSrc: null, activeDest: null,
                log: logMsg + " Destination is safely null-terminated.",
                logType: "success",
                activeLine: 15
            };
        }
    }
}

function* simulate_ft_strlcpy(srcStr, destSize, size) {
    const src = parseInputString(srcStr);
    let dest = createGarbageBuffer(destSize);
    let i = 0;
    
    // Find src length
    let srcLen = 0;
    while (src[srcLen] && src[srcLen].char !== '\0') {
        srcLen++;
    }

    yield {
        src: [...src], dest: [...dest], activeI: 0, activeSrc: 0, activeDest: 0,
        log: `C function entry: ft_strlcpy(dest, src, size = ${size}). Calculated src length = ${srcLen}.`,
        logType: "system",
        activeLine: 6
    };

    if (size > 0) {
        while (i < size - 1 && src[i] && src[i].char !== '\0') {
            if (i >= destSize) {
                yield {
                    src: [...src], dest: [...dest], activeI: i, activeSrc: null, activeDest: null,
                    log: `WARNING: Write index i (${i}) exceeds dest buffer size! Buffer overflow!`,
                    logType: "warning",
                    activeLine: 10
                };
                break;
            }

            dest[i] = { ...src[i], isCopied: true, isUninitialized: false };
            yield {
                src: [...src], dest: [...dest], activeI: i, activeSrc: i, activeDest: i,
                log: `Copying src[${i}] ('${src[i].char}') to dest[${i}] (limit: size - 1 = ${size - 1}).`,
                logType: "step",
                action: { type: "write", index: i },
                activeLine: 12
            };
            i++;
        }

        // Null termination
        if (i < destSize) {
            dest[i] = { char: '\0', display: '\\0', ascii: 0, isPrintable: false, isCopied: true, isUninitialized: false };
            yield {
                src: [...src], dest: [...dest], activeI: i, activeSrc: null, activeDest: i,
                log: `Writing mandatory null-terminator at dest[${i}].`,
                logType: "success",
                action: { type: "write", index: i },
                activeLine: 15
            };
        }
    }

    yield {
        src: [...src], dest: [...dest], activeI: null, activeSrc: null, activeDest: null,
        log: `Function complete. Returning original src length: ${srcLen}.`,
        logType: "success",
        activeLine: 16
    };
}

// Verification simulations
function* simulate_str_checker(srcStr, type) {
    const src = parseInputString(srcStr);
    
    // Remove the implicit null terminator from source verification visualization bounds
    let length = src.length - 1; 

    yield {
        src: [...src], dest: [], activeI: 0, activeSrc: 0, activeDest: null,
        log: `C function entry: Checking string of length ${length}. Returning 1 if empty.`,
        logType: "system",
        activeLine: 3
    };

    if (length === 0) {
        yield {
            src: [...src], dest: [], activeI: null, activeSrc: null, activeDest: null,
            log: "String is empty. Returning 1 (true).",
            logType: "success",
            activeLine: 11
        };
        return;
    }

    let i = 0;
    let allValid = true;

    while (i < length) {
        const item = src[i];
        let isValid = false;
        
        switch (type) {
            case "alpha":
                isValid = (item.char >= 'a' && item.char <= 'z') || (item.char >= 'A' && item.char <= 'Z');
                break;
            case "numeric":
                isValid = item.char >= '0' && item.char <= '9';
                break;
            case "lowercase":
                isValid = item.char >= 'a' && item.char <= 'z';
                break;
            case "uppercase":
                isValid = item.char >= 'A' && item.char <= 'Z';
                break;
            case "printable":
                isValid = item.ascii >= 32 && item.ascii <= 126;
                break;
        }

        // Apply visual classes
        src[i] = { ...item, checkStatus: isValid ? "pass" : "fail" };

        if (!isValid) {
            allValid = false;
            yield {
                src: [...src], dest: [], activeI: i, activeSrc: i, activeDest: null,
                log: `Invalid char '${item.display}' at index ${i}. Returning 0 (false) immediately!`,
                logType: "warning",
                activeLine: 8
            };
            break;
        } else {
            yield {
                src: [...src], dest: [], activeI: i, activeSrc: i, activeDest: null,
                log: `Valid char '${item.display}' at index ${i}. Keep checking.`,
                logType: "step",
                activeLine: 9
            };
        }
        i++;
    }

    if (allValid) {
        yield {
            src: [...src], dest: [], activeI: null, activeSrc: null, activeDest: null,
            log: "All characters verified successfully. Returning 1 (true).",
            logType: "success",
            activeLine: 11
        };
    }
}

// Case Manipulation simulations (Modifying source array in place)
function* simulate_case_changer(srcStr, type) {
    let src = parseInputString(srcStr);
    let length = src.length - 1; 

    yield {
        src: [...src], dest: [], activeI: 0, activeSrc: 0, activeDest: null,
        log: `C function entry: Modifying string in-place.`,
        logType: "system",
        activeLine: 3
    };

    let i = 0;
    while (i < length) {
        const item = src[i];
        let changed = false;
        let originalChar = item.char;

        if (type === "upper" && item.char >= 'a' && item.char <= 'z') {
            const newAscii = item.ascii - 32;
            src[i] = {
                char: String.fromCharCode(newAscii),
                display: String.fromCharCode(newAscii),
                ascii: newAscii,
                isPrintable: true,
                isModified: true
            };
            changed = true;
        } else if (type === "lower" && item.char >= 'A' && item.char <= 'Z') {
            const newAscii = item.ascii + 32;
            src[i] = {
                char: String.fromCharCode(newAscii),
                display: String.fromCharCode(newAscii),
                ascii: newAscii,
                isPrintable: true,
                isModified: true
            };
            changed = true;
        }

        if (changed) {
            yield {
                src: [...src], dest: [], activeI: i, activeSrc: i, activeDest: null,
                log: `Converting '${originalChar}' to '${src[i].char}' in-place at index ${i} (ASCII: ${originalChar.charCodeAt(0)} -> ${src[i].ascii}).`,
                logType: "step",
                action: { type: "modify", index: i },
                activeLine: 8
            };
        } else {
            yield {
                src: [...src], dest: [], activeI: i, activeSrc: i, activeDest: null,
                log: `Character '${item.display}' is not a candidate for conversion. Skipping.`,
                logType: "system",
                activeLine: 9
            };
        }
        i++;
    }

    yield {
        src: [...src], dest: [], activeI: null, activeSrc: null, activeDest: null,
        log: `Modifications finished. Returning string pointer: "${src.map(x=>x.char === '\0' ? '' : x.char).join('')}"`,
        logType: "success",
        activeLine: 11
    };
}

function* simulate_ft_strcapitalize(srcStr) {
    let src = parseInputString(srcStr);
    let length = src.length - 1; 

    yield {
        src: [...src], dest: [], activeI: 0, activeSrc: 0, activeDest: null,
        log: `C function entry: ft_strcapitalize. Starting scan. State: word_start = true.`,
        logType: "system",
        activeLine: 3
    };

    let i = 0;
    let wordStart = true;

    while (i < length) {
        const item = src[i];
        const isAlphaNum = (item.char >= 'a' && item.char <= 'z') || 
                           (item.char >= 'A' && item.char <= 'Z') || 
                           (item.char >= '0' && item.char <= '9');

        let originalChar = item.char;
        let modified = false;

        if (isAlphaNum) {
            if (wordStart) {
                // Capitalize first letter of word
                if (item.char >= 'a' && item.char <= 'z') {
                    const newAscii = item.ascii - 32;
                    src[i] = {
                        char: String.fromCharCode(newAscii),
                        display: String.fromCharCode(newAscii),
                        ascii: newAscii,
                        isPrintable: true,
                        isModified: true
                    };
                    modified = true;
                }
                wordStart = false; // Now inside a word
            } else {
                // Lowercase remaining letters of word
                if (item.char >= 'A' && item.char <= 'Z') {
                    const newAscii = item.ascii + 32;
                    src[i] = {
                        char: String.fromCharCode(newAscii),
                        display: String.fromCharCode(newAscii),
                        ascii: newAscii,
                        isPrintable: true,
                        isModified: true
                    };
                    modified = true;
                }
            }
        } else {
            // Non-alphanumeric character signals the start of a new word next time
            wordStart = true;
        }

        if (modified) {
            yield {
                src: [...src], dest: [], activeI: i, activeSrc: i, activeDest: null,
                log: `Word boundary match: converting '${originalChar}' to '${src[i].char}' at index ${i}.`,
                logType: "step",
                action: { type: "modify", index: i },
                activeLine: (wordStart ? 11 : 13)
            };
        } else {
            yield {
                src: [...src], dest: [], activeI: i, activeSrc: i, activeDest: null,
                log: `Character '${item.display}' (alphanumeric: ${isAlphaNum}, wordStart: ${wordStart}). No casing change.`,
                logType: "system",
                activeLine: 8
            };
        }
        i++;
    }

    yield {
        src: [...src], dest: [], activeI: null, activeSrc: null, activeDest: null,
        log: "Capitalization sweep completed.",
        logType: "success",
        activeLine: 20
    };
}

function* simulate_ft_putstr_non_printable(srcStr) {
    const src = parseInputString(srcStr);
    let dest = []; // Here we will collect the console print output representation
    let i = 0;
    const length = src.length - 1;

    yield {
        src: [...src], dest: [...dest], activeI: 0, activeSrc: 0, activeDest: null,
        log: `C function entry: ft_putstr_non_printable. Scanning string of length ${length}.`,
        logType: "system",
        activeLine: 3
    };

    while (i < length) {
        const item = src[i];
        if (item.isPrintable) {
            dest.push({ char: item.char, display: item.char, ascii: item.ascii, isPrintable: true });
            yield {
                src: [...src], dest: [...dest], activeI: i, activeSrc: i, activeDest: null,
                log: `Character '${item.char}' is printable. Outputting to stdout.`,
                logType: "step",
                activeLine: 8
            };
        } else {
            // Escape to hexadecimal format
            const hex = item.ascii.toString(16).padStart(2, '0');
            const escapeStr = '\\' + hex;
            for (let c of escapeStr) {
                dest.push({ char: c, display: c, ascii: c.charCodeAt(0), isPrintable: true, isCopied: true });
            }
            yield {
                src: [...src], dest: [...dest], activeI: i, activeSrc: i, activeDest: null,
                log: `Character at index ${i} (ASCII ${item.ascii}) is non-printable. Outputting hex escape code: '${escapeStr}'.`,
                logType: "warning",
                activeLine: 10
            };
        }
        i++;
    }

    yield {
        src: [...src], dest: [...dest], activeI: null, activeSrc: null, activeDest: null,
        log: "Successfully processed and printed entire string.",
        logType: "success",
        activeLine: 12
    };
}

// --- Visual DOM Renderer ---



function renderCode(exercise) {
    const box = document.getElementById("code-viewer-box");
    if (!box) return;
    box.innerHTML = "";
    const lines = EXERCISE_CODE[exercise] || [];
    lines.forEach((line, idx) => {
        const lineDiv = document.createElement("div");
        lineDiv.className = "code-line";
        lineDiv.id = `code-line-${idx + 1}`;
        
        const numSpan = document.createElement("span");
        numSpan.className = "code-line-num";
        numSpan.textContent = idx + 1;
        
        const contentSpan = document.createElement("span");
        contentSpan.className = "code-line-content";
        contentSpan.textContent = line;
        
        lineDiv.appendChild(numSpan);
        lineDiv.appendChild(contentSpan);
        box.appendChild(lineDiv);
    });
}

function renderBuffer(containerId, bufferState, activeIndex, pointerName) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (bufferState.length === 0) {
        container.innerHTML = `<div class="cell-placeholder">Empty Buffer</div>`;
        return;
    }

    bufferState.forEach((item, index) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        
        // Highlight active elements
        if (index === activeIndex) {
            cell.classList.add(`active-${pointerName}`);
            
            // Inject float pointer badge
            const badge = document.createElement("div");
            badge.className = `ptr-badge ${pointerName}-ptr`;
            badge.textContent = pointerName === 'i' ? 'i' : pointerName;
            cell.appendChild(badge);
        }

        if (item.isCopied) cell.classList.add("copied");
        if (item.isModified) cell.classList.add("writing");
        if (item.checkStatus === "pass") cell.classList.add("verify-pass");
        if (item.checkStatus === "fail") cell.classList.add("verify-fail");

        const idxDiv = document.createElement("div");
        idxDiv.className = "cell-idx";
        idxDiv.textContent = index;
        
        const valDiv = document.createElement("div");
        valDiv.className = "cell-val";
        if (item.char === '\0') {
            valDiv.textContent = "\\0";
            valDiv.classList.add("is-null");
        } else {
            valDiv.textContent = item.display;
        }

        const metaDiv = document.createElement("div");
        metaDiv.className = "cell-meta";
        metaDiv.textContent = item.isUninitialized ? "?" : "0x" + item.ascii.toString(16).toUpperCase().padStart(2, '0');

        cell.appendChild(idxDiv);
        cell.appendChild(valDiv);
        cell.appendChild(metaDiv);
        container.appendChild(cell);
    });
}

function updateUI(state) {
    // Highlight code line
    document.querySelectorAll(".code-line").forEach(l => l.classList.remove("active-line-highlight"));
    if (state.activeLine) {
        const activeEl = document.getElementById(`code-line-${state.activeLine}`);
        if (activeEl) {
            activeEl.classList.add("active-line-highlight");
            activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }

    // Render source and destination buffers
    renderBuffer("src-buffer", state.src, state.activeSrc, "src");
    
    // Check if we display Destination Buffer or a custom output representation (e.g. for non-printable printing)
    const activeEx = document.getElementById("exercise-select").value;
    if (activeEx === "ft_putstr_non_printable") {
        document.getElementById("dest-wrapper").querySelector("h3").innerHTML = "Terminal Output (Stdout)";
        renderBuffer("dest-buffer", state.dest, null, "dest");
    } else if (state.dest && state.dest.length > 0) {
        document.getElementById("dest-wrapper").querySelector("h3").innerHTML = "Destination Array <code>char *dest</code>";
        renderBuffer("dest-buffer", state.dest, state.activeDest, "dest");
    } else {
        document.getElementById("dest-buffer").innerHTML = `<div class="cell-placeholder">Not Used by this function</div>`;
    }

    // Update Console logs
    const consoleBox = document.getElementById("console-logs");
    const logLine = document.createElement("div");
    logLine.className = `log-line ${state.logType}-log`;
    logLine.textContent = state.log;
    consoleBox.appendChild(logLine);
    consoleBox.scrollTop = consoleBox.scrollHeight;

    // Pulse target modifications
    if (state.action) {
        const targetGrid = state.action.type === "write" ? "dest-buffer" : "src-buffer";
        const grid = document.getElementById(targetGrid);
        if (grid.children[state.action.index]) {
            grid.children[state.action.index].classList.add("writing");
        }
    }
}

// Prepare simulation runner
function setupSimulation() {
    // Clear playback
    stopPlayback();
    
    const consoleBox = document.getElementById("console-logs");
    consoleBox.innerHTML = "";
    
    const exercise = document.getElementById("exercise-select").value;
    renderCode(exercise);
    const srcInput = document.getElementById("src-input").value;
    const destSize = parseInt(document.getElementById("dest-size-input").value) || 12;
    const nVal = parseInt(document.getElementById("n-param-input").value) || 6;

    simulationHistory = [];
    currentStateIndex = -1;

    // Select the appropriate Generator
    switch (exercise) {
        case "ft_strcpy":
            currentGenerator = simulate_ft_strcpy(srcInput, destSize);
            break;
        case "ft_strncpy":
            currentGenerator = simulate_ft_strncpy(srcInput, destSize, nVal);
            break;
        case "ft_strlcpy":
            currentGenerator = simulate_ft_strlcpy(srcInput, destSize, nVal);
            break;
        case "ft_str_is_alpha":
            currentGenerator = simulate_str_checker(srcInput, "alpha");
            break;
        case "ft_str_is_numeric":
            currentGenerator = simulate_str_checker(srcInput, "numeric");
            break;
        case "ft_str_is_lowercase":
            currentGenerator = simulate_str_checker(srcInput, "lowercase");
            break;
        case "ft_str_is_uppercase":
            currentGenerator = simulate_str_checker(srcInput, "uppercase");
            break;
        case "ft_str_is_printable":
            currentGenerator = simulate_str_checker(srcInput, "printable");
            break;
        case "ft_strupcase":
            currentGenerator = simulate_case_changer(srcInput, "upper");
            break;
        case "ft_strlowcase":
            currentGenerator = simulate_case_changer(srcInput, "lower");
            break;
        case "ft_strcapitalize":
            currentGenerator = simulate_ft_strcapitalize(srcInput);
            break;
        case "ft_putstr_non_printable":
            currentGenerator = simulate_ft_putstr_non_printable(srcInput);
            break;
    }

    // Update Guide Details
    const guide = EXERCISE_GUIDES[exercise];
    const guideContainer = document.getElementById("guide-content");
    if (guide) {
        guideContainer.innerHTML = `
            <h3>${guide.title}</h3>
            <p>${guide.pitfalls}</p>
            <h4 style="margin-top:10px; font-weight:600; color:#fff;">Mental Questions to Ask Yourself:</h4>
            <ul>
                ${guide.questions.map(q => `<li>${q}</li>`).join('')}
            </ul>
        `;
    }

    // Step first element
    stepForward();
}

function stepForward() {
    if (currentStateIndex < simulationHistory.length - 1) {
        currentStateIndex++;
        updateUI(simulationHistory[currentStateIndex]);
    } else {
        const nextState = currentGenerator.next();
        if (!nextState.done) {
            simulationHistory.push(nextState.value);
            currentStateIndex++;
            updateUI(nextState.value);
        } else {
            stopPlayback();
            // Show completion logs
            const consoleBox = document.getElementById("console-logs");
            if (consoleBox.lastChild && !consoleBox.lastChild.textContent.includes("Simulation Complete")) {
                const logLine = document.createElement("div");
                logLine.className = "log-line system-log";
                logLine.textContent = "[Simulation Complete. Click Reset to run again.]";
                consoleBox.appendChild(logLine);
                consoleBox.scrollTop = consoleBox.scrollHeight;
            }
        }
    }
}

function stepBackward() {
    if (currentStateIndex > 0) {
        currentStateIndex--;
        // Clear log box before drawing history up to current step
        const consoleBox = document.getElementById("console-logs");
        consoleBox.innerHTML = "";
        
        for (let i = 0; i <= currentStateIndex; i++) {
            const state = simulationHistory[i];
            const logLine = document.createElement("div");
            logLine.className = `log-line ${state.logType}-log`;
            logLine.textContent = state.log;
            consoleBox.appendChild(logLine);
        }
        consoleBox.scrollTop = consoleBox.scrollHeight;
        
        // Render current buffer state
        updateUI(simulationHistory[currentStateIndex]);
    }
}

function startPlayback() {
    const playBtn = document.getElementById("btn-play");
    const playIcon = document.getElementById("play-icon");
    const pauseIcon = document.getElementById("pause-icon");

    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    playBtn.querySelector("span").textContent = "Pause";

    playbackInterval = setInterval(() => {
        stepForward();
    }, simulationSpeed);
}

function stopPlayback() {
    if (playbackInterval) {
        clearInterval(playbackInterval);
        playbackInterval = null;
    }

    const playBtn = document.getElementById("btn-play");
    const playIcon = document.getElementById("play-icon");
    const pauseIcon = document.getElementById("pause-icon");

    if (playIcon) playIcon.classList.remove("hidden");
    if (pauseIcon) pauseIcon.classList.add("hidden");
    if (playBtn) playBtn.querySelector("span").textContent = "Play";
}

// Event Bindings
document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const exSelect = document.getElementById("exercise-select");
    const srcInput = document.getElementById("src-input");
    const destSizeInput = document.getElementById("dest-size-input");
    const nParamInput = document.getElementById("n-param-input");
    const speedSlider = document.getElementById("speed-slider");

    const btnReset = document.getElementById("btn-reset");
    const btnPrev = document.getElementById("btn-prev");
    const btnPlay = document.getElementById("btn-play");
    const btnNext = document.getElementById("btn-next");

    // Dynamic show/hide inputs based on function type
    function toggleInputs() {
        const ex = exSelect.value;
        const destGroup = document.getElementById("dest-size-group");
        const nGroup = document.getElementById("n-param-group");
        const nLabel = nGroup.querySelector("label");

        // Set inputs based on function
        if (ex === "ft_strcpy") {
            destGroup.style.display = "flex";
            nGroup.style.display = "none";
        } else if (ex === "ft_strncpy") {
            destGroup.style.display = "flex";
            nGroup.style.display = "flex";
            nLabel.textContent = "Limit parameter (n):";
        } else if (ex === "ft_strlcpy") {
            destGroup.style.display = "flex";
            nGroup.style.display = "flex";
            nLabel.textContent = "Dest Buffer Size (size):";
        } else if (ex === "ft_putstr_non_printable") {
            destGroup.style.display = "none";
            nGroup.style.display = "none";
        } else {
            // Checkers and In-place case modifiers
            destGroup.style.display = "none";
            nGroup.style.display = "none";
        }
    }

    // Select behavior
    exSelect.addEventListener("change", () => {
        toggleInputs();
        setupSimulation();
    });

    // Inputs resets
    srcInput.addEventListener("input", setupSimulation);
    destSizeInput.addEventListener("input", setupSimulation);
    nParamInput.addEventListener("input", setupSimulation);

    // Playback events
    btnPlay.addEventListener("click", () => {
        if (playbackInterval) {
            stopPlayback();
        } else {
            startPlayback();
        }
    });

    btnNext.addEventListener("click", () => {
        stopPlayback();
        stepForward();
    });

    btnPrev.addEventListener("click", () => {
        stopPlayback();
        stepBackward();
    });

    btnReset.addEventListener("click", setupSimulation);

    speedSlider.addEventListener("input", (e) => {
        simulationSpeed = parseInt(e.target.value);
        if (playbackInterval) {
            stopPlayback();
            startPlayback();
        }
    });

    // Initialize layout and states
    toggleInputs();
    setupSimulation();
});
