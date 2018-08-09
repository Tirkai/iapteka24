class AuthController {
    static frames = {};
    static userData = {
        name: null,
        phone: null,
        email: null
    };
    static init() {
        let ctx = this;
        $(".popup__auth__frame").each((i, item) => {
            let dataId = $(item).attr("id");
            this.frames[dataId] = new AuthFrameItem({
                id: i,
                name: dataId,
                element: $(item)
            });
        });
        $(".js-auth-register-form").on("submit", (event) => this.serializeForm(event, this.getAuthCode.bind(this)));
        $(".js-auth-login-form").on("submit", (event) => this.serializeForm(event, this.login.bind(this)));
    }
    static serializeForm(event, callback) {
        event.preventDefault();
        let form = {};
        for (let item of $(event.target).serializeArray()) {
            form[item.name] = item.value;
        }
        callback(form); 
        Debug.log([form], "Auth Serialized Form", this); 
        return this;
    }
    static login(userData) {
        $.extend(AuthController.userData, {
            username: userData.username
        });
        let request = {
            username: userData.username,
            password: userData.password,
            action: "auth/formLogin",
            csrf: OfficeConfig.csrf,
            return: ""
        }
        Debug.log([request], "Auth Login Request", this);
        $.post("/assets/components/office/action.php", request)
            .then((resp) => {
                let response = JSON.parse(resp);
                Debug.log([request], "Auth Login Response", this);
                if (response.success) {
                    location.href = "/profile";
                } else {
                    Toast.createToast({
                        type: DefineConst.STATUS_ERROR,
                        content: response.message
                    });
                }


            })
            .catch((e) => Debug.error(["Failed Login Request", request], this));
    }
    static logout() {
        $.post("/?action=auth/logout").then((resp) => {
            Toast.createToast({
                content: "Logout",
                type: DefineConst.STATUS_SUCCESS
            })
        });
    }
    static getAuthCode(userData) {
        $.extend(AuthController.userData, {
            name: userData.name,
            phone: userData.phone
        });
        let data = {
            action: "getAuthCode"
        };
        $.extend(data, userData);
        $.post(Config.dataRequest.auth, data)
            .then((resp) => {
                $(".js-auth-verify-phone").text(data.phone);
                AuthView.changeFrame(DefineConst.AUTH_FRAME_VERIFY);
                AuthView.initResendTimer();
            })
            .catch((e) => {
                Debug.error(e);
            });
        return this;
    }
    static checkAuthCode(userData) {
        $.post(Config.dataRequest.auth, userData)
            .then((resp) => {
                Toast.createToast({
                    type: DefineConst.STATUS_ERROR,
                    content: Config.strings.waitPaveroApi
                })
            })
            .catch((e) => Debug.error(e));
    }
}

class AuthView {
    static resend = {
        timer: null,
        defaultValue: 60,
        value: 0
    };
    static init() {

    }
    static changeFrame(name) {
        for (let key in AuthController.frames) {
            let frame = AuthController.frames[key];
            if (frame.name == name) {
                Debug.log([frame], "Change Frame", this);
                $(frame.element).show()
            } else {
                $(frame.element).hide();
            }
        }
    }
    static destroyResendTimer() {
        this.resend.value = this.resend.defaultValue;
        clearInterval(this.resend.timer);
    }
    static initResendTimer() {
        this.resend.value = this.resend.defaultValue;
        this.resend.timer = setInterval(() => {
            this.resend.value = this.resend.value - 1;
            if (this.resend.value <= 0) {
                clearInterval(this.resend.timer);
                this.resend.value = this.resend.defaultValue;
                $(".js-auth-resend-timer").html(`
                    <a href="javascript:;" onclick="AuthController.getAuthCode(AuthController.userData)">Отправить еще раз</a>
                `);
            } else {
                $(".js-auth-resend-timer").html(`
                    <span>Отправить еще раз </span><span class="highlight-text_grey">через ${this.resend.value} секунд.</span>
                `);
            }
        }, 1000);
    }
    static showPopup(frame = DefineConst.AUTH_FRAME_LOGIN) {
        let ctx = this;
        $.fancybox.open({
            type: "inline",
            src: "#popup_auth",
            beforeClose: () => ctx.destroyResendTimer()
        });
        this.changeFrame(frame);
    }
}
class AuthFrameItem {
    constructor(params) {
        this.id = params.id;
        this.name = params.name;
        this.element = params.element;
    }
}
AuthController.init();
export { AuthController, AuthView, AuthFrameItem };