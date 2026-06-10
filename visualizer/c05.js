const EXERCISE_GUIDES = {
    ft_iterative_factorial: {
        title: "ft_iterative_factorial (ex00)",
        pitfalls: "Calculates the factorial of a number using a loop. Handles negative values (returns 0).",
        questions: [
            "What happens if <code>nb</code> is 0? (Should return 1!)",
            "Why is the iterative method more memory efficient than the recursive method?"
        ]
    },
    ft_recursive_factorial: {
        title: "ft_recursive_factorial (ex01)",
        pitfalls: "Calculates the factorial of a number using recursion.",
        questions: [
            "Observe the Call Stack building up. How many frames are pushed before the base case is reached?",
            "What happens if there is no base case? (Infinite recursion -> Stack Overflow!)"
        ]
    },
    ft_iterative_power: {
        title: "ft_iterative_power (ex02)",
        pitfalls: "Calculates a base raised to a power using a loop. Negative powers return 0, power of 0 returns 1.",
        questions: [
            "Why does power 0 return 1 for any base? (Mathematical standard)"
        ]
    },
    ft_recursive_power: {
        title: "ft_recursive_power (ex03)",
        pitfalls: "Calculates a base raised to a power recursively.",
        questions: [
            "Observe how each frame holds the base value and waits for the sub-calculation to return."
        ]
    },
    ft_fibonacci: {
        title: "ft_fibonacci (ex04)",
        pitfalls: "Calculates the n-th Fibonacci number recursively. <strong>Note:</strong> Fibonacci is a double recursion, branching the stack tree!",
        questions: [
            "Why is recursive Fibonacci highly inefficient? (Hint: notice the redundant sub-problems like calculating fib(2) multiple times)",
            "What value is returned for negative indices? (Should return -1!)"
        ]
    },
    ft_sqrt: {
        title: "ft_sqrt (ex05)",
        pitfalls: "Returns the square root of a number if it is an integer. Otherwise returns 0.",
        questions: [
            "What is the mathematical bounds of our search? (<code>i * i <= nb</code>)",
            "Why return 0 if the square root is not a whole integer? (e.g. sqrt(10) -> 0)"
        ]
    },
    ft_is_prime: {
        title: "ft_is_prime (ex06)",
        pitfalls: "Checks if a number is prime (only divisible by 1 and itself). Returns 1 or 0.",
        questions: [
            "Why does checking up to <code>sqrt(nb)</code> suffice? (Efficiency improvement)",
            "Why are numbers <= 1 not prime?"
        ]
    },
    ft_find_next_prime: {
        title: "ft_find_next_prime (ex07)",
        pitfalls: "Finds the next prime number greater than or equal to the input.",
        questions: [
            "Observe how it calls <code>is_prime</code> sequentially inside a loop until it finds a prime."
        ]
    }
};

