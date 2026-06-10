const EXERCISE_GUIDES = {
    ft_print_program_name: {
        title: "ft_print_program_name (ex00)",
        pitfalls: "Prints the program name. The program name is always stored in <code>argv[0]</code>.",
        questions: [
            "What happens to <code>argv[0]</code> if you rename the binary compiled output?",
            "Is <code>argc</code> guaranteed to be at least 1?"
        ]
    },
    ft_print_params: {
        title: "ft_print_params (ex01)",
        pitfalls: "Prints all arguments received on the command line in order, except the program name.",
        questions: [
            "Why do we start iterating at index 1 instead of 0?",
            "What if no arguments are passed? (Loop bounds: <code>i < argc</code> ensures nothing is printed!)"
        ]
    },
    ft_rev_params: {
        title: "ft_rev_params (ex02)",
        pitfalls: "Prints all arguments received in reverse order.",
        questions: [
            "What index does the last argument reside in? (Hint: <code>argc - 1</code>)",
            "What is the lower bound of our reverse loop? (Should be <code>1</code>, since we skip the program name)"
        ]
    },
    ft_sort_params: {
        title: "ft_sort_params (ex03)",
        pitfalls: "Sorts command-line arguments in ASCII order and prints them. <strong>Key pointer logic:</strong> It's faster and cleaner to swap the pointer addresses in the <code>argv</code> array rather than copy/swap characters inside strings in memory!",
        questions: [
            "How does bubble sort behave when checking array elements?",
            "Look at the visual swap step. Do the string buffers move, or just the pointers in the <code>argv</code> column?"
        ]
    }
};

