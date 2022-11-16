/**
 * @author Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link  https://github.com/Koroph
 * @license MIT
 * @copyright Copyright (c) 2020.
 */

import {FLAG_C_R, FLAG_EN, FLAG_FR, FLAG_GER, FLAG_H_R, FLAG_M, FLAG_P_R, FLAG_P_T, SEARCH_ICON} from "./flag";

export default class KHSelect {

    /**
     * @param {string|Element} target
     */
    constructor(target) {
        this.query = matchMedia("screen and (max-width:568px)");
        this.bindAction(target);
        this.closeModelGlobal();
    }

    /**
     * @private
     * {string|Element} target
     */
    bindAction(target) {
        if (target instanceof Element)
            target.insertAdjacentElement("beforebegin", this.customBuilder(target));
        else this.bindWithClassName(target);

    }

    /**
     * @private
     * @param {string} target
     */
    bindWithClassName(target) {
        this.element = document.getElementsByClassName(target);
        for (let i = 0; i < this.element.length; i++)
            this.element.item(i).insertAdjacentElement("beforebegin", this.customBuilder(this.element.item(i)));
    }

    /**
     * close model when click document element
     * @private
     */
    closeModelGlobal() {
        document.documentElement.addEventListener('click', function () {
            const khBody = document.getElementsByClassName('kh-select-body');
            for (let i = 0; i < khBody.length; i++) {
                if (khBody.item(i).style.display === "flex") {
                    khBody.item(i).style.display = "none";
                    this.selectModalIsClose(null);
                }
            }
        }.bind(this));
    }

    /**
     *
     * @param {HTMLSelectElement} select
     * @returns {HTMLDivElement}
     */
    customBuilder(select) {
        const
            container = document.createElement('div'),
            header = document.createElement('div'),
            khLabel = document.createElement('div'),
            khIcon = document.createElement('div'),
            body = document.createElement('div'),
            container_item = document.createElement('div'),
            content = document.createElement('div'),
            selectedView = document.createElement('div'),
            khData = this.selectData(select),
            _this = this;


        container.className = "kh-select";
        header.className = "kh-select-header";
        body.className = "kh-select-body";
        selectedView.className = "select-view";
        body.style.display = "none";

        content.className = "kh-select-content";
        container_item.id = "item_container";
        // if (!this.query.matches) {
        header.append(khIcon, khLabel);
        khLabel.appendChild(this.placeHolder(select, khLabel));
        if (!select.hasAttribute('disabled')) {
            header.onclick = event => {
                if (!this.query.matches) this.openSelect(event, body);
                /*  else {
                      select.style.display = "block"
                      //select.click();
                      select.addEventListener('change', () => khLabel.innerText = select.options[select.selectedIndex].innerText);
                  }*/
                this.selectModalIsOpen(select);
            }
        }
        if (!this.query.matches) {
            if (Object.keys(khData).length > 1) {
                for (const group in khData) {
                    if (group !== "default")
                        container_item.append(this._createGroupItem(group));
                    khData[group].forEach(value => {
                        const item = this.createVictualSelectItem(value, select, _this, selectedView, body, khLabel, khIcon);
                        if (group === "default") item.style.paddingLeft = "0";
                        container_item.append(item);
                    });
                }
            } else {
                khData.default.forEach(value => {
                    const item = this.createVictualSelectItem(value, select, _this, selectedView, body, khLabel, khIcon);
                    container_item.append(item);
                });
            }
            body.append(container_item);
            _this.searchFieldInput(select, body);
            content.append(header, body)
            if (select.hasAttribute('multiple'))
                container.append(content, selectedView);
            else container.append(content);
            //}
        } else {
            select.style.display = "block";
            select.style.width = "100%";
            select.addEventListener('change', () => select.dispatchEvent(new Event("khchange")));
        }
        return container;

    }