const EXERCISE_CODE = {
    ft_iterative_factorial: [
        "int ft_iterative_factorial(int nb)",
        "{",
        "    int res = 1;",
        "    if (nb < 0) return (0);",
        "    while (nb > 0) {",
        "        res *= nb;",
        "        nb--;",
        "    }",
        "    return (res);",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_iterative_factorial(5);",
        "    return (0);",
        "}"
    ],
    ft_recursive_factorial: [
        "int ft_recursive_factorial(int nb)",
        "{",
        "    if (nb < 0) return (0);",
        "    if (nb == 0) return (1);",
        "    return (nb * ft_recursive_factorial(nb - 1));",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_recursive_factorial(5);",
        "    return (0);",
        "}"
    ],
    ft_iterative_power: [
        "int ft_iterative_power(int nb, int power)",
        "{",
        "    int res = 1;",
        "    if (power < 0) return (0);",
        "    while (power > 0) {",
        "        res *= nb;",
        "        power--;",
        "    }",
        "    return (res);",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_iterative_power(5, 3);",
        "    return (0);",
        "}"
    ],
    ft_recursive_power: [
        "int ft_recursive_power(int nb, int power)",
        "{",
        "    if (power < 0) return (0);",
        "    if (power == 0) return (1);",
        "    return (nb * ft_recursive_power(nb, power - 1));",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_recursive_power(5, 3);",
        "    return (0);",
        "}"
    ],
    ft_fibonacci: [
        "int ft_fibonacci(int index)",
        "{",
        "    if (index < 0) return (-1);",
        "    if (index == 0) return (0);",
        "    if (index == 1) return (1);",
        "    return (ft_fibonacci(index - 1) + ft_fibonacci(index - 2));",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_fibonacci(5);",
        "    return (0);",
        "}"
    ],
    ft_sqrt: [
        "int ft_sqrt(int nb)",
        "{",
        "    int i = 1;",
        "    if (nb <= 0) return (0);",
        "    while (i * i <= nb) {",
        "        if (i * i == nb) return (i);",
        "        i++;",
        "    }",
        "    return (0);",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_sqrt(25);",
        "    return (0);",
        "}"
    ],
    ft_is_prime: [
        "int ft_is_prime(int nb)",
        "{",
        "    int i = 2;",
        "    if (nb <= 1) return (0);",
        "    while (i * i <= nb) {",
        "        if (nb % i == 0) return (0);",
        "        i++;",
        "    }",
        "    return (1);",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_is_prime(17);",
        "    return (0);",
        "}"
    ],
    ft_find_next_prime: [
        "int ft_find_next_prime(int nb)",
        "{",
        "    if (nb <= 2) return (2);",
        "    while (!ft_is_prime(nb))",
        "        nb++;",
        "    return (nb);",
        "}",
        "",
        "int main(void)",
        "{",
        "    ft_find_next_prime(14);",
        "    return (0);",
        "}"
    ]
};

let simulationHistory = [];
let currentStateIndex = -1;
let currentGenerator = null;
let playbackInterval = null;
let simulationSpeed = 600;

// --- Generators ---

function* simulate_iterative_factorial(nb) {
    let stack = [{ name: "main()", args: `nb = ${nb}`, val: "running", status: "active" }];
    yield { stack: [...stack], log: "Entering ft_iterative_factorial.", logType: "system", activeLine: 3 };

    if (nb < 0) {
        stack[0].val = "0";
        yield { stack: [...stack], log: "nb < 0. Factorial of negative numbers is undefined. Returning 0.", logType: "warning", activeLine: 4 };
        return;
    }
    if (nb === 0) {
        stack[0].val = "1";
        yield { stack: [...stack], log: "nb = 0. Returning 1.", logType: "success", activeLine: 4 };
        return;
    }

    let result = 1;
    let i = 1;
    while (i <= nb) {
        result *= i;
        stack[0].args = `nb = ${nb}, i = ${i}, result = ${result}`;
        yield {
            stack: [...stack], 
            log: `Iteration i = ${i}: result = result * i -> result = ${result}.`, 
            logType: "step",
            activeLine: 6
        };
        i++;
    }

    stack[0].val = result.toString();
    yield { stack: [...stack], log: `Loop completed. Returning result: ${result}.`, logType: "success", activeLine: 9 };
}

function* simulate_recursive_factorial(nb) {
    let stack = [];
    
    function* recurse(n) {
        if (n < 0) {
            stack.push({ name: `ft_recursive_factorial(${n})`, args: "nb < 0", val: "0", status: "returning" });
            yield { stack: [...stack], log: `nb (${n}) < 0: Invalid base. Returning 0.`, logType: "warning", activeLine: 3 };
            stack.pop();
            return 0;
        }
        if (n === 0) {
            stack.push({ name: `ft_recursive_factorial(${n})`, args: "base case", val: "1", status: "returning" });
            yield { stack: [...stack], log: "Base case reached: factorial(0) = 1. Returning 1.", logType: "success", activeLine: 4 };
            stack.pop();
            return 1;
        }

        const currentFrame = { name: `ft_recursive_factorial(${n})`, args: `nb = ${n}`, val: "pending", status: "active" };
        stack.push(currentFrame);
        yield { stack: [...stack], log: `Calling ft_recursive_factorial(${n - 1}) to solve: ${n} * factorial(${n - 1}).`, logType: "step", activeLine: 5 };

        const sub = yield* recurse(n - 1);
        
        // Update current frame status to returning
        const idx = stack.findIndex(f => f.name === `ft_recursive_factorial(${n})`);
        if (idx !== -1) {
            stack[idx].val = `${n} * ${sub} = ${n * sub}`;
            stack[idx].status = "returning";
        }
        
        const ans = n * sub;
        yield { stack: [...stack], log: `Evaluating stack: factorial(${n}) = ${n} * factorial(${n-1}) -> ${ans}.`, logType: "success", activeLine: 5 };
        stack.pop();
        return ans;
    }

    yield* recurse(nb);
}

