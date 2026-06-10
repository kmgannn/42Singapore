const EXERCISE_GUIDES = {
    ft_strdup: {
        title: "ft_strdup (ex00)",
        pitfalls: "Allocates memory on the heap with <code>malloc</code>, duplicates the string <code>src</code> into it, and returns the pointer.",
        questions: [
            "What happens to heap memory if you forget to <code>free()</code> it? (Memory leak!)",
            "Why must we allocate <code>strlen(src) + 1</code> bytes? (For the null terminator!)"
        ]
    },
    ft_range: {
        title: "ft_range (ex01)",
        pitfalls: "Allocates an array of integers containing values from <code>min</code> (inclusive) to <code>max</code> (exclusive).",
        questions: [
            "If <code>min >= max</code>, what should the function do? (Return NULL pointer!)",
            "What is the byte size passed to <code>malloc</code>? (Hint: <code>(max - min) * sizeof(int)</code>)"
        ]
    },
    ft_ultimate_range: {
        title: "ft_ultimate_range (ex02)",
        pitfalls: "Allocates an integer array and places its address in the pointer passed as argument. Returns the size of the range.",
        questions: [
            "Why do we need a double pointer <code>int **range</code> here? (To modify a pointer passed from the caller!)",
            "What does the function return on error or when min >= max? (Returns 0 and sets <code>*range</code> to NULL)"
        ]
    },
    ft_strjoin: {
        title: "ft_strjoin (ex03)",
        pitfalls: "Concatenates an array of strings into a single heap-allocated string, separated by <code>sep</code>.",
        questions: [
            "How do we calculate the exact total memory size required before calling <code>malloc</code>?",
            "What should happen if <code>size</code> is 0? (Should return an empty, writeable string!)"
        ]
    },
    ft_split: {
        title: "ft_split (ex05)",
        pitfalls: "Splits a string based on a charset of delimiters. Returns a null-terminated array of strings. <strong>Double Pointer Allocation:</strong> First allocates the pointer table array, then allocates each word string.",
        questions: [
            "Look at the pointer table array in the Heap. What does each slot contain?",
            "Why does the pointer table end with a NULL pointer (<code>0x0</code>)? (So the caller knows where the array ends without an explicit size count!)"
        ]
    }
};

const EXERCISE_CODE = {
    ft_strdup: [
        "char *ft_strdup(char *src)",
        "{",
        "    char *dest;",
        "    dest = malloc(strlen(src) + 1);",
        "    if (dest == NULL) return (NULL);",
        "    strcpy(dest, src);",
        "    return (dest);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char *dup = ft_strdup(\"Hello\");",
        "    free(dup);",
        "    return (0);",
        "}"
    ],
    ft_range: [
        "int *ft_range(int min, int max)",
        "{",
        "    int *res; int size; int i = 0;",
        "    if (min >= max) return (NULL);",
        "    size = max - min;",
        "    res = malloc(size * sizeof(int));",
        "    while (i < size) {",
        "        res[i] = min + i;",
        "        i++;",
        "    }",
        "    return (res);",
        "}",
        "",
        "int main(void)",
        "{",
        "    int *arr = ft_range(5, 10);",
        "    free(arr);",
        "    return (0);",
        "}"
    ],
    ft_ultimate_range: [
        "int ft_ultimate_range(int **range, int min, int max)",
        "{",
        "    if (min >= max) {",
        "        *range = NULL;",
        "        return (0);",
        "    }",
        "    *range = malloc((max - min) * sizeof(int));",
        "    populate_range(*range, min, max);",
        "    return (max - min);",
        "}",
        "",
        "int main(void)",
        "{",
        "    int *range;",
        "    int size = ft_ultimate_range(&range, 5, 10);",
        "    free(range);",
        "    return (0);",
        "}"
    ],
    ft_strjoin: [
        "char *ft_strjoin(int size, char **strs, char *sep)",
        "{",
        "    int total_len = compute_len(strs, size, sep);",
        "    char *res = malloc(total_len + 1);",
        "    concatenate_all(res, strs, size, sep);",
        "    return (res);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char *strs[] = {\"Hello\", \"World\"};",
        "    char *res = ft_strjoin(2, strs, \" \");",
        "    free(res);",
        "    return (0);",
        "}"
    ],
    ft_split: [
        "char **ft_split(char *str, char *charset)",
        "{",
        "    int words = count_words(str, charset);",
        "    char **res = malloc((words + 1) * sizeof(char *));",
        "    populate_words(res, str, charset);",
        "    res[words] = NULL;",
        "    return (res);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"Hello, World!\";",
        "    char **res = ft_split(str, \", \");",
        "    // free omitted for brevity",
        "    return (0);",
        "}"
    ],
};

