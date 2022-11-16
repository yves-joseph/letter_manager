/*
 *  @company DarcFlow design [https://darcflow.com]
 *  @author    Koroph <yjk@outlook.fr> {(+225)0778329592}
 *  @website http://koroph.site
 *  @link      https://github.com/Koroph
 *  @license   Apache 2.0
 *  @Copyright (c) 2021.
 *
 */

export default class ImageLoader {

    constructor(className = "kh-img-loader", pattern = "image/*") {
        this._pattern = pattern;
        this._className = className;
        this._elements = document.getElementsByClassName(className);
    }

    start() {
        const _this = this;
        if (this._elements) {
            for (let i = 0; i < this._elements.length; i++) {
                this._elements.item(i).addEventListener("click", function () {

                    const INPUT_FILE = this.children.item(1),
                        CONTAINER_IMG = this.children.item(0),
                        SVG_CONTAINER = this.children.item(2);
                    INPUT_FILE.setAttribute("accept", _this._pattern)
                    INPUT_FILE.click();
                    INPUT_FILE.addEventListener("change", function (event) {
                        SVG_CONTAINER.style.display = "none";
                        CONTAINER_IMG.style.display = "block";
                        CONTAINER_IMG.parentElement.style.padding = "2px";
                        _this.dataImgReader(event, CONTAINER_IMG.firstElementChild);
                    });
                });
            }
        } else console.log("Aucun élément trouvés qui a le _className=" + this._className)

    }


    applyStyle(img, svg) {
        svg.style.display = "none";
        img.style.display = "block";
        img.parentElement.style.padding = "2px";
    }

    dataImgReader(event, img) {
        const reader = new FileReader();
        reader.onload = function (_event) {
            img.src = _event.target.result;
        }
        reader.readAsDataURL(event.target.files[0])
    }
}
