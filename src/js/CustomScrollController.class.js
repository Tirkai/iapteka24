class CustomScrollController {
    static init() {
        let windowWidth = $(window).width();
        let bindHandler = (i, item) => {
            let $item = $(item);
            if ($item.height() >= 0) $item.customScroll();
        }
        let cardListScale = function (i, item) {
            let childCount = $(this).children().length;
            $(this).css({
                width: childCount * 270 + "px"
            });
        }
        $(".js-custom-scroll").each(bindHandler);

        if (WindowState.isMobile) $(".card-list").each(cardListScale);
    }
}
export { CustomScrollController };