import { YandexMapApi } from "./YandexMapApi.class";

class ProductPage {
    static init() {
        this.bindCounter();
        this.modalImagePreview();
        this.descriptionFormatting();
        this.generateTabs();
        this.pharmacyInfo();
    }
    static pharmacyInfo(){
        let map = null;
        let bindModal = (item) => {
            let id = $(item).data().id;
            PharmacyInfo.ready(() => {
                let pharmacy = PharmacyInfo.getPharmacy(id, "pharmacyCode"); 
                let prefix = ".js-pharmacy-info-";
                if(pharmacy.photoUrl != null) $(prefix + "image").css({backgroundImage: `url(${pharmacy.photoUrl})`}).show();
                else $(prefix + "image").hide();
                $(prefix + "title").html(pharmacy.title);
                $(prefix + "adress").html(pharmacy.adress);
                $(prefix + "phone").html(pharmacy.phone);
                $(prefix + "worktime").html(pharmacy.worktime);
                $(prefix + "link").attr("href","/pharmacy/" + pharmacy.alias);
                map.removePoints();
                map.addPoint({
                    coords: pharmacy.coords
                });
                map.mapInstance.setBounds(map.mapInstance.geoObjects.getBounds(),{
                    checkZoomRange: true
                }).then(() => {
                    map.mapInstance.setZoom(14);
                });
                $.fancybox.open({src: "#pharmacy-info-popup", type: "inline"});
            });
        }
        YandexMapApi.ready().then(() => {
            map = YandexMapApi.createMap("pharmacy-info-map");
            $(".js-product-pharmacy-item").each((i, item) => {
                $(item).on("click", () => bindModal(item));
            });
        });
        
        
        
    }
    static bindCounter() {
        $(".product__count").each((i, item) => new UICounter({
            element: $(item),
            maxCount: $(".product__count__input").data().maxcount,
            overflowHandler(){
                Toast.createToast({
                    type: DefineConst.STATUS_ERROR,
                    content: Config.strings.moreAvailableLimit + ` ${this.maxCount}`
                });
            }, 
            changeHandler() {
                $(".product__count__input").val(this.count);
            }
        }).init());
    }
    static modalImagePreview(){
        let bindModal = function(element){
            $.fancybox.open({
                type: "image",
                src: $(element).attr("src")
            })
        }
        $(".product-page__container__product__container__preview__picture img").on("click",(event) => bindModal(event.target));
    }
    static descriptionFormatting() {
        let $descItem = $(".product-page__container__description__item");
        let showSelector = "product-page__container__description__item__text_is-show";
        $descItem.on("click", ".js-product-desc-title", function () {
            let $text = $(this).next();
            if (!$text.hasClass(showSelector)) $text.addClass(showSelector);
            else $text.removeClass(showSelector); 
        })
        $descItem.each(function (i, item) {
            // Хоть как то форматируем ущербно приходящие данные. 
            let content = $(item).html();
            content = content
                .split(";").join(";<br>")
                .split(".").join(". ")
                .split(":").join(": ");
            $(item).html(content);
        });
    }
    static generateTabs(){
        let isOptics = !!$(".optics-product").length;
        $(".tabs").each((i, item) => new UITabs({
            element: $(item),
            defaultTab: !isOptics ? "list" : "desc"
        }).init());
    }
}
export { ProductPage };