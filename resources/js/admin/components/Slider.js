export default class Slider {

    constructor(classname = 'kh-range-field') {
        this.target = document.getElementsByClassName(classname);
        this.rangeEventBind();
    }


    /**
     *
     * @param {HTMLInputElement} context
     * @param {number} rangeDiff
     */
    rangerWatcher(context, rangeDiff) {
        let percent, _left;
        percent = ((parseInt(context.value) - parseInt(context.getAttribute('min'))) / rangeDiff) * 100;

        if (percent < 5) {
            _left = percent - 0.30
        } else if (percent >= 5 && percent <= 25) {
            _left = percent - 0.55;
        } else if (percent > 25 && percent < 50) {
            _left = percent - 1;
        } else if (percent >= 50 && percent < 70) {
            _left = percent - 1.7;
        } else if (percent >= 70 && percent < 90) {
            _left = percent - 1.9;
        } else {
            _left = percent - 1.7;
        }

        context.nextElementSibling.style.left = _left + "%";
        context.nextElementSibling.firstElementChild.innerHTML = context.value + "%";
    }

    rangeEventBind() {
        if (this.target.length) {
            const _this = this;
            for (let i = 0; i < this.target.length; i++) {
                const rangeDiff = Math.abs(parseInt(this.target.item(i).getAttribute('max')) - parseInt(this.target.item(i).getAttribute('min')));
                this.rangerWatcher(this.target.item(i), rangeDiff);
                //this.target.item(i).parentElement.insertBefore(this.addStepRange(), this.target.item(i))
                this.addStepRange(this.target.item(i));
                this.target.item(i).addEventListener('input', (e) => _this.rangerWatcher(e.target, rangeDiff));

            }
        }
    }


    /**
     *
     * @param {HTMLInputElement} field
     */
    addStepRange(field) {

        if (field.parentElement.hasAttribute('scale')) {
            const scaleContainer = document.createElement('div'),
                scale = field.parentElement.getAttribute('scale');
            if (scale === "true") {
                scaleContainer.classList.add('step-container');
                for (let i = 0; i <= 10; i++) {
                    const scaleItem = document.createElement('span');
                    scaleItem.classList.add('step-item');
                    scaleItem.style.left = "" + (i * 10) + "%";
                    scaleContainer.append(scaleItem);
                }
                field.parentElement.insertBefore(scaleContainer, field);
            }
        }
    }
}

