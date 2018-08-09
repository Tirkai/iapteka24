/*
var pharmaciesList = [];
$.post(Config.dataRequest.pharmacies).then((resp) => {
    var coordsCount = 0;
    resp.forEach((item, i) => {
        YandexMapApi.coordsByAdress(item.adress).then((coords) => {
            coordsCount++;
            $.extend(item, {coords: coords});
            console.log(item);
            pharmaciesList.push(item);
        }).catch((e) => {
            alert(e);
        });
        
    });
    
});
function getSortPharmacies(){
    return pharmaciesList.sort((a, b) => {
        a = parseInt(a.id);
        b = parseInt(b.id);
        if (a > b) return 1;
        if (a < b) return -1;
    });
    
}
*/








/*
const GEO_NETWORK_DEFAULT = "default";
const GEO_NETWORK_POINT = "point";
const GEO_NETWORK_DELIVERY = "delivery";
const GEO_NETWORK_OPTICS = "optics";
const GEO_NETWORK_TEMPLATE_PLACEMARK = "GEO_NETWORK_TEMPLATE_PLACEMARK";
const GEO_NETWORK_TEMPLATE_PHARMACY = "GEO_NETWORK_TEMPLATE_PHARMACY";
class GeoNetwork{
    static filterTabs = null;
    static mapController = null;
    static pharmacyPoints = [];
    static placemarksCollection = [];
    static defaultFilter = GEO_NETWORK_POINT;
    static isReady = false;
    static init(){
        $(document).ready(() => ymaps.ready(this.awaitMapReady.bind(this)));
        let geo = this;
        this.filterTabs = new UITabs({
            element: $(".js-filter-tabs"),
            defaultTab: "point",
            selectHandlers: {
                point: () => geo.createPlacemarks(geo.filterPoints(GEO_NETWORK_POINT)),
                optics: () => geo.createPlacemarks(geo.filterPoints(GEO_NETWORK_OPTICS)),
                default: () => geo.createPlacemarks(geo.filterPoints(GEO_NETWORK_DEFAULT))
            },
            props: {
                disableContent: true
            }
        }).init();
    }
    static awaitMapReady(){
        this.mapController = new ymaps.Map("ymap-container", {
            center: [54.510150, 36.254574], 
            zoom: 12,
            controls: []
        });
        this.requestPharmacyData();
    }
    static requestPharmacyData(){   
        $.post(Config.dataRequest.pharmacies).then((response) => {
            this.isReady = true;
            this.pharmacyPoints = response;
            this.createPlacemarks(this.filterPoints(this.defaultFilter));
        }).catch((e) => {
            alert("ERROR REQUEST",e);
        });
        
    }
    static filterPoints(value){
        if(!this.isReady) return false;
        this.removePlacemarks();
        let filteredCollection = [];
        this.pharmacyPoints.forEach((item) => {
            if(value != GEO_NETWORK_DEFAULT){
                if(item.props[value]) filteredCollection.push(item);
            } else filteredCollection.push(item);
        });
        return filteredCollection;
        
    }
    static renderList(points){

    }
    static createPlacemarks(points){
        if(!this.isReady) return false;
        //Geo Map Objects
        let collection = new ymaps.GeoObjectCollection();
        let geoObjectsList = points.map((item) => new ymaps.Placemark(item.coords, {
            hintContent: item.name, balloonContent: this.getTemplate(GEO_NETWORK_TEMPLATE_PLACEMARK)
        }));
        geoObjectsList.map(item => collection.add(item));
        this.mapController.geoObjects.add(collection);
        this.placemarksCollection = collection;   

        // Render List
        $(".js-pharmacy-list").html(points.map((item) => {
            return this.getTemplate(GEO_NETWORK_TEMPLATE_PHARMACY, item);
        }));   
    }
    static removePlacemarks(){
        this.mapController.geoObjects.remove(this.placemarksCollection);
    }
    static getTemplate(template, item = null){
        switch(template){
            case GEO_NETWORK_TEMPLATE_PLACEMARK:{
                return `
                    <img src="https://media2.giphy.com/media/qQx7B5z3hG19K/giphy.gif" style="width: 200px">
                `;
            }
            case GEO_NETWORK_TEMPLATE_PHARMACY:{
                return `
                    <div class="geo-network__pharmacy__item">
                        <div class="geo-network__pharmacy__item__title">
                            ${item.name}
                        </div>
                            <div class="geo-network__pharmacy__item__adress">
                                ${item.adress}
                            </div>
                        <div class="geo-network__pharmacy__item__actions">
                            <div class="highlight-links">
                                <a href="/network?id=${item.pharmacyId}">Подробнее</a> 
                            </div>
                        </div>  
                    </div>
                `;
            }
        }
        
    }
}
   
*/


