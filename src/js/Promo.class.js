import { Config, DefineConst } from "./config";

class Promo {
    constructor(options) {
        this.form = options.form || null;
    }
    init() {
        $(this.form).on("submit", (e) => {
            e.preventDefault();
            let code = $(e.target).serializeArray()[0].value;
            this.checkoutPromocode(code,{
                success: (response) => {
                    Toast.createToast({
                        content: response.message,
                        type: DefineConst.STATUS_SUCCESS
                    });
                    $.fancybox.open(JSON.stringify(response));
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
        $.post(Config.endpoints.promo, { code : code }).then((resp) => {
            let result = JSON.parse(resp);
            console.log(result);
            let success = result.status == DefineConst.STATUS_SUCCESS;
            success ? options.success(result) : options.error(result);
        });
        
    }
}
export { Promo }