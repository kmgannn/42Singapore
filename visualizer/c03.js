const EXERCISE_GUIDES = {
    ft_strcmp: {
        title: "ft_strcmp (ex00)",
        pitfalls: "Compares two strings. It returns an integer less than, equal to, or greater than zero if <code>s1</code> is found, respectively, to be less than, to match, or be greater than <code>s2</code>.",
        questions: [
            "Why does comparison stop at the first mismatch or null terminator?",
            "What is the mathematical output when comparing <code>'a'</code> and <code>'z'</code>?",
            "How do negative return values map to string order?"
        ]
    },
    ft_strncmp: {
        title: "ft_strncmp (ex01)",
        pitfalls: "Compares at most <code>n</code> bytes of <code>s1</code> and <code>s2</code>.",
        questions: [
            "What does the function return if <code>n</code> is 0? Why?",
            "If a mismatch happens at index 5, but <code>n</code> is 3, what is returned?"
        ]
    },
    ft_strcat: {
        title: "ft_strcat (ex02)",
        pitfalls: "Appends the <code>src</code> string to the <code>dest</code> string, overwriting the terminating null byte (<code>'\\0'</code>) at the end of <code>dest</code>, and then adds a terminating null byte.",
        questions: [
            "Why do we need to search for the end of <code>dest</code> first?",
            "What happens if the <code>dest</code> array isn't large enough to hold both strings? (Memory overwrite trap!)"
        ]
    },
    ft_strncat: {
        title: "ft_strncat (ex03)",
        pitfalls: "Appends at most <code>n</code> bytes from <code>src</code>. <strong>Key design feature:</strong> It always appends a terminating null byte, meaning it may write <code>n + 1</code> bytes to the destination!",
        questions: [
            "If <code>src</code> is shorter than <code>n</code>, does it pad with nulls? (Contrast this with <code>strncpy</code>!)",
            "Why is <code>ft_strncat</code> safer than <code>ft_strcat</code>?"
        ]
    },
    ft_strstr: {
        title: "ft_strstr (ex04)",
        pitfalls: "Finds the first occurrence of the substring <code>needle</code> in the string <code>haystack</code>. The terminating null bytes are not compared.",
        questions: [
            "What should the function return if <code>needle</code> is an empty string? (Hint: return <code>haystack</code>!)",
            "Observe the slide-and-backtrack behavior when a partial match fails."
        ]
    },
    ft_strlcat: {
        title: "ft_strlcat (ex05)",
        pitfalls: "Appends string <code>src</code> to the end of <code>dest</code>. It will append at most <code>size - strlen(dest) - 1</code> characters. It will then null-terminate, unless <code>size</code> is less than or equal to the initial <code>dest</code> length.",
        questions: [
            "What is the total return value of this function? (Hint: <code>initial_dest_len + src_len</code>)",
            "How does <code>strlcat</code> prevent buffer overflows while letting the caller know if truncation occurred?"
        ]
    }
};

