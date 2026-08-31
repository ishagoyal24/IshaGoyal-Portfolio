/* =========================================================
   AOS
========================================================= */

AOS.init({
  duration: 850,
  once: true,
  offset: 80
});


/* =========================================================
   GSAP HERO ANIMATION
========================================================= */

window.addEventListener("load", () => {

  gsap.from(".hero-badge", {
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out"
  });

  gsap.from(".hero-small", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.15,
    ease: "power3.out"
  });

  gsap.from(".hero h1", {
    y: 60,
    opacity: 0,
    duration: 1.1,
    delay: 0.25,
    ease: "power3.out"
  });

  gsap.from(".hero-title", {
    y: 25,
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    ease: "power2.out"
  });

  gsap.from(".hero-description", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.65
  });

  gsap.from(".hero-btns", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    delay: 0.8
  });

});


/* =========================================================
   TYPING EFFECT
========================================================= */

/* =========================================================
   TYPING EFFECT
========================================================= */

const typingTexts = [
  "Creative Graphic Designer",
  "Visual Creative Designer",
  "Digital & Print Designer"
];

const typingEl = document.querySelector(".typing");

let textIndex = 0;
let charIndex = 0;

function typeEffect() {

  if (!typingEl) return;

  const currentText = typingTexts[textIndex];

  // Typing the text
  if (charIndex < currentText.length) {

    typingEl.textContent =
      currentText.substring(0, charIndex + 1);

    charIndex++;

    setTimeout(typeEffect, 85);

  } else {

    // Text completely typed — wait
    setTimeout(() => {

      // Remove the complete text instantly
      typingEl.textContent = "";

      // Move to next text
      textIndex =
        (textIndex + 1) % typingTexts.length;

      charIndex = 0;

      // Small pause before next typing starts
      setTimeout(typeEffect, 250);

    }, 500);
  }
}

typeEffect();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const hamburger =
  document.getElementById("hamburger");

const navMenu =
  document.getElementById("nav-menu");


if (hamburger && navMenu) {

  hamburger.addEventListener("click", () => {

    navMenu.classList.toggle("active");

  });


  navMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("active");

    });

  });

}


/* =========================================================
   PORTFOLIO FILTER
========================================================= */

const filterBtns =
  document.querySelectorAll(".filter-btn");

const works =
  Array.from(document.querySelectorAll(".work"));


filterBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    filterBtns.forEach(button => {
      button.classList.remove("active");
    });

    btn.classList.add("active");

    const filter =
      btn.getAttribute("data-filter");


    works.forEach((work, index) => {

      const category =
        work.getAttribute("data-category");

      const shouldShow =
        filter === "all" || category === filter;


      if (shouldShow) {

        work.style.display = "block";

        work.style.animation = "none";

        requestAnimationFrame(() => {

          work.style.animation =
            `workIn 0.45s ease ${index * 0.025}s both`;

        });

      } else {

        work.style.display = "none";

      }

    });

  });

});


/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox =
  document.getElementById("lightbox");

const lightboxImg =
  document.querySelector(".lightbox-img");

const lightboxCategory =
  document.getElementById("lightbox-category");

const closeBtn =
  document.querySelector(".lightbox-close");

const prevBtn =
  document.querySelector(".lightbox-prev");

const nextBtn =
  document.querySelector(".lightbox-next");


let currentIndex = 0;


/* Only currently visible images */
function getVisibleWorks() {

  return works.filter(work => {

    return work.style.display !== "none";

  });

}


/* Open image */
function openLightbox(work) {

  const visibleWorks =
    getVisibleWorks();

  currentIndex =
    visibleWorks.indexOf(work);

  if (currentIndex === -1) {
    currentIndex = 0;
  }

  updateLightbox();

  lightbox.classList.add("active");

  document.body.classList.add("lightbox-open");

}


/* Update image */
function updateLightbox() {

  const visibleWorks =
    getVisibleWorks();

  if (!visibleWorks.length) return;

  const work =
    visibleWorks[currentIndex];

  const image =
    work.querySelector("img");

  const category =
    work.getAttribute("data-category");

  lightboxImg.src = image.src;

  lightboxImg.alt = image.alt;

  lightboxCategory.textContent =
    category === "Post"
      ? "Static Graphics"
      : category === "Story"
      ? "Stories"
      : category === "Reel"
      ? "Reel Creatives"
      : category === "Carousel"
      ? "Carousels"
      : category === "Festive"
      ? "Festive Designs"
      : "";

}


/* Open on click */

works.forEach(work => {

  work.addEventListener("click", () => {

    openLightbox(work);

  });

});


/* Close */

function closeLightbox() {

  lightbox.classList.remove("active");

  document.body.classList.remove("lightbox-open");

  lightboxImg.src = "";

}


closeBtn.addEventListener(
  "click",
  closeLightbox
);


/* Previous */

function showPrevious() {

  const visibleWorks =
    getVisibleWorks();

  if (!visibleWorks.length) return;

  currentIndex =
    (currentIndex - 1 + visibleWorks.length)
    % visibleWorks.length;

  updateLightbox();

}


prevBtn.addEventListener(
  "click",
  showPrevious
);


/* Next */

function showNext() {

  const visibleWorks =
    getVisibleWorks();

  if (!visibleWorks.length) return;

  currentIndex =
    (currentIndex + 1)
    % visibleWorks.length;

  updateLightbox();

}


nextBtn.addEventListener(
  "click",
  showNext
);


/* Click outside image */

lightbox.addEventListener("click", (event) => {

  if (event.target === lightbox) {

    closeLightbox();

  }

});


/* Keyboard controls */

document.addEventListener("keydown", (event) => {

  if (!lightbox.classList.contains("active")) {
    return;
  }


  if (event.key === "Escape") {

    closeLightbox();

  }


  if (event.key === "ArrowLeft") {

    showPrevious();

  }


  if (event.key === "ArrowRight") {

    showNext();

  }

});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener("click", function(event) {

      const targetId =
        this.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navbarHeight = 75;

      const targetPosition =
        target.getBoundingClientRect().top
        + window.pageYOffset
        - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
  document.querySelector(".navbar");


window.addEventListener("scroll", () => {

  if (window.scrollY > 40) {

    navbar.style.background =
      "rgba(9, 10, 15, 0.92)";

  } else {

    navbar.style.background =
      "rgba(9, 10, 15, 0.72)";

  }

});


/* =========================================================
   ESCAPE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {

  if (!navMenu || !hamburger) return;

  const clickedInsideNav =
    navMenu.contains(event.target);

  const clickedHamburger =
    hamburger.contains(event.target);

  if (
    !clickedInsideNav &&
    !clickedHamburger &&
    navMenu.classList.contains("active")
  ) {

    navMenu.classList.remove("active");

  }

});