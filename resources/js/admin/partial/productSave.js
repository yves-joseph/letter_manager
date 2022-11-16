import AlertDialog from "../components/AlertDialog";
import __ from "../components/lang/Translation";

export default function productSave() {

    const btn = document.querySelector('.product_btn_save'),
        btn_price_variation_remove = document.getElementsByClassName('btn_price_variation_remove'),
        _alert = new AlertDialog();

    if (btn) {
        const loader_container = document.getElementById('tab-content-loader');
        let error = false, add_main_image = false;
        _alert.header = __('warning');
        _alert.yes = __('yes');
        _alert.type = "w";
        _alert.setYesOnly = true;

        btn.addEventListener('click', function () {
            error = false;
            let dataForm = new FormData();
            dataForm["fr"] = [];
            dataForm["en"] = [];
            dataForm["other"] = [];
            dataForm["image"] = [];
            dataForm["variation"] = [];
            let fd = new FormData(document.forms.productForm);
            /* for (const item of fd.entries()) {
                 console.log(item)
             }*/
            for (const item of fd.entries()) {
                const [_key, _name, _pass = ""] = item[0].split('__');
                if (item[0].indexOf("image") === -1) {
                    if (item[1].trim() === "") {
                        if (_key === "price") {
                            _alert.setMessage = __("add_product_error." + _key + "__" + _pass);
                        } else {
                            _alert.setMessage = __("add_product_error." + item[0]);
                        }
                        _alert.show();
                        //console.log("price")
                        error = true;
                        break;
                    }
                } else {
                    if (!add_main_image) {
                        if (item[1].trim() === "") {
                            _alert.setMessage = __("add_product_error." + item[0]);
                            _alert.show();
                            error = true;
                            //console.log("image")
                            break;
                        } else add_main_image = true;
                    }
                }

                if (["fr", "en", "other"].includes(_key)) {
                    dataForm.append(_key + "[" + _name + "]", item[1]);
                }
                if (_name === "image") {
                    if (item[1] !== "") dataForm.append(_name + "[" + _key + "]", item[1]);
                }
                if (_key === "price") {
                    dataForm.append("variation[" + _name + "][" + _pass + "]", item[1]);
                }
            }

            //console.log(error)
            if (!error) {
                const indexURL = this.parentElement.dataset.indexUrl;
                _alert.setYesOnly = false;
                _alert.type = "p";

                if (indexURL === undefined) {
                    _alert.yes = __('add_product_error.before_add_c');
                    _alert.no = __('add_product_error.before_add_save');
                    _alert.setMessage = __('add_product_error.before_add');
                } else {
                    _alert.yes = __('yes');
                    alert.no = __('no');
                    _alert.setMessage = __('add_product_error.update');
                }

                _alert.show().then(rp => {
                    if (indexURL !== undefined && rp === true || indexURL === undefined) {
                        loader_container.style.display = "flex";
                        axios.post(loader_container.dataset.url, dataForm).then(response => {
                            if (response.data.error === false) {
                                if (rp) location.reload();
                                else {
                                    window.location.href = this.parentElement.dataset.indexUrl
                                }
                            } else {
                                _alert.setYesOnly = true;
                                _alert.type = "d";
                                _alert.yes = __('yes');
                                _alert.setMessage = response.data.message;
                                _alert.show();
                            }
                        }).catch(error => {
                            _alert.setYesOnly = true;
                            _alert.type = "d";
                            _alert.yes = __('yes');
                            _alert.setMessage = __('add_product_error.error');
                            _alert.show();
                        }).finally(() => {
                            loader_container.style.display = "none";
                        });
                    }
                });
            }
        });
    }

    if (btn_price_variation_remove.length) {
        for (let i = 0; i < btn_price_variation_remove.length; i++) {
            btn_price_variation_remove.item(i).addEventListener('click', function () {
                _alert.header = __('warning');
                _alert.yes = __('yes');
                _alert.yes = __('no');
                _alert.type = "p";
                _alert.show().then(rp => {
                    if (rp) {
                        axios.get(this.dataset.url).then(response => {
                            this.parentElement.parentElement.parentElement.remove()
                        }).catch(error => {
                            alert("error")
                        });
                    }
                });
            });
        }
    }
}