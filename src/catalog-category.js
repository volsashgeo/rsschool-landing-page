// ================== СООТВЕТСТВИЕ КАРТИНОК ==================
// Так как в JSON нет ссылок на картинки, зададим их по имени товара.
// Если у вас порядок файлов совпадает с порядком в массиве — можно
// использовать индекс. Здесь сделан явный маппинг для надёжности.
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

// ================== ССЫЛКИ НА DOM ==================
const grid = document.getElementById("catalogGrid");
const filterButtons = document.querySelectorAll(".catalog-coffee__filter-btn");
const refreshButton = document.querySelector(".refresh-button");
const refreshButtonArea = document.querySelector(".refresh-button-area");

// ================== КОНСТАНТЫ ==================
const MOBILE_BREAKPOINT = 768;
const MOBILE_INITIAL_COUNT = 4;

// ================== СОСТОЯНИЕ ==================
let currentCategory = "coffee";
let isExpanded = false; // показывает ли пользователь все карточки (после нажатия refresh)

// ================== УТИЛИТЫ ==================
function isMobile() {
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

// ================== СОЗДАНИЕ КАРТОЧКИ ==================
function createCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";
  article.dataset.name = product.name;

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "product-card__image-wrapper";

  const img = document.createElement("img");
  img.className = "product-card__image";
  img.src = imageSources[product.name] || "./images/placeholder.svg";
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

// ================== РЕНДЕР ==================
function renderCategory(category, expanded = false) {
  grid.innerHTML = "";

  const filtered = products.filter(item => item.category === category);

  // Сколько карточек показать
  let visibleProducts = filtered;
  if (isMobile() && !expanded) {
    visibleProducts = filtered.slice(0, MOBILE_INITIAL_COUNT);
  }

  const fragment = document.createDocumentFragment();
  visibleProducts.forEach(product => fragment.appendChild(createCard(product)));
  grid.appendChild(fragment);

  updateRefreshButton(filtered.length, visibleProducts.length);
}

// ================== УПРАВЛЕНИЕ КНОПКОЙ REFRESH ==================
function updateRefreshButton(totalCount, visibleCount) {
  // Кнопка нужна только на мобильной ширине и если есть скрытые карточки
  const hasHidden = isMobile() && totalCount > visibleCount;

  if (hasHidden) {
    refreshButtonArea.style.display = "";
  } else {
    refreshButtonArea.style.display = "none";
  }
}

// ================== ПЕРЕКЛЮЧЕНИЕ КАТЕГОРИЙ ==================
function setActiveCategory(category) {
  currentCategory = category;
  isExpanded = false; // при переключении категории — снова начальный набор

  filterButtons.forEach(btn => {
    const isActive = btn.dataset.category === category;
    btn.classList.toggle("catalog-coffee__filter-btn--active", isActive);
  });

  renderCategory(category, false);
}

// ================== ИНИЦИАЛИЗАЦИЯ ==================
setActiveCategory("coffee");

// Обработчики кликов по кнопкам фильтра
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    setActiveCategory(btn.dataset.category);
  });
});

// Клик по кнопке refresh — показываем все карточки активной категории
refreshButton.addEventListener("click", () => {
  isExpanded = true;
  renderCategory(currentCategory, true);
});

// При изменении размера окна — перерисовываем с учётом текущего состояния
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Если вернулись на десктоп — сбрасываем "развёрнутость"
    if (!isMobile()) {
      isExpanded = false;
    }
    renderCategory(currentCategory, isExpanded);
  }, 150);
});



// ================== МОДАЛЬНОЕ ОКНО ==================
const modal = document.getElementById("catalogModal");
const modalImage = document.getElementById("catalogModalImage");
const modalTitle = document.getElementById("catalogModalTitle");
const modalDesc = document.getElementById("catalogModalDesc");
const modalSizes = document.getElementById("catalogModalSizes");
const modalAdditives = document.getElementById("catalogModalAdditives");
const modalTotal = document.getElementById("catalogModalTotal");