const EXERCISE_CODE = {
    ft_strcmp: [
        "int ft_strcmp(char *s1, char *s2)",
        "{",
        "    int i = 0;",
        "",
        "    while (s1[i] != '\\0' && s1[i] == s2[i])",
        "        i++;",
        "    return ((unsigned char)s1[i] - (unsigned char)s2[i]);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char s1[] = \"Hello\";",
        "    char s2[] = \"World\";",
        "    ft_strcmp(s1, s2);",
        "    return (0);",
        "}"
    ],
    ft_strncmp: [
        "int ft_strncmp(char *s1, char *s2, unsigned int n)",
        "{",
        "    unsigned int i = 0;",
        "",
        "    if (n == 0)",
        "        return (0);",
        "    while (s1[i] != '\\0' && s1[i] == s2[i] && i < n - 1)",
        "        i++;",
        "    return ((unsigned char)s1[i] - (unsigned char)s2[i]);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char s1[] = \"Hello\";",
        "    char s2[] = \"World\";",
        "    ft_strncmp(s1, s2, 3);",
        "    return (0);",
        "}"
    ],
    ft_strstr: [
        "char *ft_strstr(char *haystack, char *needle)",
        "{",
        "    int i = 0; int j;",
        "",
        "    if (needle[0] == '\\0')",
        "        return (haystack);",
        "    while (haystack[i] != '\\0')",
        "    {",
        "        j = 0;",
        "        while (haystack[i + j] == needle[j])",
        "        {",
        "            if (needle[j + 1] == '\\0')",
        "                return (&haystack[i]);",
        "            j++;",
        "        }",
        "        i++;",
        "    }",
        "    return (0);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char haystack[] = \"Hello World\";",
        "    char needle[] = \"World\";",
        "    ft_strstr(haystack, needle);",
        "    return (0);",
        "}"
    ],
    ft_strcat: [
        "char *ft_strcat(char *dest, char *src)",
        "{",
        "    int i = 0; int j = 0;",
        "",
        "    while (dest[i] != '\\0')",
        "        i++;",
        "    while (src[j] != '\\0')",
        "    {",
        "        dest[i + j] = src[j];",
        "        j++;",
        "    }",
        "    dest[i + j] = '\\0';",
        "    return (dest);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char dest[50] = \"Hello \";",
        "    char src[] = \"World\";",
        "    ft_strcat(dest, src);",
        "    return (0);",
        "}"
    ],
    ft_strncat: [
        "char *ft_strncat(char *dest, char *src, unsigned int nb)",
        "{",
        "    unsigned int i = 0; unsigned int j = 0;",
        "",
        "    while (dest[i] != '\\0')",
        "        i++;",
        "    while (src[j] != '\\0' && j < nb)",
        "    {",
        "        dest[i + j] = src[j];",
        "        j++;",
        "    }",
        "    dest[i + j] = '\\0';",
        "    return (dest);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char dest[50] = \"Hello \";",
        "    char src[] = \"World\";",
        "    ft_strncat(dest, src, 3);",
        "    return (0);",
        "}"
    ],
    ft_strlcat: [
        "unsigned int ft_strlcat(char *dest, char *src, unsigned int size)",
        "{",
        "    unsigned int dest_len = strlen(dest);",
        "    unsigned int src_len = strlen(src);",
        "    unsigned int i = 0;",
        "",
        "    if (size <= dest_len)",
        "        return (size + src_len);",
        "    while (src[i] != '\\0' && i < (size - dest_len - 1))",
        "    {",
        "        dest[dest_len + i] = src[i];",
        "        i++;",
        "    }",
        "    dest[dest_len + i] = '\\0';",
        "    return (dest_len + src_len);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char dest[50] = \"Hello \";",
        "    char src[] = \"World\";",
        "    ft_strlcat(dest, src, 10);",
        "    return (0);",
        "}"
    ]
};

let simulationHistory = [];
let currentStateIndex = -1;
let currentGenerator = null;
let playbackInterval = null;
let simulationSpeed = 600;

function parseInputString(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        result.push({
            char: str[i],
            display: str[i],
            ascii: code,
            isPrintable: code >= 32 && code <= 126
        });
    }
    result.push({ char: '\0', display: '\\0', ascii: 0, isPrintable: false });
    return result;
}

function createGarbageBuffer(size) {
    let result = [];
    for (let i = 0; i < size; i++) {
        result.push({ char: '?', display: '?', ascii: 63, isPrintable: false, isUninitialized: true });
    }
    return result;
}

function initConcatBuffer(destStr, maxBufferSize) {
    const chars = parseInputString(destStr);
    let result = [];
    // Copy active characters (excluding null terminator first, which is handled dynamically)
    const contentLen = chars.length - 1; 
    for (let i = 0; i < maxBufferSize; i++) {
        if (i < contentLen) {
            result.push({ ...chars[i], isUninitialized: false });
        } else if (i === contentLen) {
            result.push({ char: '\0', display: '\\0', ascii: 0, isPrintable: false, isUninitialized: false });
        } else {
            result.push({ char: '?', display: '?', ascii: 63, isPrintable: false, isUninitialized: true });
        }
    }
    return result;
}

// --- Simulations ---

