/**
 * @author    Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link      https://github.com/Koroph
 * @license   MIT
 * @copyright Copyright (c) 2020.
 */


export function connectionStatusEventListener() {
    const _offline_container = document.getElementById('offline');

    window.addEventListener('offline', function () {
        if (_offline_container.style.display === 'none')
            _offline_container.style.display = "flex";
    });
    window.addEventListener('online', function () {
        if (_offline_container.style.display === 'none')
            _offline_container.style.display = "none";
        this.location.reload();
    });
}


