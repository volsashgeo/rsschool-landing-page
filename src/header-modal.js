const mobileOverlay = document.getElementById("mobileOverlay");
const burgerButton = document.querySelector(".header__burger-button");
const closeButton = document.querySelector(".mobile-overlay__close-button");
const overlayMenuButton = document.querySelector(".overlay__button");

burgerButton.addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  burgerButton.setAttribute("hidden", "true");
  closeButton.removeAttribute("hidden");
});

closeButton.addEventListener("click", () => {
  document.body.style.overflow = "";
  burgerButton.removeAttribute("hidden");
  closeButton.setAttribute("hidden", "true");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeButton.click();
  }
});

overlayMenuButton.addEventListener("click", (event) => {
  window.location.href = "./catalog-coffee.html";
  mobileOverlay.close();
});

function checkWidth() {
  if (window.innerWidth >= 769) {
    closeButton.click();
    mobileOverlay.close();
  }
}

window.addEventListener('resize', checkWidth);
window.addEventListener('DOMContentLoaded', checkWidth);