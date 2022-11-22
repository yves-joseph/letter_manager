import {Grid, html, h} from "gridjs";
import {frFR} from "gridjs/l10n";
import AlertDialog from "@/admin/components/AlertDialog";

export default class TableView {

    static _SVG_SHOW = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#000000\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z\"/></svg>"
    static _SVG_EDIT = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#000000\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\"/></svg>"
    static _SVG_BIN = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"24px\" viewBox=\"0 0 24 24\" width=\"24px\" fill=\"#000000\"><path d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"/></svg>"

    constructor() {

        this.target = document.getElementById("table-wrapper");

        if (this.target) {
            const __data = JSON.parse(this.target.dataset.columns);
            __data.push({
                name: "Actions",
                sort: false,
                width: this.target.dataset.actionwidth + "px",
                formatter: (cell, row) => {
                    let children = [];
                    if (cell.show !== undefined && cell.show !== null) {
                        children.push(h("a", {href: cell.show}, html(TableView._SVG_SHOW)))
                    }
                    if (cell.edit !== undefined && cell.edit !== null) {
                        children.push(h("a", {href: cell.edit}, html(TableView._SVG_EDIT)));
                    }
                    if (cell.delete !== undefined && cell.delete !== null) {
                        const _token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                        children.push(h("form", {
                            action: cell.delete,
                            method: "POST"
                        }, h('div', null, [
                            h('input', {type: "hidden", name: "_token", value: "" + _token + ""}),
                            h('input', {type: "hidden", name: "_method", value: "delete"}),
                            h('button', {
                                type: "button",
                                onClick: this.destroyItemEvent
                            }, html(TableView._SVG_BIN))
                        ])));
                    }
                    return h('span', null, ...children);
                }
            });
            const _this = this;
            frFR.search.placeholder = "Recherche..."
            new Grid({
                columns: __data.map(function (item) {
                    if (item.name !== "Actions") {
                        item.formatter = (cell, row) => {
                            if (cell.indexOf('##') > -1) {
                                const [el, source] = cell.split("##");

                                if (el === 'img') {
                                    const props = JSON.parse(source);
                                    if (['file', 'user'].includes(props.src)) {
                                        return html(_this.imgDefaultSource(props.src))
                                    }
                                    return h(el, JSON.parse(source));
                                } else if (el === 'a') {
                                    const props = JSON.parse(source);
                                    let inner = "";
                                    if (props.inner === undefined || props.inner === null) {
                                        console.warn("inner prop is required");
                                    } else {
                                        inner = props.inner;
                                        delete props.inner;
                                    }
                                    return h(el, props, inner);
                                } else if (el === 'b') {
                                    return _this.buttonToggleView(JSON.parse(source));
                                } else if (el === 'html') {
                                    return html(source);
                                }
                            } else return cell
                        }
                    }
                    return item;
                }),
                pagination: {
                    limit: this.target.dataset.paginate,
                    enabled: this.target.dataset.paginate !== '5'
                },
                autoWidth: false,
                sort: true,
                search: true,
                resizable: false,
                data: JSON.parse(this.target.dataset.data),
                language: frFR
            }).render(this.target);
        }
    }


    buttonToggleView(props) {


        const children = [
            h('span', {className: 'active'}, props.on ?? "active"),
            h('span', {className: 'in_active'}, props.off ?? "inactive"),
        ];

        let __classname = 'btn-toggle ';

        if (props.state === undefined || props.state === 0) __classname += 'in_active';
        else __classname += 'active';
        return h('button', {
            className: __classname, onClick: (e) => {
                e.stopPropagation();
                let btn = e.target;
                if (btn.nodeName === 'SPAN') {
                    btn = btn.parentElement;
                }
                axios.get(props.url).then(res => {
                    // console.log(res)
                    if (res.data.result) {
                        btn.classList.add('active');
                        btn.classList.remove('in_active');
                    } else {
                        btn.classList.remove('active');
                        btn.classList.add('in_active');
                    }
                }).catch((e) => console.log(e))
            }, disabled: props.url === undefined
        }, children);

    }

    /**
     *
     * @param e {Event}
     */
    destroyItemEvent(e) {
        const _alert = new AlertDialog();
        _alert.header = "Suppression";

        _alert.yes = "Oui";
        _alert.no = "Non";
        _alert.type = "d";
        _alert.setMessage = document.getElementById("table-wrapper").dataset.message ?? "Voulez-vous vraiment supprimer cette donnée ?";
        _alert.show().then(resp => {
            if (resp) {
                let form = e.target.parentElement.parentElement.parentElement.parentElement;
                if (form.nodeName !== "FORM") {
                    form = form.parentElement;
                }
                form.submit();
            }
        });


    }

