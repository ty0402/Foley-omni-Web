function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function updateScrollButton() {
  const button = document.querySelector(".scroll-to-top");
  if (!button) return;

  if (window.scrollY > 280) {
    button.classList.add("visible");
  } else {
    button.classList.remove("visible");
  }
}

function setupSectionNav() {
  const links = Array.from(document.querySelectorAll(".section-nav a"));
  const sections = Array.from(document.querySelectorAll(".project-section"));

  if (!links.length || !sections.length || !("IntersectionObserver" in window)) {
    return;
  }

  const byId = new Map(
    links.map((link) => [link.getAttribute("href")?.replace("#", ""), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => link.classList.remove("is-active"));
        const link = byId.get(entry.target.id);
        if (link) {
          link.classList.add("is-active");
        }
      });
    },
    {
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));
}

window.addEventListener("scroll", updateScrollButton);
window.addEventListener("load", () => {
  updateScrollButton();
  setupSectionNav();
});