function* simulate_strcmp(s1Str, s2Str) {
    const s1 = parseInputString(s1Str);
    const s2 = parseInputString(s2Str);
    let i = 0;

    yield {
        src: [...s1], dest: [...s2], activeI: i, activeSrc: i, activeDest: i,
        log: "C function entry: ft_strcmp(s1, s2). Comparing character by character.",
        logType: "system",
        activeLine: 3
    };

    while (true) {
        const c1 = s1[i];
        const c2 = s2[i];
        
        s1[i] = { ...c1, checkStatus: "pass" };
        s2[i] = { ...c2, checkStatus: "pass" };

        if (c1.char !== c2.char) {
            s1[i].checkStatus = "fail";
            s2[i].checkStatus = "fail";
            const diff = c1.ascii - c2.ascii;
            yield {
                src: [...s1], dest: [...s2], activeI: i, activeSrc: i, activeDest: i,
                log: `Mismatch found at index ${i}: '${c1.display}' != '${c2.display}'. Comparing ASCII difference: ${c1.ascii} - ${c2.ascii} = ${diff}.`,
                logType: "warning",
                activeLine: 7
            };
            yield {
                src: [...s1], dest: [...s2], activeI: null, activeSrc: null, activeDest: null,
                log: `Returning difference: ${diff}.`,
                logType: "success",
                activeLine: 7
            };
            break;
        }

        if (c1.char === '\0') {
            yield {
                src: [...s1], dest: [...s2], activeI: i, activeSrc: i, activeDest: i,
                log: `Reached null terminator of both strings at index ${i}. Strings match perfectly.`,
                logType: "success",
                activeLine: 5
            };
            yield {
                src: [...s1], dest: [...s2], activeI: null, activeSrc: null, activeDest: null,
                log: `Returning: 0.`,
                logType: "success",
                activeLine: 7
            };
            break;
        }

        yield {
            src: [...s1], dest: [...s2], activeI: i, activeSrc: i, activeDest: i,
            log: `Characters match at index ${i} ('${c1.char}'). Advancing...`,
            logType: "step",
            activeLine: 5
        };

        i++;
    }
}

function* simulate_strncmp(s1Str, s2Str, n) {
    const s1 = parseInputString(s1Str);
    const s2 = parseInputString(s2Str);
    let i = 0;

    yield {
        src: [...s1], dest: [...s2], activeI: i, activeSrc: i, activeDest: i,
        log: `C function entry: ft_strncmp(s1, s2, n = ${n}).`,
        logType: "system",
        activeLine: 3
    };

    if (n === 0) {
        yield {
            src: [...s1], dest: [...s2], activeI: null, activeSrc: null, activeDest: null,
            log: "n is 0. No characters compared. Returning 0.",
            logType: "success",
            activeLine: 6
        };
        return;
    }

    while (i < n) {
        const c1 = s1[i];
        const c2 = s2[i];

        s1[i] = { ...c1, checkStatus: "pass" };
        s2[i] = { ...c2, checkStatus: "pass" };

        if (c1.char !== c2.char) {
            s1[i].checkStatus = "fail";
            s2[i].checkStatus = "fail";
            const diff = c1.ascii - c2.ascii;
            yield {
                src: [...s1], dest: [...s2], activeI: i, activeSrc: i, activeDest: i,
                log: `Mismatch found at index ${i}: '${c1.display}' != '${c2.display}'.`,
                logType: "warning",
                activeLine: 9
            };
            yield {
                src: [...s1], dest: [...s2], activeI: null, activeSrc: null, activeDest: null,
                log: `Returning difference: ${diff}.`,
                logType: "success",
                activeLine: 9
            };
            break;
        }

        if (c1.char === '\0') {
            yield {
                src: [...s1], dest: [...s2], activeI: i, activeSrc: i, activeDest: i,
                log: "Reached null terminator. Strings match.",
                logType: "success",
                activeLine: 7
            };
            yield {
                src: [...s1], dest: [...s2], activeI: null, activeSrc: null, activeDest: null,
                log: "Returning: 0.",
                logType: "success",
                activeLine: 9
            };
            break;
        }

        if (i === n - 1) {
            yield {
                src: [...s1], dest: [...s2], activeI: i, activeSrc: i, activeDest: i,
                log: `Match verified up to limit index ${i} (n = ${n}).`,
                logType: "success",
                activeLine: 7
            };
            yield {
                src: [...s1], dest: [...s2], activeI: null, activeSrc: null, activeDest: null,
                log: "Returning: 0.",
                logType: "success",
                activeLine: 9
            };
            break;
        }

        yield {
            src: [...s1], dest: [...s2], activeI: i, activeSrc: i, activeDest: i,
            log: `Characters match at index ${i} ('${c1.char}').`,
            logType: "step",
            activeLine: 7
        };
        i++;
    }
}

