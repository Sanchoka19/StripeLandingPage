// main container animation
const lines = document.querySelectorAll('.line');
const lineSquareMap = {
    line1: 'payments',
    line2: 'terminal',
    line3: 'data',
    line4: 'integration',
    line5: 'security',
    line6: 'square10',
    line7: 'square11',
    line8: 'square9',
    line9: 'square13',
    line10: 'square14',
    line11: 'square17', // This ID is missing in your HTML!
    line12: 'square7',
    line13: 'square12',
    line14: 'square15',
    line15: 'square8',
    line16: 'square16',
    line17: 'connect',
    line18: 'data',
};

const numLines = lines.length;

function animateLine(line) {
    line.classList.remove('animate');
    void line.offsetWidth; // Trigger reflow for animation restart
    line.classList.add('animate');
}

function highlightSquare(line) {
    const targetSquareId = lineSquareMap[line.id];

    if (targetSquareId) {
        const targetSquare = document.getElementById(targetSquareId);
        if (targetSquare) {
            targetSquare.classList.add('highlighted');
            setTimeout(() => targetSquare.classList.remove('highlighted'), 500);
        } else {
            console.warn(`Square with ID "${targetSquareId}" not found for line ${line.id}`);
        }
    }
}

function toggleRandomLine() {
    const randomIndex = Math.floor(Math.random() * numLines);
    const randomLine = lines[randomIndex];

    if (randomLine && randomLine.classList) { // Check if randomLine is valid
        if (randomLine.classList.contains('hidden')) {
            randomLine.classList.remove('hidden');
            animateLine(randomLine);
            highlightSquare(randomLine);
        } else {
            randomLine.classList.add('hidden');
        }
    }
}

// Use DOMContentLoaded instead of load.
document.addEventListener('DOMContentLoaded', () => {
    let initialDelay = 500;
    lines.forEach(line => {
        setTimeout(() => {
            line.classList.remove('hidden');
            animateLine(line);
            highlightSquare(line);
        }, initialDelay);
        initialDelay += 500;
    });

    setInterval(toggleRandomLine, 1500);
});

// slide container
const sections = {
    "bmw-ico": "bmw",
    "amazon-ico": "amazon",
    "maresk-ico": "maersk",
    "twilo-ico": "twilo",
};

const icons = Object.keys(sections);
const containers = Object.values(sections).map((id) => document.getElementById(id));

// Function to change the active section
const changeSection = (activeIconId) => {
    containers.forEach((container) => {
        container.style.opacity = "0";
        setTimeout(() => {
            container.style.display = "none";
        }, 300); // Wait for opacity transition
    });


    const activeContainer = document.getElementById(sections[activeIconId]);
    setTimeout(() => {
        activeContainer.style.display = "flex";
        activeContainer.style.opacity = "1";
    }, 300); // Show after fade out

    // Update icon opacities
    icons.forEach((iconId) => {
        document.getElementById(iconId).style.opacity = iconId === activeIconId ? "1" : "0.2";
    });

    // Scroll to the corresponding section
    const targetSection = document.getElementById(sections[activeIconId]);
    targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // Scroll to the top of the section
    });
};

// Attach event listeners
icons.forEach((iconId) => {
    document.getElementById(iconId).addEventListener("click", () => changeSection(iconId));
});


const editor = document.getElementById("editor");
const output = document.getElementById("output");
const lineNumbers = document.getElementById("line-numbers");

editor.addEventListener("input", () => {
    output.contentDocument.open();
    output.contentDocument.write(`
                <style>
                    body { background: var(--output-bg); color: #fff; font-family: inter; padding: 10px; }
                </style>
                ` + editor.value);
    output.contentDocument.close();
    updateLineNumbers();
});

editor.addEventListener("scroll", () => {
    lineNumbers.scrollTop = editor.scrollTop;
});

function updateLineNumbers() {
    const lines = editor.value.split("\n").length;
    lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join("<br>");
}

editor.addEventListener("keyup", updateLineNumbers);
editor.addEventListener("keydown", updateLineNumbers);