let basePrice = 0;        // базовая цена товара
let sizeExtra = 0;        // надбавка за размер
let additivesExtra = 0;   // надбавка за добавки
let lastFocusedElement = null; // для возврата фокуса

// ---- Создание кнопки-опции ----
function createOption(num, label, extraPrice, isActive = false) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "catalog-modal__option" + (isActive ? " catalog-modal__option--active" : "");
  btn.dataset.extra = extraPrice;

  const numSpan = document.createElement("span");
  numSpan.className = "catalog-modal__option-num";
  numSpan.textContent = num;

  const labelSpan = document.createElement("span");
  labelSpan.textContent = label;

  btn.append(numSpan, labelSpan);
  return btn;
}

// ---- Обновление итоговой цены ----
function updateTotal() {
  const total = basePrice + sizeExtra + additivesExtra;
  modalTotal.textContent = `$${total.toFixed(2)}`;
}

// ---- Заполнение модалки данными товара ----
function fillModal(product) {
  // Сбрасываем состояние
  basePrice = parseFloat(product.price);
  sizeExtra = 0;
  additivesExtra = 0;

  // Картинка
  modalImage.src = imageSources[product.name] || "./images/placeholder.svg";
  modalImage.alt = product.name;

  // Заголовок и описание
  modalTitle.textContent = product.name;
  modalDesc.textContent = product.description;

  // Размеры
  modalSizes.innerHTML = "";
  const sizeKeys = Object.keys(product.sizes); // ["s","m","l"]
  sizeKeys.forEach((key, index) => {
    const sizeData = product.sizes[key];
    const isActive = index === 0; // первый (S) активен по умолчанию
    const btn = createOption(
      key.toUpperCase(),
      sizeData.size,
      parseFloat(sizeData["add-price"]),
      isActive
    );

    btn.addEventListener("click", () => {
      modalSizes.querySelectorAll(".catalog-modal__option")
        .forEach(el => el.classList.remove("catalog-modal__option--active"));
      btn.classList.add("catalog-modal__option--active");
      sizeExtra = parseFloat(sizeData["add-price"]);
      updateTotal();
    });

    modalSizes.appendChild(btn);
  });

  // Добавки
  modalAdditives.innerHTML = "";
  product.additives.forEach((additive, index) => {
    const btn = createOption(
      index + 1,
      additive.name,
      parseFloat(additive["add-price"]),
      false
    );

    btn.addEventListener("click", () => {
      const isActive = btn.classList.toggle("catalog-modal__option--active");
      const price = parseFloat(additive["add-price"]);
      additivesExtra += isActive ? price : -price;
      updateTotal();
    });

    modalAdditives.appendChild(btn);
  });

  // Итоговая цена
  updateTotal();
}

// ---- Открытие модалки ----
function openModal(product) {
  lastFocusedElement = document.activeElement;
  fillModal(product);

  modal.hidden = false;
  document.body.classList.add("catalog-modal-open");

  // Фокус на кнопку Close для доступности
  const closeBtn = modal.querySelector(".catalog-modal__close-btn");
  if (closeBtn) closeBtn.focus();
}

// ---- Закрытие модалки ----
function closeModal() {
  if (modal.hidden) return;

  modal.hidden = true;
  document.body.classList.remove("catalog-modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

// ---- Клик по карточке — открываем модалку ----
// Делегирование: ловим клик по любой части .product-card
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;

  // Находим товар по имени (в карточке храним его в data-атрибуте)
  const name = card.dataset.name;
  const product = products.find(p => p.name === name);
  if (product) openModal(product);
});

// ---- Закрытие: кнопка Close и оверлей ----
modal.addEventListener("click", (e) => {
  if (e.target.closest("[data-modal-close]")) {
    closeModal();
  }
});

// ---- Закрытие по Escape ----
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});