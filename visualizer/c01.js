const EXERCISE_GUIDES = {
    ft_ft: {
        title: "ft_ft (ex00)",
        pitfalls: "Takes a pointer to int as a parameter and sets its dereferenced value to 42.",
        questions: [
            "What is a pointer? (A variable that stores the memory address of another variable!)",
            "What does the dereference symbol <code>*</code> do? (Accesses or modifies the value at that address!)"
        ]
    },
    ft_ultimate_ft: {
        title: "ft_ultimate_ft (ex01)",
        pitfalls: "Takes a pointer to pointer to pointer... (9 levels deep) and sets the target integer to 42.",
        questions: [
            "Observe the chain of pointers. Why does dereferencing 9 times modify the final integer?",
            "What is the physical size of a pointer in 64-bit systems? (8 bytes)"
        ]
    },
    ft_swap: {
        title: "ft_swap (ex02)",
        pitfalls: "Swaps the values of two integers using their pointers.",
        questions: [
            "Why must we use a temporary variable <code>tmp</code>? What would happen if we wrote <code>*a = *b; *b = *a;</code>?",
            "How does swapping by pointer dereferencing affect variables in the caller function?"
        ]
    },
    ft_div_mod: {
        title: "ft_div_mod (ex03)",
        pitfalls: "Divides parameters <code>a</code> by <code>b</code>, storing the division result in <code>*div</code> and the remainder in <code>*mod</code>.",
        questions: [
            "What would happen if <code>b</code> was 0? (Division by zero crash!)"
        ]
    },
    ft_ultimate_div_mod: {
        title: "ft_ultimate_div_mod (ex04)",
        pitfalls: "Divides <code>*a</code> by <code>*b</code>, storing the result in <code>*a</code> and the remainder in <code>*b</code>.",
        questions: [
            "Why do we need temporary backup variables? (Because writing <code>*a = *a / *b</code> overwrites <code>*a</code> before calculating the remainder!)"
        ]
    },
    ft_putstr: {
        title: "ft_putstr (ex05)",
        pitfalls: "Prints a string to standard output character by character.",
        questions: [
            "What is the condition for the end of a string in C? (Checking for the null terminator '\\0')"
        ]
    },
    ft_strlen: {
        title: "ft_strlen (ex06)",
        pitfalls: "Counts the number of characters in a string until the null terminator.",
        questions: [
            "Why doesn't the length include the null terminator?"
        ]
    },
    ft_rev_int_tab: {
        title: "ft_rev_int_tab (ex07)",
        pitfalls: "Reverses an array of integers in-place.",
        questions: [
            "Observe the two pointers moving towards the center (index <code>start</code> and <code>end</code>).",
            "When does the loop terminate? (When <code>start >= end</code>)"
        ]
    },
    ft_sort_int_tab: {
        title: "ft_sort_int_tab (ex08)",
        pitfalls: "Sorts an array of integers in ascending order.",
        questions: [
            "How do comparison checks step through the array cells?"
        ]
    }
};