function* simulate_strstr(haystackStr, needleStr) {
    const haystack = parseInputString(haystackStr);
    const needle = parseInputString(needleStr);
    const needleLen = needle.length - 1;

    yield {
        src: [...haystack], dest: [...needle], activeI: 0, activeSrc: 0, activeDest: 0,
        log: `C function entry: ft_strstr(haystack, needle). Searching for substring.`,
        logType: "system",
        activeLine: 3
    };

    if (needleLen === 0) {
        yield {
            src: [...haystack], dest: [...needle], activeI: null, activeSrc: null, activeDest: null,
            log: "Needle is empty. Returning address of haystack (match at index 0).",
            logType: "success",
            activeLine: 6
        };
        return;
    }

    let hIdx = 0;
    let found = false;

    while (haystack[hIdx].char !== '\0') {
        let nIdx = 0;
        let match = true;

        yield {
            src: [...haystack], dest: [...needle], activeI: hIdx, activeSrc: hIdx, activeDest: 0,
            log: `Aligning search starting at haystack[${hIdx}] ('${haystack[hIdx].char}').`,
            logType: "step",
            activeLine: 7
        };

        // Reset check status indicators for clarity
        for(let z=0; z<haystack.length; z++) haystack[z].checkStatus = null;
        for(let z=0; z<needle.length; z++) needle[z].checkStatus = null;

        while (nIdx < needleLen) {
            const hChar = haystack[hIdx + nIdx];
            const nChar = needle[nIdx];

            if (!hChar || hChar.char === '\0' || hChar.char !== nChar.char) {
                match = false;
                if (hChar) hChar.checkStatus = "fail";
                nChar.checkStatus = "fail";
                yield {
                    src: [...haystack], dest: [...needle], activeI: hIdx + nIdx, activeSrc: hIdx + nIdx, activeDest: nIdx,
                    log: `Mismatch at alignment index ${nIdx}: '${hChar ? hChar.display : 'NULL'}' != '${nChar.display}'.`,
                    logType: "warning",
                    activeLine: 16
                };
                break;
            }

            hChar.checkStatus = "pass";
            nChar.checkStatus = "pass";
            yield {
                src: [...haystack], dest: [...needle], activeI: hIdx + nIdx, activeSrc: hIdx + nIdx, activeDest: nIdx,
                log: `Match at alignment index ${nIdx}: '${hChar.display}' == '${nChar.display}'.`,
                logType: "step",
                activeLine: 10
            };
            nIdx++;
        }

        if (match) {
            found = true;
            yield {
                src: [...haystack], dest: [...needle], activeI: hIdx, activeSrc: hIdx, activeDest: null,
                log: `Match found! Substring starts at haystack index ${hIdx}. Returning pointer to haystack + ${hIdx}.`,
                logType: "success",
                activeLine: 13
            };
            break;
        }

        hIdx++;
    }

    if (!found) {
        yield {
            src: [...haystack], dest: [...needle], activeI: null, activeSrc: null, activeDest: null,
            log: "Needle not found in haystack. Returning NULL.",
            logType: "warning",
            activeLine: 18
        };
    }
}

