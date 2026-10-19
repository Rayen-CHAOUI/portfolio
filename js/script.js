const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

const toggleBtn = document.getElementById("darkModeToggle");
if (toggleBtn) {
  const syncToggle = () => {
    const isLight = root.getAttribute("data-theme") === "light";
    toggleBtn.textContent = isLight ? "☾" : "☀";
    toggleBtn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  };

  syncToggle();
  toggleBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncToggle();
  });
}

const nav = document.getElementById("siteNav");
const navToggle = document.getElementById("navToggle");
if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (form && formStatus) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const response = await fetch("https://rayen_formspree-proxy.onrender.com/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset();
        formStatus.textContent = "Message sent successfully.";
        formStatus.style.color = "#3d9a6a";
      } else {
        formStatus.textContent = "Failed to send. Please try again.";
        formStatus.style.color = "#d46565";
      }
    } catch (err) {
      formStatus.textContent = "Server error. Please try again later.";
      formStatus.style.color = "#d46565";
    }
  });
}