    /**
     *
     * @param value
     * @param {HTMLSelectElement} select
     * @param _this
     * @param {HTMLDivElement} selectedView
     * @param {HTMLDivElement} body
     * @param khLabel
     * @param khIcon
     * @return {HTMLDivElement}
     */
    createVictualSelectItem(value, select, _this, selectedView, body, khLabel, khIcon) {
        const item = document.createElement('div'),
            icon = document.createElement('div'),
            label = document.createElement('div'),
            select_view_item = document.createElement('div');

        item.className = "kh-select-item";
        icon.className = "kh-select-item-icon";
        label.className = "kh-select-item-label";
        select_view_item.className = "select-view-item";
        label.innerText = value.label;

        /* if (select.options.item(value.index).hasAttribute('data-flag') || select.options.item(value.index).hasAttribute('data-icon')) {
             if (select.options.item(value.index).hasAttribute('data-flag')) {
                 icon.innerHTML = _this.flag(select.options.item(value.index).dataset.flag);
             }
             if (select.options.item(value.index).hasAttribute('data-icon')) {
                 icon.innerHTML = _this._createIconItem(select.options.item(value.index).dataset.icon);
             }
             item.append(icon, label);
         } else item.append(label);
        */

        _this._addIcon(select.options.item(value.index), icon);
        item.append(icon, label);
        item.onclick = function (e) {
            e.stopPropagation();
            if (select.hasAttribute('multiple')) {
                _this.multiSelectItem(item, select, value, selectedView, select_view_item);
                if (!e.ctrlKey) body.style.display = "none";
            } else if (!select.hasAttribute('multiple')) {
                _this.itemFill(body, select, value, khLabel, khIcon, this);
            } else body.style.display = "none";
            _this.selectModalIsClose(select);
        }

        if (value.selected) {
            item.classList.add('selected');
            if (select.hasAttribute('multiple')) {
                select_view_item.innerText = value.label;
                selectedView.appendChild(select_view_item);
            } else {
                khLabel.innerText = value.label;
            }
            _this._addIcon(select.options.item(value.index), khIcon);

            /* if (select.options.item(value.index).hasAttribute('data-flag') || select.options.item(value.index).hasAttribute('data-icon')) {
                 if (select.options.item(value.index).hasAttribute('data-flag')) {
                     khIcon.innerHTML = _this.flag(select.options.item(value.index).dataset.flag);
                 }
                 if (select.options.item(value.index).hasAttribute('data-icon')) {
                     khIcon.innerHTML = _this._createIconItem(select.options.item(value.index).dataset.icon);
                 }
             }*/

        }
        return item;
    }

    /**
     *
     * @param {HTMLDivElement} body
     * @param {HTMLSelectElement} select
     * @param {object} value
     * @param {HTMLDivElement} khLabel
     * @param {HTMLDivElement} khIcon
     * @param _this
     */
    itemFill(body, select, value, khLabel, khIcon, _this) {
        /**
         *
         * @type {HTMLCollectionOf<Element>}
         */
        const oldSelected = body.getElementsByClassName('selected');
        body.style.display = "none";
        select.selectedIndex = value.index;
        select.dispatchEvent(new Event("khchange"))
        if (oldSelected.length) {
            for (let i = 0; i < oldSelected.length; i++) {
                oldSelected.item(i).classList.remove('selected');
            }
        }
        _this.classList.add('selected');
        khLabel.innerText = value.label;
        this._addIcon(select.options.item(value.index), khIcon);

        /*if (select.options.item(value.index).hasAttribute('data-flag') || select.options.item(value.index).hasAttribute('data-icon')) {
            if (select.options.item(value.index).hasAttribute('data-flag')) {
                khIcon.innerHTML = this.flag(select.options.item(value.index).dataset.flag);
            }
            if (select.options.item(value.index).hasAttribute('data-icon')) {
                khIcon.innerHTML = this._createIconItem(select.options.item(value.index).dataset.icon);
            }
        }*/

    }


    /**
     *
     * @param {HTMLOptionElement} option
     * @param {HTMLDivElement} khIcon
     * @private
     */
    _addIcon(option, khIcon) {
        const _FLAG = "data-flag", _ICON = "data-icon"
        if (option.hasAttribute(_FLAG) || option.hasAttribute(_ICON)) {
            if (option.hasAttribute(_FLAG)) {
                khIcon.innerHTML = this.flag(option.dataset.flag);
            }
            if (option.hasAttribute(_ICON)) {
                khIcon.innerHTML = this._createIconItem(option.dataset.icon);
            }
        }
    }

    /**
     * create icon item content
     * @param {string} icon
     * @return {string}
     * @private
     */
    _createIconItem(icon) {
        return `<span class="${icon}"></span>`;
    }

    /**
     *
     * @param {string} group
     * @return {HTMLDivElement}
     * @private
     */
    _createGroupItem(group) {
        const groupElement = document.createElement('div');
        groupElement.classList.add("select-group");
        groupElement.innerText = group;
        return groupElement;
    }

    /**
     *
     * @param {MouseEvent} event
     * @param {HTMLDivElement} body
     */
    openSelect(event, body) {
        event.stopPropagation();
        const khBody = document.getElementsByClassName('kh-select-body');
        if (body.style.display === "none")
            body.style.display = "flex";
        else body.style.display = "none";

        // close other modal
        for (let i = 0; i < khBody.length; i++) {
            if (khBody.item(i) !== body && khBody.item(i).style.display === "flex") {
                khBody.item(i).style.display = "none";
            }
        }
        if (window.innerHeight - (event.pageY - window.pageYOffset) < body.offsetHeight) {
            body.style.bottom = "0";
            body.style.top = "auto";
            body.style.flexDirection = "column-reverse";
        } else {
            body.style.bottom = "auto";
            body.style.top = "0";
            body.style.flexDirection = "column";
        }
    }

    /**
     *
     * @param {HTMLSelectElement} select
     * @param label
     * @returns {HTMLSpanElement}
     */
    placeHolder(select, label) {
        let placeHolder = "Choisir une option",
            span = document.createElement('span');

        if (select.hasAttribute("data-placeholder"))
            placeHolder = select.dataset.placeholder;

        span.innerText = placeHolder;
        return span;
    }

