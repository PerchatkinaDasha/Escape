document.addEventListener("DOMContentLoaded", function () {
    // Получаем форму и элементы
    const registrationForm = document.getElementById('registrationForm');
    const registerButton = registrationForm.querySelector('.register-button');
    const firstNameInput = registrationForm.querySelector('#firstName');
    const lastNameInput = registrationForm.querySelector('#lastName');
    const phoneInput = registrationForm.querySelector('#phone');
    const emailInput = registrationForm.querySelector('#email');
    const passwordInput = registrationForm.querySelector('#password');
    const agreementInput = registrationForm.querySelector('#agreement');

    // Включение кнопки регистрации при условии, что все поля заполнены и соглашение отмечено
    function validateForm() {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Валидация
        const isValid = firstName && lastName && phone && email && password.length >= 6 && agreementInput.checked;
        registerButton.disabled = !isValid;
    }

    // Слушаем изменения в полях формы
    firstNameInput.addEventListener('input', validateForm);
    lastNameInput.addEventListener('input', validateForm);
    phoneInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);
    agreementInput.addEventListener('change', validateForm);

    // Обработка отправки формы
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Отменяем стандартное поведение формы
        
        // Здесь можно добавить дополнительные проверки на сервере, если необходимо

        // После успешной регистрации перенаправляем на главную страницу
        alert("Регистрация прошла успешно!");
        window.location.href = 'main.html';
    });
});