const EXERCISE_CODE = {
    ft_print_program_name: [
        "int main(int argc, char **argv)",
        "{",
        "    int i = 0;",
        "    while (argv[0][i] != '\\0') {",
        "        write(1, &argv[0][i], 1);",
        "        i++;",
        "    }",
        "    write(1, "\\n", 1);",
        "    return (0);",
        "}"
    ],
    ft_print_params: [
        "int main(int argc, char **argv)",
        "{",
        "    int i = 1; int j;",
        "    while (i < argc) {",
        "        j = 0;",
        "        while (argv[i][j] != '\\0') {",
        "            write(1, &argv[i][j], 1);",
        "            j++;",
        "        }",
        "        write(1, "\\n", 1);",
        "        i++;",
        "    }",
        "    return (0);",
        "}"
    ],
    ft_rev_params: [
        "int main(int argc, char **argv)",
        "{",
        "    int i = argc - 1; int j;",
        "    while (i >= 1) {",
        "        j = 0;",
        "        while (argv[i][j] != '\\0') {",
        "            write(1, &argv[i][j], 1);",
        "            j++;",
        "        }",
        "        write(1, "\\n", 1);",
        "        i--;",
        "    }",
        "    return (0);",
        "}"
    ],
    ft_sort_params: [
        "int main(int argc, char **argv)",
        "{",
        "    sort_arguments(argv, argc);",
        "    print_arguments(argv, argc);",
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

// Convert string list into argv mock
function parseArgv(inputStr) {
    const rawArgs = inputStr.trim().split(/\s+/).filter(x => x.length > 0);
    const args = ["./a.out", ...rawArgs];
    
    return args.map((arg, index) => {
        return {
            index: index,
            str: arg,
            chars: parseString(arg),
            ptrColor: `hsl(${(index * 360 / 6) % 360}, 70%, 60%)`
        };
    });
}

// Custom strcmp helper for sorting
function strcmp(s1, s2) {
    let i = 0;
    while (s1[i] && s2[i] && s1[i].char === s2[i].char && s1[i].char !== '\0') {
        i++;
    }
    return (s1[i] ? s1[i].ascii : 0) - (s2[i] ? s2[i].ascii : 0);
}

// --- Generators ---

function* simulate_print_program_name(argv) {
    let output = [];
    const pName = argv[0];

    yield {
        argv: [...argv], dest: [...output], activeArgvIdx: 0, activeCharIdx: 0,
        log: "C entry point: main(int argc, char **argv). Printing argv[0] (program name).",
        logType: "system",
        activeLine: 3
    };

    let i = 0;
    while (pName.chars[i].char !== '\0') {
        output.push({ char: pName.chars[i].char, display: pName.chars[i].char, ascii: pName.chars[i].ascii });
        
        // Mark character as read
        pName.chars[i].checkStatus = "pass";

        yield {
            argv: [...argv], dest: [...output], activeArgvIdx: 0, activeCharIdx: i,
            log: `Printing argv[0][${i}] -> '${pName.chars[i].char}'.`,
            logType: "step",
            activeLine: 5
        };
        i++;
    }

    output.push({ char: '\n', display: '\\n', ascii: 10 });
    yield {
        argv: [...argv], dest: [...output], activeArgvIdx: null, activeCharIdx: null,
        log: "Printing newline '\\n'. Complete.",
        logType: "success",
        activeLine: 8
    };
}

function* simulate_print_params(argv) {
    let output = [];
    const argc = argv.length;

    yield {
        argv: [...argv], dest: [...output], activeArgvIdx: 1, activeCharIdx: 0,
        log: `Printing parameters. Loop counter: i = 1 to argc-1 (${argc - 1}).`,
        logType: "system",
        activeLine: 3
    };

    for (let i = 1; i < argc; i++) {
        const arg = argv[i];
        let j = 0;

        yield {
            argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: 0,
            log: `Starting print of argv[${i}]: "${arg.str}".`,
            logType: "system",
            activeLine: 5
        };

        while (arg.chars[j].char !== '\0') {
            output.push({ char: arg.chars[j].char, display: arg.chars[j].char, ascii: arg.chars[j].ascii });
            arg.chars[j].checkStatus = "pass";
            yield {
                argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: j,
                log: `Printing argv[${i}][${j}] -> '${arg.chars[j].char}'.`,
                logType: "step",
                activeLine: 7
            };
            j++;
        }

        output.push({ char: '\n', display: '\\n', ascii: 10 });
        yield {
            argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: null,
            log: `Finished parameter argv[${i}]. Appending newline '\\n'.`,
            logType: "step",
            activeLine: 10
        };
    }

    yield {
        argv: [...argv], dest: [...output], activeArgvIdx: null, activeCharIdx: null,
        log: "Printed all arguments.",
        logType: "success",
        activeLine: 13
    };
}

function* simulate_rev_params(argv) {
    let output = [];
    const argc = argv.length;

    yield {
        argv: [...argv], dest: [...output], activeArgvIdx: argc - 1, activeCharIdx: 0,
        log: `Printing in reverse. Starting at index argc - 1 (${argc - 1}) down to 1.`,
        logType: "system",
        activeLine: 3
    };

    for (let i = argc - 1; i >= 1; i--) {
        const arg = argv[i];
        let j = 0;

        yield {
            argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: 0,
            log: `Printing argv[${i}]: "${arg.str}"...`,
            logType: "system",
            activeLine: 5
        };

        while (arg.chars[j].char !== '\0') {
            output.push({ char: arg.chars[j].char, display: arg.chars[j].char, ascii: arg.chars[j].ascii });
            arg.chars[j].checkStatus = "pass";
            yield {
                argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: j,
                log: `Printing argv[${i}][${j}] -> '${arg.chars[j].char}'.`,
                logType: "step",
                activeLine: 7
            };
            j++;
        }

        output.push({ char: '\n', display: '\\n', ascii: 10 });
        yield {
            argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: null,
            log: `Finished argv[${i}]. Appending newline '\\n'.`,
            logType: "step",
            activeLine: 10
        };
    }

    yield {
        argv: [...argv], dest: [...output], activeArgvIdx: null, activeCharIdx: null,
        log: "Done.",
        logType: "success",
        activeLine: 13
    };
}

function* simulate_sort_params(argv) {
    let output = [];
    const argc = argv.length;

    // Reset styles
    argv.forEach(a => a.sortState = null);

    yield {
        argv: [...argv], dest: [...output], activeArgvIdx: null, activeCharIdx: null,
        log: "C function entry: sorting parameters. Using Bubble Sort algorithm from index 1 to argc-1.",
        logType: "system",
        activeLine: 3
    };

    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 1; i < argc - 1; i++) {
            argv.forEach(a => a.sortState = null);
            argv[i].sortState = "sorting-active";
            argv[i+1].sortState = "sorting-active";

            yield {
                argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: null,
                log: `Comparing argv[${i}] ("${argv[i].str}") and argv[${i+1}] ("${argv[i+1].str}").`,
                logType: "step",
                activeLine: 3
            };

            const compResult = strcmp(argv[i].chars, argv[i+1].chars);
            if (compResult > 0) {
                // Swap pointers!
                argv[i].sortState = "sorting-swap";
                argv[i+1].sortState = "sorting-swap";

                yield {
                    argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: null,
                    log: `strcmp result is positive (${compResult}): "${argv[i].str}" > "${argv[i+1].str}". Swapping pointers in argv array!`,
                    logType: "warning",
                    activeLine: 3
                };

                const temp = argv[i];
                argv[i] = argv[i+1];
                argv[i+1] = temp;
                swapped = true;

                yield {
                    argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: null,
                    log: `Pointers swapped in the pointer array! argv[${i}] now references "${argv[i].str}".`,
                    logType: "step",
                    activeLine: 3
                };
            } else {
                yield {
                    argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: null,
                    log: `strcmp result is <= 0 (${compResult}). Correct order. No swap.`,
                    logType: "system",
                    activeLine: 3
                };
            }
        }
    }

    argv.forEach(a => a.sortState = null);
    yield {
        argv: [...argv], dest: [...output], activeArgvIdx: null, activeCharIdx: null,
        log: "Arguments array successfully sorted! Now printing sorted parameters...",
        logType: "success",
        activeLine: 4
    };

    // Print loop
    for (let i = 1; i < argc; i++) {
        const arg = argv[i];
        let j = 0;
        
        while (arg.chars[j].char !== '\0') {
            output.push({ char: arg.chars[j].char, display: arg.chars[j].char, ascii: arg.chars[j].ascii });
            yield {
                argv: [...argv], dest: [...output], activeArgvIdx: i, activeCharIdx: j,
                log: `Printing sorted argv[${i}][${j}] -> '${arg.chars[j].char}'.`,
                logType: "step",
                activeLine: 4
            };
            j++;
        }
        output.push({ char: '\n', display: '\\n', ascii: 10 });
    }

    yield {
        argv: [...argv], dest: [...output], activeArgvIdx: null, activeCharIdx: null,
        log: "Printed sorted results.",
        logType: "success",
        activeLine: 5
    };
}

