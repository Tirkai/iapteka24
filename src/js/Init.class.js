
class Init {
    static initDOMComponent(id, callback) {
        $(document).ready(function () {
            if ($("." + id).length) {
                Debug.log(callback, `Inited ${id}`, this);
                callback();
            }
        });
    }
    static init() {
        this.initDOMComponent("catalog", () => Catalog.init());
        this.initDOMComponent("product-page", () => ProductPage.init())
        this.initDOMComponent("optics-product", () => OpticsController.init());
        this.initDOMComponent("stages", () => $(".mini-cart").hide());
        this.initDOMComponent("stages__cart", () => Cart.init());
        this.initDOMComponent("stages__geo", () => GeographyOrder.init());
        this.initDOMComponent("stages__order", () => OrderStage.init());
        this.initDOMComponent("stages__thanks", () => Thanks.init());
        this.initDOMComponent("js-custom-scroll", () => CustomScrollController.init());
        this.initDOMComponent("ui-checkbox", () => UICheckboxController.init());
        this.initDOMComponent("ui-carousel", () => $(".ui-carousel").each((i, item) => new UICarousel({
            element: $(item)
        }).init()));
        this.initDOMComponent("search-form__search-field", () => CatalogSearchController.init());
        this.initDOMComponent("mini-cart", () => MiniCart.init());
        this.initDOMComponent("geo-network", () => GeoNetwork.init());
        this.initDOMComponent("pharmacy-page",() => PharmacyPage.init());
        this.initDOMComponent("find-pharmacy",() => FindPharmacy.init());
    }
}
Init.init();
export { Init };