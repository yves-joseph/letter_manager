/*
 *  @company DarcFlow design [https://darcflow.com]
 *  @author    Koroph <yjk@outlook.fr> {(+225)0778329592}
 *  @website http://koroph.site
 *  @link      https://github.com/Koroph
 *  @license   Apache 2.0
 *  @Copyright (c) 2021.
 *
 */


export function globalSearch() {
    const search_field = document.getElementById('global_search'),
        item_view = document.getElementsByClassName('kh-app-body-nav-bar-search-view-content-item');

    if (search_field) {
        search_field.addEventListener('input', function (e) {
            const _text = e.target.value.toString().trim().toLocaleLowerCase();
            for (let i = 0; i < item_view.length; i++) {
                if (_text !== "") {
                    if (item_view[i].dataset.name.toLocaleLowerCase().indexOf(_text) !== -1  || item_view[i].dataset.matricule.toLocaleLowerCase().indexOf(_text) !== -1) {
                        item_view[i].style.display = "flex";
                    } else item_view[i].style.display = "none";
                } else item_view[i].style.display = "none";
            }
        });
    }

}
