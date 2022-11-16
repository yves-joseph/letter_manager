/**
 * @author Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link  https://github.com/Koroph
 * @license MIT
 * @copyright Copyright (c) 2020.
 */

export default class Ripper {

    static bind(className = "ripper",color="#ffffff") {
        document.addEventListener("DOMContentLoaded", evt => {
            const _this = this,
                elements = document.getElementsByClassName(className);
            if (elements != null) {
                for (let i = 0; i < elements.length; i++) {
                    elements.item(i).addEventListener('click', function (e) {
                        this.appendChild(_this.createRipperContent(e,color));

                    });
                }
            }
        })
    }
    static createRipperContent(event,color) {
        let ripper_content = document.createElement("span");
        ripper_content.style.backgroundColor=`${color}`
        ripper_content.style.left = `${event.pageX - event.target.offsetLeft}px`;
        ripper_content.style.top = `${event.pageY - event.target.offsetTop}px`;
        ripper_content.addEventListener('animationend', function () {
            this.remove()
        });
        return ripper_content;
    }
}
