import Cookie from "./Cookie";

export default function appThemeToggle() {

    const app_theme_btn = document.getElementById('app-mode-btn'),
        THEME_LIGHT = "theme-light",
        THEME_DARK = "theme-dark";

    if (app_theme_btn) {
        app_theme_btn.addEventListener('click', function () {
            toggleAppThemeState(this, THEME_DARK, THEME_LIGHT)
        });
    }
}

/**
 *
 * @param {HTMLElement} app_theme_btn
 * @param {string} theme_dark_name
 * @param {string} theme_light_name
 */
function toggleAppThemeState(app_theme_btn, theme_dark_name, theme_light_name) {
    const APP_THEME_DATA_SET_NAME = "data-state",
        APP_THEME_COOKIE_NAME = "kh.app.theme.15.01.1996.to.2021",
        icon_dark = document.getElementById('app-mode-dark'),
        icon_light = document.getElementById('app-mode-light'),
        appContainer = document.getElementById('app'),
        navBarLogo = document.getElementById('nav-bar-logo');

    if (app_theme_btn.dataset.state === theme_light_name) {
        appContainer.classList.replace(theme_light_name, theme_dark_name);
        app_theme_btn.setAttribute(APP_THEME_DATA_SET_NAME, theme_dark_name);
        Cookie.setCookie(APP_THEME_COOKIE_NAME, theme_dark_name);
        icon_dark.style.display = "inline-block";
        icon_light.style.display = "none";
        navBarLogo.src = navBarLogo.dataset.dark_url;
    } else {
        appContainer.classList.replace(theme_dark_name, theme_light_name);
        app_theme_btn.setAttribute(APP_THEME_DATA_SET_NAME, theme_light_name);
        Cookie.setCookie(APP_THEME_COOKIE_NAME, theme_light_name);
        icon_light.style.display = "inline-block";
        icon_dark.style.display = "none";
        navBarLogo.src = navBarLogo.dataset.light_url;

    }

}


