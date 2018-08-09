import { YandexMapApi } from "./YandexMapApi.class";
import { PharmacyInfo } from "./PharmacyInfo.class";
import { Distance } from "./Distance.class";

class FindPharmacy {
    static init(){
        this.helpers();
    }
    static getNearestPharmacy(adress, options = {}) {
        return new Promise(resolve => {
            let { limit: limit = 5 } = options;
            YandexMapApi.ready().then(() => {
                PharmacyInfo.ready(() => {
                    YandexMapApi.coordsByAdress(adress).then(currentCoords => {
                        let pharmacies = PharmacyInfo.getInfo();
                        let vectors = [];
                        pharmacies.forEach(item => {
                            item.coords != null ? vectors.push({
                                pharmacy: item,
                                distance: Distance.getDistance(currentCoords, item.coords)
                            }) : null;
                        });
                        vectors.sort((a, b) => a.distance - b.distance); 
                        let result = [];
                        for (let i = 0; i < limit; i++) result.push(vectors[i]);
                        resolve(result);
                    });
                });
            });
        });
    }
    static renderNearestPharmacy(options){
        this.getNearestPharmacy(options.adress, { limit: 5 }).then((resp) => {
            let result = [];
            resp.forEach((item) => {
                item.distance < Config.pharmacies.nearestSearchRange ? result.push(this.getTemplate(item)) : null;
            });
            !result.length ? result.push("По вашему запросу ничего не найдено") : null;
            $(".find-pharmacy__results").html(result.join(''));
        })
    }
    static getTemplate(options){
        return `
            <div class="find-pharmacy__results__item">
                <a href="/pharmacy/${options.pharmacy.alias}">
                    <div class="find-pharmacy__results__item__title">
                        ${options.pharmacy.title} - ${options.pharmacy.adress}
                    </div>
                </a>
                <div class="find-pharmacy__results__item__distance">
                    ${options.distance.toFixed(2)} км.
                </div>
            </div>
        `;
    }
    static helpers(){
        let ctx = this;
        $(".find-pharmacy__search-form").on("submit", e => {
            e.preventDefault();
            let adress = $(e.target).serializeArray()[0].value;
            console.log(adress, ctx);
            ctx.renderNearestPharmacy({ adress: "Калуга, " + adress });
        });
    }
    static showPopup(){
        $.fancybox.open({src:"#find-pharmacy-popup", type: "inline"});
    }
}

export { FindPharmacy }

