const EXERCISE_GUIDES = {
    ft_strlen: {
        title: "ft_strlen (ex00)",
        pitfalls: "Counts the number of characters in a null-terminated string.",
        questions: [
            "Why doesn't the character count include the null terminator <code>'\\0'</code>?",
            "What happens if the string pointer is null? (Undefined behavior/crash!)"
        ]
    },
    ft_putstr: {
        title: "ft_putstr (ex01)",
        pitfalls: "Displays a string of characters on screen.",
        questions: [
            "What is the system call used to print a character? (<code>write(1, &c, 1)</code>)"
        ]
    },
    ft_putnbr: {
        title: "ft_putnbr (ex02)",
        pitfalls: "Displays an integer. <strong>The Classic Trap:</strong> What happens to the minimum integer value <code>-2147483648</code> if you simply multiply it by <code>-1</code>? (Overflow! Since max signed int is <code>2147483647</code>).",
        questions: [
            "How do we handle <code>-2147483648</code> safely in C?",
            "Observe the recursive division steps. How are digits printed in the correct order?"
        ]
    },
    ft_atoi: {
        title: "ft_atoi (ex03)",
        pitfalls: "Converts the beginning of a string to an integer. Handles leading whitespaces, multiple <code>+</code>/<code>-</code> signs, and stops at the first non-digit character.",
        questions: [
            "What counts as a whitespace character? (Spaces, tabs, newlines, carriage returns)",
            "How does counting <code>'-'</code> signs determine the final mathematical sign?",
            "Why does the conversion stop instantly at a non-digit character?"
        ]
    },
    ft_putnbr_base: {
        title: "ft_putnbr_base (ex04)",
        pitfalls: "Prints an integer in a given base string (e.g. Hex, Binary). <strong>Requires strict base validation.</strong>",
        questions: [
            "What makes a base string invalid? (Length < 2, duplicate characters, containing <code>+</code>, <code>-</code>, or whitespaces)",
            "How does the recursion stack track division remainders to print digits?"
        ]
    },
    ft_atoi_base: {
        title: "ft_atoi_base (ex05)",
        pitfalls: "Parses an integer from a string using a custom base string map.",
        questions: [
            "How do we lookup digit values in our custom base character array?",
            "Does it handle sign symbols in the same way as <code>ft_atoi</code>?"
        ]
    }
};

const EXERCISE_CODE = {
    ft_strlen: [
        "int ft_strlen(char *str)",
        "{",
        "    int i = 0;",
        "    while (str[i] != '\\0')",
        "        i++;",
        "    return (i);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"Hello\";",
        "    ft_strlen(str);",
        "    return (0);",
        "}"
    ],
    ft_putstr: [
        "void ft_putstr(char *str)",
        "{",
        "    int i = 0;",
        "    while (str[i] != '\\0')",
        "    {",
        "        write(1, &str[i], 1);",
        "        i++;",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"Hello\";",
        "    ft_putstr(str);",
        "    return (0);",
        "}"
    ],
    ft_putnbr: [
        "void ft_putnbr(int nb)",
        "{",
        "    if (nb == -2147483648)",
        "    {",
        "        write(1, \"-2\", 2);",
        "        ft_putnbr(147483648);",
        "    }",
        "    else if (nb < 0)",
        "    {",
        "        write(1, \"-\", 1);",
        "        ft_putnbr(-nb);",
        "    }",
        "    else if (nb >= 10)",
        "    {",
        "        ft_putnbr(nb / 10);",
        "        ft_putnbr(nb % 10);",
        "    }",
        "    else",
        "    {",
        "        char c = nb + '0';",
        "        write(1, &c, 1);",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_putnbr(42);",
        "    return (0);",
        "}"
    ],
    ft_atoi: [
        "int ft_atoi(char *str)",
        "{",
        "    int i = 0; int sign = 1; int res = 0;",
        "    while (is_whitespace(str[i])) i++;",
        "    while (str[i] == '+' || str[i] == '-') {",
        "        if (str[i] == '-') sign *= -1;",
        "        i++;",
        "    }",
        "    while (str[i] >= '0' && str[i] <= '9') {",
        "        res = res * 10 + (str[i] - '0');",
        "        i++;",
        "    }",
        "    return (res * sign);",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"   ---+--+42\";",
        "    ft_atoi(str);",
        "    return (0);",
        "}"
    ],
    ft_putnbr_base: [
        "void ft_putnbr_base(int nbr, char *base)",
        "{",
        "    if (!validate_base(base)) return;",
        "    print_recursive(nbr, base, strlen(base));",
        "}",
        "",
        "int main(void)",
        "{",
        "    char base[] = \"0123456789ABCDEF\";",
        "    ft_putnbr_base(42, base);",
        "    return (0);",
        "}"
    ],
    ft_atoi_base: [
        "int ft_atoi_base(char *str, char *base)",
        "{",
        "    if (!validate_base(base)) return (0);",
        "    return (parse_base(str, base));",
        "}",
        "",
        "int main(void)",
        "{",
        "    char str[] = \"2A\";",
        "    char base[] = \"0123456789ABCDEF\";",
        "    ft_atoi_base(str, base);",
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
            display: str[i] === ' ' ? 'space' : str[i],
            ascii: code,
            isPrintable: code >= 32 && code <= 126
        });
    }
    result.push({ char: '\0', display: '\\0', ascii: 0, isPrintable: false });
    return result;
}

