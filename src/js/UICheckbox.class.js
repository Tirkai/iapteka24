import { UIElement } from './UIController.class.js';
class UICheckboxController{
    static init(){
        $(".ui-checkbox").each((i, item) => new UICheckbox({
            element: $(item)
        }).init());
    }
}

class UICheckbox extends UIElement{
    _isChecked = false;
    _listeners = {
        onChange: [],
        onCheckActive: [],
        onCheckDeactive: []
    }
    props = {
        isChecked: false
    }
    get isChecked(){ return this._isChecked; }
    set isChecked(value){ 
        this._isChecked = value;
        this.callListeners('onChange');
        if(this._isChecked) this.callListeners('onCheckActive');
        else this.callListeners('onCheckDeactive');
        this.updateElementEnabled();
    }
    constructor(params) {
        super(params);
        $.extend(this.props,params.props);
        
        this.element = params.element;
        let dataId = $(this.element).attr("id");
        let dataName = $(this.element).attr("data-name");
        if(dataId != undefined) this.id = "ui-checkbox-" + $(this.element).attr("id");
        else this.id = "ui-checkbox-" + Service.generateKey();
        this.name = dataName;
    }
    addListener(event, listener){
        Debug.log([this._listeners[event], listener],"Add Listener", this);
        this._listeners[event].push(listener);
    }
    callListeners(event){
        this._listeners[event].forEach((listener) => listener());
    }
    changeState(){
        let value = $(this.$checkbox.prop('checked'));
        this.isChecked = !!value[0];
    }
    init(){
        $(this.element).html(this.getTemplate({seed: this.id}));
        this.isChecked = !!this.element.data().checked;
        this.$checkbox = $(this.element).find("input");
        this.$checkbox.on("change",() => this.changeState());
        this.$checkbox.prop('checked', this.isChecked);
        this.updateElementEnabled();
        this.createKey(this.element, this);
        this.isReady = true;
        return this;
    }
    updateElementEnabled(){
        this.element.attr("data-checked", this.isChecked);
    }
    getTemplate(params){
        return `
            <input type="checkbox" class="ui-checkbox__native" id="${params.seed}" name="${this.name}">
            <label class="ui-checkbox__label" for="${params.seed}"></label>
        `;
    }
} 
export { UICheckboxController, UICheckbox };