let simulationHistory = [];
let currentStateIndex = -1;
let currentGenerator = null;
let playbackInterval = null;
let simulationSpeed = 600;

function parseString(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        result.push({ char: str[i], ascii: str.charCodeAt(i) });
    }
    result.push({ char: '\0', ascii: 0 });
    return result;
}

// --- Generators ---

function* simulate_strdup(srcStr) {
    let stack = [
        { name: "src", type: "char *", val: "0x3FFF80" },
        { name: "dest", type: "char *", val: "0x000000 (NULL)" }
    ];
    let heap = [];

    yield {
        stack: [...stack], heap: [...heap],
        log: "C function entry: ft_strdup(char *src). Calculating length of src.",
        logType: "system",
        activeLine: 3
    };

    const len = srcStr.length;
    yield {
        stack: [...stack], heap: [...heap],
        log: `Source string length = ${len}. Requesting malloc(${len + 1}) bytes for buffer + null byte.`,
        logType: "step",
        activeLine: 4
    };

    const blockAddr = "0x7FFA20";
    stack[1].val = blockAddr; // dest pointer gets address

    // Create heap cells (garbage initialized)
    let cells = [];
    for (let idx = 0; idx < len + 1; idx++) {
        cells.push({ char: '?', display: '?', ascii: 63, isUninitialized: true });
    }

    heap.push({
        id: "block_dest",
        addr: blockAddr,
        type: "char[]",
        size: len + 1,
        cells: cells
    });

    yield {
        stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
        log: `malloc allocated ${len + 1} bytes on Heap at address ${blockAddr}. Pointer 'dest' updated.`,
        logType: "success",
        activeLine: 5
    };

    // Copy loop
    for (let i = 0; i <= len; i++) {
        const srcChar = (i === len) ? '\0' : srcStr[i];
        const displayChar = (i === len) ? '\\0' : srcStr[i];
        const ascii = srcChar.charCodeAt(0) || 0;

        heap[0].cells[i] = {
            char: srcChar,
            display: displayChar,
            ascii: ascii,
            isCopied: true,
            isUninitialized: false
        };

        yield {
            stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
            log: `Copying character src[${i}] ('${displayChar}') to dest[${i}].`,
            logType: "step",
            activeLine: 6
        };
    }

    yield {
        stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
        log: "Copy completed safely. Returning dest pointer.",
        logType: "success",
        activeLine: 7
    };
}

