/*
 * @company DarcFlow design [https://darcflow.com]
 * @author    Koroph <yjk@outlook.fr> (+225 0778329592)
 * @website http://koroph.site
 * @link      https://github.com/Koroph
 * @license   Apache 2.0
 * @Copyright (c) 2021.
 *
 */

export default class ChipBuilder {

    /**
     * constructor
     * @param {string} className
     */
    constructor(className = 'kh-native-chip') {

        this._ADD_EVENT_CHIP = "onChipAdd";
        this._REMOVE_EVENT_CHIP = "onChipDelete";
        /**
         *
         * @type {HTMLCollectionOf<Element>}
         */
        this.chipContainerItem = document.getElementsByClassName(className);
        this.build();
    }


    build() {
        if (this.chipContainerItem.length) {
            for (let i = 0; i < this.chipContainerItem.length; i++) {
                this.chipContainerItem.item(i).append(this.tagContent(this.chipContainerItem.item(i)));
            }
        }
    }

    /**
     * chip container
     * @param {HTMLDivElement} container
     * @return {HTMLDivElement}
     */
    tagContent(container) {
        const baseContainer = document.createElement('div'),
            tagContainer = document.createElement('div'),
            inputContainer = document.createElement('div'),
            searchContainer = document.createElement('div'),
            _input = document.createElement('input'),
            _hidden_field = document.createElement('input'),
            dataSearch = JSON.parse(container.dataset.searchable ?? "[]"),
            required = container.dataset.required === "true",
            multiple = container.dataset.multiple === "true";
        const dataInit = JSON.parse(container.dataset.init ?? "[]");
        let data = [];


        baseContainer.className = "kh-chip-base-container";
        tagContainer.className = "kh-chip-base-container-chip";
        inputContainer.className = "kh-chip-base-container-input";
        searchContainer.className = "kh-chip-base-container-input-search";
        _input.className = "kh-chip-base-container-input-field";

        _input.id = container.dataset.id;
        _hidden_field.required = required;
        _hidden_field.type = "hidden";
        _hidden_field.name = container.dataset.name ?? "";

        if (container.dataset.placeholder !== undefined) _input.placeholder = container.dataset.placeholder;
        _input.autofocus = (container.dataset.focus !== undefined && container.dataset.focus === "true");

        _input.addEventListener('focus', () => {
            container.parentElement.classList.add("active");
        });
        _input.addEventListener('blur', () => {
            container.parentElement.classList.remove("active");
        });

        if (!multiple) {
            this._notMultipleChip(container, tagContainer, _input);
        }


        this.searchView(container, _input, searchContainer, dataSearch, data, _hidden_field, tagContainer);

        this.addChipItemWhenPressEnter(_input, data, tagContainer, _hidden_field, container, searchContainer);


        this.initChip(dataInit, tagContainer, data, _hidden_field, container);

        /*  for (let j = 0; j < dataSearch.length; j++) {
              searchContainer.append(this.searchItem(dataSearch[j]))
          }*/
        _hidden_field.value = multiple ? JSON.stringify(data) : (data[0] === undefined ? "" : data[0]);
        inputContainer.append(_input, searchContainer, _hidden_field);
        baseContainer.append(tagContainer, inputContainer);
        return baseContainer;

    }

    /**
     *
     * @param {string[]} dataInit
     * @param {HTMLDivElement} tagContainer
     * @param {string[]} data
     * @param {HTMLInputElement} _hidden_field
     * @param {HTMLDivElement} container
     */
    initChip(dataInit, tagContainer, data, _hidden_field, container) {
        const multiple = container.dataset.multiple === "true";

        for (let i = 0; i < dataInit.length; i++) {
            const _tagValue = dataInit[i], tagItem = this.tagItem(_tagValue);
            tagContainer.append(tagItem);
            tagItem.children.item(1).addEventListener('click', function () {
                data.splice(data.findIndex((item) => item === _tagValue), 1);
                _hidden_field.value = multiple ? JSON.stringify(data) : (data[0] === undefined ? "" : data[0]);
                tagItem.remove();
                container.dispatchEvent(new CustomEvent(this._REMOVE_EVENT_CHIP, {
                    detail: {
                        tag: _tagValue
                    }
                }));
            }.bind(this));
            data.push(_tagValue);
        }
    }

