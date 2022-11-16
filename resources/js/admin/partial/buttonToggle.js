export default class BtnToggle {
    constructor(className = "btn-toggle") {
        this._className = className;
        this._elments = document.getElementsByClassName(className);
    }

    start() {
        const ACTIVE = "active",
            IN_ACTIVE = "in_active",
            _this = this;

        if (this._elments) {

            for (let i = 0; i < this._elments.length; i++) {
                this._elments.item(i).addEventListener("click", function (event) {
                    event.stopPropagation();
                    const __this = this;
                   // alert(_this.url(this))
                    axios.get(_this.url(this)).then((res) => {
                        const { toggle } = res.data;
                      //  console.log(res.data)
                        if (toggle === true || toggle === false) {
                            if (_this.btnIsActive(__this)) this.classList.replace(ACTIVE, IN_ACTIVE);
                            else this.classList.replace(IN_ACTIVE, ACTIVE);
                        }
                        if (res.data.browserReload !== undefined && res.data.browserReload === true) {
                            window.location.reload();
                        }
                    }).catch((e) => console.log(e))
                });
            }
        } else console.log("Aucun élément trouvés qui a le :<||-:=<||-:=<||-:className=" + this._className)
    }

    btnIsActive(_this) {
        return _this.classList.contains("active");
    }

    url(_this) {
        return _this.dataset.link;
    }
}