const EXERCISE_CODE = {
    ft_ft: [
        "void ft_ft(int *nbr)",
        "{",
        "    *nbr = 42;",
        "}",
        "",
        "int main(void)",
        "{",
        "    int n = 0;",
        "    ft_ft(&n);",
        "    return (0);",
        "}"
    ],
    ft_ultimate_ft: [
        "void ft_ultimate_ft(int *********nbr)",
        "{",
        "    *********nbr = 42;",
        "}",
        "",
        "int main(void)",
        "{",
        "    int n = 0;",
        "    int *p1 = &n; int **p2 = &p1; int ***p3 = &p2;",
        "    int ****p4 = &p3; int *****p5 = &p4; int ******p6 = &p5;",
        "    int *******p7 = &p6; int ********p8 = &p7; int *********p9 = &p8;",
        "    ft_ultimate_ft(p9);",
        "    return (0);",
        "}"
    ],
    ft_swap: [
        "void ft_swap(int *a, int *b)",
        "{",
        "    int tmp;",
        "",
        "    tmp = *a;",
        "    *a = *b;",
        "    *b = tmp;",
        "}",
        "",
        "int main(void)",
        "{",
        "    int a = 42;",
        "    int b = 24;",
        "    ft_swap(&a, &b);",
        "    return (0);",
        "}"
    ],
    ft_div_mod: [
        "void ft_div_mod(int a, int b, int *div, int *mod)",
        "{",
        "    *div = a / b;",
        "    *mod = a % b;",
        "}",
        "",
        "int main(void)",
        "{",
        "    int a = 42;",
        "    int b = 24;",
        "    int div;",
        "    int mod;",
        "    ft_div_mod(a, b, &div, &mod);",
        "    return (0);",
        "}"
    ],
    ft_ultimate_div_mod: [
        "void ft_ultimate_div_mod(int *a, int *b)",
        "{",
        "    int tmp;",
        "",
        "    tmp = *a / *b;",
        "    *b = *a % *b;",
        "    *a = tmp;",
        "}",
        "",
        "int main(void)",
        "{",
        "    int a = 42;",
        "    int b = 24;",
        "    ft_ultimate_div_mod(&a, &b);",
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
        "    char *str = \"Hello\";",
        "    ft_putstr(str);",
        "    return (0);",
        "}"
    ],
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
        "    char *str = \"Hello\";",
        "    ft_strlen(str);",
        "    return (0);",
        "}"
    ],
    ft_rev_int_tab: [
        "void ft_rev_int_tab(int *tab, int size)",
        "{",
        "    int start = 0;",
        "    int end = size - 1;",
        "    int tmp;",
        "",
        "    while (start < end)",
        "    {",
        "        tmp = tab[start];",
        "        tab[start] = tab[end];",
        "        tab[end] = tmp;",
        "        start++;",
        "        end--;",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    int tab[5] = {5, 2, 9, 1, 7};",
        "    ft_rev_int_tab(tab, 5);",
        "    return (0);",
        "}"
    ],
    ft_sort_int_tab: [
        "void ft_sort_int_tab(int *tab, int size)",
        "{",
        "    int i = 0;",
        "    int tmp;",
        "    int swapped = 1;",
        "",
        "    while (swapped)",
        "    {",
        "        swapped = 0;",
        "        i = 0;",
        "        while (i < size - 1)",
        "        {",
        "            if (tab[i] > tab[i + 1])",
        "            {",
        "                tmp = tab[i];",
        "                tab[i] = tab[i + 1];",
        "                tab[i + 1] = tmp;",
        "                swapped = 1;",
        "            }",
        "            i++;",
        "        }",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    int tab[5] = {5, 2, 9, 1, 7};",
        "    ft_sort_int_tab(tab, 5);",
        "    return (0);",
        "}"
    ]
};

let simulationHistory = [];
let currentStateIndex = -1;
let currentGenerator = null;
let playbackInterval = null;
let simulationSpeed = 600;

// Helper to parse comma separated integers
function parseIntegersArray(str) {
    return str.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x)).map((val, idx) => {
        return {
            char: val.toString(),
            display: val.toString(),
            ascii: val,
            checkStatus: null
        };
    });
}

// --- Generators ---

function* simulate_putstr(strVal) {
    let output = [];
    let i = 0;
    
    yield {
        vars: [{ name: "str", val: `"${strVal}"` }, { name: "i", val: i }],
        dest: [...output],
        log: "C function entry: ft_putstr().",
        logType: "system",
        activeLine: 3
    };

    while (i < strVal.length) {
        output.push({ char: strVal[i], display: strVal[i] === ' ' ? 'space' : strVal[i], ascii: strVal.charCodeAt(i) });
        yield {
            vars: [{ name: "str", val: `"${strVal}"` }, { name: "i", val: i }],
            dest: [...output],
            log: `Writing character '${strVal[i]}' to stdout.`,
            logType: "step",
            activeLine: 6
        };
        i++;
        yield {
            vars: [{ name: "str", val: `"${strVal}"` }, { name: "i", val: i }],
            dest: [...output],
            log: `Incrementing index i to ${i}.`,
            logType: "step",
            activeLine: 7
        };
    }

    yield {
        vars: [{ name: "str", val: `"${strVal}"` }, { name: "i", val: i }],
        dest: [...output],
        log: "Reached null terminator. Print finished.",
        logType: "success",
        activeLine: 9
    };
}

