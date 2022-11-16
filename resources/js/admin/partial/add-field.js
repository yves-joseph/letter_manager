export default function addField() {
    const btn = document.getElementById('btn_add_field'),
        container = document.getElementById('price_content');

    if (btn && container) {

        btn.addEventListener('click', function () {
            const _tampon = document.createElement('div')
            _tampon.classList.add('_tampon');
            _tampon.innerHTML = `<span id="loader"
      style="height: 48px ;width: 48px;visibility:visible"
      class="loader"></span>`;
            container.insertAdjacentElement("beforeend", _tampon)
            axios.get(this.parentElement.parentElement.dataset.url).then(response => {
                _tampon.remove();
                container.insertAdjacentHTML("beforeend", response.data);
            }).catch(error => {
                _tampon.remove();
            });
        })
    }
}