/**
 * @author Koroph <yjk@outlook.fr>
 *
 * @website http://koroph.site
 * @link  https://github.com/Koroph
 * @license MIT
 * @copyright Copyright (c) 2020.
 */
import Locale from "../Locale";
import fr  from '../../../lang/fr.json';
import en  from '../../../lang/en.json';

export class Translation {


    /**
     * Translation constructor
     * @param locale
     */
    constructor(locale = null) {
        const _locale = locale ?? Locale.getLocale();
        this.data=[];
        this.data = _locale === "fr" ? fr : en;

    }

    /**
     * get translation value by key
     * @param {string} key
     * @param {object|null} param
     * @return string
     */
    getValue(key, param = null){

        const keys = key.trim().split('.');
        let value = "";

        try {

            if (keys.length === 1) value = this.data[keys[0]];
            if (keys.length === 2) value = this.data[keys[0]][keys[1]];
            if (keys.length === 3) value = this.data[keys[0]][keys[1]][keys[2]];
            if (keys.length === 4) value = this.data[keys[0]][keys[1]][keys[2]][keys[3]];

        } catch (e) {
            console.log(e);
            return key;
        }

        if (value === undefined || value === "") return key;

        return this.addParameter(value, this.transformParameter(param));

    }

    /**
     * add parameter value
     * @param {string} value
     * @param {string[]} param
     * @return string
     */
    addParameter(value, param) {

        if (param.length === 0) return value;

        let _value = value;
        for (let i = 0; i < param.length; i++) {
            _value = _value.replace(':' + param[i][0], param[i][1])
        }
        return _value;

    }

    /**
     * transform param object in array
     * @param {object|null} param
     */
    transformParameter(param) {

        if (param === null) return [];

        const keys = Object.keys(param);
        let arrayParams = [];
        for (let i = 0; i < keys.length; i++) {
            arrayParams.push([keys[i], param[keys[i]]]);
        }
        return arrayParams;
    }
}

/**
 * translation helper
 * @param {string} key
 * @param {object|null} param
 * @param {string} locale
 * @return string
 */
export default  function __(key, param = null, locale = null) {
    const trans = new Translation(locale);
    return trans.getValue(key, param);
}
