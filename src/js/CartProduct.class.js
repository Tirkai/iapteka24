class CartProduct {
    constructor(params) {
        let productContext = this;
        this.id = params.id;
        this.element = params.element;
        this.productForm = params.productForm;
        this.deleteForm = params.deleteForm;
        this.countField = params.countField;
        this.priceField = params.priceField;
        this.sumView = params.sumView;
        this.priceValue = parseFloat($(this.priceField).val());
        this.countValue = parseInt($(this.countField).val());
        this.maxCountValue = $(this.countField).data().maxcount;
        this.discount = !!($(this.priceField).data().discount);
        this.uiCounter = new UICounter({
            element: $(params.uiCounter),
            defaultValue: productContext.countValue,  
            maxCount: productContext.maxCountValue,
            increaseHandler() {
                let maxCount = $(productContext.countField).data().maxcount;
                if (productContext.countValue > maxCount) {
                    this.decrease();
                    Toast.createToast({
                        type: DefineConst.STATUS_ERROR,
                        content: Config.strings.moreAvailableLimit + ` ${this.maxCount}`
                    })
                }
            },
            changeHandler() { 
                productContext.countValue = this.count;
                $(productContext.countField).val(this.count);
                $(productContext.sumView).text(productContext.getProductSummary().toFixed(2) + " руб.");
                $(productContext.productForm).submit();
                Cart.renderTotalPrice();
            },
            overflowHandler(){
                Toast.createToast({
                    type: DefineConst.STATUS_ERROR,
                    content: Config.strings.moreAvailableLimit + ` ${this.maxCount}`
                })
            }
        }).init();
        this.init()
    }

    getProductSummary() {
        return this.priceValue * this.countValue;
    }
    init() {
        this.deleteForm.on("click", () => Cart.removeProduct(this));
    }

}
export { CartProduct };