function* simulate_strcat(destStr, srcStr, maxBufferSize) {
    let dest = initConcatBuffer(destStr, maxBufferSize);
    const src = parseInputString(srcStr);
    
    yield {
        src: [...dest], dest: [...src], activeI: 0, activeSrc: 0, activeDest: 0,
        log: "C function entry: ft_strcat(dest, src). Phase 1: Traversing dest to find the terminating null byte.",
        logType: "system",
        activeLine: 3
    };

    let destLen = 0;
    while (dest[destLen] && dest[destLen].char !== '\0') {
        yield {
            src: [...dest], dest: [...src], activeI: destLen, activeSrc: destLen, activeDest: null,
            log: `Searching dest: index ${destLen} is '${dest[destLen].char}'. Advancing...`,
            logType: "step",
            activeLine: 5
        };
        destLen++;
    }

    if (destLen >= maxBufferSize) {
        yield {
            src: [...dest], dest: [...src], activeI: destLen, activeSrc: null, activeDest: null,
            log: "CRITICAL: No null terminator found within buffer bounds! Buffer corrupted.",
            logType: "warning",
            activeLine: 5
        };
        return;
    }

    yield {
        src: [...dest], dest: [...src], activeI: destLen, activeSrc: destLen, activeDest: 0,
        log: `Found null terminator at dest[${destLen}]. Phase 2: Copying characters from src.`,
        logType: "success",
        activeLine: 7
    };

    let i = 0;
    while (true) {
        const writeIdx = destLen + i;
        if (writeIdx >= maxBufferSize) {
            yield {
                src: [...dest], dest: [...src], activeI: writeIdx, activeSrc: null, activeDest: null,
                log: "CRITICAL: Writing past destination buffer boundaries! Segmentation Fault / Buffer Overflow!",
                logType: "warning",
                activeLine: 9
            };
            break;
        }

        const c = src[i];
        dest[writeIdx] = { ...c, isCopied: true, isUninitialized: false };

        yield {
            src: [...dest], dest: [...src], activeI: writeIdx, activeSrc: writeIdx, activeDest: i,
            log: `Copying src[${i}] ('${c.char === '\0' ? '\\0' : c.char}') to dest[${writeIdx}].`,
            logType: "step",
            action: { type: "write", index: writeIdx },
            activeLine: 9
        };

        if (c.char === '\0') {
            yield {
                src: [...dest], dest: [...src], activeI: null, activeSrc: null, activeDest: null,
                log: "Concatenation complete. Returning dest pointer.",
                logType: "success",
                activeLine: 13
            };
            break;
        }
        i++;
    }
}

function* simulate_strncat(destStr, srcStr, maxBufferSize, n) {
    let dest = initConcatBuffer(destStr, maxBufferSize);
    const src = parseInputString(srcStr);

    yield {
        src: [...dest], dest: [...src], activeI: 0, activeSrc: 0, activeDest: 0,
        log: `C function entry: ft_strncat(dest, src, n = ${n}). Phase 1: Locating dest null byte.`,
        logType: "system",
        activeLine: 3
    };

    let destLen = 0;
    while (dest[destLen] && dest[destLen].char !== '\0') {
        destLen++;
    }

    yield {
        src: [...dest], dest: [...src], activeI: destLen, activeSrc: destLen, activeDest: 0,
        log: `Null terminator found at dest[${destLen}]. Phase 2: Appending up to n = ${n} characters.`,
        logType: "success",
        activeLine: 7
    };

    let i = 0;
    while (i < n && src[i] && src[i].char !== '\0') {
        const writeIdx = destLen + i;
        if (writeIdx >= maxBufferSize) {
            yield {
                src: [...dest], dest: [...src], activeI: writeIdx, activeSrc: null, activeDest: null,
                log: "Buffer Overflow risk!",
                logType: "warning",
                activeLine: 9
            };
            break;
        }

        dest[writeIdx] = { ...src[i], isCopied: true, isUninitialized: false };
        yield {
            src: [...dest], dest: [...src], activeI: writeIdx, activeSrc: writeIdx, activeDest: i,
            log: `Appending src[${i}] ('${src[i].char}') to dest[${writeIdx}] (i = ${i} < n = ${n}).`,
            logType: "step",
            action: { type: "write", index: writeIdx },
            activeLine: 9
        };
        i++;
    }

    // Mandatory termination
    const endIdx = destLen + i;
    if (endIdx < maxBufferSize) {
        dest[endIdx] = { char: '\0', display: '\\0', ascii: 0, isPrintable: false, isCopied: true, isUninitialized: false };
        yield {
            src: [...dest], dest: [...src], activeI: endIdx, activeSrc: endIdx, activeDest: null,
            log: `Writing mandatory null terminator at dest[${endIdx}].`,
            logType: "success",
            action: { type: "write", index: endIdx },
            activeLine: 12
        };
    }

    yield {
        src: [...dest], dest: [...src], activeI: null, activeSrc: null, activeDest: null,
        log: "Done. Returning dest pointer.",
        logType: "success",
        activeLine: 13
    };
}