function* simulate_range(min, max) {
    let stack = [
        { name: "min", type: "int", val: min },
        { name: "max", type: "int", val: max },
        { name: "res", type: "int *", val: "0x000000 (NULL)" }
    ];
    let heap = [];

    yield {
        stack: [...stack], heap: [...heap],
        log: `C function entry: ft_range(min = ${min}, max = ${max}).`,
        logType: "system",
        activeLine: 3
    };

    if (min >= max) {
        yield {
            stack: [...stack], heap: [...heap],
            log: "min >= max. Range is empty. Returning NULL.",
            logType: "warning",
            activeLine: 4
        };
        return;
    }

    const size = max - min;
    const byteSize = size * 4; // 4 bytes per int
    yield {
        stack: [...stack], heap: [...heap],
        log: `Size calculations: max - min = ${size} elements. Allocating ${byteSize} bytes via malloc(${size} * sizeof(int)).`,
        logType: "step",
        activeLine: 5
    };

    const blockAddr = "0x7FFA80";
    stack[2].val = blockAddr;

    let cells = [];
    for (let idx = 0; idx < size; idx++) {
        cells.push({ char: '?', display: '?', ascii: 63, isUninitialized: true });
    }

    heap.push({
        id: "block_range",
        addr: blockAddr,
        type: "int[]",
        size: size,
        cells: cells
    });

    yield {
        stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
        log: `malloc allocated memory at ${blockAddr}. Initializing integer sequence...`,
        logType: "success",
        activeLine: 6
    };

    for (let i = 0; i < size; i++) {
        const val = min + i;
        heap[0].cells[i] = {
            char: val.toString(),
            display: val.toString(),
            ascii: val,
            isCopied: true,
            isUninitialized: false
        };

        yield {
            stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
            log: `Populating index ${i}: res[${i}] = ${val}.`,
            logType: "step",
            activeLine: 8
        };
    }

    yield {
        stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
        log: "Done. Returning array pointer.",
        logType: "success",
        activeLine: 11
    };
}

function* simulate_ultimate_range(min, max) {
    let stack = [
        { name: "range_ptr", type: "int **", val: "0x3FFFC0" },
        { name: "*range_ptr", type: "int *", val: "0x000000 (NULL)" }
    ];
    let heap = [];

    yield {
        stack: [...stack], heap: [...heap],
        log: `C function entry: ft_ultimate_range(int **range, min = ${min}, max = ${max}).`,
        logType: "system",
        activeLine: 3
    };

    if (min >= max) {
        yield {
            stack: [...stack], heap: [...heap],
            log: "min >= max. Returning size 0 and setting range pointer dereference to NULL.",
            logType: "warning",
            activeLine: 3
        };
        return;
    }

    const size = max - min;
    yield {
        stack: [...stack], heap: [...heap],
        log: `Allocating range of size ${size}.`,
        logType: "step",
        activeLine: 7
    };

    const blockAddr = "0x7FFA80";
    stack[1].val = blockAddr; // *range_ptr dereferenced pointer gets the address

    let cells = [];
    for (let idx = 0; idx < size; idx++) {
        cells.push({ char: '?', display: '?', ascii: 63, isUninitialized: true });
    }

    heap.push({
        id: "block_ultimate",
        addr: blockAddr,
        type: "int[]",
        size: size,
        cells: cells
    });

    yield {
        stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
        log: `malloc allocated. Modifying *range pointer to ${blockAddr}.`,
        logType: "success",
        activeLine: 7
    };

    for (let i = 0; i < size; i++) {
        const val = min + i;
        heap[0].cells[i] = {
            char: val.toString(),
            display: val.toString(),
            ascii: val,
            isCopied: true,
            isUninitialized: false
        };
        yield {
            stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
            log: `Writing element res[${i}] = ${val}.`,
            logType: "step",
            activeLine: 8
        };
    }

    yield {
        stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
        log: `Complete. Returning size: ${size}.`,
        logType: "success",
        activeLine: 9
    };
}

