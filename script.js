const themeToggle = document.querySelector(".theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const themes = {
  light: {
    background: "#ffffff",
    text: "#2d2d2d",
    secondaryText: "#555555",
    links: "#2d2d2d",
    linksHover: "#007bff",
    button: {
      background: "#f0f0f0",
      text: "#2d2d2d",
      border: "#cccccc",
    },
  },
  dark: {
    background: "#1a1a1a",
    text: "#f0f0f0",
    secondaryText: "#cccccc",
    links: "#ffffff",
    linksHover: "#4da3ff",
    button: {
      background: "#333333",
      text: "#ffffff",
      border: "#555555",
    },
  },
};

let isDarkMode =
  localStorage.getItem("theme") === "dark" ||
  (localStorage.getItem("theme") === null && prefersDarkScheme.matches);

function updateTheme() {
  const theme = isDarkMode ? themes.dark : themes.light;
  document.documentElement.classList.toggle("dark-mode", isDarkMode);

  // Update main colors
  document.body.style.backgroundColor = theme.background;
  document.body.style.color = theme.text;

  // Update buttons
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.backgroundColor = theme.button.background;
    button.style.color = theme.button.text;
    button.style.borderColor = theme.button.border;
  });

  // Update text elements
  const paragraphs = document.querySelectorAll("p");
  paragraphs.forEach((p) => {
    p.style.color = theme.secondaryText;
  });

  // Update links
  const links = document.querySelectorAll(".contact-links a, .social-links a");
  links.forEach((link) => {
    link.style.color = theme.links;
  });

  updateThemeIcon();
}

function updateThemeIcon() {
  themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
}

// Add transitions
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.transition = "background-color 0.3s, color 0.3s";
  document.querySelectorAll("p, a, button").forEach((element) => {
    element.style.transition =
      "color 0.3s, background-color 0.3s, border-color 0.3s";
  });
  updateTheme();
});

// Theme toggle handler
themeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  updateTheme();
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

// System theme change handler
prefersDarkScheme.addEventListener("change", (e) => {
  if (localStorage.getItem("theme") === null) {
    isDarkMode = e.matches;
    updateTheme();
  }
});
