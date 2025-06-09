const toggleBtn = document.getElementById("darkModeToggle");
if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark-mode");
}
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dark-mode", 
    document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
});
