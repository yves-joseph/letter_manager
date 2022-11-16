export default class CheckboxGroup {

    constructor(className = 'kh-group') {
        const groups = document.getElementsByClassName(className);

        if (groups.length) {
            for (let i = 0; i < groups.length; i++) {
                const parentField = groups[i].firstElementChild.firstElementChild;
                const children = groups[i].lastElementChild.getElementsByClassName(parentField.dataset.target);
                this.checkedParentField(parentField, children);
                this.updateCheckboxValue(children, parentField);
                this.selectAllField(parentField, children);
            }
        }
    }

    updateCheckboxValue(children, parentField) {
        const showField = this.getShowField(children);
        for (let j = 0; j < children.length; j++) {
            children[j].addEventListener("change", (event) => {
                if (showField && showField !== event.target) {
                    if (event.target.checked) {
                        //event.target.value = "true";
                        this.checkedParentField(parentField, children);
                        if (!(event.target.value.indexOf('SHOW') > -1)) {
                            showField.checked = true
                            //showField.value = "true"
                        }
                    } else {
                        //event.target.value = "false";
                        parentField.checked = false;
                    }
                } else {
                    if (event.target.checked) {
                        //event.target.value = "true";
                        this.checkedParentField(parentField, children);
                    } else {
                        //event.target.value = "false";
                        parentField.checked = false;
                        for (let h = 0; h < children.length; h++) {
                            children[h].checked = false;
                           // children[h].value = "false";
                        }
                    }
                }

            });
        }
    }

    /**
     * get show field
     * @param children
     * @return {HTMLInputElement|null}
     */
    getShowField(children) {
        let showField = null;
        for (let k = 0; k < children.length; k++) {
            if (children[k].value.indexOf('SHOW') > -1) {
                showField = children[k];
                break;
            }
        }
        return showField;
    }

    selectAllField(parentField, children) {
        parentField.addEventListener("change", (event) => {
            if (event.target.checked) {
                for (let j = 0; j < children.length; j++) {
                    children[j].checked = true;
                    //children[j].value = "true";
                }
            } else {
                for (let j = 0; j < children.length; j++) {
                    children[j].checked = false;
                   // children[j].value = "false";
                }
            }
        });
    }

    checkedParentField(parentField, children) {
        if (!parentField.checked) {
            let _is = true;
            for (let k = 0; k < children.length; k++) {
                if (!children[k].checked) {
                    _is = false;
                    break;
                }
            }
            parentField.checked = _is;
        }
    }
}
