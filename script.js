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

// Запускаем функции после загрузки страницы
document.addEventListener("DOMContentLoaded", () => {
    displayProduct();
    setupDetailsToggle();
});

// Функция для добавления товара в корзину
function addToCart(productId, size) {
    const product = products.find(item => item.id === productId);

    if (product) {
        // Проверяем, есть ли уже такой товар в корзине
        const existingItem = cart.find(item => item.product.id === productId && item.size === size);

        if (existingItem) {
            existingItem.quantity++;  // Увеличиваем количество
        } else {
            cart.push({ product, size, quantity: 1 });  // Добавляем новый товар
        }

        updateCart();
        openCartModal();
    }
}

// Функция для обновления отображения корзины
function updateCart() {
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("cart-item");

        li.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.product.name}</p>
                <p class="cart-item-size">Размер: ${item.size}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-decrease">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-increase">+</button>
                </div>
                <p class="cart-item-price">${item.product.price}</p>
            </div>
        `;

        // Добавляем события для изменения количества
        li.querySelector('.quantity-decrease').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
                updateCart();
            }
        });

        li.querySelector('.quantity-increase').addEventListener('click', () => {
            item.quantity++;
            updateCart();
        });

        cartItemsContainer.appendChild(li);

        // Суммируем общую стоимость
        totalPrice += parseInt(item.product.price.replace(" RUB", ""), 10) * item.quantity;
    });

    document.querySelector(".cart-total span").textContent = `${totalPrice} RUB`;
}

// Функция для открытия модального окна корзины
function openCartModal() {
    document.querySelector(".cart-modal").classList.remove("hidden");
}

// Закрытие корзины
document.querySelector(".close-modal").addEventListener("click", () => {
    document.querySelector(".cart-modal").classList.add("hidden");
});

// Оформление заказа
function checkout() {
    alert("Заказ оформлен!");
    cart = [];  // Очищаем корзину
    updateCart();  // Обновляем корзину
}

// Добавление события на кнопку оформления заказа
document.querySelector(".checkout-btn").addEventListener("click", checkout);

// Событие на добавление товара в корзину
document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    const size = document.querySelector('.size-btn.selected')?.textContent || 'S';  // Получаем выбранный размер, по умолчанию S
    const productId = getProductId();
    addToCart(productId, size);
});

// Событие для выбора размера
document.querySelectorAll('.size-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));  // Убираем выделение с других кнопок
        button.classList.add('selected');  // Выделяем выбранный размер
    });
});

// Запуск функции отображения товара после загрузки страницы
document.addEventListener("DOMContentLoaded", displayProduct);
