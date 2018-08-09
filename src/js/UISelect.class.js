import { UIElement } from './UIController.class.js';
class UISelect extends UIElement{
    selected = null;
    generatedOptions = {};
    constructor(params){
        super(params);
        console.warn(params);
        this.element = $(params.element);
        this.$native = $(this.element).find(".select-element__native");
        this.$header = $(this.element).find(".select-element__header");
        this.$content = $(this.element).find(".select-element__content");
        this._isShow = false;
    }
    selectOption(selectInstance){
        this.selected = selectInstance;
        this.render(selectInstance.text);
        this.isShow = false; 
    }
    getSelect(){
        return this.selected.key;
    }
    render(value){
        this.$native.val(value);
        this.$header.find("span").html(value);
        this.element.attr({"data-select": value});
    }
    generateOptions(){
        let ctx = this;
        let defaultSelect = $(this.element).data().select;
        this.$native.children().each((i, item) => {      
            let dataKey = $(item).attr("data-key");
            let key = dataKey != undefined ? dataKey : Service.generateKey(8);  
            let value = $(item).attr("value");
            let option = $(this.getOptionTemplate({
                key: key,
                value: value
            }));
            let text = $(item).attr("value");
            this.generatedOptions[key] = new UISelectOption({
                element: option,
                key: key,
                text: text, 
                controller: ctx
            }).init();
            this.$content.append(option);
        });
        this.selectOption(this.generatedOptions[defaultSelect]);
        
    }
    init(){
        $(this.element).on("click",".select-element__header",() => this.isShow = true);
        $(document).on("click", (event) => {
            if($(event.target).closest(".select-element").length) return;
            else this.isShow = false;
        });
        this.generateOptions();
        this.render(this.selected.text);
        this.createKey(this.element, this);
        return this;
    }
    set isShow(value){
        this._isShow = value;
        this.$content.css({"display": (this._isShow ? "block" : "none")});
    }
    getOptionTemplate(params){
        return `
            <div class="select-element__option" data-key="${params.key}" data-value="${params.value}">
                ${params.value}
            </div>
        `;
    }
}


class UISelectOption extends UIElement{
    controller = null;
    listeners = {
        select: []
    }
    constructor(params){
        super(params);
        this.key = params.key;
        this.element = params.element;
        this.text = params.text;
        this.controller = params.controller;
    }
    select(){
        console.warn("SELECT",this);
        this.controller.selectOption(this);
    }
    init(){
        $(this.element).on("click", () => {
            console.warn(this);
            this.select(this);
        });
        return this;
    }
}

export { UISelect, UISelectOption };