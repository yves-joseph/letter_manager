export default function categorySortSave() {
    const btn = document.getElementById('apply_btn'),
        sortViewContainer = document.getElementById('dd'),
        applyLoader = document.getElementById('apply_loader');

    if (btn && sortViewContainer) {
        btn.addEventListener('click', function () {
            applyLoader.style.visibility = "visible";
            axios.post(sortViewContainer.dataset.url, window.menu).then(response => {
                applyLoader.style.visibility = "hidden";
            }).catch(error => {
                applyLoader.style.visibility = "hidden";
            });
        });
    }
}

export function createSortableCategoryView() {
    const dd = $('.dd');

    dd.nestable({
        callback: function (l, e) {
            findDataListener(dd.nestable('serialize'));
        },
        maxDepth: 3,
    });
    findDataListener(dd.nestable('serialize'));


   //console.log(findCollapsedId())

    function findDataListener(data) {
        for (let i = 0; i < data.length; i++) {
            data[i].order = i;
            setOrderView(data, i);
        }
        window.menu = data;
    }

    function setOrderView(data, i) {
        if (data[i]) {
            if (data[i].children !== undefined) {
                for (let j = 0; j < data[i].children.length; j++) {
                    data[i].children[j].order = j;
                    setOrderView(data[i].children[j], j);
                }
            } else {
                data[i].children = [];
            }
        }

    }

    function findCollapsedId() {
        const el = document.querySelectorAll('li.dd-collapsed');

        let id = [];
        for (let i = 0; i < el.length; i++) {
            id.push(el[i].dataset.id);
        }
        return JSON.stringify(id);
    }
}