const EXERCISE_GUIDES = {
    make_all: {
        title: "Makefile: all",
        pitfalls: "Compiles all source files (<code>.c</code>) into object files (<code>.o</code>), and groups them into a static library archive file (<code>libft.a</code>) using <code>ar</code> and <code>ranlib</code>.",
        questions: [
            "Why do we compile using the <code>-c</code> flag? (Compiles to object code without linking!)",
            "What do <code>ar rc</code> and <code>ranlib</code> do? (Creates the archive library and indexes it for faster linking!)"
        ]
    },
    make_clean: {
        title: "Makefile: clean",
        pitfalls: "Removes all intermediate object files (<code>.o</code>) created during compilation.",
        questions: [
            "Why clean intermediate object files? (Saves disk space and ensures clean builds!)"
        ]
    },
    make_fclean: {
        title: "Makefile: fclean",
        pitfalls: "Removes intermediate object files AND the final target output binary/library (<code>libft.a</code>).",
        questions: [
            "What is the difference between <code>clean</code> and <code>fclean</code>?"
        ]
    },
    make_re: {
        title: "Makefile: re",
        pitfalls: "Forces a complete rebuild from scratch by executing <code>fclean</code> first, then <code>all</code>.",
        questions: [
            "Why is <code>re</code> useful? (Guarantees that files aren't skipped by Makefile dependency checking if timestamps are out-of-sync)"
        ]
    }
};

const EXERCISE_CODE = {
    make_all: [
        "all: $(NAME)",
        "$(NAME): $(OBJS)",
        "    ar rc $(NAME) $(OBJS)",
        "    ranlib $(NAME)",
        "%.o: %.c",
        "    $(CC) $(CFLAGS) -c $< -o $@"
    ],
    make_clean: [
        "clean:",
        "    rm -f $(OBJS)"
    ],
    make_fclean: [
        "fclean: clean",
        "    rm -f $(NAME)"
    ],
    make_re: [
        "re: fclean all"
    ]
};

let simulationHistory = [];
let currentStateIndex = -1;
let currentGenerator = null;
let playbackInterval = null;
let simulationSpeed = 600;

// State files representation
const INITIAL_FILES = {
    sources: [
        { name: "ft_putchar.c", status: "ready" },
        { name: "ft_swap.c", status: "ready" },
        { name: "ft_putstr.c", status: "ready" },
        { name: "ft_strlen.c", status: "ready" },
        { name: "ft_strcmp.c", status: "ready" }
    ],
    objects: [
        { name: "ft_putchar.o", status: "absent" },
        { name: "ft_swap.o", status: "absent" },
        { name: "ft_putstr.o", status: "absent" },
        { name: "ft_strlen.o", status: "absent" },
        { name: "ft_strcmp.o", status: "absent" }
    ],
    library: [
        { name: "libft.a", status: "absent" }
    ]
};

// --- Generators ---

function* simulate_make_all(state) {
    let files = JSON.parse(JSON.stringify(state));

    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "make all: starting compilation targets.",
        logType: "system",
        activeLine: 1
    };

    const count = files.sources.length;

    // Compile each C file to O file
    for (let i = 0; i < count; i++) {
        files.sources[i].status = "compiling";
        yield {
            files: JSON.parse(JSON.stringify(files)),
            log: `gcc -Wall -Wextra -Werror -c ${files.sources[i].name} -o ${files.objects[i].name}`,
            logType: "step",
            activeLine: 6
        };

        files.sources[i].status = "ready";
        files.objects[i].status = "compiled";
        
        yield {
            files: JSON.parse(JSON.stringify(files)),
            log: `Compiled ${files.sources[i].name} successfully. Object file created.`,
            logType: "success",
            activeLine: 6
        };
    }

    // Archive
    files.objects.forEach(o => o.status = "archived");
    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "ar rc libft.a " + files.objects.map(o => o.name).join(" "),
        logType: "step",
        activeLine: 3
    };

    files.library[0].status = "archived";
    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "ranlib libft.a",
        logType: "step",
        activeLine: 4
    };

    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "Static library 'libft.a' compiled, archived, and indexed successfully.",
        logType: "success",
        activeLine: 4
    };
}

function* simulate_make_clean(state) {
    let files = JSON.parse(JSON.stringify(state));

    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "make clean: cleaning up object files.",
        logType: "system",
        activeLine: 1
    };

    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "rm -f " + files.objects.map(o => o.name).join(" "),
        logType: "step",
        activeLine: 2
    };

    files.objects.forEach(o => o.status = "deleted");

    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "All object files (.o) deleted.",
        logType: "success",
        activeLine: 2
    };
}

function* simulate_make_fclean(state) {
    let files = JSON.parse(JSON.stringify(state));

    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "make fclean: performing full clean.",
        logType: "system",
        activeLine: 1
    };

    // Clean objects
    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "rm -f " + files.objects.map(o => o.name).join(" "),
        logType: "step",
        activeLine: 1
    };
    files.objects.forEach(o => o.status = "deleted");

    // Clean library
    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "rm -f libft.a",
        logType: "step",
        activeLine: 2
    };
    files.library[0].status = "deleted";

    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "All compiled artifacts (objects & static library) deleted.",
        logType: "success",
        activeLine: 2
    };
}

