/*
 *  @company DarcFlow design [https://darcflow.com]
 *  @author    Koroph <yjk@outlook.fr> {(+225)0778329592}
 *  @website http://koroph.site
 *  @link      https://github.com/Koroph
 *  @license   Apache 2.0
 *  @Copyright (c) 2021.
 *
 */


import AlertDialog from "../components/AlertDialog";

export function searchInTable() {
    const inputSearch = document.getElementById('index-view-body-search-field'),
        tr = document.getElementsByClassName('kh-t-row');

    if (inputSearch) {
        inputSearch.addEventListener('input', function (e) {
            let _search_text = e.target.value.toString().trim().toLocaleLowerCase();

            for (let i = 0; i < tr.length; i++) {
                let _keys = tr[i].dataset.keys.split(',');
                tr[i].style.display = "none";
                for (let j = 0; j < _keys.length; j++) {
                    if (tr[i].dataset[_keys[j]].toLocaleLowerCase().indexOf(_search_text) !== -1) {
                        tr[i].style.display = "table-row";
                        break;
                    }
                }
                /*if (_str.indexOf(e.target.value.toString().trim().toLocaleLowerCase()) !== -1) {
                    tr[i].style.display = "table-row";
                } else tr[i].style.display = "none";*/
            }
        });
    }

    //destroyItemEvent();
}


function destroyItemEvent() {
    const _btn_item = document.getElementsByClassName('destroy-item'),
        _alert = new AlertDialog();
    _alert.header = "suppression";

    _alert.yes = "Oui";
    _alert.no = "Non";
    _alert.type = "d";
    if (_btn_item.length) {
        for (let i = 0; i < _btn_item.length; i++) {
            _btn_item.item(i).addEventListener('click', function () {
                if (this.hasAttribute('data-message'))
                    _alert.setMessage = this.dataset.message;
                else _alert.setMessage = "Voulez-vous vraiment supprimer cette donnée ?";
                _alert.show().then(resp => {
                    if (resp)
                        this.parentElement.submit();
                })
            });
        }
    }
}
