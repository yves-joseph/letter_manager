"use strict"

export default function closeAlertAction() {
    const ALERT_CLOSE = document.getElementsByClassName('_alert-content-close');
    let _is = true;
    if (ALERT_CLOSE.length) {
        for (let i = 0; i < ALERT_CLOSE.length; i++) {
            ALERT_CLOSE[i].addEventListener('click', function () {
                closeAlert(this.parentElement);
                _is = false;
            });
            setTimeout(() => {
                if (_is) closeAlert(ALERT_CLOSE[i].parentElement);
            }, 2000 + (i * 100))
        }
    }
}

/**
 *
 * @param {HTMLElement} parent
 */
function closeAlert(parent) {
    setTimeout(function () {
        parent.remove();
    }, 500);
}
