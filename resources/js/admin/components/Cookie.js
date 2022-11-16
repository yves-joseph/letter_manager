/**
 * @author Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link  https://github.com/Koroph
 * @license MIT
 * @copyright Copyright (c) 2020.
 */
export default class Cookie {

    /**
     * set or update cookie item
     * @param {string} name
     * @param {string} value
     * @param {number} expire
     */
    static setCookie(name, value, expire = 30) {
        const _date = new Date(), str_path = ";path=/";
        _date.setTime(_date.getTime() + (expire * 24 * 60 * 60 * 1000));
        const str_expire = ";expires=" + _date.toUTCString();
        document.cookie = name + "=" + value + str_expire + str_path;
    }

    /**
     * get cookie value
     * @param {string} name
     * @return {string|null}
     */
    static getCookie(name) {
        let _value = null;
        const cookieRaw = document.cookie.split(';'),
            _name = name.trim() + "=";

        for (let i = 0; i < cookieRaw.length; i++) {
            if (cookieRaw[i].trim().indexOf(_name) === 0) {
                _value = cookieRaw[i].trim().substring(_name.length, cookieRaw[i].trim().length);
                break;
            }
        }
        return _value;
    }

    /**
     * delete cookie item
     * @param {string} name
     */
    static delete(name) {
        const _date = new Date(), str_path = ";path=/";
        _date.setTime(_date.getTime() - (24 * 24 * 60 * 60 * 1000));
        const str_expire = ";expires=" + _date.toUTCString();
        document.cookie = name + "=" + str_expire + str_path;
    }

    /**
     *Check if cookie item key exist
     * @param {string} name
     * @return {boolean}
     */
    static check(name) {
        return Cookie.getCookie(name) !== null;
    }


}

