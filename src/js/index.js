const burgerMenu = document.querySelector(".menu-icon");
const menu = document.querySelector(".navlist");

const openBurgerMenu = () => {
    menu.classList.toggle("active");
    burgerMenu.classList.toggle("active"); // Toggle the active class for the burger icon
}

burgerMenu.addEventListener("click", openBurgerMenu);


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

    // Update icon styles based on screen size
    updateIcons(activeIconId);  // Call updateIcons to adjust opacity and transformation

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

// Update icons based on window size and active icon
function updateIcons(activeIconId) {
    const icons = ["bmw-ico", "amazon-ico", "maresk-ico", "twilo-ico"];

    if (window.innerWidth > 1090) {
        // Default behavior for screens larger than 1090px
        icons.forEach((iconId) => {
            document.getElementById(iconId).style.opacity = iconId === activeIconId ? "1" : "0.2";
        });
    } else {
        icons.forEach((iconId) => {
            document.getElementById(iconId).style.opacity = iconId === activeIconId ? "0" : "0";
        });
    }
}

// Listen for window resize to dynamically adjust styles
window.addEventListener("resize", () => {
    const activeIconId = icons.find(iconId => document.getElementById(iconId).style.opacity === "1");
    updateIcons(activeIconId); // Adjust based on the current active icon
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