function* simulate_strlen(strVal) {
    let output = [];
    let i = 0;
    
    yield {
        vars: [{ name: "str", val: `"${strVal}"` }, { name: "i", val: i }],
        dest: [...output],
        log: "C function entry: ft_strlen().",
        logType: "system",
        activeLine: 3
    };

    while (i < strVal.length) {
        yield {
            vars: [{ name: "str", val: `"${strVal}"` }, { name: "i", val: i }],
            dest: [...output],
            log: `str[${i}] is '${strVal[i]}', not '\\0'. Incrementing i.`,
            logType: "step",
            activeLine: 5
        };
        i++;
    }

    yield {
        vars: [{ name: "str", val: `"${strVal}"` }, { name: "i", val: i }],
        dest: [...output],
        log: `Reached '\\0'. Returning length ${i}.`,
        logType: "success",
        activeLine: 6
    };
}

function* simulate_ft_ft() {
    let vars = [
        { name: "ptr (int *)", val: "0x7FFA10 (points to n)", addr: "0x7FFA20", state: "active" },
        { name: "n (int)", val: "0", addr: "0x7FFA10", state: "none" }
    ];

    yield {
        vars: [...vars], dest: [],
        log: "C function entry: ft_ft(int *nbr). Address of variable 'n' is 0x7FFA10. Pointer 'nbr' holds this address.",
        logType: "system",
        activeLine: 1
    };

    vars[1].state = "highlight-write";
    vars[1].val = "42";

    yield {
        vars: [...vars], dest: [],
        log: "Executing dereference: *nbr = 42. Writing value 42 to address stored in 'nbr' (0x7FFA10). Variable 'n' updates.",
        logType: "success",
        activeLine: 3
    };
}

function* simulate_ultimate_ft() {
    let vars = [];
    
    // Create pointer chain
    for (let i = 9; i >= 1; i--) {
        const ptrLevel = "*".repeat(i) + "nbr";
        const nextAddr = "0x7FF" + (100 + (i-1)*16).toString(16).toUpperCase();
        const selfAddr = "0x7FF" + (100 + i*16).toString(16).toUpperCase();
        vars.push({
            name: `${ptrLevel} (${"*".repeat(i)}int)`,
            val: nextAddr,
            addr: selfAddr,
            state: "none"
        });
    }
    
    // Target int variable
    vars.push({
        name: "n (int)",
        val: "0",
        addr: "0x7FF100",
        state: "none"
    });

    yield {
        vars: [...vars], dest: [],
        log: "C function entry: ft_ultimate_ft(int *********nbr). Initializing 9-level pointer stack frame.",
        logType: "system",
        activeLine: 1
    };

    // Animate traversal step by step
    for (let i = 0; i < 9; i++) {
        vars.forEach(v => v.state = "none");
        vars[i].state = "highlight-read";
        yield {
            vars: [...vars], dest: [],
            log: `Dereferencing pointer level ${9-i}: accessing address ${vars[i].val}.`,
            logType: "step",
            activeLine: 3
        };
    }

    vars.forEach(v => v.state = "none");
    vars[9].state = "highlight-write";
    vars[9].val = "42";

    yield {
        vars: [...vars], dest: [],
        log: "Writing 42 to final dereferenced int variable 'n' at address 0x7FF100.",
        logType: "success",
        activeLine: 3
    };
}

function* simulate_swap(aVal, bVal) {
    let vars = [
        { name: "a (int)", val: aVal, addr: "0x7FFA10", state: "none" },
        { name: "b (int)", val: bVal, addr: "0x7FFA20", state: "none" },
        { name: "ptr_a (int *)", val: "0x7FFA10", addr: "0x7FFA30", state: "none" },
        { name: "ptr_b (int *)", val: "0x7FFA20", addr: "0x7FFA40", state: "none" },
        { name: "tmp (int)", val: "garbage", addr: "0x7FFA50", state: "none" }
    ];

    yield {
        vars: [...vars], dest: [],
        log: "C function entry: ft_swap(int *a, int *b). Stack frame initialized.",
        logType: "system",
        activeLine: 1
    };

    // tmp = *a
    vars[0].state = "highlight-read";
    vars[4].state = "highlight-write";
    vars[4].val = aVal;
    yield {
        vars: JSON.parse(JSON.stringify(vars)), dest: [],
        log: `Step 1: Copying value from *a (${aVal}) to temp variable tmp.`,
        logType: "step",
        activeLine: 5
    };

    // *a = *b
    vars.forEach(v => v.state = "none");
    vars[1].state = "highlight-read";
    vars[0].state = "highlight-write";
    vars[0].val = bVal;
    yield {
        vars: JSON.parse(JSON.stringify(vars)), dest: [],
        log: `Step 2: Dereferenced pointer assign *a = *b. Writing variable b (${bVal}) to variable a.`,
        logType: "step",
        activeLine: 6
    };

    // *b = tmp
    vars.forEach(v => v.state = "none");
    vars[4].state = "highlight-read";
    vars[1].state = "highlight-write";
    vars[1].val = vars[4].val;
    yield {
        vars: JSON.parse(JSON.stringify(vars)), dest: [],
        log: `Step 3: Completing swap. *b = tmp. Writing temp value (${vars[4].val}) to variable b.`,
        logType: "success",
        activeLine: 7
    };
}