// --- Renderer & Setup ---

function renderArgvTable(argv, activeArgvIdx, activeCharIdx) {
    const container = document.getElementById("argv-rows-container");
    container.innerHTML = "";

    argv.forEach((arg, index) => {
        const row = document.createElement("div");
        row.className = "argv-row";
        if (arg.sortState) row.classList.add(arg.sortState);

        // Ptr Cell
        const ptrCell = document.createElement("div");
        ptrCell.className = "argv-ptr-cell";
        ptrCell.style.borderColor = arg.ptrColor;
        ptrCell.innerHTML = `
            <div style="font-size:0.6rem; color:var(--text-muted);">argv[${index}]</div>
            <div style="font-weight:600; color:${arg.ptrColor}">0x${(4000 + arg.index * 8).toString(16).toUpperCase()}</div>
        `;

        // String Cells
        const strWrapper = document.createElement("div");
        strWrapper.className = "argv-str-wrapper";

        const grid = document.createElement("div");
        grid.className = "buffer-grid";
        grid.style.background = "rgba(10, 15, 26, 0.4)";

        arg.chars.forEach((charObj, cIdx) => {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (index === activeArgvIdx && cIdx === activeCharIdx) {
                cell.classList.add("active-src");
            }
            if (charObj.checkStatus === "pass") cell.classList.add("verify-pass");

            const idxDiv = document.createElement("div");
            idxDiv.className = "cell-idx";
            idxDiv.textContent = cIdx;
            
            const valDiv = document.createElement("div");
            valDiv.className = "cell-val";
            if (charObj.char === '\0') {
                valDiv.textContent = "\\0";
                valDiv.classList.add("is-null");
            } else {
                valDiv.textContent = charObj.char;
            }

            const metaDiv = document.createElement("div");
            metaDiv.className = "cell-meta";
            metaDiv.textContent = "0x" + charObj.ascii.toString(16).toUpperCase().padStart(2, '0');

            cell.appendChild(idxDiv);
            cell.appendChild(valDiv);
            cell.appendChild(metaDiv);
            grid.appendChild(cell);
        });

        strWrapper.appendChild(grid);
        row.appendChild(ptrCell);
        row.appendChild(strWrapper);
        container.appendChild(row);
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

    renderArgvTable(state.argv, state.activeArgvIdx, state.activeCharIdx);
    renderTerminalOutput(state.dest);

    const consoleBox = document.getElementById("console-logs");
    const logLine = document.createElement("div");
    logLine.className = `log-line ${state.logType}-log`;
    logLine.textContent = state.log;
    consoleBox.appendChild(logLine);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

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

function setupSimulation() {
    stopPlayback();
    document.getElementById("console-logs").innerHTML = "";

    const exercise = document.getElementById("exercise-select").value;
    renderCode(exercise);
    const argvVal = document.getElementById("argv-input").value;
    const argv = parseArgv(argvVal);

    // Update argc label
    document.getElementById("argc-display").textContent = `argc = ${argv.length}`;

    simulationHistory = [];
    currentStateIndex = -1;

    switch (exercise) {
        case "ft_print_program_name":
            currentGenerator = simulate_print_program_name(argv);
            break;
        case "ft_print_params":
            currentGenerator = simulate_print_params(argv);
            break;
        case "ft_rev_params":
            currentGenerator = simulate_rev_params(argv);
            break;
        case "ft_sort_params":
            currentGenerator = simulate_sort_params(argv);
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
    const argvInput = document.getElementById("argv-input");
    const speedSlider = document.getElementById("speed-slider");

    exSelect.addEventListener("change", setupSimulation);
    argvInput.addEventListener("input", setupSimulation);

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
