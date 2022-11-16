/**
 * @author Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link  https://github.com/Koroph
 * @license MIT
 * @copyright Copyright (c) 2020.
 */
export default class Locale {

    /**
     * get current locale
     * @return {string}
     */
    static getLocale() {
        return document.documentElement.getAttribute('lang');
    }

    /**
     * set locale
     * @param {string} locale
     * @return void
     */
    static setLocale(locale) {
        document.documentElement.setAttribute('lang', locale);
    }

}
