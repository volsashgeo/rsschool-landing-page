const modal = document.getElementById("catalogModal");
const modalImage = document.getElementById("catalogModalImage");
const modalTitle = document.getElementById("catalogModalTitle");
const modalDesc = document.getElementById("catalogModalDesc");
const modalSizes = document.getElementById("catalogModalSizes");
const modalAdditives = document.getElementById("catalogModalAdditives");
const modalTotal = document.getElementById("catalogModalTotal");

let basePrice = 0;
let sizeExtra = 0;
let additivesExtra = 0;
let lastFocusedElement = null;

function createOption(num, label, extraPrice, isActive = false) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className =
    "catalog-modal__option" +
    (isActive ? " catalog-modal__option--active" : "");
  btn.dataset.extra = extraPrice;

  const numSpan = document.createElement("span");
  numSpan.className = "catalog-modal__option-num";
  numSpan.textContent = num;

  const labelSpan = document.createElement("span");
  labelSpan.textContent = label;

  btn.append(numSpan, labelSpan);
  return btn;
}

function updateTotal() {
  const total = basePrice + sizeExtra + additivesExtra;
  modalTotal.textContent = `$${total.toFixed(2)}`;
}

function fillModal(product) {
  basePrice = parseFloat(product.price);
  sizeExtra = 0;
  additivesExtra = 0;

  modalImage.src = imageSources[product.name] || "./images/placeholder.svg";
  modalImage.alt = product.name;

  modalTitle.textContent = product.name;
  modalDesc.textContent = product.description;

  modalSizes.innerHTML = "";
  const sizeKeys = Object.keys(product.sizes);
  sizeKeys.forEach((key, index) => {
    const sizeData = product.sizes[key];
    const isActive = index === 0;
    const btn = createOption(
      key.toUpperCase(),
      sizeData.size,
      parseFloat(sizeData["add-price"]),
      isActive,
    );

    btn.addEventListener("click", () => {
      modalSizes
        .querySelectorAll(".catalog-modal__option")
        .forEach((el) => el.classList.remove("catalog-modal__option--active"));
      btn.classList.add("catalog-modal__option--active");
      sizeExtra = parseFloat(sizeData["add-price"]);
      updateTotal();
    });

    modalSizes.appendChild(btn);
  });

  modalAdditives.innerHTML = "";
  product.additives.forEach((additive, index) => {
    const btn = createOption(
      index + 1,
      additive.name,
      parseFloat(additive["add-price"]),
      false,
    );

    btn.addEventListener("click", () => {
      const isActive = btn.classList.toggle("catalog-modal__option--active");
      const price = parseFloat(additive["add-price"]);
      additivesExtra += isActive ? price : -price;
      updateTotal();
    });

    modalAdditives.appendChild(btn);
  });

  updateTotal();
}

function openModal(product) {
  lastFocusedElement = document.activeElement;
  fillModal(product);

  modal.hidden = false;
  document.body.classList.add("catalog-modal-open");

  const closeBtn = modal.querySelector(".catalog-modal__close-btn");
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  if (modal.hidden) return;

  modal.hidden = true;
  document.body.classList.remove("catalog-modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;

  const name = card.dataset.name;
  const product = products.find((p) => p.name === name);
  if (product) openModal(product);
});

modal.addEventListener("click", (e) => {
  if (e.target.closest("[data-modal-close]")) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});