function* simulate_div_mod(a, b) {
    let vars = [
        { name: "a (int)", val: a, addr: "0x7FFA10", state: "none" },
        { name: "b (int)", val: b, addr: "0x7FFA20", state: "none" },
        { name: "div (int *)", val: "0x7FFA30", addr: "0x7FFA50", state: "none" },
        { name: "mod (int *)", val: "0x7FFA40", addr: "0x7FFA60", state: "none" },
        { name: "*div (int)", val: "garbage", addr: "0x7FFA30", state: "none" },
        { name: "*mod (int)", val: "garbage", addr: "0x7FFA40", state: "none" }
    ];

    yield {
        vars: [...vars], dest: [],
        log: `C function entry: ft_div_mod(a = ${a}, b = ${b}, int *div, int *mod).`,
        logType: "system",
        activeLine: 1
    };

    if (b === 0) {
        yield {
            vars: [...vars], dest: [],
            log: "CRITICAL: Division by 0! Program crashes.",
            logType: "warning",
            activeLine: 3
        };
        return;
    }

    const divRes = Math.floor(a / b);
    const modRes = a % b;

    vars[4].state = "highlight-write";
    vars[4].val = divRes.toString();
    yield {
        vars: JSON.parse(JSON.stringify(vars)), dest: [],
        log: `Step 1: Evaluating division: a / b -> ${a} / ${b} = ${divRes}. Writing to address *div.`,
        logType: "step",
        activeLine: 3
    };

    vars.forEach(v => v.state = "none");
    vars[5].state = "highlight-write";
    vars[5].val = modRes.toString();
    yield {
        vars: JSON.parse(JSON.stringify(vars)), dest: [],
        log: `Step 2: Evaluating modulo remainder: a % b -> ${a} % ${b} = ${modRes}. Writing to address *mod.`,
        logType: "success",
        activeLine: 4
    };
}

function* simulate_ultimate_div_mod(a, b) {
    let vars = [
        { name: "*a (int)", val: a, addr: "0x7FFA10", state: "none" },
        { name: "*b (int)", val: b, addr: "0x7FFA20", state: "none" },
        { name: "a (int *)", val: "0x7FFA10", addr: "0x7FFA30", state: "none" },
        { name: "b (int *)", val: "0x7FFA20", addr: "0x7FFA40", state: "none" }
    ];

    yield {
        vars: [...vars], dest: [],
        log: `C function entry: ft_ultimate_div_mod(int *a, int *b). Initial values: *a = ${a}, *b = ${b}.`,
        logType: "system",
        activeLine: 1
    };

    if (b === 0) {
        yield {
            vars: [...vars], dest: [],
            log: "CRITICAL: Division by 0!",
            logType: "warning",
            activeLine: 5
        };
        return;
    }

    const divRes = Math.floor(a / b);
    const modRes = a % b;

    yield {
        vars: [...vars], dest: [],
        log: `Storing temporary backup copies to prevent overwrite issues: temp_a = ${a}, temp_b = ${b}.`,
        logType: "system",
        activeLine: 3
    };

    vars[0].val = divRes.toString();
    vars[0].state = "highlight-write";
    yield {
        vars: JSON.parse(JSON.stringify(vars)), dest: [],
        log: `Step 1: *a = temp_a / temp_b -> ${a} / ${b} = ${divRes}. Writing division to *a.`,
        logType: "step",
        activeLine: 5
    };

    vars.forEach(v => v.state = "none");
    vars[1].val = modRes.toString();
    vars[1].state = "highlight-write";
    yield {
        vars: JSON.parse(JSON.stringify(vars)), dest: [],
        log: `Step 2: *b = temp_a % temp_b -> ${a} % ${b} = ${modRes}. Writing remainder to *b.`,
        logType: "success",
        activeLine: 6
    };
}

