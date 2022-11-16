import __ from "../components/lang/Translation";

export function categorySearchView(__data) {
    let productData = [];
    const searchField = document.getElementById('category_search'),
        container = document.getElementById('_modal_container-content-nav-search-link-container');


    if (searchField && container) {
        searchField.addEventListener("input", e => {
            const text = e.target.value.toString().trim().toLowerCase();
            const data = productData.filter(a => {
                return text !== "" && (a.dataset.title.toLowerCase().indexOf(text) > -1 || a.dataset.parent.toLowerCase().indexOf(text) > -1);
            });
            container.innerHTML = null;
            if (data.length > 0) {
                container.append(...data);
            }
        });
        searchField.addEventListener("focus", e => {
            container.style.display = "block";
            if (productData.length === 0) {
                for (let i = 0; i < __data.length; i++) {
                    const el = __data[i];
                    if (el.children.length > 0) {
                        for (let j = 0; j < el.children.length; j++) {
                            const _el = el.children[j];
                            if (_el.children.length > 0) {
                                for (let k = 0; k < _el.children.length; k++) {
                                    const __el = _el.children[k];
                                    productData.push(CategoryItem(__el, el.label + ' &raquo ' + _el.label))
                                }
                            } else {
                                productData.push(CategoryItem(_el, el.label))
                            }
                        }
                    } else {
                        productData.push(CategoryItem(el))
                    }
                }
            }
        });

    }

    /**
     *
     * @param {object} category
     * @param {string} parent
     */
    function CategoryItem(category, parent = "") {
        const link = document.createElement('div');
        link.classList.add("_modal_container-content-nav-search-link-item");
        link.setAttribute("data-title", category.label);
        link.setAttribute("data-parent", category.parent);
        link.innerHTML = `<div class="_modal_container-content-nav-search-link-item-text">
        <div class="_modal_container-content-nav-search-link-item-text-content">
           ${category.label}
        </div>
            <div class="_modal_container-content-nav-search-link-item-text-nav">
                ${parent}
            </div>
        </div>
        <div class="_modal_container-content-nav-search-link-item-link">
            <a href="${category.path.select}">${__('select')}</a>
        </div>
        `;
        return link;
    }

}