    imgDefaultSource(key) {
        const source = {
            "file": `<svg id="color_1_" enable-background="new 0 0 24 24" height="32" viewBox="0 0 24 24" width="32"
     xmlns="http://www.w3.org/2000/svg">
    <g>
        <path d="m24 4.25v11.5c0 1.24-1.01 2.25-2.25 2.25h-15.5c-.1 0-.2-.01-.29-.02-1.05-.13-1.87-.99-1.95-2.05l-.01-.18v-11.5c0-1.24 1.01-2.25 2.25-2.25h15.5c1.24 0 2.25 1.01 2.25 2.25z"
              fill="#eceff1"/>
        <path d="m14.125 2h-7.875c-1.24 0-2.25 1.01-2.25 2.25v11.5l.01.18c.08 1.06.9 1.92 1.95 2.05.09.01.19.02.29.02h7.875z"
              fill="#cdd0d2"/>
    </g>
    <g>
        <path d="m24 12.94v2.81c0 1.24-1.01 2.25-2.25 2.25h-15.5c-.1 0-.2-.01-.29-.02l10.3-10.3c.68-.68 1.8-.68 2.48 0z"
              fill="#388e3c"/>
        <path d="m17.415 7.172c-.421.02-.836.19-1.155.508l-10.3 10.3c.09.01.19.02.29.02h11.165z" fill="#317c34"/>
    </g>
    <path d="m18.06 18h-11.81c-.1 0-.2-.01-.29-.02-1.05-.13-1.87-.99-1.95-2.05l4.75-4.75c.68-.68 1.8-.68 2.48 0z"
          fill="#4caf50"/>
    <path d="m10 10.67c-.45 0-.9.17-1.24.51l-4.75 4.75c.08 1.06.9 1.92 1.95 2.05.09.01.19.02.29.02h3.802v-7.329c-.017-.001-.035-.001-.052-.001z"
          fill="#429846"/>
    <path d="m9 5c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" fill="#ffc107"/>
    <path d="m9 5c-1.103 0-2 .897-2 2s.897 2 2 2c.021 0 .042 0 .062-.001v-3.998c-.02-.001-.041-.001-.062-.001z"
          fill="#dea806"/>
    <path d="m6.25 19.5c-1.601 0-3.025-1.025-3.542-2.551l-.035-.115c-.122-.404-.173-.744-.173-1.084v-6.817l-2.426 8.097c-.312 1.191.399 2.426 1.592 2.755l15.463 4.141c.193.05.386.074.576.074.996 0 1.906-.661 2.161-1.635l.9-2.865z"
          fill="#eceff1"/>
    <path d="m2.5 8.933-2.426 8.097c-.312 1.191.399 2.426 1.592 2.755l7.585 2.031.766-2.316h-3.767c-1.601 0-3.025-1.025-3.542-2.551l-.035-.115c-.122-.404-.173-.744-.173-1.084z"
          fill="#cdd0d2"/>
</svg>`,
            "user": `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\twidth="32" height="32" viewBox="0 0 53 53" style="enable-background:new 0 0 53 53;" xml:space="preserve">
<path style="fill:#E7ECED;" d="M18.613,41.552l-7.907,4.313c-0.464,0.253-0.881,0.564-1.269,0.903C14.047,50.655,19.998,53,26.5,53
\tc6.454,0,12.367-2.31,16.964-6.144c-0.424-0.358-0.884-0.68-1.394-0.934l-8.467-4.233c-1.094-0.547-1.785-1.665-1.785-2.888v-3.322
\tc0.238-0.271,0.51-0.619,0.801-1.03c1.154-1.63,2.027-3.423,2.632-5.304c1.086-0.335,1.886-1.338,1.886-2.53v-3.546
\tc0-0.78-0.347-1.477-0.886-1.965v-5.126c0,0,1.053-7.977-9.75-7.977s-9.75,7.977-9.75,7.977v5.126
\tc-0.54,0.488-0.886,1.185-0.886,1.965v3.546c0,0.934,0.491,1.756,1.226,2.231c0.886,3.857,3.206,6.633,3.206,6.633v3.24
\tC20.296,39.899,19.65,40.986,18.613,41.552z"/>
<g>
\t<path style="fill:#556080;" d="M26.953,0.004C12.32-0.246,0.254,11.414,0.004,26.047C-0.138,34.344,3.56,41.801,9.448,46.76
\t\tc0.385-0.336,0.798-0.644,1.257-0.894l7.907-4.313c1.037-0.566,1.683-1.653,1.683-2.835v-3.24c0,0-2.321-2.776-3.206-6.633
\t\tc-0.734-0.475-1.226-1.296-1.226-2.231v-3.546c0-0.78,0.347-1.477,0.886-1.965v-5.126c0,0-1.053-7.977,9.75-7.977
\t\ts9.75,7.977,9.75,7.977v5.126c0.54,0.488,0.886,1.185,0.886,1.965v3.546c0,1.192-0.8,2.195-1.886,2.53
\t\tc-0.605,1.881-1.478,3.674-2.632,5.304c-0.291,0.411-0.563,0.759-0.801,1.03V38.8c0,1.223,0.691,2.342,1.785,2.888l8.467,4.233
\t\tc0.508,0.254,0.967,0.575,1.39,0.932c5.71-4.762,9.399-11.882,9.536-19.9C53.246,12.32,41.587,0.254,26.953,0.004z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`,
        };
        return source[key];
    }
}
