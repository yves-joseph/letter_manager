export default function productImagePaginate() {
    const img_target = document.getElementById('product-preview-img-container-img-target');

    if (img_target) {
        const btn = document.getElementsByClassName('product-preview-img-container-other-btn');
        for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener("click", function () {
                const viewActive = document.getElementsByClassName('view_active');

                if (viewActive.length) {
                    viewActive[0].classList.remove('view_active');
                }
                img_target.src = this.dataset.url;
                this.classList.add('view_active');
            });
        }

    }
}