function* simulate_iterative_power(nb, power) {
    let stack = [{ name: "main()", args: `nb = ${nb}, power = ${power}`, val: "running", status: "active" }];
    yield { stack: [...stack], log: "Entering ft_iterative_power.", logType: "system", activeLine: 3 };

    if (power < 0) {
        stack[0].val = "0";
        yield { stack: [...stack], log: "Power is negative. Returning 0.", logType: "warning", activeLine: 4 };
        return;
    }
    if (power === 0) {
        stack[0].val = "1";
        yield { stack: [...stack], log: "Power is 0. Returning 1.", logType: "success", activeLine: 4 };
        return;
    }

    let result = 1;
    let i = 0;
    while (i < power) {
        result *= nb;
        stack[0].args = `nb = ${nb}, power = ${power}, i = ${i + 1}/${power}, result = ${result}`;
        yield {
            stack: [...stack],
            log: `Multiply iteration ${i + 1}: result = ${result}.`,
            logType: "step",
            activeLine: 6
        };
        i++;
    }

    stack[0].val = result.toString();
    yield { stack: [...stack], log: `Completed. Returning ${result}.`, logType: "success", activeLine: 9 };
}

function* simulate_recursive_power(nb, power) {
    let stack = [];

    function* recurse(n, p) {
        if (p < 0) {
            stack.push({ name: `ft_recursive_power(${n}, ${p})`, args: "power < 0", val: "0", status: "returning" });
            yield { stack: [...stack], log: "power < 0: returning 0.", logType: "warning", activeLine: 3 };
            stack.pop();
            return 0;
        }
        if (p === 0) {
            stack.push({ name: `ft_recursive_power(${n}, ${p})`, args: "base case", val: "1", status: "returning" });
            yield { stack: [...stack], log: `Base case reached: power(${n}, 0) = 1. Returning 1.`, logType: "success", activeLine: 4 };
            stack.pop();
            return 1;
        }

        const currentFrame = { name: `ft_recursive_power(${n}, ${p})`, args: `nb = ${n}, p = ${p}`, val: "pending", status: "active" };
        stack.push(currentFrame);
        yield { stack: [...stack], log: `Calling ft_recursive_power(${n}, ${p - 1}) to solve: ${n} * power(${n}, ${p - 1}).`, logType: "step", activeLine: 5 };

        const sub = yield* recurse(n, p - 1);
        
        const idx = stack.findIndex(f => f.name === `ft_recursive_power(${n}, ${p})`);
        if (idx !== -1) {
            stack[idx].val = `${n} * ${sub} = ${n * sub}`;
            stack[idx].status = "returning";
        }

        const ans = n * sub;
        yield { stack: [...stack], log: `Evaluating power(${n}, ${p}) = ${n} * ${sub} -> ${ans}.`, logType: "success", activeLine: 5 };
        stack.pop();
        return ans;
    }

    yield* recurse(nb, power);
}

