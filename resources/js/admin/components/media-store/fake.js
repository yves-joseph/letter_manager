/*
 * @company DarcFlow design [https://darcflow.com]
 * @author    Koroph <yjk@outlook.fr> (+225 0778329592)
 * @website http://koroph.site
 * @link      https://github.com/Koroph
 * @license   Apache 2.0
 * @Copyright (c) 2021.
 *
 */

/*export default class KhMedddiaStore {

    constructor() {
        if (document.getElementsByClassName('img-media-store') != null) {
            if (window.XMLHttpRequest) {
                this.http = new XMLHttpRequest();
            } else {
                this.http = new ActiveXObject('Microsoft.XMLHTTP');
            }

            this.khMediaStoreBody();
        }
    }

    khLoadData({data}) {
        for (let i = 0; i < data.length; i++) {
            this.subBody.append(this.mediaStoreList({item: data[i]}));
        }
        //this.body.removeChild(this.body.firstElementChild);
        this.body.append(this.subBody);

    }

    openMediaStore(base, root) {
        const l0 = document.getElementsByClassName('img-media-store'),
            _this = this;
        if (l0 != null)
            for (let i = 0; i < l0.length; i++) {
                l0.item(i).addEventListener('click', function () {
                    base.style.display = "flex";
                    // _this.loaderContainer.style.display = "flex";
                    base.setAttribute('data-target', this.id);
                    base.append(root);
                    _this.http.open("GET", base.dataset.path_find_files);
                    _this.http.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').getAttribute('content'))
                    _this.http.send();
                    _this.http.onload = function (event) {
                        if (_this.http.readyState === 4 && _this.http.status === 200) {
                            _this.loaderContainer.style.display = "none";
                            _this.khLoadData({
                                data: JSON.parse(this.responseText).data
                            });

                        }
                    }


                });
            }
    }

    folderSVG({name, is = false}) {
        const
            svg = document.createElement('div'),
            div = document.createElement('div'),
            folderName = document.createElement('span'),
            button = document.createElement('button');
        button.className = "folder-delete";
        svg.className = "kh-media-list-item-header_";
        folderName.className = "kh-media-list-item-header-text";
        folderName.textContent = name;
        div.append(folderName);
        div.insertAdjacentHTML("afterbegin", SVG_FOLDER)
        button.className = "folder-del";
        button.innerHTML = SVG_FOLDER_DELETE;


        if (is) svg.append(div, button);
        else svg.append(div);

        return [svg, button];
    }

    dataSend({file, id}) {
        const formData = new FormData();
        formData.append('folder_id', id);
        formData.append('kh_file', file, file.name);
        formData.append('file_name', file.name);
        return formData;
    }

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

    mediaStoreList({item}) {
        const content = document.createElement('div'), _this = this,
            mediaList = document.createElement('div'),
            mediaListHeader = document.createElement('div'),
            base = this.base;
        content.className = "kh-media-list-item-content";
        mediaList.className = "kh-media-list-item";
        mediaListHeader.className = "kh-media-list-item-header";

        for (let i = 0; i < item.catalog.length; i++) {
            content.append(this.mediaStoreListItem({
                id: item.catalog[i].id,
                url: item.catalog[i].url,
                is: item.catalog[i].is,
                selected: this.imageLisItemIsSelected(base, item.catalog[i].id)
            }));
        }
        content.append(this.mediaStoreListAdd({
            id: item.id
        }));
        const [folderHeader, btnFolderRemove] = this.folderSVG({
            name: item.name,
            is: item.catalog.length === 0
        });
        mediaListHeader.append(folderHeader);
        btnFolderRemove.onclick = function (event) {
            mediaList.style.display = "none";
            mediaList.style.transition = "display 300ms ease";
            _this.http.open("DELETE", base.dataset.path_folder_delete);
            const formId = new FormData();
            formId.append('id', item.id);
            _this.http.send(formId);
            _this.http.onload = function () {
                if (_this.http.readyState === 4 && _this.http.status === 200) {
                    console.log(JSON.parse(this.responseText))
                    mediaList.remove();
                }
            }
            _this.http.onerror = () => {
                mediaList.style.display = "block";
            }
        }
        mediaList.append(mediaListHeader, content);
        return mediaList;
    }

    imageLisItemIsSelected(base, id) {
        const _id = parseInt(document.getElementById(base.dataset.target).children.item(1).value);
        if (isNaN(_id)) return false;
        else return _id === id;

    }

    addSVG() {
        const svg = document.createElement('div');
        svg.innerHTML = SVG_ADD;
        return svg;
    }

    mediaStoreListItem({is, url, id, selected = false}) {
        const div = document.createElement('div'), _this = this,
            img = document.createElement('img'),
            button = document.createElement('button');
        div.className = "kh-media-list-item-img";
        if (selected) div.classList.add('kh-media-active');
        button.innerHTML = SVG_DELETE;
        img.setAttribute('src', url);
        if (is) div.append(img, button);
        else div.append(img);
        /!**
         * remove img if error load
         *!/
        img.onerror = () => div.remove();

        /!**
         * delete file
         * @param ev
         *!/
        button.onclick = function (ev) {
            ev.stopPropagation();
            div.style.display = "none";
            div.style.transition = "all 800ms ease";
            _this.http.open("DELETE", _this.base.dataset.path_file_delete, true);
            const formId = new FormData();
            formId.append('id', id);
            _this.http.send(formId);
            _this.http.onload = function (event) {
                if (_this.http.readyState === 4 && _this.http.status === 200) {
                    console.log(JSON.parse(this.responseText))
                    if (JSON.parse(this.responseText).is) {
                        div.remove();
                    } else {
                        div.style.display = "block";
                    }
                }
            }
            _this.http.onerror = function (event) {
                div.style.display = "block";
            }

        }
        div.onclick = function () {
            const activated = document.getElementsByClassName('kh-media-active');
            if (activated.length) {
                activated.item(0).classList.remove('kh-media-active')
            }
            this.classList.add('kh-media-active');
            _this.buttonSave.setAttribute('data-url', url);
            _this.buttonSave.setAttribute('data-id', id);
            if (_this.buttonSave.style.display === "" || _this.buttonSave.style.display === "none") _this.buttonSave.style.display = "block";
        };
        return div;
    }

    /!**
     * create add element
     * @param id
     * @returns {HTMLButtonElement}
     *!/
    mediaStoreListAdd({id}) {
        const div = document.createElement('button'), _this = this;
        div.className = "kh-media-list-item-add";
        div.id = ":" + id
        div.append(this.addSVG());
        div.onclick = function (event) {
            _this.file.setAttribute('accept', '.png,.jpeg,.jpg,.gif')
            _this.file.click();
            let j = true;
            _this.file.onchange = function (event) {
                if (j) {
                    $(_this.mediaStoreTampon({file: _this.file.files[0], id: id})).insertBefore(div);
                    div.style.display = "none";
                    j = false;
                    _this.listItemAddIsEnable();
                }
            };

        };
        return div;
    }

    /!**
     * create tampon element
     * @param file
     * @param id
     * @returns {HTMLDivElement}
     *!/
    mediaStoreTampon({file, id}) {
        const div = document.createElement('div'),
            img = document.createElement('img'),
            clearBtn = document.createElement('button'),
            progressBar = document.createElement('span'),
            reader = new FileReader(), _this = this,
            khBase = this.base;
        clearBtn.innerHTML = SVG_DELETE;
        div.className = "kh-media-list-item-tampon";
        div.append(img, clearBtn, progressBar);
        this.addFileRequest(this, div, progressBar, khBase, file, id);
        clearBtn.onclick = function () {
            div.remove();
            document.getElementById(":" + id).style.display = 'flex';
            _this.listItemAddIsEnable(false);
            _this.http.abort();
        };
        reader.onload = function (event) {
            img.src = event.target.result
        }
        reader.readAsDataURL(file);
        return div;
    }

    /!**
     * save new file
     * @param _this
     * @param div
     * @param progressBar
     * @param khBase
     * @param file
     * @param id
     *!/
    addFileRequest(_this, div, progressBar, khBase, file, id) {

        setTimeout(function () {
            _this.http.onload = function () {
                if (_this.http.readyState === 4 && _this.http.status === 200) {
                    const dataResp = JSON.parse(this.responseText);
                    console.log(dataResp)
                    setTimeout(() => {
                        div.replaceWith(_this.mediaStoreListItem({
                            url: dataResp.url,
                            id: dataResp.id,
                            is: dataResp.is,
                            selected: false
                        }));
                        _this.listItemAddIsEnable(false);
                    }, 500);

                }
            }
            _this.http.onprogress = (event) => {
                alert(event.total)
                const percent = (Math.floor(event.loaded / event.total) * 100);
                progressBar.style.width = `${percent}%`;
            };
            _this.http.onabort = () => console.log("abort");
            _this.http.onerror = () => console.log('error');
            _this.http.open("POST", khBase.dataset.path_upload_file, true);
            _this.http.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
            _this.http.send(_this.dataSend({
                file: file,
                id: id
            }));
        }, 300);
    }

    folderAddItem(headerContainer, btnAddFolder, base) {
        const
            _this = this,
            div = document.createElement('div'),
            input = document.createElement('input'),
            button = document.createElement('button');
        div.id = "media-store-popup-input";
        input.type = "text";
        input.id = "media-store-popup-input-text";
        input.placeholder = "Dossier"
        button.id = "media-store-popup-input-button";
        button.textContent = "Ok";

        div.append(input, button);
        div.onclick = ev => ev.stopPropagation();
        button.onclick = function (event) {
            if (input.value != null && input.value.trim() !== "") {
                _this.addFolderRequest({
                    name: input.value,
                    url: base.dataset.path_add_folder
                });
            }
            div.remove();
        }
        btnAddFolder.onclick = (event) => {
            event.stopPropagation();
            headerContainer.append(div);
        };
        document.body.onclick = () => div.remove();
    }

    /!**
     * save new folder
     * @param name
     * @param url
     *!/
    addFolderRequest({name, url}) {
        const folder = new FormData(), _this = this;
        folder.append("name", name);
        this.http.open("POST", url, true);
        _this.http.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
        this.http.send(folder);
        this.http.onload = function () {
            if (_this.http.readyState === 4 && _this.http.status === 200) {
                _this.khLoadData({
                    data: JSON.parse(this.responseText).data
                })
            }
        }
    }

    khMediaStoreBody() {
        const
            root = document.createElement('div'),
            _this = this,
            loader = document.createElement('div'),
            header = document.createElement('header'),
            buttonAddFolder = document.createElement('button'),
            mediaButtonClose = document.createElement('button');


        this.loaderContainer = document.createElement('div');
        this.body = document.createElement('div');
        this.subBody = document.createElement('div');
        this.buttonSave = document.createElement('button');
        this.file = document.createElement('input');
        this.base = document.getElementById('kh-media-store-base');

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
        this.buttonSave.textContent = "Choisir";
        mediaButtonClose.id = "kh-media-store-close";
        mediaButtonClose.innerHTML = "<span>&times;</span>";
        root.id = "kh-media-store";
        buttonAddFolder.id = "img-container";
        buttonAddFolder.innerHTML = SVG_ADD_FOLDER;
        header.append(buttonAddFolder, mediaButtonClose);

        this.folderAddItem(header, buttonAddFolder, this.base);
        mediaButtonClose.onclick = function () {
            _this.base.style.display = "none";
            _this.subBody.innerHTML = "";
            _this.loaderContainer.style.display = "flex";
            _this.subBody.append(_this.file, _this.loaderContainer);
            root.remove();

        }
        this.buttonSave.onclick = function () {
            const
                kh = document.getElementById(_this.base.dataset.target),
                img = document.getElementsByClassName(kh.dataset.img_class),
                input = document.getElementById(kh.dataset.input_id);

            kh.getElementsByClassName('media-store-icon').item(0).style.display = "none";
            _this.base.style.display = 'none';
            input.value = this.dataset.id;
            for (let i = 0; i < img.length; i++) {
                img.item(i).setAttribute('src', this.dataset.url);
                img.item(i).onload = function () {
                    this.style.display = "block";
                }
            }

        }
        root.append(header, this.body, this.buttonSave);
        this.openMediaStore(this.base, root);
    }
}*/
