import {
    Config,
    DefineConst
} from "./config";

class Thanks {
    static init() {
        $(".js-feedback-rate").on("click", function () {
            let data = $(this).data();
            let query = {
                msg_action: "rate",
                rate: data.feedbackRate,
                orderId: data.id
            };
            console.warn(query);
            $.post(Config.endpoints.feedback, query).then((resp) => {
                let response = JSON.parse(resp);
                if (response.status == DefineConst.STATUS_SUCCESS) {
                    $(".stages__thanks__rate").hide();
                    $(".stages__thanks__feedback").show();
                }

            });
        });
    }
}
export {
    Thanks
};