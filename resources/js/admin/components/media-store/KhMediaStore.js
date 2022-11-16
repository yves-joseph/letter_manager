/**
 * @author Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link  https://github.com/Koroph
 * @license MIT
 * @copyright Copyright (c) 2020.
 */
import {
    SVG_ADD, SVG_CROP,
    SVG_DELETE, SVG_DESTROY, SVG_EDIT,
    SVG_FOLDER,
    SVG_FOLDER_ADD,
    SVG_FOLDER_DELETE, SVG_H, SVG_MENU, SVG_RESTORE, SVG_ROTATE, SVG_SAVABLE,
    SVG_SAVE, SVG_V,
    SVG_WARNING, SVG_ZOOM_IN, SVG_ZOOM_OUT
} from "./svg";
import AlertDialog from "../AlertDialog";
import config from "./config.json";
import Locale from "../Locale";
import __ from "../lang/Translation";
import Cropper from 'cropperjs';

export default class KhMediaStore {
    constructor(className = 'img-media-store') {
        this.INPUT_FILE_NAME = '_image';
        this.DIRECTORY_ID = 'directory_id';
        this.DIRECTORY_NAME = 'directory_name';
        this.FILE_PREFIX_NAME = '_file_prefix';
        this.MEDIA_STORE_STATE = "media_store.state.view.header";
        this.CLASS_NAME = className;
        const viewItem = document.getElementsByClassName(this.CLASS_NAME)

        if (viewItem.length) {
            this.openMediaStore();
        }
        /*  if (document.getElementsByClassName(this.CLASS_NAME) != null) {
              for (let i = 0; i < viewItem.length; i++) {
                  this.khMediaStoreBody(viewItem.item(i));
              }
          }*/
    }


