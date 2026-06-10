const EXERCISE_GUIDES = {
    ft_strs_to_tab: {
        title: "ft_strs_to_tab (ex04)",
        pitfalls: "Takes an array of strings and their size, allocates an array of structures, populates them (storing size, original string pointer, and a duplicate copy), and returns it.",
        questions: [
            "Why do we need to malloc memory for the struct array itself AND for each duplicated string inside?",
            "What is a structure in C? (A custom grouped type where members are laid out contiguously in memory!)",
            "Why is the last element of the structure array initialized with a NULL string pointer? (Sentinel element to mark the end of the array!)"
        ]
    },
    ft_show_tab: {
        title: "ft_show_tab (ex05)",
        pitfalls: "Displays the contents of an array of structures created by <code>ft_strs_to_tab</code>.",
        questions: [
            "How does the print loop know when to terminate if there is no explicit size parameter? (Checks the sentinel element <code>res[i].str == NULL</code>!)"
        ]
    }
};

const EXERCISE_CODE = {
    ft_strs_to_tab: [
        "struct s_stock_str *ft_strs_to_tab(int ac, char **av)",
        "{",
        "    struct s_stock_str *res;",
        "    int i = 0;",
        "    res = malloc((ac + 1) * sizeof(struct s_stock_str));",
        "    if (res == NULL) return (NULL);",
        "    while (i < ac) {",
        "        res[i].size = strlen(av[i]);",
        "        res[i].str = av[i];",
        "        res[i].copy = strdup(av[i]);",
        "        i++;",
        "    }",
        "    res[ac].str = 0;",
        "    return (res);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char *av[] = {\"Hello\", \"World\"};",
        "    struct s_stock_str *tab = ft_strs_to_tab(2, av);",
        "    // free logic omitted for brevity",
        "    return (0);",
        "}"
    ],
    ft_show_tab: [
        "void ft_show_tab(struct s_stock_str *par)",
        "{",
        "    int i = 0;",
        "    while (par[i].str != 0) {",
        "        ft_putstr(par[i].str);",
        "        ft_putnbr(par[i].size);",
        "        ft_putstr(par[i].copy);",
        "        i++;",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    char *av[] = {\"Hello\", \"World\"};",
        "    struct s_stock_str *tab = ft_strs_to_tab(2, av);",
        "    ft_show_tab(tab);",
        "    return (0);",
        "}"
    ]
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

function* simulate_strs_to_tab(inputStr) {
    const rawStrs = inputStr.trim().split(/\s+/).filter(x => x.length > 0);
    const size = rawStrs.length;

    let structs = [];
    let output = [];

    yield {
        structs: [...structs], dest: [...output], activeIdx: null,
        log: `C function entry: ft_strs_to_tab(ac = ${size}, av). Allocating struct array on Heap: malloc((${size} + 1) * sizeof(t_stock_str)).`,
        logType: "system",
        activeLine: 3
    };

    // Populate structs step by step
    for (let i = 0; i < size; i++) {
        const word = rawStrs[i];
        const len = word.length;
        const copyAddr = `0x7FFD${(20 + i * 4).toString(16).toUpperCase()}`;

        let currentStruct = {
            index: i,
            size: len,
            str: word,
            strAddr: `0x3FFF${(10 + i * 2).toString(16).toUpperCase()}`,
            copy: "0x000000 (NULL)",
            copyCells: [],
            isActive: true
        };

        structs.push(currentStruct);
        yield {
            structs: JSON.parse(JSON.stringify(structs)), dest: [...output], activeIdx: i,
            log: `Struct res[${i}]: setting size = ${len}, str pointer = original address (${currentStruct.strAddr}). Calling malloc(${len + 1}) for copy.`,
            logType: "step",
            activeLine: 6
        };

        // Update copy addr
        structs[i].copy = copyAddr;
        let cCells = [];
        for (let j = 0; j <= len; j++) {
            const char = (j === len) ? '\0' : word[j];
            const display = (j === len) ? '\\0' : word[j];
            cCells.push({ char: char, display: display, ascii: char.charCodeAt(0) || 0, isCopied: true });
        }
        structs[i].copyCells = cCells;

        yield {
            structs: JSON.parse(JSON.stringify(structs)), dest: [...output], activeIdx: i,
            log: `malloc allocated duplicated string space at ${copyAddr}. Duplicating original characters.`,
            logType: "success",
            activeLine: 8
        };
    }

    // Add Sentinel Element
    let sentinel = {
        index: size,
        size: 0,
        str: "NULL (0x0)",
        strAddr: "0x000000",
        copy: "0x000000",
        copyCells: [],
        isSentinel: true,
        isActive: false
    };
    structs.push(sentinel);

    yield {
        structs: JSON.parse(JSON.stringify(structs)), dest: [...output], activeIdx: null,
        log: `Writing sentinel terminal structure at index ${size} (size = 0, str = NULL). Returning array pointer.`,
        logType: "success",
        activeLine: 11
    };
}

function* simulate_show_tab(inputStr) {
    const rawStrs = inputStr.trim().split(/\s+/).filter(x => x.length > 0);
    const size = rawStrs.length;
    let output = [];

    // Prebuild structs
    let structs = rawStrs.map((word, i) => {
        let cCells = [];
        for (let j = 0; j <= word.length; j++) {
            const char = (j === word.length) ? '\0' : word[j];
            const display = (j === word.length) ? '\\0' : word[j];
            cCells.push({ char: char, display: display, ascii: char.charCodeAt(0) || 0, isCopied: true });
        }

        return {
            index: i,
            size: word.length,
            str: word,
            strAddr: `0x3FFF${(10 + i * 2).toString(16).toUpperCase()}`,
            copy: `0x7FFD${(20 + i * 4).toString(16).toUpperCase()}`,
            copyCells: cCells,
            isActive: false
        };
    });

    // Add sentinel
    structs.push({
        index: size,
        size: 0,
        str: "NULL (0x0)",
        strAddr: "0x000000",
        copy: "0x000000",
        copyCells: [],
        isSentinel: true,
        isActive: false
    });

    yield {
        structs: JSON.parse(JSON.stringify(structs)), dest: [...output], activeIdx: null,
        log: "C function entry: ft_show_tab(struct t_stock_str *array). Iterating until array[i].str is NULL.",
        logType: "system",
        activeLine: 3
    };

    let i = 0;
    while (true) {
        structs.forEach(s => s.isActive = false);
        structs[i].isActive = true;

        if (structs[i].isSentinel) {
            yield {
                structs: JSON.parse(JSON.stringify(structs)), dest: [...output], activeIdx: i,
                log: `Index ${i}: array[${i}].str is NULL. Sentinel reached. Ending loop execution.`,
                logType: "success",
                activeLine: 4
            };
            break;
        }

        yield {
            structs: JSON.parse(JSON.stringify(structs)), dest: [...output], activeIdx: i,
            log: `Index ${i}: Printing structural values for word "${structs[i].str}".`,
            logType: "system",
            activeLine: 4
        };

        // 1. Print string
        const wStr = structs[i].str;
        for (let j = 0; j < wStr.length; j++) {
            output.push({ char: wStr[j], display: wStr[j], ascii: wStr.charCodeAt(j) });
        }
        output.push({ char: '\n', display: '\\n', ascii: 10 });
        yield {
            structs: JSON.parse(JSON.stringify(structs)), dest: [...output], activeIdx: i,
            log: `Stdout: printed string field -> "${wStr}\\n".`,
            logType: "step",
            activeLine: 5
        };

        // 2. Print size
        const sizeStr = structs[i].size.toString();
        for (let j = 0; j < sizeStr.length; j++) {
            output.push({ char: sizeStr[j], display: sizeStr[j], ascii: sizeStr.charCodeAt(j) });
        }
        output.push({ char: '\n', display: '\\n', ascii: 10 });
        yield {
            structs: JSON.parse(JSON.stringify(structs)), dest: [...output], activeIdx: i,
            log: `Stdout: printed size field -> "${sizeStr}\\n".`,
            logType: "step",
            activeLine: 6
        };

        // 3. Print copy string
        for (let j = 0; j < wStr.length; j++) {
            output.push({ char: wStr[j], display: wStr[j], ascii: wStr.charCodeAt(j) });
        }
        output.push({ char: '\n', display: '\\n', ascii: 10 });
        yield {
            structs: JSON.parse(JSON.stringify(structs)), dest: [...output], activeIdx: i,
            log: `Stdout: printed copy string field -> "${wStr}\\n".`,
            logType: "step",
            activeLine: 7
        };

        i++;
    }

    structs.forEach(s => s.isActive = false);
    yield {
        structs: JSON.parse(JSON.stringify(structs)), dest: [...output], activeIdx: null,
        log: "Show tab function completed.",
        logType: "success",
        activeLine: 10
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

function renderStructs(structs) {
    const container = document.getElementById("structs-container");
    container.innerHTML = "";
    if (structs.length === 0) {
        container.innerHTML = `<div class="cell-placeholder">Empty Structures</div>`;
        return;
    }

    structs.forEach(s => {
        const card = document.createElement("div");
        card.className = "struct-card";
        if (s.isActive) card.classList.add("active-struct");
        if (s.isSentinel) card.style.opacity = 0.5;

        // Struct Fields panel
        const fields = document.createElement("div");
        fields.className = "struct-fields";
        fields.innerHTML = `
            <div style="font-size:0.65rem; color:var(--text-muted); text-align:center; margin-bottom:4px;">res[${s.index}] (t_stock_str)</div>
            <div class="struct-field-row">
                <span class="field-name">size:</span>
                <span class="field-val">${s.size}</span>
            </div>
            <div class="struct-field-row">
                <span class="field-name">*str:</span>
                <span class="field-val">${s.isSentinel ? "NULL" : s.strAddr}</span>
            </div>
            <div class="struct-field-row">
                <span class="field-name">*copy:</span>
                <span class="field-val">${s.isSentinel ? "NULL" : s.copy}</span>
            </div>
        `;

        // Copy grid panel
        const memory = document.createElement("div");
        memory.className = "struct-memories";
        if (s.isSentinel) {
            memory.innerHTML = `<div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-muted);">Sentinel Terminal Card</div>`;
        } else {
            memory.innerHTML = `
                <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">
                    String duplicate copy on Heap (at ${s.copy}):
                </div>
            `;
            const grid = document.createElement("div");
            grid.className = "buffer-grid";
            grid.style.background = "rgba(10, 15, 26, 0.3)";
            
            s.copyCells.forEach((cellObj, idx) => {
                const cell = document.createElement("div");
                cell.className = "cell copied";

                const idxDiv = document.createElement("div");
                idxDiv.className = "cell-idx";
                idxDiv.textContent = idx;
                
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
                metaDiv.textContent = "0x" + cellObj.ascii.toString(16).toUpperCase().padStart(2, '0');

                cell.appendChild(idxDiv);
                cell.appendChild(valDiv);
                cell.appendChild(metaDiv);
                grid.appendChild(cell);
            });
            memory.appendChild(grid);
        }

        card.appendChild(fields);
        card.appendChild(memory);
        container.appendChild(card);
    });
}

function renderTerminalOutput(dest) {
    const container = document.getElementById("dest-buffer");
    container.innerHTML = "";
    if (dest.length === 0) {
        container.innerHTML = `<div class="cell-placeholder">Empty Console Output</div>`;
        return;
    }

    dest.forEach((item, index) => {
        const cell = document.createElement("div");
        cell.className = "cell copied";
        
        const idxDiv = document.createElement("div");
        idxDiv.className = "cell-idx";
        idxDiv.textContent = index;
        
        const valDiv = document.createElement("div");
        valDiv.className = "cell-val";
        valDiv.textContent = item.display;
        if (item.char === '\n') valDiv.style.color = "var(--accent-warning)";

        const metaDiv = document.createElement("div");
        metaDiv.className = "cell-meta";
        metaDiv.textContent = "0x" + item.ascii.toString(16).toUpperCase().padStart(2, '0');

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

    renderStructs(state.structs);
    renderTerminalOutput(state.dest);

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
    const val = document.getElementById("strs-input").value;

    simulationHistory = [];
    currentStateIndex = -1;

    switch (exercise) {
        case "ft_strs_to_tab":
            currentGenerator = simulate_strs_to_tab(val);
            break;
        case "ft_show_tab":
            currentGenerator = simulate_show_tab(val);
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
    const valInput = document.getElementById("strs-input");
    const speedSlider = document.getElementById("speed-slider");

    exSelect.addEventListener("change", setupSimulation);
    valInput.addEventListener("input", setupSimulation);

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

    setupSimulation();
});
