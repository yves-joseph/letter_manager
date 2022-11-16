/*
 * @company DarcFlow design [https://darcflow.com]
 * @author    Koroph <yjk@outlook.fr> (+225 0778329592)
 * @website http://koroph.site
 * @link      https://github.com/Koroph
 * @license   Apache 2.0
 * @Copyright (c) 2021.
 *
 */


export default function categoryShowModalAction() {

    const SHOW_NAME = "_categories-action-show",
        target = document.getElementsByClassName('_categories-item-action-btn');


    for (let i = 0; i < target.length; i++) {
        target.item(i).addEventListener("click", function (e) {
            e.stopPropagation();
            closeCategoryMenu();
            this.nextElementSibling.classList.add(SHOW_NAME);

        });
    }

    document.documentElement.addEventListener('click', () => closeCategoryMenu());

    function closeCategoryMenu() {
        const _target = document.getElementsByClassName(SHOW_NAME);
        if (_target.length) {
            _target.item(0).classList.remove(SHOW_NAME);
        }
    }
}