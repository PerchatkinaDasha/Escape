// Получаем форму и кнопку
const loginForm = document.getElementById('loginForm');
const loginButton = loginForm.querySelector('.login-button');
const emailInput = loginForm.querySelector('#email');
const passwordInput = loginForm.querySelector('#password');

// Включение кнопки при вводе данных
function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    loginButton.disabled = !(email && password && password.length >= 6);
}

// Слушаем изменения в полях
emailInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

// Обработка отправки формы
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Отменяем стандартное поведение формы
    // Здесь можно добавить проверку данных, если нужно

    // Перенаправление на главную страницу
    window.location.href = 'main.html';
});