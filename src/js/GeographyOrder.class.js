class GeographyOrder {
    static orderList = [];
    static isCompleted = false;
    static isRendered = false;

    static init() {
        $(".stages__geo__choose__item").each((i, item) => {
            let data = $(item).data();
            this.orderList.push(new GeographyOrderProductsList({
                element: $(item),
                products: data.products,
                id: data.name,
                adress: data.adress,
                action: data.action,
                price: data.cost,
                enabled: data.enabled
            }).init());
            this.isCompleted = true;
        });
        $(".stages__geo__order__back").on("click", () => this.mobileOrderDetailShow(false));
        this.helpers();
    }
    static getOrderList() {
        return this.orderList;
    }
    static notifyState(value) {
        let $notify = $(".stages__geo__order__notify");
        if (value) $notify.show();
        else $notify.hide();
    }
    static mobileOrderDetailShow(value) {
        let selector = "stages__geo__order_show";
        let $order = $(".stages__geo__order");
        if (value) $order.addClass(selector);
        else $order.removeClass(selector);
        UIHelpers.scrollLock(value);
    }
    static helpers() {
        $(".js-popup-delivery-unavailable").on("click", function () {
            $.fancybox.open({
                src: "/components/delivery-unavailable.php",
                type: "ajax"
            });
        });
    }
    static getTemplate(params) {
        return `
        <div class="stages__geo__order__detail__item">
            <div class="stages__geo__order__detail__item__status">
                <div class="sprite ${params.instock ? "sprite-status-success-small" : "sprite-status-error-small"}"></div>
            </div>
            <div class="stages__geo__order__detail__item__title">
                ${ params.pagetitle }
            </div>
            <div class="stages__geo__order__detail__item__count">
                <nobr>
                ${ params.missingCount == 0 ?
                    params.count + " шт" :
                        (params.enabled) ?
                        params.count + " / " + params.maxCount + " шт" :
                        ""  
                }
                 </nobr>
            </div>
            <div class="stages__geo__order__detail__item__available${!params.instock ? " stages__geo__order__detail__item__available_false" : ""}">
                ${ params.instock ? "В наличии" : "Недоcтупен" }
            </div>
        </div>`
    }

}
class GeographyOrderProductsList {
    constructor(params) {
        this.products = params.products;
        this.element = params.element;
        this.id = params.id;
        this.adress = params.adress;
        this.action = params.action;
        this.price = params.price;
        this.enabled = params.enabled;
    }
    init() {
        $(this.element).on("click", this.renderList.bind(this));
        return this;
    }
    renderList() {
        let $detail = $(".stages__geo__order__detail");
        if (!GeographyOrder.isRendered) {
            $(".js-order-container").show();
            $(".js-order-placeholder").hide();
        }
        let $desc = $(".js-order-description");
        if (this.action.indexOf("delivery") > -1) $desc.html(`Товары доступные для доставки:`);
        if (this.action.indexOf("pickup") > -1) $desc.html(`Наличие товаров в Аптеке №${this.id}<br>по адресу ${this.adress}:`);

        $(".js-order-pharmacy-id").text(this.id);
        $(".js-order-pharmacy-adress").text(this.adress);
        $(".js-order-price").text(this.price);

        let $button = $(".js-order-button");
        if (this.enabled) $button.removeClass("button_disabled");
        else $button.addClass("button_disabled");
        $button.attr({
            "href": this.enabled ? "order?action=" + this.action : "#"
        });
        $detail.html(
            this.products.map((item) => GeographyOrder.getTemplate(item))
        );

        GeographyOrder.notifyState(!this.enabled && this.action == "delivery");
        
        if (WindowState.isMobile) GeographyOrder.mobileOrderDetailShow(true);
        GeographyOrder.isRendered = true;
        let activeClass = "stages__geo__choose__item_active";
        GeographyOrder.getOrderList().forEach((item) => {           
            if(item == this) item.element.addClass(activeClass);
            else item.element.removeClass(activeClass);
        })
    }
}
export { GeographyOrder, GeographyOrderProductsList };