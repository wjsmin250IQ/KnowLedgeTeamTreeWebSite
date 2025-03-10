const toggleDarkMode = document.getElementById("toggle-darkmode");

toggleDarkMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
