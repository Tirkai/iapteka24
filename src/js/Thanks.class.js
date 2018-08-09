import { Config } from "./config";

class Thanks {
    static init() {
        $(".js-feedback-rate").on("click", function () {
            let data = $(this).data();
            $.post(Config.endpoints.feedback, { rate: data.feedbackRate, orderId: data.id }).then((resp) => {
                console.log(resp);
                $(".stages__thanks__rate").hide();
                $(".stages__thanks__feedback").show();
            });
        });
    }
}
export {
    Thanks
};