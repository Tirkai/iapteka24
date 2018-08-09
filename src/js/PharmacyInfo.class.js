import { Config } from './config.js';
import { Service } from './Service.class.js';
class PharmacyInfo {
    static _pharmacies = [];
    static _loadedListener = new Function();
    static _isLoaded = false;
    static isCached = false;
    static cacheTimeout = 3600;
    static get pharmacies() {
        return this._pharmacies;
    }
    static set pharmacies(value) {
        this._pharmacies = value;
    }
    static get isLoaded() {
        return this._isLoaded;
    }
    static set isLoaded(value) {
        this._isLoaded = value;
        this._loadedListener(this.pharmacies);
    }
    static init() {
        let cacheName = 'cache-pharmacies';
        let cache = localStorage.getItem(cacheName);
        if (cache == null) {
            this.getJson((resp) => {
                this.pharmacies = resp;
                let cacheTemplate = {
                    timestamp: Service.getUnixTime(),
                    data: resp
                }
                localStorage.setItem(cacheName, JSON.stringify(cacheTemplate));
                this.isLoaded = true;
            });

        } else {
            let cacheData = JSON.parse(cache);
            let timeout = (cacheData.timestamp + this.cacheTimeout) - Service.getUnixTime();
            if (timeout < 0) {
                localStorage.removeItem(cacheName);
            }
            this.pharmacies = cacheData.data;
            this.isLoaded = true;
            this.isCached = true;
        }
    }
    static ready(callback) {
        if (this.isLoaded) callback();
        else this._loadedListener = callback;
    }
    static getInfo() {
        return this.pharmacies;
    }
    static getPharmacy(value, property) {
        return this.pharmacies.find((item) => item[property] == value);
    }
    static getJson(callback) {
        $.post(Config.dataRequest.pharmacies).then((resp) => callback(resp))
            .catch((e) => console.warn(e));
    }
}
PharmacyInfo.init();
export { PharmacyInfo };