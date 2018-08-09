import { UIElement } from './UIController.class.js';
class UISearch extends UIElement{
    constructor(params) {
        super(params);
        this.element = params.element;
        this.input = $(this.element).find(".search-field__input");
        this.liveElement = $(this.element).find(".search-field__live-search");
        this.focusHandler = new Function;
        this.blurHandler = new Function;
        this.createdHandler = new Function;
    }
    init() {
        let focusClass = "search-field_focused";
        $(this.input).on("focus", () => {
            $(this.element).addClass(focusClass);
            this.focusHandler();
        });
        $(this.input).on("blur", () => {
            $(this.element).removeClass(focusClass);
            this.blurHandler();
        });
        this.createdHandler();
        this.createKey(this.element, this);
        return this;
    }
}

export { UISearch };