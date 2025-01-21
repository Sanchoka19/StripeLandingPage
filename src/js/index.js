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
