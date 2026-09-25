const imageSources = {
  "Irish coffee": "./images/catalog-coffee-1.svg",
  "Kahlua coffee": "./images/catalog-coffee-2.svg",
  "Honey raf": "./images/catalog-coffee-3.svg",
  "Ice cappuccino": "./images/catalog-coffee-4.svg",
  Espresso: "./images/catalog-coffee-5.svg",
  Latte: "./images/catalog-coffee-6.svg",
  "Latte macchiato": "./images/catalog-coffee-7.svg",
  "Coffee with cognac": "./images/catalog-coffee-8.svg",
  Moroccan: "./images/catalog-tea-1.svg",
  Ginger: "./images/catalog-tea-2.svg",
  Cranberry: "./images/catalog-tea-3.svg",
  "Sea buckthorn": "./images/catalog-tea-4.svg",
  "Marble cheesecake": "./images/catalog-dessert-1.svg",
  "Red velvet": "./images/catalog-dessert-2.svg",
  Cheesecakes: "./images/catalog-dessert-3.svg",
  "Creme brulee": "./images/catalog-dessert-4.svg",
  Pancakes: "./images/catalog-dessert-5.svg",
  "Honey cake": "./images/catalog-dessert-6.svg",
  "Chocolate cake": "./images/catalog-dessert-7.svg",
  "Black forest": "./images/catalog-dessert-8.svg",
};

const grid = document.getElementById("catalogGrid");
const filterButtons = document.querySelectorAll(".catalog-coffee__filter-btn");
const refreshButton = document.querySelector(".refresh-button");
const refreshButtonArea = document.querySelector(".refresh-button-area");

const MOBILE_BREAKPOINT = 768;
const MOBILE_INITIAL_COUNT = 4;

let currentCategory = "coffee";
let isExpanded = false;

function isMobile() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

function createCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";
  article.dataset.name = product.name;

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "product-card__image-wrapper";

  const img = document.createElement("img");
  img.className = "product-card__image";
  img.src = imageSources[product.name];
  img.alt = product.name;
  img.width = 340;
  img.height = 340;

  imageWrapper.appendChild(img);

  const infoWrapper = document.createElement("div");
  infoWrapper.className = "product-card__info-wrapper";

  const title = document.createElement("h2");
  title.className = "product-card__title";
  title.textContent = product.name;

  const desc = document.createElement("p");
  desc.className = "product-card__desc";
  desc.textContent = product.description;

  const price = document.createElement("span");
  price.className = "product-card__price";
  price.textContent = `$${product.price}`;

  infoWrapper.append(title, desc, price);

  article.append(imageWrapper, infoWrapper);
  return article;
}

function renderCategory(category, expanded = false) {
  grid.innerHTML = "";

  const filtered = products.filter((item) => item.category === category);

  let visibleProducts = filtered;
  if (isMobile() && !expanded) {
    visibleProducts = filtered.slice(0, MOBILE_INITIAL_COUNT);
  }

  const fragment = document.createDocumentFragment();
  visibleProducts.forEach((product) =>
    fragment.appendChild(createCard(product)),
  );
  grid.appendChild(fragment);

  updateRefreshButton(filtered.length, visibleProducts.length);
}

function updateRefreshButton(totalCount, visibleCount) {
  const hasHidden = isMobile() && totalCount > visibleCount;

  if (hasHidden) {
    refreshButtonArea.style.display = "";
  } else {
    refreshButtonArea.style.display = "none";
  }
}

function setActiveCategory(category) {
  currentCategory = category;
  isExpanded = false;

  filterButtons.forEach((btn) => {
    const isActive = btn.dataset.category === category;
    btn.classList.toggle("catalog-coffee__filter-btn--active", isActive);
  });

  renderCategory(category, false);
}

setActiveCategory("coffee");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setActiveCategory(btn.dataset.category);
  });
});

refreshButton.addEventListener("click", () => {
  isExpanded = true;
  renderCategory(currentCategory, true);
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!isMobile()) {
      isExpanded = false;
    }
    renderCategory(currentCategory, isExpanded);
  }, 150);
});