// Check base validation rules
function validateBase(baseStr) {
    if (baseStr.length < 2) return { valid: false, error: "Base size must be at least 2" };
    let seen = new Set();
    for (let c of baseStr) {
        if (c === '+' || c === '-' || c.trim() === '' || c.charCodeAt(0) <= 32 || c.charCodeAt(0) === 127) {
            return { valid: false, error: `Base contains invalid character: '${c}'` };
        }
        if (seen.has(c)) {
            return { valid: false, error: `Base contains duplicate character: '${c}'` };
        }
        seen.add(c);
    }
    return { valid: true };
}

// --- Generators ---

function* simulate_strlen(strVal) {
    const src = parseInputString(strVal);
    let i = 0;

    yield {
        src: [...src], base: [], dest: [], activeI: i,
        log: "C function entry: ft_strlen(str). Counting characters.",
        logType: "system",
        activeLine: 3
    };

    while (src[i] && src[i].char !== '\0') {
        src[i].checkStatus = "pass";
        yield {
            src: [...src], base: [], dest: [], activeI: i,
            log: `Found character '${src[i].display}' at index ${i}. Length count is ${i + 1}.`,
            logType: "step",
            activeLine: 4
        };
        i++;
    }

    yield {
        src: [...src], base: [], dest: [], activeI: i,
        log: `Reached null terminator '\\0' at index ${i}. Total length = ${i}.`,
        logType: "success",
        activeLine: 6
    };
}

function* simulate_putstr(strVal) {
    const src = parseInputString(strVal);
    let output = [];
    let i = 0;

    yield {
        src: [...src], base: [], dest: [...output], activeI: i,
        log: "C function entry: ft_putstr(str). Printing string to stdout.",
        logType: "system",
        activeLine: 3
    };

    while (src[i] && src[i].char !== '\0') {
        output.push({ char: src[i].char, display: src[i].display, ascii: src[i].ascii });
        yield {
            src: [...src], base: [], dest: [...output], activeI: i,
            log: `Writing character '${src[i].display}' to file descriptor 1 (stdout).`,
            logType: "step",
            activeLine: 6
        };
        i++;
    }

    yield {
        src: [...src], base: [], dest: [...output], activeI: null,
        log: "Reached null terminator. Print finished.",
        logType: "success",
        activeLine: 8
    };
}