function* simulate_strlcat(destStr, srcStr, maxBufferSize, size) {
    let dest = initConcatBuffer(destStr, maxBufferSize);
    const src = parseInputString(srcStr);

    let initialDestLen = 0;
    while (dest[initialDestLen] && dest[initialDestLen].char !== '\0' && initialDestLen < maxBufferSize) {
        initialDestLen++;
    }

    let srcLen = 0;
    while (src[srcLen] && src[srcLen].char !== '\0') {
        srcLen++;
    }

    yield {
        src: [...dest], dest: [...src], activeI: 0, activeSrc: 0, activeDest: 0,
        log: `C function entry: ft_strlcat(dest, src, size = ${size}). Calculated initial dest len = ${initialDestLen}, src len = ${srcLen}.`,
        logType: "system",
        activeLine: 3
    };

    if (size <= initialDestLen) {
        yield {
            src: [...dest], dest: [...src], activeI: null, activeSrc: null, activeDest: null,
            log: `size (${size}) <= dest length (${initialDestLen}). No copying occurs. Returning size + srcLen: ${size + srcLen}.`,
            logType: "warning",
            activeLine: 8
        };
        return;
    }

    let i = 0;
    // Copy up to size - initialDestLen - 1
    const limit = size - initialDestLen - 1;

    while (src[i] && src[i].char !== '\0' && i < limit) {
        const writeIdx = initialDestLen + i;
        if (writeIdx >= maxBufferSize) {
            break;
        }

        dest[writeIdx] = { ...src[i], isCopied: true, isUninitialized: false };
        yield {
            src: [...dest], dest: [...src], activeI: writeIdx, activeSrc: writeIdx, activeDest: i,
            log: `Appending src[${i}] ('${src[i].char}') to dest[${writeIdx}] (copied ${i + 1} of max ${limit}).`,
            logType: "step",
            action: { type: "write", index: writeIdx },
            activeLine: 11
        };
        i++;
    }

    const endIdx = initialDestLen + i;
    if (endIdx < maxBufferSize) {
        dest[endIdx] = { char: '\0', display: '\\0', ascii: 0, isPrintable: false, isCopied: true, isUninitialized: false };
        yield {
            src: [...dest], dest: [...src], activeI: endIdx, activeSrc: endIdx, activeDest: null,
            log: `Writing null terminator at dest[${endIdx}].`,
            logType: "success",
            action: { type: "write", index: endIdx },
            activeLine: 14
        };
    }

    yield {
        src: [...dest], dest: [...src], activeI: null, activeSrc: null, activeDest: null,
        log: `Finished. Returning total length of string tried to create: initial dest length + src length = ${initialDestLen + srcLen}.`,
        logType: "success",
        activeLine: 15
    };
}

// --- Renderer & Setup ---



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
        
        if (index === activeIndex) {
            cell.classList.add(`active-${pointerName}`);
            const badge = document.createElement("div");
            badge.className = `ptr-badge ${pointerName}-ptr`;
            badge.textContent = pointerName === 'src' ? 's1/dest' : 's2/src';
            cell.appendChild(badge);
        }

        if (item.isCopied) cell.classList.add("copied");
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

    renderBuffer("src-buffer", state.src, state.activeSrc, "src");
    renderBuffer("dest-buffer", state.dest, state.activeDest, "dest");

    const consoleBox = document.getElementById("console-logs");
    const logLine = document.createElement("div");
    logLine.className = `log-line ${state.logType}-log`;
    logLine.textContent = state.log;
    consoleBox.appendChild(logLine);
    consoleBox.scrollTop = consoleBox.scrollHeight;

    if (state.action) {
        const grid = document.getElementById("src-buffer");
        if (grid.children[state.action.index]) {
            grid.children[state.action.index].classList.add("writing");
        }
    }
}

function setupSimulation() {
    stopPlayback();
    document.getElementById("console-logs").innerHTML = "";

    const exercise = document.getElementById("exercise-select").value;
    renderCode(exercise);
    const s1 = document.getElementById("s1-input").value;
    const s2 = document.getElementById("s2-input").value;
    const maxBufferSize = parseInt(document.getElementById("dest-size-input").value) || 16;
    const n = parseInt(document.getElementById("n-param-input").value) || 4;

    simulationHistory = [];
    currentStateIndex = -1;

    switch (exercise) {
        case "ft_strcmp":
            currentGenerator = simulate_strcmp(s1, s2);
            break;
        case "ft_strncmp":
            currentGenerator = simulate_strncmp(s1, s2, n);
            break;
        case "ft_strstr":
            currentGenerator = simulate_strstr(s1, s2);
            break;
        case "ft_strcat":
            currentGenerator = simulate_strcat(s1, s2, maxBufferSize);
            break;
        case "ft_strncat":
            currentGenerator = simulate_strncat(s1, s2, maxBufferSize, n);
            break;
        case "ft_strlcat":
            currentGenerator = simulate_strlcat(s1, s2, maxBufferSize, n);
            break;
    }

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
        updateUI(simulationHistory[currentStateIndex]);
    }
}

