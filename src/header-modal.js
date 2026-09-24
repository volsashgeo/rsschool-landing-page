const mobileOverlay = document.getElementById("mobileOverlay");
const burgerButton = document.querySelector(".header__burger-button");
const closeButton = document.querySelector(".mobile-overlay__close-button");

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