function* simulate_rev_int_tab(arr) {
    let size = arr.length;
    let vars = [
        { name: "size", val: size },
        { name: "start", val: 0 },
        { name: "end", val: size - 1 }
    ];

    yield {
        vars: [...vars], dest: JSON.parse(JSON.stringify(arr)),
        log: `C function entry: ft_rev_int_tab(int *tab, size = ${size}).`,
        logType: "system",
        activeLine: 1
    };

    let start = 0;
    let end = size - 1;

    while (start < end) {
        vars[1].val = start;
        vars[2].val = end;

        // Highlight cells
        arr.forEach(c => c.checkStatus = null);
        arr[start].checkStatus = "fail";
        arr[end].checkStatus = "fail";

        yield {
            vars: [...vars], dest: JSON.parse(JSON.stringify(arr)),
            log: `Swapping element at tab[${start}] (${arr[start].char}) with tab[${end}] (${arr[end].char}).`,
            logType: "step",
            activeLine: 7
        };

        const temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;

        arr[start].checkStatus = "pass";
        arr[end].checkStatus = "pass";

        yield {
            vars: [...vars], dest: JSON.parse(JSON.stringify(arr)),
            log: `Swap complete. Values are now reversed at start/end indexes.`,
            logType: "success",
            activeLine: 10
        };

        start++;
        end--;
    }

    arr.forEach(c => c.checkStatus = null);
    yield {
        vars: [{ name: "size", val: size }], dest: JSON.parse(JSON.stringify(arr)),
        log: "Loop terminated (start >= end). Array completely reversed.",
        logType: "success",
        activeLine: 15
    };
}

function* simulate_sort_int_tab(arr) {
    let size = arr.length;
    let vars = [
        { name: "size", val: size }
    ];

    yield {
        vars: [...vars], dest: JSON.parse(JSON.stringify(arr)),
        log: `C function entry: sorting integer array of size = ${size}.`,
        logType: "system",
        activeLine: 1
    };

    let swapped = true;
    while (swapped) {
        swapped = false;
        for (let i = 0; i < size - 1; i++) {
            arr.forEach(c => c.checkStatus = null);
            arr[i].checkStatus = "fail";
            arr[i+1].checkStatus = "fail";

            yield {
                vars: [...vars], dest: JSON.parse(JSON.stringify(arr)),
                log: `Comparing index ${i} (${arr[i].char}) and index ${i+1} (${arr[i+1].char}).`,
                logType: "step",
                activeLine: 13
            };

            const aNum = parseInt(arr[i].char);
            const bNum = parseInt(arr[i+1].char);

            if (aNum > bNum) {
                const temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                swapped = true;

                arr[i].checkStatus = "pass";
                arr[i+1].checkStatus = "pass";
                yield {
                    vars: [...vars], dest: JSON.parse(JSON.stringify(arr)),
                    log: `Swap triggered because ${aNum} > ${bNum}.`,
                    logType: "warning",
                    activeLine: 15
                };
            }
        }
    }

    arr.forEach(c => c.checkStatus = null);
    yield {
        vars: [...vars], dest: JSON.parse(JSON.stringify(arr)),
        log: "Bubble sort complete. Array fully sorted.",
        logType: "success",
        activeLine: 23
    };
}

// --- DOM Renderer ---

