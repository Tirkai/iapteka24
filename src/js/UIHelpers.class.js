class UIHelpers {
    static _scrollLockState = false;
    static scrollLock(value){
        let className = "scroll-lock";
        if(value) $("html, body").addClass(className);
        else $("html, body").removeClass(className);
        this._scrollLockState = value;      
    }
    static scrollTo(params) {
        let {
            element,
            modify,
            speed
        } = params;
        $('html, body').stop().animate({
            scrollTop: $(element).offset().top + modify
        }, speed);
    }
    static scrollInnerLeft(params){
        let {element, speed = 300, value = 0} = params;
        $(element).animate({
            scrollLeft: value
        }, speed)
    }
    static inputType(type, element) {
        if (type == DefineConst.INPUT_TYPE_NUMBER) element.value = element.value.replace(/[^0-9]/g, '');
    }
} 
export { UIHelpers };