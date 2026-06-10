const EXERCISE_GUIDES = {
    ft_putchar: {
        title: "ft_putchar (ex00)",
        pitfalls: "Prints a single character to standard output.",
        questions: [
            "What is the system call used to write characters? (<code>write(1, &c, 1)</code>)"
        ]
    },
    ft_print_alphabet: {
        title: "ft_print_alphabet (ex01)",
        pitfalls: "Prints the lowercase alphabet in ascending order on a single line.",
        questions: [
            "What is the system call used to write characters? (<code>write(1, &c, 1)</code>)",
            "How does character comparison work in loops? (ASCII order <code>c <= 'z'</code>)"
        ]
    },
    ft_print_reverse_alphabet: {
        title: "ft_print_reverse_alphabet (ex02)",
        pitfalls: "Prints the lowercase alphabet in descending order.",
        questions: [
            "What is the starting character? (<code>'z'</code>)",
            "What is the loop control condition for decrements? (<code>c >= 'a'</code>)"
        ]
    },
    ft_print_numbers: {
        title: "ft_print_numbers (ex03)",
        pitfalls: "Prints numbers from 0 to 9 in ascending order.",
        questions: [
            "Are we printing raw integer values or character characters? (Hint: <code>'0'</code> is character ASCII 48!)"
        ]
    },
    ft_is_negative: {
        title: "ft_is_negative (ex04)",
        pitfalls: "Prints <code>'N'</code> if the integer parameter is negative, and <code>'P'</code> if it is positive or zero.",
        questions: [
            "Is 0 considered positive or negative in this exercise? (Prints <code>'P'</code>)"
        ]
    },
    ft_print_comb: {
        title: "ft_print_comb (ex05)",
        pitfalls: "Prints all combinations of three different digits in ascending order: <code>012, 013, ... 789</code>.",
        questions: [
            "Why does the first digit <code>a</code> stop at 7? (Because the remaining must be 8 and 9 to maintain ascending order)",
            "How do nested loops filter duplicates like <code>011</code> or out-of-order digits like <code>102</code>? (By initializing the inner loop relative to the outer one: <code>b = a + 1</code>, <code>c = b + 1</code>)"
        ]
    },
    ft_print_comb2: {
        title: "ft_print_comb2 (ex06)",
        pitfalls: "Prints all combinations of two two-digit numbers in ascending order: <code>00 01, 00 02, ... 98 99</code>.",
        questions: [
            "How do we represent two digit integers as characters? (Dividing and moduloing by 10: <code>n / 10 + '0'</code> and <code>n % 10 + '0'</code>)"
        ]
    },
    ft_putnbr: {
        title: "ft_putnbr (ex07)",
        pitfalls: "Displays an integer. Note the edge case for INT_MIN (-2147483648) which overflows if made positive.",
        questions: [
            "How does recursive division reverse the printing order of digits?"
        ]
    },
    ft_print_combn: {
        title: "ft_print_combn (ex08)",
        pitfalls: "Prints all combinations of n digits in ascending order.",
        questions: [
            "How does an array or recursion help generate combinations of variable length?"
        ]
    }
};

