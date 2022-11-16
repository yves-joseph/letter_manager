/**
 * @author Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link  https://github.com/Koroph
 * @license MIT
 * @copyright Copyright (c) 2020.
 */


import __ from "./lang/Translation";

export default class AlertDialog {

    constructor() {

        this.yes = __("yes");
        this.no = __("no");
        this.massage = __("not_defined");
        this.header = __("not_defined");

        this.yesOnly = false;
        this.type = "p";
    }

    set setMessage(value) {
        this.massage = value
    }


    set setType(value) {
        if (["p", "d", "w"].includes(value)) this.type = value;
        else {
            console.error("Type value is p or d, value default p");
            this.type = "p";
        }
    }


    set setYesOnly(value) {
        this.yesOnly = value
    }

    set setYes(value) {
        this.yes = value;
    }

    set setNo(value) {
        this.no = value;
    }

    /**
     * show alert dialog
     * @return {Promise<commander.ParseOptionsResult.unknown>}
     */
    show() {
        const divElement = document.createElement('div');
        document.body.style.position = "relative";
        divElement.className = "koroph-alertDialog-container";
        return this.AlertDialogResponse(divElement);
    }

    /**
     * alert dialog promise
     * @param divElement
     * @return {Promise<unknown>}
     * @constructor
     */
    AlertDialogResponse(divElement) {
        return new Promise((resolve, reject) => {
            try {
                divElement.append(this.alertDialogDOM());
                document.body.append(divElement);
                const alertDialogButton = document.getElementsByClassName("ripper-alert"),
                    BUTTON_COUNT = alertDialogButton.length;

                for (let i = 0; i < BUTTON_COUNT; i++) {
                    alertDialogButton.item(i).addEventListener("click", function () {
                        if (BUTTON_COUNT <= 1) resolve(true);
                        else {
                            if (i === 0) resolve(false)
                            else resolve(true)
                        }
                        divElement.remove();
                    });
                }
            } catch (e) {
                reject(e)
            }
        });
    }

    /**
     * header color type
     * @return {string}
     */
    getHeaderClassName() {
        return this.type === "p" ? "primary" : this.type === "d" ? "danger" : "warning";
    }

    /**
     * chose icon
     * @return {string}
     */
    getHeaderIconClassName() {
        return this.type === "p" ? "icon-info" : this.type === "d" ? "icon-bin" : "icon-warning";
    }

    /**
     * generate alert dialog DOM base
     * @return {HTMLDivElement}
     */
    alertDialogDOM() {

        const baseDOM = document.createElement('div');
        // set classname
        baseDOM.className = "koroph-alertDialog";

        baseDOM.append(this.DOMHeader(), this.DOMContent(), this.DOMButtonAction());

        return baseDOM;
    }

    /**
     * generate alert dialog header
     * @return {HTMLElement}
     * @constructor
     */
    DOMHeader() {
        const header = document.createElement('header'),
            headerIconContainer = document.createElement('div'),
            headerText = document.createElement('div'),
            headerIcon = document.createElement('span');

        header.className = this.getHeaderClassName();
        headerIconContainer.className = "alert-dialog-icon";
        headerIcon.className = this.getHeaderIconClassName();
        headerText.className = "alert-dialog-text";

        headerText.innerHTML = this.header;

        headerIconContainer.append(headerIcon);
        header.append(headerIconContainer, headerText);

        return  header;
    }

    /**
     *generate alert dialog content
     * @return {HTMLDivElement}
     * @constructor
     */
    DOMContent() {
        const content = document.createElement('div');

        content.className = "koroph-alertDialog-content";
        content.innerHTML = this.massage;

        return content;
    }

    /**
     * generate alert dialog buttons
     * @return {HTMLDivElement}
     * @constructor
     */
    DOMButtonAction() {
        const actionContainer = document.createElement('div'),
            buttonPositive = document.createElement('button'),
            buttonNegative = document.createElement('button');


        actionContainer.className = "koroph-alertDialog-action";
        buttonPositive.type = "button";
        buttonNegative.type = "button";
        buttonPositive.className = `btn-active ripper-alert ${this.getHeaderClassName()}`;
        buttonNegative.className = "btn-default ripper-alert ";


        buttonNegative.style.display = this.yesOnly ? "none" : "block";
        buttonPositive.innerHTML = this.yes;
        buttonNegative.innerHTML = this.no;

        actionContainer.append(buttonNegative, buttonPositive);

        return actionContainer;
    }
}