function* simulate_make_re(state) {
    let files = JSON.parse(JSON.stringify(state));

    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "make re: triggering fclean, then rebuilding all.",
        logType: "system",
        activeLine: 1
    };

    // Fclean
    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "rm -f " + files.objects.map(o => o.name).join(" ") + " libft.a",
        logType: "step",
        activeLine: 1
    };
    files.objects.forEach(o => o.status = "deleted");
    files.library[0].status = "deleted";

    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "Rebuild trigger: starting compilation...",
        logType: "system",
        activeLine: 1
    };

    // Rebuild all
    const count = files.sources.length;
    for (let i = 0; i < count; i++) {
        files.sources[i].status = "compiling";
        files.objects[i].status = "absent";
        
        yield {
            files: JSON.parse(JSON.stringify(files)),
            log: `gcc -Wall -Wextra -Werror -c ${files.sources[i].name} -o ${files.objects[i].name}`,
            logType: "step",
            activeLine: 1
        };

        files.sources[i].status = "ready";
        files.objects[i].status = "compiled";
        
        yield {
            files: JSON.parse(JSON.stringify(files)),
            log: `Compiled ${files.sources[i].name}.`,
            logType: "success",
            activeLine: 1
        };
    }

    // Archive
    files.objects.forEach(o => o.status = "archived");
    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "ar rc libft.a " + files.objects.map(o => o.name).join(" "),
        logType: "step",
        activeLine: 1
    };

    files.library[0].status = "archived";
    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "ranlib libft.a",
        logType: "step",
        activeLine: 1
    };

    yield {
        files: JSON.parse(JSON.stringify(files)),
        log: "Rebuild completed.",
        logType: "success",
        activeLine: 1
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

function renderGraph(files) {
    // 1. Render Sources
    const colC = document.getElementById("col-c-files");
    // Clear old files keeping header
    while (colC.children.length > 1) colC.removeChild(colC.lastChild);
    
    files.sources.forEach(f => {
        const node = document.createElement("div");
        node.className = "file-node";
        if (f.status === "compiling") node.classList.add("compiling");
        node.innerHTML = `
            <span>${f.name}</span>
            <span class="node-tag tag-src">${f.status.toUpperCase()}</span>
        `;
        colC.appendChild(node);
    });

    // 2. Render Objects
    const colO = document.getElementById("col-o-files");
    while (colO.children.length > 1) colO.removeChild(colO.lastChild);
    
    files.objects.forEach(f => {
        const node = document.createElement("div");
        node.className = "file-node";
        if (f.status === "compiled") node.classList.add("compiled");
        if (f.status === "archived") node.classList.add("archived");
        if (f.status === "deleted") node.classList.add("deleted");
        node.innerHTML = `
            <span>${f.name}</span>
            <span class="node-tag tag-obj" style="background:${f.status === 'absent' ? '#4b5563' : ''}">${f.status.toUpperCase()}</span>
        `;
        colO.appendChild(node);
    });

    // 3. Render Library
    const colLib = document.getElementById("col-lib-files");
    while (colLib.children.length > 1) colLib.removeChild(colLib.lastChild);
    
    files.library.forEach(f => {
        const node = document.createElement("div");
        node.className = "file-node";
        if (f.status === "archived") node.classList.add("archived");
        if (f.status === "deleted") node.classList.add("deleted");
        node.innerHTML = `
            <span>${f.name}</span>
            <span class="node-tag tag-lib" style="background:${f.status === 'absent' ? '#4b5563' : ''}">${f.status.toUpperCase()}</span>
        `;
        colLib.appendChild(node);
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

    renderGraph(state.files);

    const consoleBox = document.getElementById("console-logs");
    const logLine = document.createElement("div");
    logLine.className = `log-line ${state.logType === 'step' ? 'system-log' : state.logType + '-log'}`;
    logLine.textContent = (state.logType === 'step' ? "bash-5.1$ " : "") + state.log;
    consoleBox.appendChild(logLine);
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

function setupSimulation() {
    stopPlayback();
    document.getElementById("console-logs").innerHTML = "";

    const exercise = document.getElementById("exercise-select").value;
    renderCode(exercise);

    simulationHistory = [];
    currentStateIndex = -1;

    // Build initial virtual file states based on previous simulations if any
    let initFiles = JSON.parse(JSON.stringify(INITIAL_FILES));

    // If starting clean/fclean, we assume files are already compiled so we can see them get deleted
    if (exercise === "make_clean" || exercise === "make_fclean") {
        initFiles.objects.forEach(o => o.status = "compiled");
        initFiles.library[0].status = "archived";
    }

    switch (exercise) {
        case "make_all":
            currentGenerator = simulate_make_all(initFiles);
            break;
        case "make_clean":
            currentGenerator = simulate_make_clean(initFiles);
            break;
        case "make_fclean":
            currentGenerator = simulate_make_fclean(initFiles);
            break;
        case "make_re":
            currentGenerator = simulate_make_re(initFiles);
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
            if (consoleBox.lastChild && !consoleBox.lastChild.textContent.includes("Complete")) {
                const logLine = document.createElement("div");
                logLine.className = "log-line success-log";
                logLine.textContent = "make: Target execution completed.";
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
            logLine.className = `log-line ${state.logType === 'step' ? 'system-log' : state.logType + '-log'}`;
            logLine.textContent = (state.logType === 'step' ? "bash-5.1$ " : "") + state.log;
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
    const speedSlider = document.getElementById("speed-slider");

    exSelect.addEventListener("change", setupSimulation);

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
