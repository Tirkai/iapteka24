
// I NEED REFACTOR
class Catalog {
    static init() {
        let bindExpanderEvents = (i, item) => {
            let expander = $(item).find(".js-filter-expand");
            let filter = $(item).find(".js-filter-item");
            let expandFilterBlock = () => {
                $(expander).find(".icon").toggleClass("rotate180");
                $(filter).toggleClass("catalog-container__sidebar__item__filter_is-compress");
            }
            $(expander).on("click", expandFilterBlock);
        };
        $(".catalog-container__sidebar__item").each((i,item) => bindExpanderEvents(i, item));
    }
    static showOrderInfo(data) {
        let cost = data.data.total_cost;
        let count = data.data.total_count;
        $(".js-order-info-count").html(count);
        $(".js-order-info-cost").html(cost);
        $.fancybox.open({
            type: "inline",
            src: "#popup_order_info"
        });
        let discountProgress = (data.data.sum / Config.price.maxDiscountProgress) * 100;
        $(".js-order-info-progress").css({
            width: cost < Config.price.maxDiscountProgress ? (discountProgress > 5 ? discountProgress + "%" : "5%") : "100%"
        });
    }
    static addToCart(element) {
        AnalyticsController.counter.callTarget("ProductAddToCart");
        $(element).closest(".card__form-submit").submit();
    }
    static orderProduct(element) {
        let $field = $(element).closest(".product__field");
        let fieldContent = {
            picture: $field.find("[name='picture']").val(), 
            title: $field.find("[name='title']").val(),
            id: $field.find("[name='id']").val()
        };
        Debug.log(fieldContent, "Order Field Content", this);
        $.fancybox.open({
            src: "#popup_order_product",
            type: "inline"
        });
        $(".js-popup-order-product-picture").attr({src: fieldContent.picture});
        $(".js-popup-order-product-title").html(fieldContent.title);
        $(".js-popup-order-product-id").val(fieldContent.id);
    }
    static changeCartButtonCount(data) {
        let $cost = $(".js-mini-cart-cost");
        let $count = $(".js-mini-cart-count");
        if (data.data.total_cost > 0) {
            $cost.html(data.data.total_cost + " руб.");
            $count.css({
                display: "inline-flex"
            });
            $count.html(data.data.total_count);
        } else {
            $cost.html("Корзина");
            $count.hide();
        }
    }
}
export { Catalog };