const EXERCISE_CODE = {
    ft_putchar: [
        "void ft_putchar(char c)",
        "{",
        "    write(1, &c, 1);",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_putchar('A');",
        "    return (0);",
        "}"
    ],
    ft_print_alphabet: [
        "void ft_print_alphabet(void)",
        "{",
        "    char c;",
        "",
        "    c = 'a';",
        "    while (c <= 'z')",
        "    {",
        "        write(1, &c, 1);",
        "        c++;",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_print_alphabet();",
        "    return (0);",
        "}"
    ],
    ft_print_reverse_alphabet: [
        "void ft_print_reverse_alphabet(void)",
        "{",
        "    char c;",
        "",
        "    c = 'z';",
        "    while (c >= 'a')",
        "    {",
        "        write(1, &c, 1);",
        "        c--;",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_print_reverse_alphabet();",
        "    return (0);",
        "}"
    ],
    ft_print_numbers: [
        "void ft_print_numbers(void)",
        "{",
        "    char c;",
        "",
        "    c = '0';",
        "    while (c <= '9')",
        "    {",
        "        write(1, &c, 1);",
        "        c++;",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_print_numbers();",
        "    return (0);",
        "}"
    ],
    ft_is_negative: [
        "void ft_is_negative(int n)",
        "{",
        "    if (n < 0)",
        "    {",
        "        write(1, \"N\", 1);",
        "    }",
        "    else",
        "    {",
        "        write(1, \"P\", 1);",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_is_negative(-5);",
        "    return (0);",
        "}"
    ],
    ft_print_comb: [
        "void ft_print_comb(void)",
        "{",
        "    int a; int b; int c;",
        "",
        "    a = 0;",
        "    while (a <= 7) {",
        "        b = a + 1;",
        "        while (b <= 8) {",
        "            c = b + 1;",
        "            while (c <= 9) {",
        "                print_digits(a, b, c);",
        "                c++;",
        "            }",
        "            b++;",
        "        }",
        "        a++;",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_print_comb();",
        "    return (0);",
        "}"
    ],
    ft_print_comb2: [
        "void ft_print_comb2(void)",
        "{",
        "    int a; int b;",
        "",
        "    a = 0;",
        "    while (a <= 98) {",
        "        b = a + 1;",
        "        while (b <= 99) {",
        "            print_pairs(a, b);",
        "            b++;",
        "        }",
        "        a++;",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_print_comb2();",
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
    ft_print_combn: [
        "void ft_print_combn(int n)",
        "{",
        "    int tab[10];",
        "    int i = 0;",
        "    while (i < n) { tab[i] = i; i++; }",
        "    while (1)",
        "    {",
        "        print_array(tab, n);",
        "        if (is_last_combo(tab, n)) break;",
        "        increment_combo(tab, n);",
        "    }",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_print_combn(3);",
        "    return (0);",
        "}"
    ]
};

let simulationHistory = [];
let currentStateIndex = -1;
let currentGenerator = null;
let playbackInterval = null;
let simulationSpeed = 300;

// --- Generators ---

function* simulate_putchar() {
    let output = [];
    yield {
        vars: [{ name: "c", val: "'A'" }],
        dest: [...output],
        log: "C function entry: ft_putchar('A').",
        logType: "system",
        activeLine: 3
    };

    output.push({ char: 'A', display: 'A', ascii: 65 });
    yield {
        vars: [{ name: "c", val: "'A'" }],
        dest: [...output],
        log: "Writing 'A' to stdout via write(1, &c, 1).",
        logType: "step",
        activeLine: 3
    };

    yield {
        vars: [{ name: "c", val: "'A'" }],
        dest: [...output],
        log: "Function returns.",
        logType: "success",
        activeLine: 4
    };
}

function* simulate_putnbr(nb) {
    let output = [];
    let stack = [];
    
    function* recurse(n) {
        stack.push(n);
        yield {
            vars: [{ name: "nb", val: n }],
            dest: [...output],
            log: `ft_putnbr called with ${n}`,
            logType: "step",
            activeLine: 3
        };

        if (n === -2147483648) {
            output.push({ char: '-', display: '-', ascii: 45 });
            output.push({ char: '2', display: '2', ascii: 50 });
            yield* recurse(147483648);
        } else if (n < 0) {
            output.push({ char: '-', display: '-', ascii: 45 });
            yield* recurse(-n);
        } else if (n >= 10) {
            yield* recurse(Math.floor(n / 10));
            yield* recurse(n % 10);
        } else {
            const char = String.fromCharCode(n + 48);
            output.push({ char: char, display: char, ascii: n + 48 });
            yield {
                vars: [{ name: "c", val: `'${char}'` }],
                dest: [...output],
                log: `Writing digit '${char}'`,
                logType: "step",
                activeLine: 20
            };
        }
        stack.pop();
    }
    
    yield* recurse(nb);
    yield {
        vars: [], dest: [...output],
        log: "ft_putnbr completed.",
        logType: "success",
        activeLine: 22
    };
}

function* simulate_print_combn(n) {
    let output = [];
    yield { vars: [], dest: [...output], log: `ft_print_combn(${n}) called.`, logType: "system", activeLine: 3 };
    
    if (n <= 0 || n >= 10) {
        yield { vars: [], dest: [...output], log: "n is invalid. Exiting.", logType: "warning", activeLine: 3 };
        return;
    }
    
    let tab = [];
    for(let i=0; i<n; i++) tab.push(i);
    
    let iterations = 0;
    while(true) {
        iterations++;
        const comboStr = tab.join('');
        for(let ch of comboStr) {
            output.push({ char: ch, display: ch, ascii: ch.charCodeAt(0) });
        }
        
        // check if last
        let isLast = true;
        for(let i=0; i<n; i++) {
            if (tab[i] !== (10 - n + i)) {
                isLast = false; break;
            }
        }
        
        if (!isLast) {
            output.push({ char: ',', display: ',', ascii: 44 });
            output.push({ char: ' ', display: 'space', ascii: 32 });
        }
        
        if (iterations <= 5 || isLast) {
            yield {
                vars: [{ name: "tab", val: `[${tab.join(',')}]` }],
                dest: [...output],
                log: `Outputting combination: ${comboStr}`,
                logType: "step",
                activeLine: 8
            };
        }
        
        if (isLast) break;
        
        // increment
        let i = n - 1;
        while (i >= 0 && tab[i] === 10 - n + i) {
            i--;
        }
        tab[i]++;
        for (let j = i + 1; j < n; j++) {
            tab[j] = tab[j - 1] + 1;
        }
    }
    
    yield { vars: [], dest: [...output], log: "All combinations printed.", logType: "success", activeLine: 12 };
}

function* simulate_print_alphabet() {
    let output = [];
    let ascii = 97; // 'a'

    yield {
        vars: [{ name: "c", val: "unset" }], dest: [...output],
        log: "Program execution begins at main() function. Calling ft_print_alphabet(). Execution control jumps inside the function.",
        logType: "system",
        activeLine: 15
    };

    yield {
        vars: [{ name: "c", val: "unset", ascii: 0 }], dest: [...output],
        log: "Entered ft_print_alphabet(). Local variable char c is declared in memory.",
        logType: "system",
        activeLine: 1
    };

    yield {
        vars: [{ name: "c", val: "'a'", ascii: 97 }], dest: [...output],
        log: "Initializing local loop variable: c = 'a';",
        logType: "system",
        activeLine: 5
    };

    while (ascii <= 122) {
        const char = String.fromCharCode(ascii);
        
        yield {
            vars: [{ name: "c", val: `'${char}'`, ascii: ascii }], dest: [...output],
            log: `Loop condition check: is c <= 'z'? -> '${char}' <= 'z' is true. Entering loop body.`,
            logType: "system",
            activeLine: 6
        };

        output.push({ char: char, display: char, ascii: ascii });
        yield {
            vars: [{ name: "c", val: `'${char}'`, ascii: ascii }], dest: [...output],
            log: `Executing write(1, &c, 1): outputting character '${char}' to file descriptor 1 (stdout).`,
            logType: "step",
            activeLine: 8
        };

        ascii++;
        const nextChar = ascii <= 122 ? String.fromCharCode(ascii) : 'z';
        yield {
            vars: [{ name: "c", val: `'${nextChar}'`, ascii: ascii }], dest: [...output],
            log: `Executing c++: incrementing character value (c is now '${nextChar}').`,
            logType: "system",
            activeLine: 9
        };
    }

    yield {
        vars: [{ name: "c", val: "'z' (exited)", ascii: 122 }], dest: [...output],
        log: "Loop condition check: c <= 'z' is false. Exiting loop. Execution reaches end of ft_print_alphabet().",
        logType: "system",
        activeLine: 11
    };

    yield {
        vars: [], dest: [...output],
        log: "Execution returns to main(). Running return (0); to exit the program.",
        logType: "success",
        activeLine: 16
    };

    yield {
        vars: [], dest: [...output],
        log: "Program exits successfully (Process return value: 0).",
        logType: "success",
        activeLine: 17
    };
}

function* simulate_print_reverse_alphabet() {
    let output = [];
    let ascii = 122; // 'z'

    yield {
        vars: [{ name: "c", val: "unset", ascii: 0 }], dest: [...output],
        log: "C function entry. Loop variable char c declared.",
        logType: "system",
        activeLine: 1
    };

    yield {
        vars: [{ name: "c", val: "'z'", ascii: 122 }], dest: [...output],
        log: "Initializing variable: c = 'z';",
        logType: "system",
        activeLine: 5
    };

    while (ascii >= 97) {
        const char = String.fromCharCode(ascii);
        
        yield {
            vars: [{ name: "c", val: `'${char}'`, ascii: ascii }], dest: [...output],
            log: `Loop condition check: c >= 'a' -> '${char}' >= 'a' is true.`,
            logType: "system",
            activeLine: 6
        };

        output.push({ char: char, display: char, ascii: ascii });
        yield {
            vars: [{ name: "c", val: `'${char}'`, ascii: ascii }], dest: [...output],
            log: `Writing character '${char}' to stdout.`,
            logType: "step",
            activeLine: 8
        };

        ascii--;
        const nextChar = ascii >= 97 ? String.fromCharCode(ascii) : 'a';
        yield {
            vars: [{ name: "c", val: `'${nextChar}'`, ascii: ascii }], dest: [...output],
            log: `Decrementing variable: c-- (c is now '${nextChar}').`,
            logType: "system",
            activeLine: 9
        };
    }

    yield {
        vars: [{ name: "c", val: "'a' (exited)", ascii: 97 }], dest: [...output],
        log: "Loop condition: c >= 'a' is false. Exiting function.",
        logType: "success",
        activeLine: 11
    };
}

function* simulate_print_numbers() {
    let output = [];
    let ascii = 48; // '0'

    yield {
        vars: [{ name: "c", val: "unset", ascii: 0 }], dest: [...output],
        log: "C function entry. Loop variable char c declared.",
        logType: "system",
        activeLine: 1
    };

    yield {
        vars: [{ name: "c", val: "'0'", ascii: 48 }], dest: [...output],
        log: "Initializing variable: c = '0';",
        logType: "system",
        activeLine: 5
    };

    while (ascii <= 57) {
        const char = String.fromCharCode(ascii);
        
        yield {
            vars: [{ name: "c", val: `'${char}'`, ascii: ascii }], dest: [...output],
            log: `Loop condition check: c <= '9' -> '${char}' <= '9' is true.`,
            logType: "system",
            activeLine: 6
        };

        output.push({ char: char, display: char, ascii: ascii });
        yield {
            vars: [{ name: "c", val: `'${char}'`, ascii: ascii }], dest: [...output],
            log: `Writing character '${char}' to stdout.`,
            logType: "step",
            activeLine: 8
        };

        ascii++;
        const nextChar = ascii <= 57 ? String.fromCharCode(ascii) : '9';
        yield {
            vars: [{ name: "c", val: `'${nextChar}'`, ascii: ascii }], dest: [...output],
            log: `Incrementing variable: c++ (c is now '${nextChar}').`,
            logType: "system",
            activeLine: 9
        };
    }

    yield {
        vars: [{ name: "c", val: "'9' (exited)", ascii: 57 }], dest: [...output],
        log: "Loop condition: c <= '9' is false. Exiting function.",
        logType: "success",
        activeLine: 11
    };
}

function* simulate_is_negative(n) {
    let output = [];

    yield {
        vars: [{ name: "n", val: n, ascii: 0 }], dest: [...output],
        log: `C function entry: ft_is_negative(n = ${n}).`,
        logType: "system",
        activeLine: 1
    };

    yield {
        vars: [{ name: "n", val: n, ascii: 0 }], dest: [...output],
        log: `Checking conditional block: if (n < 0) -> ${n} < 0 is ${n < 0 ? 'true' : 'false'}.`,
        logType: "system",
        activeLine: 3
    };

    if (n < 0) {
        output.push({ char: 'N', display: 'N', ascii: 78 });
        yield {
            vars: [{ name: "n", val: n, ascii: 0 }], dest: [...output],
            log: "Condition true. Outputting character 'N'.",
            logType: "success",
            activeLine: 5
        };
    } else {
        output.push({ char: 'P', display: 'P', ascii: 80 });
        yield {
            vars: [{ name: "n", val: n, ascii: 0 }], dest: [...output],
            log: "Condition false. Outputting character 'P'.",
            logType: "success",
            activeLine: 9
        };
    }

    yield {
        vars: [{ name: "n", val: n, ascii: 0 }], dest: [...output],
        log: "Function finished.",
        logType: "success",
        activeLine: 12
    };
}

function* simulate_print_comb() {
    let output = [];
    let a = 0, b = 1, c = 2;

    yield {
        vars: [{ name: "a", val: "unset" }, { name: "b", val: "unset" }, { name: "c", val: "unset" }],
        dest: [...output],
        log: "C function entry: ft_print_comb(). Variables declared.",
        logType: "system",
        activeLine: 1
    };

    a = 0;
    yield {
        vars: [{ name: "a", val: a }, { name: "b", val: "unset" }, { name: "c", val: "unset" }],
        dest: [...output],
        log: "Initializing outer loop variable: a = 0;",
        logType: "system",
        activeLine: 5
    };

    let count = 0;
    for (a = 0; a <= 7; a++) {
        yield {
            vars: [{ name: "a", val: a }, { name: "b", val: b }, { name: "c", val: c }],
            dest: [...output],
            log: `Loop condition check: while (a <= 7) -> ${a} <= 7 is true.`,
            logType: "system",
            activeLine: 6
        };

        b = a + 1;
        yield {
            vars: [{ name: "a", val: a }, { name: "b", val: b }, { name: "c", val: c }],
            dest: [...output],
            log: `Initializing middle loop variable: b = a + 1 -> b = ${b};`,
            logType: "system",
            activeLine: 7
        };

        for (b = a + 1; b <= 8; b++) {
            c = b + 1;
            for (c = b + 1; c <= 9; c++) {
                count++;
                
                const combStr = `${a}${b}${c}`;
                
                for (let ch of combStr) {
                    output.push({ char: ch, display: ch, ascii: ch.charCodeAt(0) });
                }

                if (!(a === 7 && b === 8 && c === 9)) {
                    output.push({ char: ',', display: ',', ascii: 44 });
                    output.push({ char: ' ', display: 'space', ascii: 32 });
                }

                if (count <= 4 || (a === 7 && b === 8 && c === 9)) {
                    yield {
                        vars: [{ name: "a", val: a }, { name: "b", val: b }, { name: "c", val: c }],
                        dest: [...output],
                        log: `Outputting combination: ${combStr}.`,
                        logType: "step",
                        activeLine: 11
                    };
                } else if (count === 5) {
                    yield {
                        vars: [{ name: "a", val: a }, { name: "b", val: b }, { name: "c", val: c }],
                        dest: [...output],
                        log: "...[Simulation fast-forwarding iterations]...",
                        logType: "warning",
                        activeLine: 11
                    };
                }
            }
        }
    }

    yield {
        vars: [{ name: "a", val: 7 }, { name: "b", val: 8 }, { name: "c", val: 9 }],
        dest: [...output],
        log: "Outer loop exited (a > 7). Function complete.",
        logType: "success",
        activeLine: 18
    };
}

function* simulate_print_comb2() {
    let output = [];
    let a = 0, b = 1;

    yield {
        vars: [{ name: "a", val: "unset" }, { name: "b", val: "unset" }],
        dest: [...output],
        log: "C function entry: ft_print_comb2(). Variables declared.",
        logType: "system",
        activeLine: 1
    };

    a = 0;
    yield {
        vars: [{ name: "a", val: "00" }, { name: "b", val: "unset" }],
        dest: [...output],
        log: "Initializing loop: a = 0;",
        logType: "system",
        activeLine: 5
    };

    let count = 0;
    for (a = 0; a <= 98; a++) {
        const aStr = a.toString().padStart(2, '0');
        
        b = a + 1;
        const bStr = b.toString().padStart(2, '0');
        
        count++;
        
        const termStr = `${aStr} ${bStr}`;

        for (let ch of termStr) {
            output.push({ char: ch, display: ch === ' ' ? 'space' : ch, ascii: ch.charCodeAt(0) });
        }

        if (!(a === 98 && b === 99)) {
            output.push({ char: ',', display: ',', ascii: 44 });
            output.push({ char: ' ', display: 'space', ascii: 32 });
        }

        if (count <= 4 || (a === 98 && b === 99)) {
            yield {
                vars: [{ name: "a", val: aStr }, { name: "b", val: bStr }],
                dest: [...output],
                log: `Outputting pair: ${termStr}.`,
                logType: "step",
                activeLine: 9
            };
        } else if (count === 5) {
            yield {
                vars: [{ name: "a", val: aStr }, { name: "b", val: bStr }],
                dest: [...output],
                log: "...[Simulation fast-forwarding iterations]...",
                logType: "warning",
                activeLine: 9
            };
        }
    }

    yield {
        vars: [{ name: "a", val: "98" }, { name: "b", val: "99" }],
        dest: [...output],
        log: "Loop terminated.",
        logType: "success",
        activeLine: 15
    };
}


// --- DOM Renderer ---

function renderCode(exercise) {
    const box = document.getElementById("code-viewer-box");
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

function renderVars(vars) {
    const container = document.getElementById("src-buffer");
    container.innerHTML = "";

    vars.forEach(v => {
        const cell = document.createElement("div");
        cell.className = "cell";
        
        const idxDiv = document.createElement("div");
        idxDiv.className = "cell-idx";
        idxDiv.textContent = v.name;
        
        const valDiv = document.createElement("div");
        valDiv.className = "cell-val";
        valDiv.textContent = v.val;
        valDiv.style.color = "var(--accent-warning)";

        const metaDiv = document.createElement("div");
        metaDiv.className = "cell-meta";
        metaDiv.textContent = v.ascii ? "ASCII " + v.ascii : "-";

        cell.appendChild(idxDiv);
        cell.appendChild(valDiv);
        cell.appendChild(metaDiv);
        container.appendChild(cell);
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
        if (item.char === ',' || item.char === ' ') valDiv.style.color = "var(--text-muted)";

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
    renderVars(state.vars);
    renderTerminalOutput(state.dest);

    // Highlight code line
    document.querySelectorAll(".code-line").forEach(l => l.classList.remove("active-line-highlight"));
    if (state.activeLine) {
        const activeEl = document.getElementById(`code-line-${state.activeLine}`);
        if (activeEl) {
            activeEl.classList.add("active-line-highlight");
            activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }

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
    const nbrVal = parseInt(document.getElementById("nbr-input").value) || 0;

    // Render code
    renderCode(exercise);

    simulationHistory = [];
    currentStateIndex = -1;

    switch (exercise) {
        case "ft_putchar":
            currentGenerator = simulate_putchar();
            break;
        case "ft_print_alphabet":
            currentGenerator = simulate_print_alphabet();
            break;
        case "ft_print_reverse_alphabet":
            currentGenerator = simulate_print_reverse_alphabet();
            break;
        case "ft_print_numbers":
            currentGenerator = simulate_print_numbers();
            break;
        case "ft_is_negative":
            currentGenerator = simulate_is_negative(nbrVal);
            break;
        case "ft_print_comb":
            currentGenerator = simulate_print_comb();
            break;
        case "ft_print_comb2":
            currentGenerator = simulate_print_comb2();
            break;
        case "ft_putnbr":
            currentGenerator = simulate_putnbr(nbrVal);
            break;
        case "ft_print_combn":
            currentGenerator = simulate_print_combn(nbrVal);
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
    const nbrInput = document.getElementById("nbr-input");
    const speedSlider = document.getElementById("speed-slider");

    function toggleInputs() {
        const ex = exSelect.value;
        const needsInput = ["ft_is_negative", "ft_putnbr", "ft_print_combn"].includes(ex);
        document.getElementById("number-input-group").style.display = needsInput ? "flex" : "none";
        
        if (ex === "ft_print_combn") {
            document.querySelector("#number-input-group label").textContent = "Number Input (n):";
            document.querySelector("#number-input-group small").textContent = "Used for ft_print_combn (1-9)";
        } else if (ex === "ft_putnbr") {
            document.querySelector("#number-input-group label").textContent = "Number Input (nb):";
            document.querySelector("#number-input-group small").textContent = "Used for ft_putnbr";
        } else {
            document.querySelector("#number-input-group label").textContent = "Number Input (n):";
            document.querySelector("#number-input-group small").textContent = "Used for ft_is_negative";
        }
    }

    exSelect.addEventListener("change", () => { toggleInputs(); setupSimulation(); });
    nbrInput.addEventListener("input", setupSimulation);

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