function startPlayback() {
    document.getElementById("play-icon").classList.add("hidden");
    document.getElementById("pause-icon").classList.remove("hidden");
    document.getElementById("btn-play").querySelector("span").textContent = "Pause";
    playbackInterval = setInterval(stepForward, simulationSpeed);
}

function stopPlayback() {
    if (playbackInterval) {
        clearInterval(playbackInterval);
        playbackInterval = null;
    }
    document.getElementById("play-icon").classList.remove("hidden");
    document.getElementById("pause-icon").classList.add("hidden");
    document.getElementById("btn-play").querySelector("span").textContent = "Play";
}

document.addEventListener("DOMContentLoaded", () => {
    const exSelect = document.getElementById("exercise-select");
    const s1Input = document.getElementById("s1-input");
    const s2Input = document.getElementById("s2-input");
    const destSizeInput = document.getElementById("dest-size-input");
    const nParamInput = document.getElementById("n-param-input");
    const speedSlider = document.getElementById("speed-slider");

    function toggleInputs() {
        const ex = exSelect.value;
        const destGroup = document.getElementById("dest-size-group");
        const nGroup = document.getElementById("n-param-group");
        const nLabel = nGroup.querySelector("label");
        
        document.getElementById("lbl-s1").textContent = (ex === "ft_strcat" || ex === "ft_strncat" || ex === "ft_strlcat") ? "Dest String (dest):" : "String 1 (s1 / haystack):";
        document.getElementById("lbl-s2").textContent = (ex === "ft_strcat" || ex === "ft_strncat" || ex === "ft_strlcat") ? "Src String (src):" : "String 2 (s2 / needle):";
        document.getElementById("h-s1-title").innerHTML = (ex === "ft_strcat" || ex === "ft_strncat" || ex === "ft_strlcat") ? "Destination Array <code>char *dest</code>" : "String 1 <code>char *s1</code> / <code>haystack</code>";
        document.getElementById("h-s2-title").innerHTML = (ex === "ft_strcat" || ex === "ft_strncat" || ex === "ft_strlcat") ? "Source Array <code>char *src</code>" : "String 2 <code>char *s2</code> / <code>needle</code>";

        if (ex === "ft_strcmp" || ex === "ft_strstr") {
            destGroup.style.display = "none";
            nGroup.style.display = "none";
        } else if (ex === "ft_strncmp") {
            destGroup.style.display = "none";
            nGroup.style.display = "flex";
            nLabel.textContent = "Compare Limit (n):";
        } else if (ex === "ft_strcat") {
            destGroup.style.display = "flex";
            nGroup.style.display = "none";
        } else if (ex === "ft_strncat") {
            destGroup.style.display = "flex";
            nGroup.style.display = "flex";
            nLabel.textContent = "Append Limit (n):";
        } else if (ex === "ft_strlcat") {
            destGroup.style.display = "flex";
            nGroup.style.display = "flex";
            nLabel.textContent = "Max size boundary (size):";
        }
    }

    exSelect.addEventListener("change", () => { toggleInputs(); setupSimulation(); });
    s1Input.addEventListener("input", setupSimulation);
    s2Input.addEventListener("input", setupSimulation);
    destSizeInput.addEventListener("input", setupSimulation);
    nParamInput.addEventListener("input", setupSimulation);

    document.getElementById("btn-play").addEventListener("click", () => {
        if (playbackInterval) stopPlayback(); else startPlayback();
    });
    document.getElementById("btn-next").addEventListener("click", () => { stopPlayback(); stepForward(); });
    document.getElementById("btn-prev").addEventListener("click", () => { stopPlayback(); stepBackward(); });
    document.getElementById("btn-reset").addEventListener("click", setupSimulation);
    speedSlider.addEventListener("input", (e) => {
        simulationSpeed = parseInt(e.target.value);
        if (playbackInterval) { stopPlayback(); startPlayback(); }
    });

    toggleInputs();
    setupSimulation();
});