function* simulate_fibonacci(index) {
    let stack = [];

    function* recurse(idx) {
        if (idx < 0) {
            stack.push({ name: `ft_fibonacci(${idx})`, args: "idx < 0", val: "-1", status: "returning" });
            yield { stack: [...stack], log: `Index (${idx}) is negative. Returning -1.`, logType: "warning", activeLine: 3 };
            stack.pop();
            return -1;
        }
        if (idx === 0) {
            stack.push({ name: `ft_fibonacci(${idx})`, args: "base case", val: "0", status: "returning" });
            yield { stack: [...stack], log: "Base case: fib(0) = 0.", logType: "success", activeLine: 4 };
            stack.pop();
            return 0;
        }
        if (idx === 1) {
            stack.push({ name: `ft_fibonacci(${idx})`, args: "base case", val: "1", status: "returning" });
            yield { stack: [...stack], log: "Base case: fib(1) = 1.", logType: "success", activeLine: 5 };
            stack.pop();
            return 1;
        }

        const currentFrame = { name: `ft_fibonacci(${idx})`, args: `idx = ${idx}`, val: "pending", status: "active" };
        stack.push(currentFrame);
        yield { stack: [...stack], log: `Evaluating fib(${idx}): calling sub-problem fib(${idx - 1}).`, logType: "step", activeLine: 6 };

        const left = yield* recurse(idx - 1);
        
        const fIdx = stack.findIndex(f => f.name === `ft_fibonacci(${idx})`);
        if (fIdx !== -1) {
            stack[fIdx].val = `fib(${idx-1})=${left} + fib(${idx-2})=?`;
        }

        yield { stack: [...stack], log: `Evaluating fib(${idx}): calling sub-problem fib(${idx - 2}).`, logType: "step", activeLine: 6 };
        const right = yield* recurse(idx - 2);

        const fIdx2 = stack.findIndex(f => f.name === `ft_fibonacci(${idx})`);
        if (fIdx2 !== -1) {
            stack[fIdx2].val = `${left} + ${right} = ${left + right}`;
            stack[fIdx2].status = "returning";
        }

        const ans = left + right;
        yield { stack: [...stack], log: `Resolved fib(${idx}) = fib(${idx-1}) + fib(${idx-2}) -> ${left} + ${right} = ${ans}.`, logType: "success", activeLine: 6 };
        stack.pop();
        return ans;
    }

    yield* recurse(index);
}

function* simulate_sqrt(nb) {
    let stack = [{ name: "main()", args: `nb = ${nb}`, val: "running", status: "active" }];
    yield { stack: [...stack], log: `Entering ft_sqrt(nb = ${nb}). Searching search space.`, logType: "system", activeLine: 3 };

    if (nb <= 0) {
        stack[0].val = "0";
        yield { stack: [...stack], log: `Number ${nb} is <= 0. Square root is 0 or undefined in unsigned space. Returning 0.`, logType: "warning", activeLine: 4 };
        return;
    }

    let i = 1;
    while (i * i <= nb) {
        stack[0].args = `nb = ${nb}, i = ${i}, i * i = ${i * i}`;
        yield {
            stack: [...stack],
            log: `Checking index i = ${i}: i * i = ${i * i}.`,
            logType: "step",
            activeLine: 5
        };
        
        if (i * i === nb) {
            stack[0].val = i.toString();
            yield { stack: [...stack], log: `Perfect square root found! ${i} * ${i} == ${nb}. Returning ${i}.`, logType: "success", activeLine: 6 };
            return;
        }
        i++;
    }

    stack[0].val = "0";
    yield { stack: [...stack], log: `Loop exited (i * i = ${i * i} > ${nb}). Not a perfect square. Returning 0.`, logType: "warning", activeLine: 9 };
}

function* simulate_is_prime(nb) {
    let stack = [{ name: "main()", args: `nb = ${nb}`, val: "running", status: "active" }];
    yield { stack: [...stack], log: `Entering ft_is_prime(nb = ${nb}).`, logType: "system", activeLine: 3 };

    if (nb <= 1) {
        stack[0].val = "0";
        yield { stack: [...stack], log: `${nb} is less than or equal to 1. Not prime. Returning 0.`, logType: "warning", activeLine: 4 };
        return;
    }

    let i = 2;
    while (i * i <= nb) {
        stack[0].args = `nb = ${nb}, checking factor i = ${i}, nb % i = ${nb % i}`;
        yield {
            stack: [...stack],
            log: `Checking divisibility by i = ${i}. remainder = ${nb % i}.`,
            logType: "step",
            activeLine: 6
        };

        if (nb % i === 0) {
            stack[0].val = "0";
            yield { stack: [...stack], log: `Divisible by factor ${i}! Not a prime. Returning 0.`, logType: "warning", activeLine: 6 };
            return;
        }
        i++;
    }

    stack[0].val = "1";
    yield { stack: [...stack], log: `No factors found up to sqrt(${nb}). ${nb} is PRIME. Returning 1.`, logType: "success", activeLine: 9 };
}

