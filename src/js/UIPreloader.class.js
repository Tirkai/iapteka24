import { UIElement } from './UIController.class.js';
class UIPreloader extends UIElement{
    _src = "/img/loader.svg";
    _showTimeoutId = 0;
    _hideTimeoutId = 0;
    props = {
        showDelay: 0,
        hideDelay: 0,
        visibility: false,
        type: "default"
    };
    constructor(params){
        super(params);
        $.extend(this.props,params.props);
        this.$container = $(params.container);
        this.showHandler = params.showHandler || new Function;
        this.hideHandler = params.hideHandler || new Function;
        this.element = $(this.getTemplate());
    }

    show(){
        clearTimeout(this._hideTimeoutId);
        this._showTimeoutId = setTimeout(() => $(this.element).removeClass("hidden"), this.props.showDelay);
    }
    hide(){
        clearTimeout(this._showTimeoutId);
        this._hideTimeoutId = setTimeout(() => $(this.element).addClass("hidden"), this.props.hideDelay);
    }
    init(){
        if(this.props.visibility) this.show();
        else this.hide();
        this.render();
        return this;
    }
    render(){
        this.element = this.$container.html(this.getTemplate());
    }
    getTemplate(){
        return `
            <div class="ui-preloader">
                <img src="${this._src}">
            </div>          
        `
    }


}
export { UIPreloader };