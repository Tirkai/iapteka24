import {
    Config,
    DefineConst
} from "./config";

class Promo {
    props = {
        successPromoHandler: () => {}
    };
    currentCode = null;
    constructor(options) {
        $.extend(this.props, options.props);
        this.form = options.form || null;
    }
    init() {
        $(this.form).on("submit", (e) => {
            e.preventDefault();
            let code = $(e.target).serializeArray()[0].value;
            this.checkoutPromocode(code, {
                success: (response) => {
                    Toast.createToast({
                        content: response.message,
                        type: DefineConst.STATUS_SUCCESS
                    });
                },
                error: (response) => {
                    Toast.createToast({
                        content: response.message,
                        type: DefineConst.STATUS_ERROR
                    })
                }
            });
        });
        return this;
    }
    checkoutPromocode(code, options) {
        $.post(Config.endpoints.promo, {
            code: code
        }).then((resp) => {
            let result = JSON.parse(resp);
            console.log(result);
            let success = result.status == DefineConst.STATUS_SUCCESS;
            if (success) {
                this.currentCode = code;
                options.success(result);
                this.props.successPromoHandler(result);
            } else options.error(result);
        });

    }
}
export {
    Promo
}