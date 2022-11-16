/**
 * @author Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link  https://github.com/Koroph
 * @license MIT
 * @copyright Copyright (c) 2020.
 */

export default class FullScreen {
    static toggle() {
        if (!document.fullscreenElement)
            document.documentElement.requestFullscreen()
                .then(() => console.log("fullscreen"))
                .catch(() => console.log("error Fullscreen"));
        else if (document.exitFullscreen) document.exitFullscreen()
            .then(() => console.log("exit fullscreen"))
            .catch(() => console.log("error exit Fullscreen"));
    }

    static disableFullScreenBtnIfNavigatorSupportIt() {
        const btnFullScreen = document.getElementById("fullscreen")
        btnFullScreen.addEventListener('click', (e) => this.toggle())
        if (document.fullscreenEnabled) btnFullScreen.style.display = 'block';

    }
}
