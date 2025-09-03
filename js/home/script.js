///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".mobile-btn-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

const navLinks = document.querySelectorAll(".nav-attrpite a");

const navContent = document.querySelector(".header");

navLinks.forEach(function (navLink) {
  navLink.addEventListener("click", function () {
    navContent.classList.toggle("nav-open");
  });
});