function* simulate_strjoin(strsInput, sepStr) {
    const rawStrs = strsInput.split(/\s+/).filter(x => x.length > 0);
    const size = rawStrs.length;

    let stack = [
        { name: "size", type: "int", val: size },
        { name: "strs", type: "char **", val: "0x3FFF90" },
        { name: "sep", type: "char *", val: "0x3FFFA0" },
        { name: "res", type: "char *", val: "0x000000" }
    ];
    let heap = [];

    yield {
        stack: [...stack], heap: [...heap],
        log: `C function entry: ft_strjoin(size = ${size}, strs, sep = "${sepStr}"). Calculating total length.`,
        logType: "system",
        activeLine: 3
    };

    if (size === 0) {
        const blockAddr = "0x7FFA10";
        stack[3].val = blockAddr;
        heap.push({
            id: "block_empty",
            addr: blockAddr,
            type: "char[]",
            size: 1,
            cells: [{ char: '\0', display: '\\0', ascii: 0 }]
        });
        yield {
            stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
            log: "size is 0. Allocating empty string containing only null-terminator. Returning pointer.",
            logType: "warning",
            activeLine: 3
        };
        return;
    }

    // Compute total len
    let totalLen = 0;
    rawStrs.forEach((s, idx) => {
        totalLen += s.length;
        if (idx < size - 1) totalLen += sepStr.length;
    });

    yield {
        stack: [...stack], heap: [...heap],
        log: `Calculated total length = ${totalLen} bytes (plus 1 for null terminator). Requesting malloc(${totalLen + 1}).`,
        logType: "step",
        activeLine: 4
    };

    const blockAddr = "0x7FFA90";
    stack[3].val = blockAddr;

    let cells = [];
    for (let idx = 0; idx < totalLen + 1; idx++) {
        cells.push({ char: '?', display: '?', ascii: 63, isUninitialized: true });
    }

    heap.push({
        id: "block_join",
        addr: blockAddr,
        type: "char[]",
        size: totalLen + 1,
        cells: cells
    });

    yield {
        stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
        log: `malloc allocated ${totalLen + 1} bytes. Copying strings and separators into buffer...`,
        logType: "success",
        activeLine: 4
    };

    let wIdx = 0;
    for (let i = 0; i < size; i++) {
        const word = rawStrs[i];
        
        // Copy word
        for (let j = 0; j < word.length; j++) {
            heap[0].cells[wIdx] = { char: word[j], display: word[j], ascii: word.charCodeAt(j), isCopied: true };
            yield {
                stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
                log: `Appending char '${word[j]}' from string index ${i}.`,
                logType: "step",
                activeLine: 5
            };
            wIdx++;
        }

        // Copy separator if not last string
        if (i < size - 1) {
            for (let j = 0; j < sepStr.length; j++) {
                heap[0].cells[wIdx] = { char: sepStr[j], display: sepStr[j] === ' ' ? 'space' : sepStr[j], ascii: sepStr.charCodeAt(j), isCopied: true };
                yield {
                    stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
                    log: `Appending separator char '${sepStr[j]}'.`,
                    logType: "step",
                    activeLine: 5
                };
                wIdx++;
            }
        }
    }

    // Terminate
    heap[0].cells[wIdx] = { char: '\0', display: '\\0', ascii: 0, isCopied: true };
    yield {
        stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
        log: "Writing final null-terminator. Joining completed successfully.",
        logType: "success",
        activeLine: 5
    };
}