    khLoadData({data}) {
        //this.subBody.innerHTML = "";
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                this.subBody.append(this.mediaStoreList({
                    item: data[i],
                    isMask: false,
                    ids: localStorage.getItem(this.MEDIA_STORE_STATE)
                }));
            }
        } else this.viewEmpty.style.display = "flex";

        this.subBody.append(this.viewEmpty);
        this.body.append(this.subBody);
    }

    _emptyView() {
        const container = document.createElement('div'),
            content = document.createElement('div'),
            subWord = document.createElement('small'),
            word = document.createElement('h4');

        container.id = "kh-media-store-body-empty";
        content.id = "kh-media-store-body-empty-content";

        word.innerHTML = "Aucun dossier trouvé"
        subWord.innerHTML = "Cliquer sur le boutton " + SVG_FOLDER_ADD + " pour ajouter un nouveau dossier.."
        content.innerHTML = SVG_WARNING;
        content.append(word, subWord);
        container.append(content);
        container.style.display = "none";
        return container;
    }

    openMediaStore() {
        const khView = document.getElementsByClassName(this.CLASS_NAME),
            _alert = new AlertDialog(),
            _this = this;
        this.viewEmpty = this._emptyView();
        if (khView.length)
            //this.prefix = khView.dataset.prefix;
            for (let i = 0; i < khView.length; i++) {
                const khViewItem = khView.item(i),
                    reset_btn = khViewItem.querySelector('.btn_media_store_reset');
                khViewItem.addEventListener('click', function () {
                    _this.khMediaStoreBody(this);
                    _this.base.style.display = "flex";
                    // _this.loaderContainer.style.display = "flex";
                    _this.base.setAttribute('data-target', this.id);
                    if (this.dataset.required !== "") _this.file.setAttribute('required', 'required')
                    //base.append(root);
                    axios.get(config.files + '/' + _this.prefix)
                        .then(function (response) {
                            //console.log(response.data.data)
                            _this.loaderContainer.style.display = "none";
                            _this.khLoadData({
                                data: response.data.data
                            });
                        });
                });
                if (reset_btn) {
                    reset_btn.addEventListener('click', function (event) {
                        event.stopPropagation();
                        const is = khViewItem.querySelector('.media-store-img_img'),
                            url = this.dataset.url;
                        if (is.style.display === "block") {
                            if (url.trim() !== "") {
                                _alert.type = "p";
                                _alert.yes = __('yes')
                                _alert.no = __('no')
                                _alert.header = __('warning');
                                _alert.setMessage = __('mediastore.delete_image')
                                _alert.show().then(rp => {
                                    if (rp)
                                        axios.get(url)
                                            .then(response => {
                                                khViewItem.querySelector('.media-store-img_input').value = "";
                                                is.style.display = "none";
                                                khViewItem.querySelector('.media-store-icon').style.display = "block";
                                            }).catch(error => {
                                        });
                                })
                            } else {
                                khViewItem.querySelector('.media-store-img_input').value = "";
                                is.style.display = "none";
                                khViewItem.querySelector('.media-store-icon').style.display = "block";
                            }
                        } else {
                            _alert.type = "d";
                            _alert.yes = __('yes')
                            _alert.header = __('warning')
                            _alert.yesOnly = true;
                            _alert.setMessage = __('mediastore.del_image');
                            _alert.show();
                        }
                    });
                }

            }
    }

    /**
     *
     * @param {string} name
     * @param {number} width
     * @param {number} height
     * @param {boolean} is
     * @return {(HTMLDivElement|HTMLButtonElement)[]}
     */
    folderSVG({name, width, height, is = false}) {
        const
            svg = document.createElement('div'),
            div = document.createElement('div'),
            folderName = document.createElement('span'),
            button = document.createElement('button');
        button.className = "folder-delete";
        svg.className = "kh-media-list-item-header_";
        folderName.className = "kh-media-list-item-header-text";
        //folderName.innerHTML = name;
        //folderName.innerHTML = name+' <small>[800x900]</small>';
        folderName.innerHTML = `${name} <strong>[${width},${height}]</strong>`;
        div.append(folderName);
        div.insertAdjacentHTML("afterbegin", SVG_FOLDER)
        button.className = "folder-del";
        button.innerHTML = SVG_FOLDER_DELETE;

        // hide folder btn remove when folder content files
        if (!is) button.style.display = "none";
        svg.append(div, button);

        return [svg, button];
    }

    /**
     *
     * @param file {File}
     * @param id {string}
     * @param blob {Blob}
     * @return {FormData}
     */
    dataSend({file, id, blob}) {
        const formData = new FormData();
        formData.append(this.DIRECTORY_ID, id);
        formData.append(this.INPUT_FILE_NAME, blob ?? file, file.name);
        formData.append(this.DIRECTORY_NAME, file.name);
        formData.append(this.FILE_PREFIX_NAME, this.file_prefix);
        return formData;
    }

    /**
     *
     * @param value {boolean}
     */
    listItemAddIsEnable(value = true) {
        const list_item_add = document.getElementsByClassName('kh-media-list-item-add');
        if (list_item_add != null)
            for (let i = 0; i < list_item_add.length; i++) {
                if (value)
                    list_item_add.item(i).setAttribute('disabled', "");
                else {
                    list_item_add.item(i).removeAttribute('disabled');
                    list_item_add.item(i).style.display = "flex";
                }
            }
    }

    /**
     *
     * @param item {Object}
     * @param isMask {boolean}
     * @param ids
     * @return {HTMLDivElement}
     */
    mediaStoreList({item, isMask = false, ids = []}) {
        const content = document.createElement('div'),
            _this = this,
            mediaList = document.createElement('div'),
            mediaListHeader = document.createElement('div'),
            base = this.base, khAlert = new AlertDialog(),
            token_id = 'header-id:' + item.id,
            STORAGE_CLASS_HIDE = "hidden";
        content.className = "kh-media-list-item-content";
        mediaList.className = "kh-media-list-item";
        mediaListHeader.className = "kh-media-list-item-header";

        mediaListHeader.setAttribute('data-id', token_id);

        content.className = (ids !== null && ids.includes(token_id)) ? "kh-media-list-item-content hidden" : "kh-media-list-item-content";


        if (isMask) {
            const mask = document.createElement('div'),
                maskLoader = document.createElement('div');
            mask.className = "kh-media-list-item-mask";
            maskLoader.id = "kh-media-store-small-loader";
            mask.append(maskLoader);
            mediaList.append(mask);
        }

        for (let i = 0; i < item.images.length; i++) {

            if (item.images[i].file_prefix !== "all" && item.images[i].file_prefix !== this.file_prefix) continue;

            content.append(this.mediaStoreListItem({
                id: item.images[i].id,
                url: item.images[i].url,
                is: item.images[i].is,
                name: item.images[i].title,
                created: item.images[i].created_at,
                selected: this.imageLisItemIsSelected(base, item.images[i].id)
            }));
        }
        const [folderHeader, btnFolderRemove] = this.folderSVG({
            name: item.name,
            width: item.width,
            height: item.height,
            is: item.images.length === 0
        });
        mediaListHeader.append(folderHeader);
        content.append(this.mediaStoreListAdd(item.id, content, btnFolderRemove, item.width, item.height));

        btnFolderRemove.onclick = (event) => {
            const parent = mediaList.parentElement;
            khAlert.setMessage = __('mediastore.delete_folder', {s1: item.name});
            khAlert.type = "d";
            khAlert.header = "Suppression de dossier";
            khAlert.yes = "Oui";
            khAlert.no = "Non";
            khAlert.show().then(rep => {
                if (rep) {
                    mediaList.style.display = "none";
                    mediaList.style.transition = "display 400ms ease";
                    if (parent.children.length === 4) {
                        _this.viewEmpty.style.display = "flex";
                    }
                    axios.delete(config.remove_folder.replace(":id", item.id))
                        .then(function (response) {
                            if (response.data.is) {
                                mediaList.remove();
                            }
                        }).catch((e) => {
                        mediaList.style.display = "block";
                        if (parent.children.length === 3) {
                            _this.viewEmpty.style.display = "none";
                        }
                    });
                }
            });
        }

        mediaListHeader.addEventListener('click', function (e) {
            e.stopPropagation();
            let _state = JSON.parse(localStorage.getItem(_this.MEDIA_STORE_STATE) ?? "[]");
            if (content.classList.contains(STORAGE_CLASS_HIDE)) content.classList.remove(STORAGE_CLASS_HIDE);
            else content.classList.add(STORAGE_CLASS_HIDE);

            if (!_state.includes(this.dataset.id)) _state.push(this.dataset.id);
            else _state.splice(_state.findIndex((id) => id === this.dataset.id), 1);
            localStorage.setItem(_this.MEDIA_STORE_STATE, JSON.stringify(_state));

        });

        mediaList.append(mediaListHeader, content);
        return mediaList;
    }

    /**
     * @param base {HTMLDivElement}
     * @param id {string}
     * @return {boolean}
     */
    imageLisItemIsSelected(base, id) {
        const _id = parseInt(document.getElementById(base.dataset.target).children.item(1).value);
        if (isNaN(_id)) return false;
        else return _id === id;
    }

    /**
     * @return {HTMLDivElement}
     */
    addSVG() {
        const svg = document.createElement('div');
        svg.innerHTML = SVG_ADD;
        return svg;
    }

    /**
     *
     * @param name
     * @param created
     * @param is {boolean}
     * @param url {string}
     * @param id {string}
     * @param selected {boolean}
     * @return {HTMLDivElement}
     */
    mediaStoreListItem({name, created, is, url, id, selected = false}) {
        const div = document.createElement('div'), _this = this,
            img = document.createElement('img'),
            button = document.createElement('button'),
            itemActionContainer = document.createElement('div'),
            actionEdit = document.createElement('button'),
            actionRemove = document.createElement('button'),
            khAlert = new AlertDialog(),
            _placeholder = this._imagePlaceholder(),
            _date = this.dateFormat(new Date(created.date)),
            _name = name.substring(0, name.lastIndexOf('.')),
            _type = name.substring(name.lastIndexOf('.') + 1);

        img.id = "img_item_view:" + id;
        div.className = "kh-media-list-item-img";


        img.title = `Nom du fichier: ${_name}\nType: image ${_type}\nCrée le: ${_date}`;
        img.alt = "";

        if (selected) div.classList.add('kh-media-active');

        itemActionContainer.append(actionEdit, actionRemove);

        actionEdit.innerHTML = `${SVG_EDIT}<span>Modifier</span>`;
        actionRemove.innerHTML = `${SVG_DESTROY}<span>Supprimer</span>`;

        button.innerHTML = SVG_MENU;
        button.append(itemActionContainer);
        //console.log(Locale.getLocale() + url)
        //img.setAttribute('src', Locale.getLocale() + '/' + url);
        let _url = url + '?m=' + Math.random().toString(16);
        img.setAttribute('src', _url);
        if (is) div.append(img, button, _placeholder);
        else div.append(img, _placeholder);

        /**
         * remove img if error load
         */
        img.onerror = () => div.remove();
        img.onload = () => _placeholder.remove();


        actionEdit.onclick = (ev) => {
            ev.stopPropagation();
            const imagePreview = this.createImagePreview(_url, null, null, (blob) => {
                const formData = new FormData(),
                    progressBar = document.createElement('div');
                progressBar.id = "item-progressBar";
                formData.append("_path", url);

               // console.log(blob)
                formData.append(this.INPUT_FILE_NAME, blob, 'update.png');

                div.append(progressBar);
                axios.post(config.update_file, formData, {
                    onUploadProgress: function (progressEvent) {
                        const percent = (progressEvent.loaded / progressEvent.total) * 100;
                        progressBar.style.width = "" + percent + "%";
                    }
                }).then(response => {
                    URL.revokeObjectURL(_url);
                    _url = response.data.url + '?m=' + Math.random().toString(16);
                    img.src = _url;
                    progressBar.remove();
                }).catch(error => {
                   // console.log(error);
                    progressBar.remove();
                })
            });
            this.body.parentElement.append(imagePreview);
        }
        /**
         * delete file
         * @param ev
         */
        actionRemove.onclick = function (ev) {
            ev.stopPropagation();
            khAlert.setMessage = "Vous voulez vraiment supprimer cette image ?";
            khAlert.type = "d";
            khAlert.header = "Avertissement";
            khAlert.yes = "Oui";
            khAlert.no = "Non";
            khAlert.show().then(rep => {
                if (rep) {
                    div.style.display = "none";
                    div.style.transition = "all 800ms ease";
                    if (div.classList.contains("kh-media-active")) {
                        _this.buttonSave.style.display = "none"
                    }
                    axios.delete(config.remove_file.replace(":id", id))
                        .then(function (response) {
                           // console.log(response)
                            if (response.data.is) {
                                if (div.parentElement.children.length <= 2) {
                                    div.parentElement.previousElementSibling.firstElementChild.lastElementChild.style.display = "block";
                                }
                                div.remove();
                            } else {
                                div.style.display = "block";
                            }
                        }).catch(() => {
                        div.style.display = "block";
                        if (div.classList.contains("kh-media-active")) {
                            _this.buttonSave.style.display = "block"
                        }
                    });
                }
            });


        }
        div.onclick = function () {
            const activated = document.getElementsByClassName('kh-media-active');
            if (activated.length) activated.item(0).classList.remove('kh-media-active');

            this.classList.add('kh-media-active');
            _this.buttonSave.setAttribute('data-url', url);
            _this.buttonSave.setAttribute('data-id', id);
            if (_this.buttonSave.style.display === "" || _this.buttonSave.style.display === "none") _this.buttonSave.style.display = "block";
        };
        return div;
    }

    _imagePlaceholder() {
        const
            placeholder = document.createElement('div');

        placeholder.className = "image-placeholder";
        return placeholder;
    }

    /**
     * create add element
     * @param id
     * @param  width
     * @param height
     * @param btnFolderRemove {HTMLButtonElement}
     * @param content {HTMLDivElement}
     * @returns {HTMLButtonElement}
     */
    mediaStoreListAdd(id, content, btnFolderRemove, width, height) {

        const div = document.createElement('button'), _this = this;
        div.className = "kh-media-list-item-add";
        div.id = ":" + id;
        div.append(this.addSVG());
        div.onclick = function (event) {
            _this.file.setAttribute('accept', '.png,.jpeg,.jpg,.gif')
            _this.file.click();
            let j = true;
            _this.file.onchange = function (event) {
                /**
                 * Add modal image preview
                 */
                _this.body.parentElement.append(_this.createImagePreview(event.target.files[0], width, height, function (blob) {

                    if (j) {
                        $(_this.mediaStoreTampon({file: _this.file.files[0], id: id, blob: blob})).insertBefore(div);
                        div.style.display = "none";
                        j = false;
                        _this.listItemAddIsEnable();
                        if (content.children.length - 1 > 0) {
                            btnFolderRemove.style.display = "none";
                        }
                    }
                }));
                /**
                 * Close modal image preview
                 */
            };

        };
        return div;
    }

    /**
     * create tampon element
     * @param file {File}
     * @param id
     * @param blob {Blob}
     * @returns {HTMLDivElement}
     */
    mediaStoreTampon({file, id, blob}) {

        const div = document.createElement('div'),
            img = document.createElement('img'),
            clearBtn = document.createElement('button'),
            progressBar = document.createElement('span'),
            reader = new FileReader(), _this = this,
            khBase = this.base;

        clearBtn.innerHTML = SVG_DELETE;
        div.className = "kh-media-list-item-tampon";
        div.append(img, clearBtn, progressBar);
        this.addFileRequest(this, div, progressBar, khBase, file, id, blob);
        clearBtn.onclick = function () {
            if (div.parentElement.children.length <= 2) {
                div.parentElement.previousElementSibling.firstElementChild.lastElementChild.style.display = "block";
            }
            document.getElementById(":" + id).style.display = 'flex';
            _this.listItemAddIsEnable(false);
            _this.source.cancel();
            div.remove();
        };
        reader.onload = function (event) {
            img.src = event.target.result
        }
        reader.readAsDataURL(file);
        return div;
    }

    /**
     * save new file
     * @param _this
     * @param {HTMLDivElement} div
     * @param {HTMLDivElement} progressBar
     * @param {HTMLDivElement} khBase
     * @param {File} file
     * @param id
     * @param {Blob} blob
     */
    addFileRequest(_this, div, progressBar, khBase, file, id, blob = null) {
        setTimeout(function () {
            _this.source = axios.CancelToken.source();
            axios.post(config.add_file, _this.dataSend({
                file: file,
                id: id,
                blob: blob
            }), {
                onUploadProgress: function (progressEvent) {
                    const percent = (progressEvent.loaded / progressEvent.total) * 100;
                    progressBar.style.width = "" + percent + "%";
                },
                cancelToken: _this.source.token
            }).then(function (response) {
                const dataResp = response.data;
                if (dataResp.is) {
                    setTimeout(() => {
                        div.replaceWith(_this.mediaStoreListItem({
                            url: dataResp.url,
                            id: dataResp.id,
                            is: dataResp.is,
                            name: dataResp.title,
                            created: dataResp.created_at,
                            selected: false
                        }));
                        _this.listItemAddIsEnable(false);
                    }, 800);

                } else div.remove();

            }).catch(() => {
                div.remove();
            });
        }, 900);
    }

    /**
     *
     * @param headerContainer
     * @param btnAddFolder
     * @param base
     */
    folderAddItem(headerContainer, btnAddFolder, base) {

        const _this = this,
            div = document.createElement('div'),
            size_container = document.createElement('div'),
            input = document.createElement('input'),
            width = document.createElement('input'),
            height = document.createElement('input'),
            button = document.createElement('button');
        div.id = "media-store-popup-input";
        input.type = "text";
        input.id = "media-store-popup-input-text";
        size_container.id = "size_container";
        width.className = "media-store-popup-input-size";
        height.className = "media-store-popup-input-size";
        input.placeholder = "Dossier";
        width.placeholder = "Largeur (" + config.default_size.width + ")";
        height.placeholder = "Longueur (" + config.default_size.height + ")";
        button.id = "media-store-popup-input-button";
        button.innerHTML = SVG_SAVE;

        size_container.append(width, height);

        div.append(input, size_container, button);
        div.onclick = ev => ev.stopPropagation();
        width.onkeydown = function (e) {
            width.value = width.value.replace(new RegExp(/[A-Za-z]/), '');
        }
        height.onkeydown = function (e) {

            width.value = width.value.replace(new RegExp(/[A-Za-z]/), '');
        }
        input.onkeydown = function (e) {
            if (e.keyCode === 13) {
                _this.userAddFolderRequest(input, width, height, _this, div, base);
            }
        }
        button.onclick = function (event) {
            /*if (input.value != null && input.value.trim() !== "") {
                _this.addFolderRequest({
                    name: input.value,
                    url: base.dataset.path_add_folder
                });
                input.value = "";
            }
            div.remove();*/

            _this.userAddFolderRequest(input, width, height, _this, div, base);
        }
        btnAddFolder.onclick = (event) => {
            event.stopPropagation();
            headerContainer.append(div);
            input.focus();
        };
        document.body.onclick = () => div.remove();
    }

    /**
     *
     * @param {HTMLInputElement} input
     * @param {HTMLInputElement} width
     * @param {HTMLInputElement} height
     * @param {this} _this
     * @param {HTMLElement} div
     * @param {HTMLElement} base
     */
    userAddFolderRequest(input, width, height, _this, div, base) {
        const
            _width = width.value.trim() !== "" ? width.value.toString().trim() : config.default_size.width,
            _height = height.value.trim() !== "" ? height.value.toString().trim() : config.default_size.height;


        if (input.value != null && input.value.trim() !== "") {
            _this.addFolderRequest({
                name: input.value,
                /*url: base.dataset.path_add_folder,*/
                url: config.add_folder,
                width: _width,
                height: _height,
                prefix: this.prefix
            });
            input.value = "";
        }
        div.remove();
    }

    /**
     * Request save new folder
     * @param {string} name
     * @param {number} width
     * @param {number} height
     * @param {string} url
     * @param {string} prefix
     */
    addFolderRequest({name, width = 300, height = 300, url, prefix}) {
        const folder = new FormData(),
            _this = this,
            listDisabled = _this.mediaStoreList({
                item: {
                    "name": name,
                    "width": width,
                    "height": height,
                    "id": "",
                    "prefix": prefix,
                    "images": [],
                    "created_at": (new Date()).toString()
                },
                isMask: true
            });
        //emptyOld
        folder.append("name", name);
        folder.append("prefix", prefix);
        folder.append("width", width.toString());
        folder.append("height", height.toString());
        if (this.viewEmpty) this.viewEmpty.style.display = "none";
        _this.subBody.insertBefore(listDisabled, _this.subBody.firstChild);
        this.buttonAddFolder.setAttribute("disabled", "disabled");
        axios.post(url, folder).then(function (response) {
            listDisabled.replaceWith(_this.mediaStoreList({
                item: response.data
            }));
            _this.buttonAddFolder.removeAttribute("disabled");
        }).catch((e) => {
            //console.log(e)
            _this.buttonAddFolder.removeAttribute("disabled");
            listDisabled.remove();
        });

    }

    khMediaStoreBody(viewTarget) {
        const
            root = document.createElement('div'),
            _this = this,
            loader = document.createElement('div'),
            header = document.createElement('header'),
            mediaButtonClose = document.createElement('button');

        //this.viewTarget = document.querySelector('.img-media-store');
        this.viewTarget = viewTarget;
        this.buttonAddFolder = document.createElement('button');
        this.loaderContainer = document.createElement('div');
        this.body = document.createElement('div');
        this.subBody = document.createElement('div');
        this.buttonSave = document.createElement('button');
        this.file = document.createElement('input');
        this.base = document.getElementById('kh-media-store-base');
        this.prefix = this.viewTarget ? this.viewTarget.dataset.prefix : 'all';
        this.file_prefix = this.viewTarget ? this.viewTarget.dataset.filePrefix : 'all';

        if (this.viewTarget) {
            if (this.viewTarget.dataset.width !== '0' || this.viewTarget.dataset.height !== '0') {
                if (this.viewTarget.dataset.width !== '0')
                    config.default_size.width = parseInt(this.viewTarget.dataset.width);
                if (this.viewTarget.dataset.height !== '0')
                    config.default_size.height = parseInt(this.viewTarget.dataset.height);
            }
        }
        this.file.id = "kh-media-store-file";
        this.file.type = "file";
        this.file.style.display = "none";
        this.body.id = "kh-media-store-body";
        this.subBody.id = "kh-media-store-sub-body";
        this.loaderContainer.id = "loader-container";
        loader.id = "kh-media-store-loader";
        this.loaderContainer.append(loader);
        this.subBody.append(this.file, this.loaderContainer);
        this.body.append(this.subBody);
        header.id = "kh-media-store-:header";
        this.buttonSave.id = "kh-media-store-save";
        this.buttonSave.textContent = (this.viewTarget && this.viewTarget.dataset.reload === "true") ? "Fermer" : "Choisir";
        mediaButtonClose.id = "kh-media-store-close";
        mediaButtonClose.innerHTML = "<span>&times;</span>";
        root.id = "kh-media-store";
        this.buttonAddFolder.id = "img-container";
        this.buttonAddFolder.innerHTML = SVG_FOLDER_ADD;
        if (this.file_prefix !== "all") this.buttonAddFolder = document.createElement("div");
        header.append(this.buttonAddFolder, mediaButtonClose);
        this.folderAddItem(header, this.buttonAddFolder, this.base);
        ///*
        mediaButtonClose.onclick = function () {
            this.base.style.display = "none";
            this.subBody.innerHTML = "";
            this.loaderContainer.style.display = "flex";
            this.subBody.append(this.file, this.loaderContainer);
            root.remove();
            if (this.viewTarget.dataset.reload === "true") location.reload();
            this.viewEmpty.style.display = "none"

        }.bind(this);

        this.buttonSave.onclick = function () {
            const img = document.getElementsByClassName(_this.viewTarget.dataset.img_class),
                input = document.getElementById(_this.viewTarget.dataset.input_id),
                old_url = document.querySelector('input[name=' + _this.viewTarget.dataset.urlOld + ']');

            this.base.style.display = "none";
            this.subBody.innerHTML = "";
            old_url.value = this.buttonSave.dataset.url;

            if (!(this.viewTarget.dataset.reload === "true")) {
                this.viewTarget.getElementsByClassName('media-store-icon')
                    .item(0).style.display = "none";
                input.value = this.buttonSave.dataset.id;
                for (let i = 0; i < img.length; i++) {
                    img.item(i).setAttribute('src', this.buttonSave.dataset.url);
                    img.item(i).onload = function () {
                        this.style.display = "block";
                    }
                    if (img[i].hasAttribute('data-mask')) {
                        const mask = document.getElementById(img[i].dataset.mask);
                        if (mask) {
                            mask.remove();
                        }
                    }
                }
            } else {
                location.reload();
            }
            this.subBody.innerHTML = "";
            root.remove();
        }.bind(this);
        root.append(header, this.body, this.buttonSave);
        this.base.append(root)
        // this.openMediaStore();
    }

    /**
     * convert date to string
     * @param {Date} date
     */
    dateFormat(date) {
        if (Locale.getLocale() === "fr")
            return `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()} à ${date.getUTCHours()}:${date.getUTCMinutes()}`;
        else
            return `${date.getUTCFullYear()}.${date.getUTCMonth()}.${date.getUTCDate()} at ${date.getUTCHours()}:${date.getUTCMinutes()}`;
    }


    /**
     * @param {File|string} file
     * @param {HTMLImageElement} img
     * @private
     */
    _fileImageReader(file, img) {
        if (file instanceof File) {
            /* const reader = new FileReader();
             reader.onload = function (_event) {
                 img.src = _event.target.result;
             }
             reader.readAsDataURL(file)*/
            img.src = URL.createObjectURL(file)
        } else {
            img.src = file;
        }
    }

    /**
     *
     * @param {File} file
     * @param width
     * @param height
     * @param {Function} fn
     * @returns {HTMLDivElement}
     */
    createImagePreview(file, width, height, fn) {
        const previewContainer = document.createElement('div'),
            previewContainerBody = document.createElement('div'),
            img = document.createElement('img'),
            header = document.createElement('header'),
            body = document.createElement('div'),
            footer = document.createElement('div'),
            footer_left = document.createElement('div'),
            footer_right = document.createElement('div'),
            btnContainer = document.createElement('div'),
            zoom_in = document.createElement('button'),
            zoom_out = document.createElement('button'),
            v_direction = document.createElement('button'),
            h_direction = document.createElement('button'),
            rotate = document.createElement('button'),
            close = document.createElement('button'),
            restore = document.createElement('button'),
            save = document.createElement('button'),
            crop = document.createElement('button');
        let cropper = null, imageBlob = null, degree = 0, zoom = 0;


        previewContainer.id = "media-store-image-preview";
        previewContainerBody.id = "media-store-image-preview-body";
        header.id = "media-store-image-preview-body_header";
        footer.id = "media-store-image-preview-body_footer";
        body.id = "media-store-image-preview-body_content";
        btnContainer.id = "media-store-image-preview-body_header-btn-container";


        save.innerHTML = SVG_SAVABLE;
        crop.innerHTML = SVG_CROP;
        restore.innerHTML = SVG_RESTORE;
        rotate.innerHTML = SVG_ROTATE;
        zoom_in.innerHTML = SVG_ZOOM_IN;
        zoom_out.innerHTML = SVG_ZOOM_OUT;
        h_direction.innerHTML = SVG_V;
        v_direction.innerHTML = SVG_H;

        rotate.disabled = true;
        restore.disabled = true;
        zoom_in.disabled = true;
        zoom_out.disabled = true;
        h_direction.disabled = true;
        v_direction.disabled = true;
        //cancel.innerText = "Annuler";

        close.id = "kh-media-store-close";
        close.innerHTML = "<span>&times;</span>";


        if (file instanceof File) {
            footer_left.innerHTML = `<strong>Fichier:</strong>${file.name}`
        }

        footer_right.innerHTML = `<span><strong>largeur:</strong>${img.width}px</span> <span><strong>longueur:</strong>${img.height}px</span>`

        close.onclick = () => {
            previewContainer.remove();
            if (cropper) {
                cropper.destroy();
                cropper = null;
            }
        }
        rotate.onclick = () => {
            if (cropper) {
                if (degree === 0) {
                    rotate.classList.add('active');
                }
                degree += 45;
                cropper.rotateTo(degree);
                if (degree > 360) {
                    rotate.classList.remove('active');
                    degree = 0;
                }
            }
        }
        h_direction.onclick = () => {
            if (cropper && h_direction.classList.contains('active')) {
                h_direction.classList.remove('active');
                cropper.scale(1, 1);
            } else {
                h_direction.classList.add('active');
                cropper.scale(-1, 1);
            }
        }

        v_direction.onclick = () => {
            if (cropper && v_direction.classList.contains('active')) {
                v_direction.classList.remove('active');
                cropper.scale(1, 1);
            } else {
                v_direction.classList.add('active');
                cropper.scale(1, -1);
            }
        }

        zoom_in.onclick = () => {
            alert('zoom_in')
            if (cropper && zoom < 1) {
                zoom += 0.1;
                cropper.zoom(zoom);
            }
        }

        zoom_out.onclick = () => {
            alert('zoom_out')
            if (cropper && zoom > 0) {
                zoom -= 0.1;
                cropper.zoom(zoom);
            }
        }

        save.onclick = () => {
            //cropper.rotateTo(45)
            //cropper.scale(-1,1) v
            //cropper.scale(1,-1) h
            //cropper.zoom(0.5)

            if (cropper !== null) {
                fn(imageBlob);
                console.log(imageBlob)
                cropper.destroy();
                cropper = null;
            } else fn(null);

            previewContainer.remove();
        }
        restore.onclick = () => {
            if (cropper !== null) {
                cropper.reset();
            }
            this._fileImageReader(file, img);
        }

        body.append(img);
        this._fileImageReader(file, img);

        btnContainer.append(save, crop, rotate, zoom_in, zoom_out, h_direction, v_direction, restore);
        header.append(btnContainer, close);
        footer.append(footer_left, footer_right);
        previewContainerBody.append(header, body, footer);
        previewContainer.append(previewContainerBody);

        if (width === null && height === null) {
            width = img.width * 0.9;
            height = img.height * 0.9;
        }

        crop.onclick = () => {
            if (cropper === null) {
                crop.classList.add('active');
                cropper = new Cropper(img, {
                    center: true,
                    responsive: true,
                    data: {
                        height: height,
                        width: width
                    },

                });
                rotate.removeAttribute("disabled");
                restore.removeAttribute("disabled");
                zoom_in.removeAttribute("disabled");
                zoom_out.removeAttribute("disabled");
                h_direction.removeAttribute("disabled");
                v_direction.removeAttribute("disabled");
            } else {
                crop.classList.remove('active');
                rotate.classList.remove('active');
                h_direction.classList.remove('active');
                v_direction.classList.remove('active');
                img.src = cropper.getCroppedCanvas().toDataURL(file.type, 'high')
                cropper.getCroppedCanvas().toBlob((blob) => {
                    imageBlob = blob;
                }, file.type, 'high')
                cropper.destroy();
                cropper = null;
                rotate.disabled = true;
                restore.disabled = true;
                zoom_in.disabled = true;
                zoom_out.disabled = true;
                h_direction.disabled = true;
                v_direction.disabled = true;
            }
        }
        /* setTimeout(() => {
             this.cropper = new Cropper(img, {
                 data: {
                     height: height,
                     width: width
                 },
                 crop(event) {
                     console.log(event.detail.x);
                     console.log(event.detail.y);
                     console.log(event.detail.width);
                     console.log(event.detail.height);
                     console.log(event.detail.rotate);
                     console.log(event.detail.scaleX);
                     console.log(event.detail.scaleY);
                 },
             });
             //console.log(cropper.destroy())
         }, 100)*/


        return previewContainer;
    }

}
