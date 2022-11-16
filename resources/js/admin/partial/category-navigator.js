export default function categoryNavigator() {
    const container = document.getElementById('category_view-container'),
        header = document.getElementById('category_view-header'),
        loader = document.getElementById('category_view-loader'),
        arrow = "<svg xmlns=\"http://www.w3.org/2000/svg\" enable-background=\"new 0 0 24 24\" height=\"18px\" viewBox=\"0 0 24 24\" width=\"18px\" fill=\"#343a40\"><g><rect fill=\"none\" height=\"20\" width=\"20\"/></g><g><g><polygon points=\"6.41,6 5,7.41 9.58,12 5,16.59 6.41,18 12.41,12\"/><polygon points=\"13,6 11.59,7.41 16.17,12 11.59,16.59 13,18 19,12\"/></g></g></svg>",
        categoryNavKey = "_key.nav__category_";

    let param = "", stack = [];
    if (container) {
        const parent_id = container.dataset.parent;
        stack.push({
            path: container.dataset.path,
            label: "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#3b82f6\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 2l-5.5 9h11z\"/><circle cx=\"17.5\" cy=\"17.5\" r=\"4.5\"/><path d=\"M3 13.5h8v8H3z\"/></svg>"
        });
        if (parent_id) {
            if (parent_id !== "") {
                param += "/" + parent_id.trim();
            }
            stack = JSON.parse(localStorage.getItem(categoryNavKey));
        }
        findRequest(container.dataset.path + param);
        updateNavBar();
    }


    /**
     * @param {string} url
     */
    function findRequest(url) {
        loader.style.display = "flex";
        axios.get(url).then(response => {
           // categoryFactory(response.data);
            updateNavBar();
            loader.style.display = "none";
        }).catch(error => {
            // console.log(error);
            loader.style.display = "none";
        })
    }

    function categoryItem(data) {
        const item = document.createElement('div');
        const {edit, destroy} = container.dataset;
        item.classList.add('_category_item');

        let content = `<div>
             <strong>${data.text}</strong>
             <a onclick="event.stopPropagation();" href="${edit + '/' + data.ref}"><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></a>
           </div>`
        if (data.child === 0) {
            if (container.dataset.link !== undefined && container.dataset.link.trim() !== "")
                content += ' <a href="' + container.dataset.link + '/' + data.ref + '">Sélectionner</a>';
            else {
                content += `
                <div class="_category_item_action">
                <form action="${destroy + '/' + data.ref}" method="post"><button><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button></form>
                </div>
                `;
            }
        } else content += arrow;

        item.innerHTML = content;
        return item;
    }


    /**
     *
     * @param data
     */
    function categoryFactory(data = []) {

        const _container = document.createElement('div');
        container.innerHTML = null;

        for (let i = 0; i < data.length; i++) {
            const item = categoryItem(data[i]);
            if (data[i].second_parent_id === null && data[i].child > 0) {
                item.addEventListener('click', () => {
                    updateNavBar({path: container.dataset.path + "/" + data[i].id, label: data[i].text})
                    findRequest(container.dataset.path + "/" + data[i].id)
                });
            }
            container.appendChild(item);
        }
        container.appendChild(_container);
    }

    function updateNavBar(data = "next") {
        if (typeof data === "object") {
            stack.push(data);
        } else if (typeof data === "string") {
            if (data === "back") {
                stack.pop();
            }
        }
        header.innerHTML = null;
        for (let i = 0; i < stack.length; i++) {
            header.append(headerItem(stack[i], i === stack.length - 1));
        }
       // localStorage.setItem(categoryNavKey, JSON.stringify(stack));
    }

    function headerItem(data, last) {
        const item = document.createElement('button');
        item.innerHTML = data.label + " " + arrow;
        if (!last) {
            item.onclick = () => {
                findRequest(data.path);
                updateNavBar("back");
            }
        }
        return item;
    }
}