function* simulate_split(str, sep) {
    let stack = [
        { name: "str", type: "char *", val: "0x3FFF80" },
        { name: "charset", type: "char *", val: "0x3FFF90" },
        { name: "res", type: "char **", val: "0x000000 (NULL)" }
    ];
    let heap = [];

    yield {
        stack: [...stack], heap: [...heap],
        log: `C function entry: ft_split(str, charset = "${sep}"). Scanning words counts.`,
        logType: "system",
        activeLine: 3
    };

    // Calculate words
    const words = str.split(sep).filter(x => x.length > 0);
    const wordCount = words.length;

    yield {
        stack: [...stack], heap: [...heap],
        log: `Found ${wordCount} split words. Allocating pointer table: malloc((${wordCount} + 1) * sizeof(char *)).`,
        logType: "step",
        activeLine: 4
    };

    const tableAddr = "0x7FFB00";
    stack[2].val = tableAddr;

    // Create pointer table block
    let tableCells = [];
    for (let idx = 0; idx < wordCount + 1; idx++) {
        tableCells.push({ char: '0x000000', display: 'NULL', ascii: 0, isUninitialized: true });
    }

    heap.push({
        id: "pointer_table",
        addr: tableAddr,
        type: "char**",
        size: wordCount + 1,
        cells: tableCells
    });

    yield {
        stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
        log: `Pointer table array allocated at ${tableAddr}. Now allocating memory for individual words.`,
        logType: "success",
        activeLine: 4
    };

    for (let i = 0; i < wordCount; i++) {
        const word = words[i];
        const wordLen = word.length;
        const wordAddr = `0x7FFC${(10 + i * 2).toString(16).toUpperCase()}`;

        yield {
            stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
            log: `Word ${i + 1} "${word}": calling malloc(${wordLen + 1}) bytes.`,
            logType: "step",
            activeLine: 5
        };

        // Allocate word block
        let wordCells = [];
        for (let j = 0; j < wordLen + 1; j++) {
            wordCells.push({ char: '?', display: '?', ascii: 63, isUninitialized: true });
        }

        heap.push({
            id: `word_block_${i}`,
            addr: wordAddr,
            type: "char[]",
            size: wordLen + 1,
            cells: wordCells
        });

        // Write address to table
        heap[0].cells[i] = { char: wordAddr, display: wordAddr, ascii: parseInt(wordAddr, 16), isCopied: true, isUninitialized: false };

        yield {
            stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
            log: `Memory block allocated at ${wordAddr}. Pointer table slot res[${i}] updated to point to it. Copying letters...`,
            logType: "success",
            activeLine: 5
        };

        // Populate word letters
        for (let j = 0; j < wordLen; j++) {
            heap[i + 1].cells[j] = { char: word[j], display: word[j], ascii: word.charCodeAt(j), isCopied: true };
            yield {
                stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
                log: `Word ${i + 1}: copying '${word[j]}' to block offset ${j}.`,
                logType: "step",
                activeLine: 5
            };
        }
        heap[i + 1].cells[wordLen] = { char: '\0', display: '\\0', ascii: 0, isCopied: true };
        
        yield {
            stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
            log: `Word ${i + 1} null-terminated.`,
            logType: "success",
            activeLine: 5
        };
    }

    // Set last pointer slot to NULL
    heap[0].cells[wordCount] = { char: '0x000000', display: 'NULL', ascii: 0, isCopied: true };
    yield {
        stack: [...stack], heap: JSON.parse(JSON.stringify(heap)),
        log: `Marking end of pointer array: setting res[${wordCount}] to NULL (0x0). Done.`,
        logType: "success",
        activeLine: 6
    };
}

// --- DOM Renderer ---



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

function renderStack(stack) {
    const list = document.getElementById("stack-variables-list");
    list.innerHTML = "";
    if (stack.length === 0) {
        list.innerHTML = `<div class="cell-placeholder">Empty Stack</div>`;
        return;
    }
    stack.forEach(v => {
        const item = document.createElement("div");
        item.className = "stack-var";
        item.innerHTML = `
            <div>
                <span class="stack-var-name">${v.name}</span>
                <span style="font-size:0.6rem; color:var(--text-muted); margin-left:6px;">(${v.type})</span>
            </div>
            <span class="stack-var-val">${v.val}</span>
        `;
        list.appendChild(item);
    });
}