function* simulate_find_next_prime(nb) {
    let stack = [{ name: "main()", args: `nb = ${nb}`, val: "running", status: "active" }];
    yield { stack: [...stack], log: `Entering ft_find_next_prime(nb = ${nb}).`, logType: "system", activeLine: 3 };

    let candidate = nb;
    if (candidate <= 2) {
        stack[0].val = "2";
        yield { stack: [...stack], log: "Candidate <= 2. Next prime is 2.", logType: "success", activeLine: 3 };
        return;
    }

    while (true) {
        stack[0].args = `checking prime candidate = ${candidate}`;
        yield {
            stack: [...stack],
            log: `Testing candidate ${candidate} for primality...`,
            logType: "step",
            activeLine: 4
        };

        // Inner primality test
        let isPrime = true;
        let i = 2;
        while (i * i <= candidate) {
            if (candidate % i === 0) {
                isPrime = false;
                break;
            }
            i++;
        }

        if (isPrime) {
            stack[0].val = candidate.toString();
            yield { stack: [...stack], log: `Found prime: ${candidate}! Returning value.`, logType: "success", activeLine: 6 };
            break;
        } else {
            yield {
                stack: [...stack],
                log: `${candidate} is not prime. Incrementing...`,
                logType: "warning",
                activeLine: 5
            };
            candidate++;
        }
    }
}


// --- Stack Renderer ---



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
    const container = document.getElementById("stack-frame-container");
    container.innerHTML = "";

    if (stack.length === 0) {
        container.innerHTML = `<div class="cell-placeholder">Empty Stack</div>`;
        return;
    }

    stack.forEach(frame => {
        const frameDiv = document.createElement("div");
        frameDiv.className = "stack-frame";
        
        if (frame.status === "active") {
            frameDiv.classList.add("active-frame");
        } else if (frame.status === "returning") {
            frameDiv.classList.add("returning");
        }

        frameDiv.innerHTML = `
            <div>
                <div style="font-weight: 600; color: #fff;">${frame.name}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${frame.args}</div>
            </div>
            <div class="stack-val">${frame.val}</div>
        `;
        container.appendChild(frameDiv);
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
    const nb = parseInt(document.getElementById("nb-input").value) || 0;
    const power = parseInt(document.getElementById("power-input").value) || 0;

    simulationHistory = [];
    currentStateIndex = -1;

    switch (exercise) {
        case "ft_iterative_factorial":
            currentGenerator = simulate_iterative_factorial(nb);
            break;
        case "ft_recursive_factorial":
            currentGenerator = simulate_recursive_factorial(Math.min(nb, 8)); // Capping recursive stack sizes for browser readability
            break;
        case "ft_iterative_power":
            currentGenerator = simulate_iterative_power(nb, power);
            break;
        case "ft_recursive_power":
            currentGenerator = simulate_recursive_power(nb, Math.min(power, 8));
            break;
        case "ft_fibonacci":
            currentGenerator = simulate_fibonacci(Math.min(nb, 5)); // Fibonacci stack tree is heavy, cap at index 5
            break;
        case "ft_sqrt":
            currentGenerator = simulate_sqrt(nb);
            break;
        case "ft_is_prime":
            currentGenerator = simulate_is_prime(nb);
            break;
        case "ft_find_next_prime":
            currentGenerator = simulate_find_next_prime(nb);
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
    const nbInput = document.getElementById("nb-input");
    const powerInput = document.getElementById("power-input");
    const speedSlider = document.getElementById("speed-slider");

    function toggleInputs() {
        const ex = exSelect.value;
        const nbGroup = document.getElementById("nb-input-group");
        const powerGroup = document.getElementById("power-input-group");
        const nbLabel = nbGroup.querySelector("label");

        nbGroup.style.display = "flex";
        powerGroup.style.display = (ex === "ft_iterative_power" || ex === "ft_recursive_power") ? "flex" : "none";
        
        if (ex === "ft_fibonacci") {
            nbLabel.textContent = "Fibonacci Index (index):";
        } else {
            nbLabel.textContent = "Number Input (nb):";
        }
    }

    exSelect.addEventListener("change", () => { toggleInputs(); setupSimulation(); });
    nbInput.addEventListener("input", setupSimulation);
    powerInput.addEventListener("input", setupSimulation);

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
