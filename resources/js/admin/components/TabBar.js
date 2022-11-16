/*
 *  @company DarcFlow design [https://darcflow.com]
 *  @author    Koroph <yjk@outlook.fr> {(+225)0778329592}
 *  @website http://koroph.site
 *  @link      https://github.com/Koroph
 *  @license   Apache 2.0
 *  @Copyright (c) 2021.
 *
 */
export default class TabBar {

    constructor(className = "tab") {

        const tabs = document.getElementsByClassName(className);

        if (tabs.length) {
            for (let i = 0; i < tabs.length; i++) {
                const tab = tabs.item(i);
                this.tab(tab);
                const tabNext = tab.getElementsByClassName(className + '-next'),
                    tabBtn = tab.getElementsByClassName("tab-bar-item");
                if (tabNext.length) {
                    for (let j = 0; j < tabNext.length; j++) {
                        tabNext[j].addEventListener('click', () => tabBtn[j + 1].click())
                    }
                }
            }
        }
    }

    /**
     *
     * @param {HTMLDivElement} tabItem
     */
    tab(tabItem) {
        const tabBtn = tabItem.getElementsByClassName("tab-bar-item"),
            TAB_KEY = "tab.key.storage.state";
        this.initTabBar(TAB_KEY, tabItem, tabBtn);
        for (let i = 0; i < tabBtn.length; i++) {
            tabBtn.item(i).addEventListener("click", () => {
                this.tabBarAction(tabBtn.item(i), tabItem);
                localStorage.setItem(TAB_KEY, tabBtn.item(i).dataset.target);
            });
        }

    }

    initTabBar(TAB_KEY, tabItem, tabBtn) {
        const initKey = localStorage.getItem(TAB_KEY),
            mask = tabItem.querySelector(`.tab-mask`);
        if (initKey) {
            this.tabBarAction(tabItem.querySelector(`[data-target=${initKey}]`), tabItem);
        } else {
            this.tabBarAction(tabBtn[0], tabItem);
        }
        if (mask) {
            setTimeout(() => mask.remove(), 500);
        }
    }

    /**
     *
     * @param {HTMLButtonElement} _this
     * @param {HTMLDivElement} tabItem
     */
    tabBarAction(_this, tabItem) {
        const BTN_ACTIVE = "tab-active",
            CONTENT_ACTIVE = "tab-content-active";
        const oldBtn = tabItem.querySelector(`.${BTN_ACTIVE}`),
            oldContent = tabItem.querySelector(`.${CONTENT_ACTIVE}`);

        if (oldBtn) {
            if (oldBtn !== _this) {
                oldBtn.classList.remove(BTN_ACTIVE);
                oldContent.classList.remove(CONTENT_ACTIVE);
            }
        }
        if (!_this.classList.contains(BTN_ACTIVE)) {
            _this.classList.add(BTN_ACTIVE);
            tabItem.querySelector(`#${_this.dataset.target}`).classList.add(CONTENT_ACTIVE);
        }
    }
}