function* simulate_putnbr(nbr) {
    let output = [];
    
    yield {
        src: [], base: [], dest: [...output], activeI: null,
        log: `C function entry: ft_putnbr(nbr = ${nbr}).`,
        logType: "system",
        activeLine: 1
    };

    let digits = [];
    let n = nbr;

    if (n === -2147483648) {
        output.push({ char: '-', display: '-', ascii: 45 });
        output.push({ char: '2', display: '2', ascii: 50 });
        n = 147483648; // Handled separately or mock remainder print
        yield {
            src: [], base: [], dest: [...output], activeI: null,
            log: "CRITICAL TRAP: nbr is INT_MIN (-2147483648). Standard negation causes overflow! Printing '-' and '2' and reducing.",
            logType: "warning",
            activeLine: 3
        };
    } else if (n < 0) {
        output.push({ char: '-', display: '-', ascii: 45 });
        yield {
            src: [], base: [], dest: [...output], activeI: null,
            log: "Number is negative. Outputting '-' sign.",
            logType: "warning",
            activeLine: 8
        };
        n = -n;
    }

    if (n === 0) {
        output.push({ char: '0', display: '0', ascii: 48 });
        yield {
            src: [], base: [], dest: [...output], activeI: null,
            log: "Outputting digit '0'.",
            logType: "success",
            activeLine: 20
        };
        return;
    }

    // Convert digits
    let temp = n;
    while (temp > 0) {
        digits.unshift(temp % 10);
        temp = Math.floor(temp / 10);
    }

    for (let i = 0; i < digits.length; i++) {
        const dStr = digits[i].toString();
        output.push({ char: dStr, display: dStr, ascii: dStr.charCodeAt(0) });
        yield {
            src: [], base: [], dest: [...output], activeI: null,
            log: `Recursion stack print: outputting digit '${dStr}'.`,
            logType: "step",
            activeLine: 21
        };
    }

    yield {
        src: [], base: [], dest: [...output], activeI: null,
        log: "Number output completed.",
        logType: "success",
        activeLine: 23
    };
}

function* simulate_atoi(strVal) {
    const src = parseInputString(strVal);
    let i = 0;

    yield {
        src: [...src], base: [], dest: [], activeI: i,
        log: "C function entry: ft_atoi(str). Starting parsing phases.",
        logType: "system",
        activeLine: 3
    };

    // Phase 1: Whitespace sweep
    while (src[i] && src[i].char !== '\0') {
        const c = src[i].char;
        if (c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '\v' || c === '\f') {
            src[i].checkStatus = "pass";
            yield {
                src: [...src], base: [], dest: [], activeI: i,
                log: `Phase 1: Skipping whitespace character '${src[i].display}'.`,
                logType: "step",
                activeLine: 4
            };
            i++;
        } else {
            break;
        }
    }

    // Phase 2: Signs
    let signCount = 0;
    while (src[i] && src[i].char !== '\0') {
        const c = src[i].char;
        if (c === '+' || c === '-') {
            if (c === '-') signCount++;
            src[i].checkStatus = "pass";
            yield {
                src: [...src], base: [], dest: [], activeI: i,
                log: `Phase 2: Found sign '${c}' (total '-' signs: ${signCount}).`,
                logType: "warning",
                activeLine: 5
            };
            i++;
        } else {
            break;
        }
    }

    const sign = (signCount % 2 === 1) ? -1 : 1;
    yield {
        src: [...src], base: [], dest: [], activeI: i,
        log: `Phase 2 complete. Signs scanned. Combined sign is ${sign === 1 ? '+' : '-'}.`,
        logType: "system",
        activeLine: 5
    };

    // Phase 3: Digit Conversion
    let result = 0;
    let digitsScanned = 0;

    while (src[i] && src[i].char !== '\0') {
        const c = src[i].char;
        if (c >= '0' && c <= '9') {
            const digit = c - '0';
            const previousResult = result;
            result = result * 10 + digit;
            src[i].checkStatus = "pass";
            digitsScanned++;

            yield {
                src: [...src], base: [], dest: [{ char: result.toString(), display: (sign * result).toString(), ascii: 48 }], activeI: i,
                log: `Phase 3: Parsing digit '${c}'. Equation: ${previousResult} * 10 + ${digit} = ${result}.`,
                logType: "step",
                activeLine: 10
            };
            i++;
        } else {
            src[i].checkStatus = "fail";
            yield {
                src: [...src], base: [], dest: [{ char: result.toString(), display: (sign * result).toString(), ascii: 48 }], activeI: i,
                log: `Encountered non-digit '${src[i].display}'. Stopping parser.`,
                logType: "warning",
                activeLine: 9
            };
            break;
        }
    }

    const finalVal = sign * result;
    yield {
        src: [...src], base: [], dest: [{ char: finalVal.toString(), display: finalVal.toString(), ascii: 48 }], activeI: null,
        log: `Conversion complete. Returning calculated integer: ${finalVal}.`,
        logType: "success",
        activeLine: 13
    };
}