class GeoNetwork {
    static map = null;
    static pharmacies = [];
    static init() {
        PharmacyInfo.ready(() => {
            this.pharmacies = PharmacyInfo.getInfo();
            this.generateMap();
            this.generateList(this.pharmacies);
            this.selectBinding();
        });
    }
    static generateMap() {
        YandexMapApi.ready().then(() => {
            this.map = YandexMapApi.createMap("geo-network-map");
            this.generatePlacemarks(this.pharmacies);
            /*
            this.map.mapInstance.setBounds(this.map.mapInstance.geoObjects.getBounds(),{
                checkZoomRange: true
            });
            */
            //this.map.mapInstance.setBounds(this.map.mapInstance.geoObjects.getBounds());
        });
    }
    static generatePlacemarks(data){
        data.map((item) => {
            if (item.coords != null) {
                this.map.addPoint({
                    coords: item.coords,
                    icon: `<span style="font-size: 12px; line-height: 10px; margin: 0; padding: 0;">${item.shortName}</span>`,
                    hint: item.title,
                    clickHandler: () => location.href = "/pharmacy/" + item.alias
                });
            }
        });
    }
    static generateList(data) {
        let $list = $(".geo-network__list");
        let template = [];
        data.map((item) => {
            template.push(this.getTemplate(item));
        });
        $list.html(template.join(''));
    }
    static filterList(query = "") {
        let result = [];
        this.pharmacies.map((item) => {
            if (item[query] || query == "all") result.push(item);
        });
        return result;
    }
    static updateData(options){
        this.map.removePoints();
        let filter = this.filterList(options.key);
        this.generatePlacemarks(filter);
        this.generateList(filter);
    }
    static selectBinding() {
        this.uiSelect = new UISelect({
            element: $(".geo-network__filter__ui-select")
        }).init();
        let generatedOptions = this.uiSelect.generatedOptions;
        for (let key in generatedOptions) {
            let option = generatedOptions[key];
            option.addListener("select", () => {
                this.updateData({
                    key: option.key
                })
            });
            $(option.element).on("click", () => option.callListener("select"));
        }
    }
    static checkWorkingTime(options){
        let day = new Date().getDay();
        let currentHour = new Date().getHours();
        //let currentHour = 8;
        let currentDate = new Date();
        let currentDay = (day == 0 ? "sunday" : '') + (day > 0 && day < 6 ? "weekday" : '') + (day == 6 ? "saturday" : '');
        let dayData = options.working[currentDay];
        let openModel = {
            status: true,
            anyTime: dayData.anyTime,
            remain: dayData.to.hour - currentHour
        };
        let closeModel = {
            status: false,
            anyTime: dayData.anyTime,
            remain: dayData.from.hour - currentHour > 0 ? dayData.from.hour - currentHour : 24 - currentHour + dayData.from.hour
        };
        if(options.working.weekday.from.hour == null) return closeModel;     
        if(dayData.from.hour != null){
            if((dayData.to.hour - currentHour >= 0 && dayData.from.hour <= currentHour) || dayData.anyTime){
                return openModel;
            } else {
                return closeModel;
            }
        } else return closeModel;
    }
    static getTemplate(options) {
        let { weekday, saturday, sunday} = options.working;
        let workingTime = this.checkWorkingTime(options);
        return `
        <div class="geo-network__list__item">

            <div class="row geo-network__list__item__row">
                <div class="col-md-8 col-sm-12">
                    <div class="geo-network__list__item__title highlight-links">
                        <a href="/pharmacy/${options.alias}">
                            ${options.title}
                        </a>
                    </div>
                    <div class="geo-network__list__item__labels">
                        <div class="geo-network__list__item__labels__el${options.isPoint ? ' active' : ''}">Пункт выдачи заказов</div>
                        <div class="geo-network__list__item__labels__el${options.isOptics ? ' active' : ''}">Оптика</div>
                        <div class="geo-network__list__item__labels__el${options.isManufacture ? ' active' : ''}">Собственное производство</div>
                        <div class="geo-network__list__item__labels__el${options.isHospital ? ' active' : ''}">Получить в стационаре</div>
                        <div class="geo-network__list__item__labels__el${options.isPrivileges ? ' active' : ''}">Льготное</div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-12">
                    <div class="geo-network__list__item__meta geo-network__list__item__adress align-center">
                        <img src="/dist/icons/geo-point.svg" class="geo-network__list__item__icon">
                        <div>
                            ${options.adress}
                        </div>
                    </div>
                    <div class="geo-network__list__item__meta geo-network__list__item__time align-center">
                        <img src="/dist/icons/clock.svg" class="geo-network__list__item__icon">
                        <div class="${workingTime.anyTime ? 'hidden' : ''}">
                            ${workingTime.status ? 
                                `<span class='highlight-text_green'>открыто</span> - до закрытия ${
                                    workingTime.remain > 0 ? workingTime.remain + ' ч.' : 'менее часа'
                                }` :
                                `<span class="highlight-text_red">закрыто</span>` 
                            }
                            
                        </div>
                        <div>
                        ${
                            workingTime.anyTime ? `<span class='highlight-text_green'>круглосуточно</span>` : ''
                        }
                        </div>
                    </div>
                </div>
            </div>

        </div>
        `
    }
}
export {
    GeoNetwork
};