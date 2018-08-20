import { Config } from './config.js';
class FeedbackController {
    static forms = {};
    static createForm(params) {
        this.forms[params.name] = new FeedbackForm(params).init();
    }
    static showForm(key) {
        this.forms[key].show();
    }
    static sendForm(key) {
        this.forms[key].send();
    }
}

class FeedbackForm {
    props = {
        endpoint: Config.endpoints.feedback,
        popup: null,
        urlParams: null,
        submitHandler: new Function,
        successHandler: new Function,
        errorHandler: new Function
    }
    constructor(params) {
        $.extend(this.props, params.props);
        this.action = params.action;
        this.name = params.name;
        this.form = params.form;
    }
    init() {
        let ctx = this;
        $(this.form).on("submit", (event) => {
            ctx.send();
            event.preventDefault();
        });
        return this;
    }
    show() {
        if (this.props.popup != null) {
            $.fancybox.open({
                src: this.props.popup,
                type: "inline"
            });
        }
    }
    send() {
        let formData = $(this.form).serialize();
        let query = `msg_action=${this.action}&${formData}`;
        console.log(this);
        Debug.log(query, "Feedback Send Query", this);
        $.post(this.props.endpoint, query).then((resp) => {
            let response = JSON.parse(resp);
            Debug.log([response, this.name], "Feedback Response", this);
            this.props.submitHandler(response);
            if(response.status == DefineConst.STATUS_SUCCESS){
                AnalyticsController.counter.callTarget(`Feedback${Service.letterCase(this.name)}Submit`);
                this.props.successHandler(response);
            }
            else this.props.errorHandler(response);
        });
    }
}
class FeedbackBinding {
    static successPopupHandler = (resp) => {
        $.fancybox.close();
    }
    static submitPopupHandler = (resp) => {
        Toast.createToast({ content: resp.message, type: resp.status });
    }
    static init() {
        FeedbackController.createForm({
            name: "question",
            action: "question",
            form: $("#popup_feedback_question form"),
            props: {
                popup: "#popup_feedback_question",
                submitHandler: this.submitPopupHandler,
                successHandler: this.successPopupHandler
            }
        });
        FeedbackController.createForm({
            name: "error",
            action: "error",
            form: $("#popup_feedback_error form"),
            props: {
                popup: "#popup_feedback_error",
                submitHandler: this.submitPopupHandler,
                successHandler: this.successPopupHandler 
            }
        });
        FeedbackController.createForm({
            name: "rare",
            action: "rare",
            form: $("#popup_feedback_rare form"),
            props: {
                popup: "#popup_feedback_rare",
                submitHandler: this.submitPopupHandler,
                successHandler: this.successPopupHandler 
            }
        });
        FeedbackController.createForm({
            name: "review",
            action: "review",
            form: $("#popup_feedback_review form"),
            props: {
                popup: "#popup_feedback_review",
                submitHandler: this.submitPopupHandler,
                successHandler: this.successPopupHandler 
            }
        });
        FeedbackController.createForm({
            name: "call",
            action: "call",
            form: $("#popup_feedback_call form"),
            props: {
                popup: "#popup_feedback_call",
                submitHandler: this.submitPopupHandler,
                successHandler: this.successPopupHandler 
            }
        });
        FeedbackController.createForm({
            name: "subscribe",
            action: "subscribe", 
            form: $(".subscribe__form"),
            props: {
                successHandler: () => {
                    $(".subscribe__form").html(`
                        <span class="highlight-text_green">${Config.strings.feedbackSubscribe}</span>
                    `);
                }
            } 
        });
        FeedbackController.createForm({
            name: "manufacture",
            action: "manufacture",
            form: $(".manufacture-form"),
            props: {
                successHandler: (resp) => {
                    Debug.log(resp, "Manufacture Response", this);
                    $(".manufacture-form").html(`
                        <span class="highlight-text_green">${Config.strings.feedbackRequest}</span>
                    `);
                }
            }
        });

        FeedbackController.createForm({
            name: "postOrderReview",
            action: "review",
            form: $("#post-order-review"),
            props: {
                successHandler: () => $("#post-order-review").html(`<span class="highlight-text_green">Спасибо за ваш отзыв</span>`)
            }
        });

        FeedbackController.createForm({
            name: "reviewPageForm",
            action: "review",
            form: $("#review-page-form"),
            props: {
                successHandler: () => $("#review-page-form").html(`<span class="highlight-text_green">Спасибо за ваш отзыв</span>`)
            }
        });

        FeedbackController.createForm({
            name: "pharmacyPage",
            action: "review",
            form: $("#pharmacy-feedback"),
            props: {
                successHandler: () => $("#pharmacy-feedback").html(`<span class="highlight-text_green">Ваша заявка отправлена</span>`)
            }
        });

        $(".js-popup-feedback-show").each((i, item) => $(item).on("click",() => FeedbackController.forms[$(item).data().action].show()));

    }
}
FeedbackBinding.init(); 
export { FeedbackController, FeedbackForm, FeedbackBinding };