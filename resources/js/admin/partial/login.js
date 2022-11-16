/*
 *  @company DarcFlow design [https://darcflow.com]
 *  @author    Koroph <yjk@outlook.fr> {(+225)0778329592}
 *  @website http://koroph.site
 *  @link      https://github.com/Koroph
 *  @license   Apache 2.0
 *  @Copyright (c) 2021.
 *
 */
window.addEventListener('DOMContentLoaded', function () {
    removeLoginError();
    activeField();
    passwordUnblocked();
});


function removeLoginError() {
    const error_view = document.getElementById('login-item-view-error');
    if (error_view)
        setTimeout(function () {
            error_view.style.right = "-100%";
            setTimeout(() => error_view.remove(), 100);
        }, 8000);
}

 export function activeField() {
    const inputField = document.getElementsByClassName('kh-input-field');
    if (inputField.length) {
        for (let i = 0; i < inputField.length; i++) {
            inputField.item(i).addEventListener('focus', function () {
                inputField.item(i).previousElementSibling.classList.add('active');
            });
            inputField.item(i).addEventListener('blur', function () {
                if (this.value.toString().trim() === "")
                    inputField.item(i).previousElementSibling.classList.remove('active');
            });
        }
    }
}


function passwordUnblocked() {
    const btnToggle = document.getElementById('password-blocked'),
        passwordField = document.querySelector('input[type="password"]');

    if (btnToggle) {
        btnToggle.addEventListener('click', function () {
            if (passwordField.getAttribute('type') === 'password') {
                passwordField.setAttribute('type', 'text');
                this.classList.replace('icon-eye-blocked', 'icon-eye');
            } else {
                passwordField.setAttribute('type', 'password');
                this.classList.replace('icon-eye', 'icon-eye-blocked');
            }
        });
    }
}