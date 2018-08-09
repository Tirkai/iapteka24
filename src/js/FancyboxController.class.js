class FancyboxController {
    static init() {
        $.fancybox.defaults.beforeLoad = function () {
            $("html,body").css({
                overflow: "hidden"
            });
            $(".search-form_is-pinned").css({
                paddingRight: "17px"
            });
        };
        $.fancybox.defaults.afterClose = function () {
            $("html,body").css({
                overflow: "auto"
            });
            $(".search-form_is-pinned").css({
                paddingRight: "0"
            });
        };
        $.fancybox.defaults.touch = false;
        $(".js-fancybox-close").on("click", function () {
            $.fancybox.close();
        });
        $.fancybox.defaults.animationEffect = "zoom-in-out";
        $.fancybox.defaults.animationDuration = 250;
    }
} 
FancyboxController.init();
export { FancyboxController };