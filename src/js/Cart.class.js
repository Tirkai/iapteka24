import { Config } from './config.js';
class Cart {
    static _products = [];
    static init() {
        $(".product").each((i, item) => {
            this._products.push(new CartProduct({
                id: i,
                element: $(item),
                productForm: $(item).find(".stages__cart__product__form"),
                deleteForm: $(item).find(".product__delete"),
                countField: $(item).find(".product__count__input"),
                priceField: $(item).find(".product__price__input"),
                sumView: $(item).find(".product__sum"),
                uiCounter: $(item).find(".product__count")
            }));
        });
        this.calculateDiscountProgress();
        this.renderTotalPrice();
        this.helpers();
    }
    static getProgressivePrice() {
        let percent = 0;
        Config.price.discountProgressStageValues.forEach((discount) => {
            if (this.getTotalPrice().progressivePrice >= discount.price) {
                percent = discount.percent;
            }
        });
        return {
            price: (this.getTotalPrice().progressivePrice - (this.getTotalPrice().progressivePrice / 100 * percent)) +
                this.getTotalPrice().discountPrice,
            percent: percent
        }

    }
    static getProducts() {
        return this._products;
    }
    static getTotalPrice() {
        let total = { 
            summaryPrice: 0,
            progressivePrice: 0, 
            discountPrice: 0
        }
        this.getProducts().forEach((item) => {
            total.summaryPrice += item.getProductSummary();
            total.progressivePrice += !item.discount ? item.getProductSummary() : 0;
            total.discountPrice += item.discount ? item.getProductSummary() : 0;
        });
        
        return total;
    }
    static calculateDiscountProgress(){
        let element = $(".discount-progress__progress");
        let discountProgress = (this.getTotalPrice().progressivePrice / Config.price.maxDiscountProgress) * 100;
        $(".js-order-info-progress").css({
            width: this.getTotalPrice().progressivePrice < Config.price.maxDiscountProgress ? (discountProgress > 7 ? discountProgress + "%" : "28px") : "100%"
        });
        $(".js-cart-discount-percent").text(this.getProgressivePrice().percent);
    }
    static removeProduct(product) {
        $(product.deleteForm).submit();
        $(product.element).addClass("product_removed");
        setTimeout(() => $(product.element).remove(), 300);
        this._products.splice(product.id, 1);
        if (this.getProducts().length <= 0) setTimeout(() => location.reload(), 1000);
        this.renderTotalPrice();
        Debug.log(product, "Remove Product", this);
        

    } 
    static renderTotalPrice() {
        this.calculateDiscountProgress();
        let price = this.getProgressivePrice().price;
        Debug.log([price], "Render Total Price", this);
        $(".js-cart-total-price").text(price.toFixed(2));
        $(".js-cart-basic-container").css({display: Cart.getProgressivePrice().percent > 0 ? "block": "none"});
        $(".js-cart-basic-price").text(this.getTotalPrice().summaryPrice.toFixed(2));
    }
    static helpers() {
        let onOrderConfirm = (e) => {
            if (Cart.getTotalPrice().summaryPrice < Config.price.orderMinPrice) {
                e.preventDefault();
                Toast.createToast({
                    content: "Минимальная сумма заказа " + Config.price.orderMinPrice + " руб.",
                    type: "error"
                });
            }
        };
        $(".js-order-confirm").on("click", onOrderConfirm);
    }
}
export { Cart };