

class OpticsController {
    static currentOptics = null;
    static selectsList = [];
    static init() {
        let $element = $(".optics-product");
        let type = $element.data().optics;
        let template = {
            element: $element,
            type: type
        };
        if (Object.is(type, DefineConst.OPTICS_GLASSES)) this.currentOptics = new Glasses(template).init();
        if (Object.is(type, DefineConst.OPTICS_LENSES)) this.currentOptics = new Lenses(template).init();
        Debug.log([this.currentOptics], "Current Optics", this);
        this.helpers();
        this.generateSelect();
    }
    static createOrder(order) {
        $.post(Config.endpoints.optics, {
            optics: order
        }).then((resp) => {
            let result = JSON.parse(resp);
            $(".js-optics-order-number").html(result.data.orderNumber);
            $.fancybox.open({
                type: "inline",
                src: "#popup_success_optics"
            });
            Debug.log([order, resp], "Create Order", this);
        }).catch(() => {
            alert("Не удалось отправить запрос");
        });
    }
    static set equalsEyes(value) {
        let $element = $(".optics-product__second-variant");
        if (value) $element.addClass("hidden");
        else $element.removeClass("hidden");
    }
    static generateSelect(){
        $(".select-element").each((i, item) => {
            let s = new UISelect({
                element: $(item)
            }).init();
            this.selectsList.push(s);
            console.log(s);
        });
    }
    static helpers() {
        let openOrderPopup = () => {
            $.fancybox.open({
                src: "#popup_order_optics",
                type: "inline"
            });
        }
        let submitOrderForm = (e) => {
            e.preventDefault();
            let personArray = $(e.target).serializeArray();
            let personInfo = {};
            let order = OpticsController.currentOptics.generateOrder();
            for (var item of personArray) {
                personInfo[item.name] = item.value;
            }
            Debug.log(order, "Optics Order", this);
            OpticsController.createOrder({
                id: $(".optics-id").val(),
                params: order,
                person: {
                    name: personInfo.name,
                    phone: personInfo.phone,
                    email: personInfo.email
                }
            });
            $.fancybox.close();
        }
        $(".optics-product__counter").each((i, item) => new UICounter({
            element: $(item)
        }).init());
        /*
        $(".select-element").each((i, item) => {
            console.warn(item);
            let select = new UISelect({
                element: $(item)
            }).init();
            console.warn(select);
            this.selectsList.push(select); 
            //generateSelectsList(item)
        });
        */
        $(".js-optics-order").on("click", openOrderPopup);
        $(".js-optics-send").on("submit", submitOrderForm);
    }
}
class OpticsElement {
    constructor(params) {
        this.element = params.element;
        this.equalsState = params.equalsState || true;
        this.type = params.type;
        this.count = 1;
        this.eyes = {
            left: null,
            right: null
        };
    }
    init() {
        $("#optics-equals").on("change", (e) => OpticsController.equalsEyes = $(e.target).prop("checked"));
        return this;
    }
    getField(value, type) {

        let element = $(`.optics-field[data-optics="${value}"]`)[0];
        if (type == DefineConst.UI_SELECT) return element.dataset.select;
        if (type == DefineConst.UI_COUNTER) return element.dataset.count;
        if (type == DefineConst.INPUT_CHECKBOX) return element.checked;
        if (type == DefineConst.INPUT_TEXT) {
            return element.value;
        }
        return element;
    }

}
class Lenses extends OpticsElement {
    constructor(params) {
        super(params);
        this.eyes.left = this.template.lense;
        this.eyes.right = this.template.lense;
    }
    generateOrder() {
        this.equals = this.getField("equals-eyes", DefineConst.INPUT_CHECKBOX);
        this.eyes = {
            left: {
                opticalStrength: this.getField("lense-strength-left", DefineConst.UI_SELECT),
                opticalRadius: this.getField("lense-radius-left", DefineConst.UI_SELECT),
                count: this.getField("lense-count-left", DefineConst.UI_COUNTER)
            },
            right: {
                opticalStrength: this.getField("lense-strength-right", DefineConst.UI_SELECT),
                opticalRadius: this.getField("lense-radius-right", DefineConst.UI_SELECT),
                count: this.getField("lense-count-right", DefineConst.UI_COUNTER)
            }
        }
        return {
            type: this.type,
            equals: this.equals,
            count: this.count,
            eyes: this.eyes
        };
    }
    get template() {
        return {
            lense: {
                opticalStrength: 0,
                opticalRadius: 0,
                count: 1
            }
        }
    }
}
class Glasses extends OpticsElement {
    constructor(params) {
        super(params);
        this.eyes.left = this.template.glass;
        this.eyes.right = this.template.glass;
        this.count = this.template.count;
    }
    generateOrder() {
        this.equals = this.getField("equals-eyes", DefineConst.INPUT_CHECKBOX);
        this.count = this.getField("glass-counter", DefineConst.UI_COUNTER);
        this.eyes = {
            left: {
                opticalStrength: this.getField("glass-strength-left", DefineConst.UI_SELECT),
                cover: this.getField("glass-cover-left", DefineConst.UI_SELECT),
                axis: this.getField("axis-left", DefineConst.INPUT_TEXT),
                astigmatic: this.getField("glass-astigmatic-left", DefineConst.INPUT_CHECKBOX)
            },
            right: {
                opticalStrength: this.getField("glass-strength-right", DefineConst.UI_SELECT),
                cover: this.getField("glass-cover-right", DefineConst.UI_SELECT),
                axis: this.getField("axis-right", DefineConst.INPUT_TEXT), 
                astigmatic: this.getField("glass-astigmatic-right", DefineConst.INPUT_CHECKBOX)
            }
        }
        return {
            type: this.type,
            equals: this.equals,
            count: this.count,
            eyes: this.eyes
        };
    }
    get template() {
        return {
            count: 1,
            glass: {
                opticalStrength: 0,
                cover: DefineConst.OPTICS_DEFAULT_COVER,
                astigmatic: false
            }

        }
    }
}
export { OpticsController, OpticsElement, Lenses, Glasses };