document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const body = document.body;
const html = document.documentElement;
const scrollUp = document.querySelector("#scroll-up");
const documentHeight = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);
const scrollUpBtnVisibilityLimit = Math.floor(documentHeight / 4);

document.addEventListener("scroll", ({ target }) => {
  const topOffset = target.scrollingElement.scrollTop;

  if (
    topOffset >= scrollUpBtnVisibilityLimit &&
    scrollUp.classList.contains("hidden")
  ) {
    scrollUp.classList.remove("hidden");
    scrollUp.setAttribute("aria-hidden", false);
  } else if (
    topOffset < scrollUpBtnVisibilityLimit &&
    !scrollUp.classList.contains("hidden")
  ) {
    scrollUp.classList.add("hidden");
    scrollUp.setAttribute("aria-hidden", true);
  }
});

const observableSections = {};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      observableSections[entry.target.id] = {
        section: entry.target,
        intersectionRatio: entry.intersectionRatio,
      };
    });

    const biggestPaintedSection = Object.values(observableSections).reduce(
      (prev, current) =>
        prev.intersectionRatio > current.intersectionRatio ? prev : current
    );

    const newActiveNavLink = document.querySelector(
      `nav a[href="#${biggestPaintedSection.section.id}"]`
    );

    if (!newActiveNavLink) return;

    const activeNavLink = document.querySelector("nav a.active");

    if (newActiveNavLink === activeNavLink) return;

    if (activeNavLink) {
      activeNavLink.classList.remove("active");
    }

    newActiveNavLink.classList.add("active");
  },
  {
    root: document,
    rootMargin: "0px",
    threshold: [0, 0.25, 0.5, 0.75, 1],
  }
);

const sections = Array.from(
  document.querySelector("main").querySelectorAll("*>:is(section, article)")
);

sections.forEach((section) => {
  observer.observe(section);
});

const aboutMeImg = document.querySelector("#about-me-img");
handleAboutMeImgAria();
window.addEventListener("resize", handleAboutMeImgAria);

function handleAboutMeImgAria() {
  if (window.innerWidth < 979) {
    aboutMeImg.setAttribute("aria-hidden", true);
  } else {
    aboutMeImg.removeAttribute("aria-hidden");
  }
}

const blurLoads = document.querySelectorAll(".blur-load");

blurLoads.forEach((blurLoad) => {
  const img = blurLoad.querySelector("img");

  function loaded() {
    blurLoad.classList.add("loaded");
  }

  if (img.complete) {
    loaded();
  } else {
    img.addEventListener("load", loaded);
  }
});
