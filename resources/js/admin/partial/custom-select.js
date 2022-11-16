import TomSelect from "tom-select";

export default function customSelect() {
    const selects = document.getElementsByClassName('____custom-select');

    for (let i = 0; i < selects.length; i++) {

        if (selects.item(i).nodeName === "SELECT")
            new TomSelect(selects.item(i), {
                persist: false,
                render: {
                    option: function (data, escape) {
                        return createListItemView(data);
                    },
                    item: function (item, escape) {
                        return createSelectItemView(item);
                    }
                },
            });
    }

    /**
     * @param data
     */
    function createListItemView(data) {
        const __base = document.createElement('div'),
            __base_right = document.createElement('div'),
            __base_center = document.createElement('div'),
            __base_left = document.createElement('div');

        __base.classList.add('__base');
        __base_right.classList.add('__base_right');
        __base_center.classList.add('__base_center');
        __base_left.classList.add('__base_left');

        if (data.src !== undefined && data.src !== null) {
            const img = document.createElement('img');
            img.src = data.src;
            __base_left.append(img)
        }
        if (data.svg !== undefined && data.svg !== null && data.src !== null) {
            const span = document.createElement('span');
            span.innerHTML = data.svg;
            __base_left.append(span)
        }

        __base_center.innerHTML = `<span>${data.text}</span>`;
        __base.append(__base_left, __base_center, __base_right);
        return __base;
    }

    /**
     * @param data
     */
    function createSelectItemView(data) {
        const __base = document.createElement('div'),
            __base_right = document.createElement('div'),
            __base_center = document.createElement('div'),
            __base_left = document.createElement('div');

        __base.classList.add('__base');
        __base_right.classList.add('__base_right');
        __base_center.classList.add('__base_center');
        __base_left.classList.add('__base_left');

        if (data.src !== undefined && data.src !== null) {
            const img = document.createElement('img');
            img.src = data.src;
            __base_left.append(img)
        }
        if (data.svg !== undefined && data.svg !== null && data.src !== null) {
            const span = document.createElement('span');
            span.innerHTML = data.svg;
            __base_left.append(span)
        }

        __base_center.innerHTML = `<strong>${data.text}</strong>`;
        __base.append(__base_left, __base_center, __base_right);
        return __base;
    }
}