function* simulate_putnbr_base(nbr, baseStr) {
    let output = [];
    const baseCells = parseInputString(baseStr);
    // Remove null terminator cell
    baseCells.pop();

    const valResult = validateBase(baseStr);
    if (!valResult.valid) {
        yield {
            src: [], base: baseCells, dest: [], activeI: null,
            log: `Base check FAILED: ${valResult.error}. Function aborts.`,
            logType: "warning",
            activeLine: 3
        };
        return;
    }

    yield {
        src: [], base: baseCells, dest: [], activeI: null,
        log: `Base validation PASSED. Base size = ${baseStr.length}. Outputting nbr = ${nbr}.`,
        logType: "success",
        activeLine: 4
    };

    let n = nbr;
    if (n < 0) {
        output.push({ char: '-', display: '-', ascii: 45 });
        n = -n;
        yield {
            src: [], base: baseCells, dest: [...output], activeI: null,
            log: "Outputting negative sign symbol '-'.",
            logType: "warning",
            activeLine: 4
        };
    }

    let baseSize = baseStr.length;
    let digits = [];
    let temp = n;

    if (temp === 0) {
        const c = baseStr[0];
        output.push({ char: c, display: c, ascii: c.charCodeAt(0) });
        yield {
            src: [], base: baseCells, dest: [...output], activeI: null,
            log: `Outputting character '${c}' representing value 0.`,
            logType: "step",
            activeLine: 4
        };
        return;
    }

    while (temp > 0) {
        digits.unshift(temp % baseSize);
        temp = Math.floor(temp / baseSize);
    }

    for (let i = 0; i < digits.length; i++) {
        const val = digits[i];
        const c = baseStr[val];
        output.push({ char: c, display: c, ascii: c.charCodeAt(0) });
        
        // Highlight active base character
        baseCells.forEach((cell, idx) => {
            cell.checkStatus = (idx === val) ? "pass" : null;
        });

        yield {
            src: [], base: [...baseCells], dest: [...output], activeI: null,
            log: `Outputting digit matching value ${val} in base -> '${c}'.`,
            logType: "step",
            activeLine: 4
        };
    }
}

function* simulate_atoi_base(strVal, baseStr) {
    const src = parseInputString(strVal);
    const baseCells = parseInputString(baseStr);
    baseCells.pop();

    const valResult = validateBase(baseStr);
    if (!valResult.valid) {
        yield {
            src: [...src], base: baseCells, dest: [], activeI: null,
            log: `Base check FAILED: ${valResult.error}. Returning 0.`,
            logType: "warning",
            activeLine: 3
        };
        return;
    }

    yield {
        src: [...src], base: [...baseCells], dest: [], activeI: 0,
        log: "Base validation passed. Initializing parsing.",
        logType: "success",
        activeLine: 4
    };

    let i = 0;
    // Whitespaces
    while (src[i] && src[i].char !== '\0') {
        const c = src[i].char;
        if (c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '\v' || c === '\f') {
            src[i].checkStatus = "pass";
            yield {
                src: [...src], base: [...baseCells], dest: [], activeI: i,
                log: `Skipping whitespace '${src[i].display}'.`,
                logType: "step",
                activeLine: 4
            };
            i++;
        } else {
            break;
        }
    }

    // Signs
    let signCount = 0;
    while (src[i] && src[i].char !== '\0') {
        const c = src[i].char;
        if (c === '+' || c === '-') {
            if (c === '-') signCount++;
            src[i].checkStatus = "pass";
            yield {
                src: [...src], base: [...baseCells], dest: [], activeI: i,
                log: `Scanning sign: '${c}' (total minuses: ${signCount}).`,
                logType: "warning",
                activeLine: 4
            };
            i++;
        } else {
            break;
        }
    }

    const sign = (signCount % 2 === 1) ? -1 : 1;
    let result = 0;
    const baseSize = baseStr.length;

    while (src[i] && src[i].char !== '\0') {
        const c = src[i].char;
        // Check lookup index in base
        const digitVal = baseStr.indexOf(c);

        if (digitVal !== -1) {
            const previous = result;
            result = result * baseSize + digitVal;
            src[i].checkStatus = "pass";
            
            baseCells.forEach((bc, idx) => {
                bc.checkStatus = (idx === digitVal) ? "pass" : null;
            });

            yield {
                src: [...src], base: [...baseCells], dest: [{ char: result.toString(), display: (sign * result).toString(), ascii: 48 }], activeI: i,
                log: `Matched base digit '${c}' with value ${digitVal}. Calculation: ${previous} * ${baseSize} + ${digitVal} = ${result}.`,
                logType: "step",
                activeLine: 4
            };
            i++;
        } else {
            src[i].checkStatus = "fail";
            yield {
                src: [...src], base: [...baseCells], dest: [{ char: result.toString(), display: (sign * result).toString(), ascii: 48 }], activeI: i,
                log: `Character '${src[i].display}' is not part of the base string. Halting.`,
                logType: "warning",
                activeLine: 4
            };
            break;
        }
    }

    const finalVal = sign * result;
    yield {
        src: [...src], base: [...baseCells], dest: [{ char: finalVal.toString(), display: finalVal.toString(), ascii: 48 }], activeI: null,
        log: `Success. Final integer returned = ${finalVal}.`,
        logType: "success",
        activeLine: 4
    };
}


