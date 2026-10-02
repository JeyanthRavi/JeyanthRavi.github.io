const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const year = document.querySelector("#year");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

year.textContent = new Date().getFullYear();

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const setMenuOpen = (open) => {
  menuToggle.setAttribute("aria-expanded", String(open));
  primaryNavigation.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.querySelector(".menu-toggle-label").textContent = open ? "Close" : "Menu";
};

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

primaryNavigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) setMenuOpen(false);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