    /**
     *
     * @param {Element} item
     * @param {HTMLSelectElement} select
     * @param {object} value
     * @param {Element} selectedView
     * @param {Element} select_view_item
     */
    multiSelectItem(item, select, value, selectedView, select_view_item) {
        if (item.classList.contains('selected')) {
            select.options.item(value.index).selected = false;
            item.classList.remove('selected');
            selectedView.removeChild(select_view_item);
        } else {
            select.options.item(value.index).selected = true;
            item.classList.add('selected');
            select_view_item.innerText = value.label;
            selectedView.appendChild(select_view_item);

        }
    }

    /**
     * add input search
     * @private
     * @param {HTMLSelectElement} select
     * @param {HTMLDivElement} body
     */
    searchFieldInput(select, body) {
        if (select.hasAttribute('data-search') && select.dataset.search === "true") {
            const input = document.createElement('input'),
                search_container = document.createElement('div'),
                search_icon = document.createElement('span');
            input.type = "search";
            input.id = "search_input";
            search_container.id = "search_container";
            input.placeholder = "Recherche";
            input.autocomplete = "false";
            input.type = "search";
            search_icon.classList.add('search-icon');

            search_icon.innerHTML = SEARCH_ICON;

            input.onclick = event => event.stopPropagation();
            input.oninput = event => this.selectFilter(event, body);
            /* input.onkeydown = function (e) {
                 if (e.key === "Enter") {
                     input.value = "";
                     body.style.display = "none";
                 }
             }*/
            search_container.append(input, search_icon);
            body.insertAdjacentElement("afterbegin", search_container);
        }
    }

    /**
     * @private
     * @param {Event} event
     * @param {Element} body
     */
    selectFilter(event, body) {
        const khValue = event.target.value.toString().toLocaleLowerCase(),
            khItem = body.getElementsByClassName('kh-select-item'),
            group = body.getElementsByClassName('select-group');

        for (let i = 0; i < khItem.length; i++) {
            if (khItem.item(i).lastChild.textContent.toLocaleLowerCase().includes(khValue, 0)) {
                khItem.item(i).style.display = "block";
            } else khItem.item(i).style.display = "none";
        }

        for (let i = 0; i < group.length; i++) {


            let _next = group[i].nextElementSibling, is = false;

            while (_next !== null && _next.classList.contains('kh-select-item')) {
                if (_next.style.display === "block") {
                    is = true;
                    break;
                }
                _next = _next.nextElementSibling;
            }

            if (!is) group[i].style.display = "none";
            else group[i].style.display = "block";

        }

    }

    /**
     *
     * @param {HTMLSelectElement} select
     * @returns {{}}
     */
    selectData(select) {
        //const data = [];

        const options = select.options, optgroup = select.getElementsByTagName('optgroup');
        let selectData = {};
        selectData['default'] = [];

        for (let i = 0; i < optgroup.length; i++) {

            if (!(optgroup[i].label in Object.keys(selectData))) {
                selectData[optgroup[i].label] = []
            }
        }

        for (let i = 0; i < options.length; i++) {
            if (options.item(i).parentNode instanceof HTMLOptGroupElement) {
                selectData[options.item(i).parentNode.label].push({
                    label: options.item(i).text,
                    value: options.item(i).value,
                    index: options.item(i).index,
                    selected: options.item(i).hasAttribute('selected')
                });
            } else {
                if (options.item(i).value.trim() !== "")
                    selectData["default"].push({
                        label: options.item(i).text,
                        value: options.item(i).value,
                        index: options.item(i).index,
                        selected: options.item(i).hasAttribute('selected')
                    });
            }
            /* data.push({
                 label: options.item(i).text,
                 value: options.item(i).value,
                 index: options.item(i).index,
                 selected: options.item(i).hasAttribute('selected')
             });*/
        }

        return selectData;
    }

    /**
     * get flag country
     * @private
     * @param {string} value
     * @returns {string}
     */
    flag(value) {
        switch (value) {
            case "fr":
                return FLAG_FR;
            case "en":
                return FLAG_EN;
            case "ge":
                return FLAG_GER;
            case "p_t":
                return FLAG_P_T;
            case "c_r":
                return FLAG_C_R;
            case "m":
                return FLAG_M;
            case "h_r":
                return FLAG_H_R;
            case "p_r":
                return FLAG_P_R;

        }
    }

    /**
     *
     * @param {HTMLSelectElement} target
     */
    selectModalIsOpen(target) {
        target.parentElement.classList.add("active");
    }

    /**
     *
     * @param {HTMLSelectElement|null} target
     */
    selectModalIsClose(target) {

        if (target === null) {
            const targets = document.getElementsByClassName('kh-select-id');
            if (targets.length) {
                for (let i = 0; i < targets.length; i++) {
                    if (targets.item(i).classList.contains("active"))
                        targets.item(i).classList.remove('active')
                }
            }
        } else {
            target.parentElement.classList.remove("active");
        }
    }

}