function renderHeap(heap) {
    const container = document.getElementById("heap-blocks-container");
    container.innerHTML = "";
    if (heap.length === 0) {
        container.innerHTML = `<div class="cell-placeholder">Empty Heap Memory</div>`;
        return;
    }

    heap.forEach(block => {
        const div = document.createElement("div");
        div.className = "heap-block";
        
        const header = document.createElement("div");
        header.className = "heap-block-header";
        header.innerHTML = `
            <div>Block Address: <span class="heap-block-addr">${block.addr}</span></div>
            <div>Type: <code>${block.type}</code> (size: ${block.size})</div>
        `;
        div.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "buffer-grid";
        grid.style.background = "rgba(10, 15, 26, 0.2)";

        block.cells.forEach((cellObj, cIdx) => {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (cellObj.isCopied) cell.classList.add("copied");

            const idxDiv = document.createElement("div");
            idxDiv.className = "cell-idx";
            idxDiv.textContent = cIdx;
            
            const valDiv = document.createElement("div");
            valDiv.className = "cell-val";
            if (cellObj.char === '\0') {
                valDiv.textContent = "\\0";
                valDiv.classList.add("is-null");
            } else {
                valDiv.textContent = cellObj.display;
            }

            const metaDiv = document.createElement("div");
            metaDiv.className = "cell-meta";
            metaDiv.textContent = cellObj.isUninitialized ? "?" : "0x" + cellObj.ascii.toString(16).toUpperCase().padStart(2, '0');

            cell.appendChild(idxDiv);
            cell.appendChild(valDiv);
            cell.appendChild(metaDiv);
            grid.appendChild(cell);
        });

        div.appendChild(grid);
        container.appendChild(div);
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

    renderStack(state.stack);
    renderHeap(state.heap);

    const consoleBox = document.getElementById("console-logs");
    const logLine = document.createElement("div");
    logLine.className = `log-line ${state.logType}-log`;
    logLine.textContent = state.log;
    consoleBox.appendChild(logLine);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

function setupSimulation() {
    stopPlayback();
    document.getElementById("console-logs").innerHTML = "";

    const exercise = document.getElementById("exercise-select").value;
    renderCode(exercise);
    const strVal = document.getElementById("str-input").value;
    const min = parseInt(document.getElementById("min-input").value) || 0;
    const max = parseInt(document.getElementById("max-input").value) || 0;
    const splitChar = document.getElementById("split-char-input").value;
    const sep = document.getElementById("sep-input").value;

    simulationHistory = [];
    currentStateIndex = -1;

    switch (exercise) {
        case "ft_strdup":
            currentGenerator = simulate_strdup(strVal);
            break;
        case "ft_range":
            currentGenerator = simulate_range(min, max);
            break;
        case "ft_ultimate_range":
            currentGenerator = simulate_ultimate_range(min, max);
            break;
        case "ft_strjoin":
            currentGenerator = simulate_strjoin(strVal, sep);
            break;
        case "ft_split":
            currentGenerator = simulate_split(strVal, splitChar);
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
                logLine.textContent = "[Simulation Complete.]";
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
    const strInput = document.getElementById("str-input");
    const splitInput = document.getElementById("split-char-input");
    const minInput = document.getElementById("min-input");
    const maxInput = document.getElementById("max-input");
    const sepInput = document.getElementById("sep-input");
    const speedSlider = document.getElementById("speed-slider");

    function toggleInputs() {
        const ex = exSelect.value;
        document.getElementById("str-input-group").style.display = (ex === "ft_strdup" || ex === "ft_split" || ex === "ft_strjoin") ? "flex" : "none";
        document.getElementById("split-char-group").style.display = (ex === "ft_split") ? "flex" : "none";
        document.getElementById("range-min-group").style.display = (ex === "ft_range" || ex === "ft_ultimate_range") ? "flex" : "none";
        document.getElementById("range-max-group").style.display = (ex === "ft_range" || ex === "ft_ultimate_range") ? "flex" : "none";
        document.getElementById("join-sep-group").style.display = (ex === "ft_strjoin") ? "flex" : "none";
        
        if (ex === "ft_strjoin") {
            document.getElementById("str-input-group").querySelector("label").textContent = "Words Input (separate with space):";
        } else {
            document.getElementById("str-input-group").querySelector("label").textContent = "String / Array Input:";
        }
    }

    exSelect.addEventListener("change", () => { toggleInputs(); setupSimulation(); });
    strInput.addEventListener("input", setupSimulation);
    splitInput.addEventListener("input", setupSimulation);
    minInput.addEventListener("input", setupSimulation);
    maxInput.addEventListener("input", setupSimulation);
    sepInput.addEventListener("input", setupSimulation);

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
