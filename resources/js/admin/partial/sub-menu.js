/*
 *  @company DarcFlow design [https://darcflow.com]
 *  @author    Koroph <yjk@outlook.fr> {(+225)0778329592}
 *  @website http://koroph.site
 *  @link      https://github.com/Koroph
 *  @license   Apache 2.0
 *  @Copyright (c) 2021.
 *
 */

import Cookie from "../components/Cookie";

/**
 *
 * @param {HTMLElement} toggleBtn
 */
export default function subMenuToggleContent(toggleBtn) {

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            subMenuToggle(this.nextElementSibling);
        });
    }
}

/**
 *
 * @param {HTMLElement|Element} el
 */
export function subMenuToggle(el) {
    if (el.style.display === 'none')
        el.style.display = 'block';
    else el.style.display = 'none';
}

/**
 *
 * @param {HTMLElement|Element} el
 */
export function closeSubMenuContentIfOpen(el) {
    if (el.style.display === 'block') el.style.display = 'none';
}


export function menuToggle() {
    const btnToggle = document.getElementById('kh-app-body-nav-bar-toggle-menu-btn'),
        sideBar = document.getElementById('kh-app'),
        className = 'nav-bar-small',
        btnCloseClassName='close',
        query = "(max-width:800px)";

    if (btnToggle){
        if (matchMedia(query).matches) {
            sideBar.classList.add(className);
            Cookie.setCookie("_visual_side_bar_state", "nav-bar-small");
            btnToggle.classList.add(btnCloseClassName);
        }


        btnToggle.addEventListener('click', function () {
            sideBarShowAndHidden(sideBar,this,className,btnCloseClassName);
        });

        matchMedia(query).addEventListener('change', function (e) {
            if (e.matches) {
                sideBar.classList.add(className);
                Cookie.setCookie("_visual_side_bar_state", "nav-bar-small");
                btnToggle.classList.add(btnCloseClassName);
            } else {
                sideBar.classList.remove(className);
                Cookie.setCookie("_visual_side_bar_state", "");
                btnToggle.classList.remove(btnCloseClassName);
            }
        });
    }
}

/**
 *
 * @param {HTMLElement} appBar
 * @param {HTMLButtonElement} btn
 * @param {String} className
 * @param {String} btnCloseClassName
 */
function sideBarShowAndHidden(appBar,btn,className,btnCloseClassName) {
    if (appBar.classList.contains(className)) {
        Cookie.setCookie("_visual_side_bar_state", "");
        appBar.classList.remove(className);
        btn.classList.remove(btnCloseClassName);
    } else {
        appBar.classList.add(className);
        Cookie.setCookie("_visual_side_bar_state", className);
        btn.classList.add(btnCloseClassName);
    }
}
