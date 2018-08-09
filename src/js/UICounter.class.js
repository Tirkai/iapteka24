import { UIElement } from './UIController.class.js';
class UICounter extends UIElement{ 
    constructor(params){
        super(params);
        // some
        this.defaultValue = params.defaultValue || 1;
        this.minCount = params.minCount || 1;
        this.maxCount = params.maxCount || 100;
        this.element = params.element;
        this.increaseHandler = params.increaseHandler || new Function();
        this.decreaseHandler = params.decreaseHandler || new Function();
        this.changeHandler = params.changeHandler || new Function();
        this.overflowHandler =  params.overflowHandler || new Function();
        this.count = this.defaultValue;
        this.render(); 
    }
    increase(){
        if(this.count >= this.maxCount) this.overflowHandler();
        this.set(this.count + 1);
        this.increaseHandler();
    }
    decrease(){
        this.set(this.count - 1);
        this.decreaseHandler();
    }
    set(value){
        this.count = this.checkLimit(value);
        this.changeHandler();
        this.render();
    }
    checkLimit(value){
        let result = value;
        return result < this.maxCount ? (result > this.minCount ? value : this.minCount) : this.maxCount;
    }
    render(){
        this.element.attr({"data-count": this.count});
        this.element.find(".ui-counter__value").text(this.count);
    }
    init(){
        let $increase = $(this.element).find(".ui-counter__increase");
        let $decrease = $(this.element).find(".ui-counter__decrease");
        $increase.on("click", () => this.increase());
        $decrease.on("click", () => this.decrease());
        this.createKey(this.element, this);
        return this; 
    }

} 

export { UICounter };