// Массив с данными о товарах
const products = [
    {
        id: 1,
        name: "'ESCAPE VICES' Футболка Оверсайз",
        price: "3400 RUB",
        image: "./images/эскейп.png",
    },
    {
        id: 2,
        name: "'ESCAPE SEARCH' футболка Оверсайз",
        price: "3400 RUB",
        image: "./images/words.png",
    },
    {
        id: 3,
        name: "'ESCAPE OKAY' футболка Оверсайз",
        price: "3400 RUB",
        image: "./images/it`s okay.png",
    },
    {
        id: 4,
        name: "'ESCAPE PRODUCT' футболка Оверсайз",
        price: "3400 RUB",
        image: "./images/human.png",
    },
    {
        id: 5,
        name: "'ESCAPE PRODUCT' футболка Оверсайз",
        price: "3400 RUB",
        image: "./images/human.png",
    },
    {
        id: 6,
        name: "'ESCAPE MIND' футболка Оверсайз",
        price: "3400 RUB",
        image: "./images/вер из май маинд.png",
    },
];

// Корзина (массив с товарами)
let cart = [];

// Функция для извлечения параметра id из URL
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'), 10);
}

// Функция для отображения информации о товаре
function displayProduct() {
    const productId = getProductId();
    const product = products.find(item => item.id === productId);

    if (product) {
        document.querySelector(".product-image").src = product.image;
        document.querySelector(".product-image").alt = product.name;
        document.querySelector(".product-name").textContent = product.name;
        document.querySelector(".product-price").textContent = product.price;
        document.querySelector(".product-description").textContent = product.description;
        setupImageNavigation(product);
    } else {
        document.querySelector(".product-content").innerHTML = "<p>Товар не найден.</p>";
    }
}

// Функция для листания изображений
function setupImageNavigation(product) {
    const images = [product.image]; // Массив изображений (можно расширить, если есть дополнительные изображения для товара)
    let currentIndex = 0;

    const productImage = document.querySelector('.product-image');
    const leftButton = document.querySelector('.image-nav.left');
    const rightButton = document.querySelector('.image-nav.right');

    function updateImage() {
        productImage.src = images[currentIndex];
    }

    leftButton.addEventListener('click', function () {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        updateImage();
    });

    rightButton.addEventListener('click', function () {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        updateImage();
    });

    // Инициализация первого изображения
    updateImage();
}

// Функция для управления раскрывающимися блоками
function setupDetailsToggle() {
    const detailsItems = document.querySelectorAll(".details-item");

    detailsItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            const content = document.querySelectorAll(".details-content")[index];
            const span = item.querySelector("span");

            // Переключение видимости блока и текста
            if (content.classList.contains("hidden")) {
                content.classList.remove("hidden");
                span.textContent = "−"; // Меняем "+" на "−"
            } else {
                content.classList.add("hidden");
                span.textContent = "+"; // Меняем "−" обратно на "+"
            }
        });
    });
}

// Функция для добавления товара в корзину и открытия страницы корзины
function addToCart() {
    const productId = getProductId();
    const product = products.find(item => item.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.open('basket.html', '_blank');
    }
}

// Установка обработчика события для кнопки "В корзину"
document.addEventListener("DOMContentLoaded", () => {
    displayProduct();
    setupDetailsToggle();
    document.getElementById('add-to-cart-btn').addEventListener('click', addToCart);
});