    /**
     *
     * @param {HTMLInputElement} _input
     * @param {string[]} data
     * @param {HTMLDivElement} tagContainer
     * @param {HTMLInputElement} _hidden_field
     * @param {HTMLDivElement} container
     * @param {HTMLDivElement} searchContainer
     */
    addChipItemWhenPressEnter(_input, data, tagContainer, _hidden_field, container, searchContainer) {
        const multiple = container.dataset.multiple === "true";

        function inputAction(tagValue, e) {
            const _tagItem = this.tagItem(tagValue);
            tagContainer.append(_tagItem);
            searchContainer.innerHTML = null;
            _tagItem.lastElementChild.onclick = () => {
                data.splice(data.findIndex((item) => item === tagValue), 1);
                _hidden_field.value = multiple ? JSON.stringify(data) : (data[0] === undefined ? "" : data[0]);
                _tagItem.remove();
                container.dispatchEvent(new CustomEvent(this._REMOVE_EVENT_CHIP, {
                    detail: {
                        tag: tagValue
                    }
                }));
            };
            e.target.value = "";
            _input.focus({
                preventScroll: true,
            })
            data.push(tagValue);
            _hidden_field.value = multiple ? JSON.stringify(data) : (data[0] === undefined ? "" : data[0]);
            container.dispatchEvent(new CustomEvent(this._ADD_EVENT_CHIP, {
                detail: {
                    tag: tagValue
                }
            }));
        }

        _input.addEventListener('keydown', (e) => {
            const tagValue = e.target.value.toString().trim();
            if (tagValue !== "" && e.keyCode === 13 && !data.includes(tagValue)) {
                e.preventDefault();
                inputAction.call(this, tagValue, e);
            }
        });
        _input.addEventListener('blur', (e) => {
            if (searchContainer.childElementCount === 0) {
                const tagValue = e.target.value.toString().trim();
                if (tagValue !== "" && !data.includes(tagValue)) {
                    // e.preventDefault();
                    inputAction.call(this, tagValue, e);
                    /*  const _tagItem = this.tagItem(tagValue);
                      tagContainer.append(_tagItem);
                      searchContainer.innerHTML = null;
                      _tagItem.lastElementChild.onclick = () => {
                          data.splice(data.findIndex((item) => item === tagValue), 1);
                          _hidden_field.value = multiple ? JSON.stringify(data) : (data[0] === undefined ? "" : data[0]);
                          _tagItem.remove();
                          container.dispatchEvent(new CustomEvent(this._REMOVE_EVENT_CHIP, {
                              detail: {
                                  tag: tagValue
                              }
                          }));
                      };
                      e.target.value = "";
                      _input.focus({
                          preventScroll: true,
                      })
                      data.push(tagValue);
                      _hidden_field.value = multiple ? JSON.stringify(data) : (data[0] === undefined ? "" : data[0]);
                      container.dispatchEvent(new CustomEvent(this._ADD_EVENT_CHIP, {
                          detail: {
                              tag: tagValue
                          }
                      }));*/
                }
            }

        });
    }

    /**
     *
     * @param {HTMLDivElement} container
     * @param {HTMLInputElement} _input
     * @param {HTMLDivElement} searchContainer
     * @param {string[]} dataSearch
     * @param {string[]} data
     * @param {HTMLInputElement} _hidden_field
     * @param  {HTMLDivElement} tagContainer
     */
    searchView(container, _input, searchContainer, dataSearch, data, _hidden_field, tagContainer) {
        const multiple = container.dataset.multiple === "true";
        if (container.hasAttribute('data-searchable')) {
            _input.addEventListener('input', (e) => {
                const tagValue = e.target.value.toString().trim();
                searchContainer.innerHTML = null;
                if (tagValue !== "") {
                    dataSearch.filter((item) => item.trim().indexOf(tagValue) !== -1).map(tag => {
                        const _tag = this.searchItem(tag), _this = this;
                        _tag.onclick = function () {
                            if (!data.includes(tag)) {
                                const _tagItem = _this.tagItem(tag);
                                _tagItem.children.item(1).addEventListener('click', function () {
                                    data.splice(data.findIndex((item) => item === tag), 1);
                                    _hidden_field.value = multiple ? JSON.stringify(data) : (data[0] === undefined ? "" : data[0]);
                                    _tagItem.remove();
                                    container.dispatchEvent(new CustomEvent(_this._REMOVE_EVENT_CHIP, {
                                        detail: {
                                            tag: tag
                                        }
                                    }));
                                });

                                container.dispatchEvent(new CustomEvent(_this._ADD_EVENT_CHIP, {
                                    detail: {
                                        tag: tag
                                    }
                                }));

                                tagContainer.append(_tagItem);
                                data.push(tag);
                                _hidden_field.value = multiple ? JSON.stringify(data) : (data[0] === undefined ? "" : data[0]);
                                e.target.value = "";
                                e.target.focus();
                                searchContainer.innerHTML = null;
                            }
                        }
                        searchContainer.append(_tag);
                    });
                }
            });
        }
    }

    /**
     * single chip authorize
     * @param {HTMLDivElement} container
     * @param {HTMLDivElement} tagContainer
     * @param {HTMLInputElement} _input
     * @private
     */
    _notMultipleChip(container, tagContainer, _input) {
        container.addEventListener(this._ADD_EVENT_CHIP, () => {
            if (tagContainer.children.length > 0) _input.disabled = true;
        });
        container.addEventListener(this._REMOVE_EVENT_CHIP, () => {
            if (tagContainer.children.length === 0) _input.disabled = false;
        });
        _input.addEventListener('focus', () => {
            if (tagContainer.children.length > 0) _input.disabled = true;
        });
    }

    /**
     * tag item builder
     * @param {string} label
     * @return {HTMLDivElement}
     */
    tagItem(label) {
        const _item = document.createElement('div'),
            _button = document.createElement('button'),
            _text = document.createElement('span');

        _item.className = "chip-item"
        _text.className = "chip-item-text"
        _button.className = "chip-item-del"


        _button.innerHTML = "&times;";
        _button.type = "button";
        _text.innerHTML = label;

        //event
        /*     _button.onclick = function () {
                 _item.remove();
                 container.dispatchEvent(new CustomEvent('onTagDelete', {
                     detail: {
                         tag: label
                     }
                 }));
             }*/

        _item.append(_text, _button);
        return _item;
    }

    /**
     * search label item builder
     * @param {string} label
     */
    searchItem(label) {
        const item = document.createElement('div');
        item.tabIndex = 2;
        item.className = 'search-item';
        item.innerHTML = label;
        return item;
    }
}
