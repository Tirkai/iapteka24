class YandexMapApi {
    static listeners = [];
    static isReady = false;
    static createMap(element) {
        return new Map({
            map: new ymaps.Map(element, {
                center: [54.515246, 36.265392],
                zoom: 10,
                controls: []
            })
        });
    }
    static ready(callback) {
        return new Promise((resolve, reject) => {
            if (this.isReady) {
                resolve();
            } else {
                $(document).ready(() => {
                    if (ymaps != undefined) {
                        ymaps.ready(() => {
                            this.isReady = true;
                            resolve();
                        })
                    } else this.ready().then(() => this.init());

                });
            }

        });
    }
    static objectsByAdress(adress, options = {}){
        let { limit: limit = 20 } = options;
        return new Promise(resolve => {
            ymaps.geocode(adress).then((resp) => {
                let collection = [];
                let geoObjects = resp.geoObjects;
                for(let i = 0; i < (geoObjects.getLength() < limit ? geoObjects.getLength() : limit); i++){
                    collection.push(geoObjects.get(i));
                }
                resolve(collection);
            });
        });
    }
    static coordsByAdress(adress) {
        return new Promise((resolve, reject) => {
            ymaps.geocode(adress).then((resp) => {
                let coords = resp.geoObjects.get(0).geometry.getCoordinates();
                resolve(coords);
            });
        });
    }
    static init() {
        this.ready().then(() => this.isReady = true);
    }
}
YandexMapApi.init();

class Map {
    objects = {
        points: []
    }
    constructor(options) {
        this.mapInstance = options.map;
    }
    destroy() {
        this.mapInstance.destroy();
    }
    addPoint(options) {
        let { clickHandler: clickHandler = () => {} } = options;
        let geoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: options.coords
            },
            properties: {
                //iconContent: options.icon,
                hintContent: options.hint
            }
        }, {
            preset: 'islands#darkGreenIcon',
            //draggable: true
        });
        geoObject.events.add("click", clickHandler);
        this.mapInstance.geoObjects.add(geoObject);
        this.objects.points.push(geoObject);
        return geoObject;
    }
    removePoint(){

    }
    removePoints(){
        this.mapInstance.geoObjects.removeAll();
        this.objects.points.splice(0,this.objects.points.length);
    }
}
export {
    YandexMapApi,
    Map
};