// --- DOM Renderer & UI Binding ---



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
        container.innerHTML = `<div class="cell-placeholder">Empty</div>`;
        return;
    }

    bufferState.forEach((item, index) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        
        if (index === activeIndex) {
            cell.classList.add(`active-${pointerName}`);
            const badge = document.createElement("div");
            badge.className = `ptr-badge ${pointerName}-ptr`;
            badge.textContent = pointerName === 'i' ? 'i' : 'base';
            cell.appendChild(badge);
        }

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

    renderBuffer("src-buffer", state.src, state.activeI, "i");
    renderBuffer("base-buffer", state.base, null, "src");
    renderBuffer("dest-buffer", state.dest, null, "dest");

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
    const nbrVal = parseInt(document.getElementById("nbr-input").value) || 0;
    const baseStr = document.getElementById("base-input").value;

    simulationHistory = [];
    currentStateIndex = -1;

    switch (exercise) {
        case "ft_strlen":
            currentGenerator = simulate_strlen(strVal);
            break;
        case "ft_putstr":
            currentGenerator = simulate_putstr(strVal);
            break;
        case "ft_putnbr":
            currentGenerator = simulate_putnbr(nbrVal);
            break;
        case "ft_atoi":
            currentGenerator = simulate_atoi(strVal);
            break;
        case "ft_putnbr_base":
            currentGenerator = simulate_putnbr_base(nbrVal, baseStr);
            break;
        case "ft_atoi_base":
            currentGenerator = simulate_atoi_base(strVal, baseStr);
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
    const nbrInput = document.getElementById("nbr-input");
    const baseInput = document.getElementById("base-input");
    const speedSlider = document.getElementById("speed-slider");

    function toggleInputs() {
        const ex = exSelect.value;
        const strGroup = document.getElementById("string-input-group");
        const nbrGroup = document.getElementById("number-input-group");
        const baseGroup = document.getElementById("base-input-group");
        const baseWrapper = document.getElementById("base-wrapper");

        // Hide/show inputs
        strGroup.style.display = (ex === "ft_strlen" || ex === "ft_putstr" || ex === "ft_atoi" || ex === "ft_atoi_base") ? "flex" : "none";
        nbrGroup.style.display = (ex === "ft_putnbr" || ex === "ft_putnbr_base") ? "flex" : "none";
        baseGroup.style.display = (ex === "ft_putnbr_base" || ex === "ft_atoi_base") ? "flex" : "none";
        baseWrapper.style.display = (ex === "ft_putnbr_base" || ex === "ft_atoi_base") ? "flex" : "none";
        
        document.getElementById("h-src-title").textContent = (ex === "ft_putnbr") ? "Number Visual" : "String Buffer";
        document.getElementById("dest-wrapper-title").textContent = (ex === "ft_atoi" || ex === "ft_atoi_base") ? "Calculated Value (return)" : "Output Terminal (Stdout)";
    }

    exSelect.addEventListener("change", () => { toggleInputs(); setupSimulation(); });
    strInput.addEventListener("input", setupSimulation);
    nbrInput.addEventListener("input", setupSimulation);
    baseInput.addEventListener("input", setupSimulation);

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
