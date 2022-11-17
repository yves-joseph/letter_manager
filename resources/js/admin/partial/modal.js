

export default function modalAction() {
    const btnOpen = document.getElementById('_open_modal'),
        btnClose = document.getElementById('_modal_container-content-header-close-btn'),
        modalContainer = document.getElementById('_modal_container'),
        searchField = document.getElementById('category_search'),
        searchCategoryContainer = document.getElementById('_modal_container-content-nav-search-link-container');

    let _data = [];

    if (btnOpen && modalContainer && btnClose) {
        btnOpen.addEventListener('click', function (e) {
            e.preventDefault();
            modalContainer.style.display = "flex";
        /*    if (_data.length === 0) {
                console.log(modalContainer.dataset.url)
                axios.get(modalContainer.dataset.url).then(response => {
                    _data = response.data;
                    //new SortHorizontalView('kh_sortable', _data, {isActive: true, isCollapsed: true});
                    categorySearchView(_data);
                }).catch(error => {
                    console.log(error);
                });
            }*/
        });

        btnClose.addEventListener('click', function () {
            modalContainer.style.display = "none";
            searchCategoryContainer.innerHTML=null;
            searchField.value = "";
        });
    }
}
