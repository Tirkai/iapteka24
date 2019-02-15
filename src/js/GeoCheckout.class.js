import {
    Overlay
} from "./Overlay.class";

class GeoModel {
    isDefault = true;
    cityId = 0;
    cityKey = 'DefaultCity';
    cityName = 'DefaultCity';
    constructor(options) {
        if (options !== undefined) {
            const { cityId, cityKey, cityName, isDefault } = options;
            this.cityId = cityId;
            this.cityKey = cityKey;
            this.cityName = cityName;
            this.isDefault = isDefault || false;
        }
    }
}

const defaultCity = new GeoModel({
    cityId: 0,
    cityKey: 'kaluga',
    cityName: 'Калуга',
    isDefault: true
});

class GeoCheckout {
    static geoData = {};
    static onChangeListeners = [];
    static checkoutStorage() {
        const storage = localStorage.getItem('geo');
        const data = JSON.parse(storage);
        if (data) {
            return new GeoModel({...data, ...{isDefault: false}});
        } else {
            return defaultCity;
        }
    }
    static addChangeListener(listener){
        this.onChangeListeners.push(listener);
    }
    static setGeoData(data){
        this.geoData = data;
        this.onChangeListeners.forEach(listener => listener());
        localStorage.setItem('geo', JSON.stringify(data));
    }
    static showGeoHint() {
        $(".top-navigation__geo__dropdown").show();
        Overlay.show(() => {
            this.hideGeoHint();
            if(this.geoData.isDefault){
                this.setGeoData(defaultCity);  
            }
        });
    }
    static hideGeoHint() {
        $(".top-navigation__geo__dropdown").hide();
        Overlay.hide();
    }
    static showPopup(){
        $.fancybox.open({
            type: "inline",
            src: "#popup_select_geo"
        })
    }
    static init() {
        this.geoData = this.checkoutStorage();
        
        if (this.geoData.isDefault) {
            this.showGeoHint();
        }
        $(".js-geo-check-default").on("click", () => {
            this.setGeoData(defaultCity);
            this.hideGeoHint();
        });
        $(".js-show-geo-hint").on("click", () => this.showPopup());
        $(".js-geo-check-other").on("click", () => this.showPopup());
        $(".js-select-geo").on("click", (e) => {
            const data = e.target.dataset.geo;
            this.setGeoData(JSON.parse(data));
            this.hideGeoHint();
            $.fancybox.close();
        });

        this.addChangeListener(() => {
            $(".js-geo-view").html(this.geoData.cityName)
        });
        this.onChangeListeners.forEach(listener => listener());
    }
}

GeoCheckout.init();
export {
    GeoCheckout
}