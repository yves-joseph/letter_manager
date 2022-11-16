
export default function panelAction(){
    const panels = $('.koroph-panel-content');
    $('.koroph-panel-indicator-button').parent().parent().click(function () {
        const panel_content = $(this).siblings('.koroph-panel-content'),
            none = panel_content.css("display") === "none",
            FIELD_NAME = $(this).parent().data('name');
        if (none) $(this.lastElementChild.lastElementChild).addClass('panel-show');
        else $(this.lastElementChild.lastElementChild).removeClass('panel-show');
        panel_content.slideToggle(300);
        localStorage.setItem(FIELD_NAME, "" + none)
    });

    for (let i = 0; i < panels.length; i++) {
        const FIELD_NAME = $(panels[i]).parent().data('name'),
            INDICATOR=$(panels[i]).siblings('header').children('.koroph-panel-indicator').children();
        if (localStorage.getItem(FIELD_NAME)!=null){
            if (localStorage.getItem(FIELD_NAME)==="true") {
                INDICATOR.addClass('panel-show');
                panels[i].classList.replace('close','open');
            }else {
                INDICATOR.removeClass('panel-show');
                panels[i].classList.replace('open','close');
            }
        }
    }
}