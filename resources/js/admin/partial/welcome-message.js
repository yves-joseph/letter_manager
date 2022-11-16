
export default function welcomeModalCloseAction(){
    const welcome_message_container = document.getElementById('welcome-message'),
        welcome_message_btn_close = document.getElementById('welcome-message-close');

    if (welcome_message_container && welcome_message_btn_close) {

        welcome_message_btn_close.addEventListener('click', function () {
            welcome_message_container.style.left = "-100%";
            welcome_message_container.style.transition = "all 1s ease-out";
        });

        setTimeout(function (){
            welcome_message_container.style.left = "-100%";
            welcome_message_container.style.transition = "left 1s ease-out";
        },10000);
    }
}