function renderVars(vars) {
    const container = document.getElementById("variables-container");
    container.innerHTML = "";
    if (vars.length === 0) {
        container.innerHTML = `<div class="cell-placeholder">No variables in memory</div>`;
        return;
    }

    vars.forEach(v => {
        const cell = document.createElement("div");
        cell.className = "var-cell";
        if (v.state && v.state !== "none") cell.classList.add(v.state);

        const nameDiv = document.createElement("div");
        nameDiv.className = "var-cell-name";
        nameDiv.textContent = v.name;

        const valDiv = document.createElement("div");
        valDiv.className = "var-cell-val";
        valDiv.textContent = v.val;

        const addrDiv = document.createElement("div");
        addrDiv.className = "var-cell-addr";
        addrDiv.textContent = v.addr ? "Addr: " + v.addr : "";

        cell.appendChild(nameDiv);
        cell.appendChild(valDiv);
        cell.appendChild(addrDiv);
        container.appendChild(cell);
    });
}

function renderArrayGrid(dest) {
    const container = document.getElementById("dest-buffer");
    container.innerHTML = "";
    if (dest.length === 0) {
        container.innerHTML = `<div class="cell-placeholder">No active arrays</div>`;
        return;
    }

    dest.forEach((item, index) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        if (item.checkStatus === "pass") cell.classList.add("verify-pass");
        if (item.checkStatus === "fail") cell.classList.add("verify-fail");

        const idxDiv = document.createElement("div");
        idxDiv.className = "cell-idx";
        idxDiv.textContent = index;
        
        const valDiv = document.createElement("div");
        valDiv.className = "cell-val";
        valDiv.textContent = item.display;

        const metaDiv = document.createElement("div");
        metaDiv.className = "cell-meta";
        metaDiv.textContent = "Offset: " + (index * 4); // ints are 4 bytes

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

    renderVars(state.vars);
    renderArrayGrid(state.dest);

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
    const a = parseInt(document.getElementById("a-input").value) || 0;
    const b = parseInt(document.getElementById("b-input").value) || 0;
    const arrVal = document.getElementById("arr-input").value;
    const arr = parseIntegersArray(arrVal);

    simulationHistory = [];
    currentStateIndex = -1;

    switch (exercise) {
        case "ft_ft":
            currentGenerator = simulate_ft_ft();
            break;
        case "ft_ultimate_ft":
            currentGenerator = simulate_ultimate_ft();
            break;
        case "ft_swap":
            currentGenerator = simulate_swap(a, b);
            break;
        case "ft_div_mod":
            currentGenerator = simulate_div_mod(a, b);
            break;
        case "ft_ultimate_div_mod":
            currentGenerator = simulate_ultimate_div_mod(a, b);
            break;
        case "ft_putstr":
            currentGenerator = simulate_putstr("Hello, World!");
            break;
        case "ft_strlen":
            currentGenerator = simulate_strlen("Hello, World!");
            break;
        case "ft_rev_int_tab":
            currentGenerator = simulate_rev_int_tab(arr);
            break;
        case "ft_sort_int_tab":
            currentGenerator = simulate_sort_int_tab(arr);
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
    const aInput = document.getElementById("a-input");
    const bInput = document.getElementById("b-input");
    const arrInput = document.getElementById("arr-input");
    const speedSlider = document.getElementById("speed-slider");

    function toggleInputs() {
        const ex = exSelect.value;
        const aGrp = document.getElementById("a-input-group");
        const bGrp = document.getElementById("b-input-group");
        const arrGrp = document.getElementById("array-input-group");
        const arrWrapper = document.getElementById("array-wrapper");

        aGrp.style.display = (ex === "ft_ft" || ex === "ft_swap" || ex === "ft_div_mod" || ex === "ft_ultimate_div_mod") ? "flex" : "none";
        bGrp.style.display = (ex === "ft_swap" || ex === "ft_div_mod" || ex === "ft_ultimate_div_mod") ? "flex" : "none";
        arrGrp.style.display = (ex === "ft_rev_int_tab" || ex === "ft_sort_int_tab") ? "flex" : "none";
        arrWrapper.style.display = (ex === "ft_rev_int_tab" || ex === "ft_sort_int_tab") ? "flex" : "none";

        if (ex === "ft_ft") {
            aGrp.querySelector("label").textContent = "Value for dereference write:";
        } else {
            aGrp.querySelector("label").textContent = "Integer variable `a`:";
        }
    }

    exSelect.addEventListener("change", () => { toggleInputs(); setupSimulation(); });
    aInput.addEventListener("input", setupSimulation);
    bInput.addEventListener("input", setupSimulation);
    arrInput.addEventListener("input", setupSimulation);

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
