import { UIElement } from './UIController.class.js';
class UICarousel extends UIElement{
    slides = [];
    currentSlide = 0;
    previousSlide = 0;
    iterableTimeout = null;
    slideCount = 0;
    transitions = {
        in: "ui-carousel__slide_in",
        out: "ui-carousel__slide_out",
        active: "ui-carousel__slide_active"
    }
    props = {
        timeout: 5000
    };
    constructor(params){
        super(params);
        $.extend(this.props,params.props);
        this.element = params.element;
    }
    nextSlide(){
        let next = this.currentSlide < this.slideCount - 1 ? this.currentSlide + 1 : 0;
        this.changeSlide(this.currentSlide, next);
        return {id: this.currentSlide, slide:this.slides[this.currentSlide]};
    }
    prevSlide(){ 
        let next = this.currentSlide > 0 ? this.currentSlide - 1 : this.slideCount - 1;
        this.changeSlide(this.currentSlide, next);
        return {id: this.currentSlide, slide: this.slides[this.currentSlide]};
    }
    changeSlide(previousSlide, currentSlide){
        this.previousSlide = previousSlide;
        this.currentSlide = currentSlide;
        this.update();
        this.render();
    }
    update(){
        clearTimeout(this.iterableTimeout);
        this.iterableTimeout = setTimeout(() => {
            this.nextSlide();
            this.update();
        }, this.props.timeout);
    }
    stop(){
        clearTimeout(this.iterableTimeout);
    }
    render(){
        let prev = this.slides[this.previousSlide];
        let current = this.slides[this.currentSlide];
        $(prev.element).removeClass(this.transitions.active);
        $(current.element).show();
        $(current.element).addClass(this.transitions.active);

        this.$points.children().each((i, item) => {
            $(item).removeClass("ui-carousel__points__item_active");
            if(i == this.currentSlide) $(item).addClass("ui-carousel__points__item_active");
        })

        setTimeout(() => {
            if(prev.id != current.id) $(prev.element).hide();
        },300);
    }
    init(){
        this.$container = $(this.element).find(".ui-carousel__container");
        this.$slides = $(this.$container).find(".ui-carousel__slide"); 
        this.$next = $(this.$container).find(".ui-carousel__nav__next");
        this.$prev = $(this.$container).find(".ui-carousel__nav__prev");
        this.$points = $(this.$container).find(".ui-carousel__points");
        this.$slides.each((i, item) => {
            this.slides.push(new UISlideElement({
                id: i,
                element: $(item)
            }));
            let point = this.$points.append(`
                <div class="ui-carousel__points__item" data-slide="${i}">
                    <div class="sprite sprite-slider-point-default"></div>
                    <div class="sprite sprite-slider-point-active"></div>
                </div>
            `);
        });
        this.slideCount = this.$slides.length;
        this.$next.on("click", () => {
            this.nextSlide();
            this.update();
        });
        this.$prev.on("click",() => {
            this.prevSlide();
            this.update();
        });
        this.update();
        this.render();
        this.createKey(this.element, this);
        this.bindPointsListener();
        return this;
    }
    bindPointsListener(){
        let ctx = this;
        this.$points.on("click", ".ui-carousel__points__item", function(){
            let id = $(this).data().slide;
            ctx.changeSlide(ctx.currentSlide, id);
        })
    }
}
class UISlideElement{
    props = {};
    constructor(params){
        this.element = $(params.element);
        this.id = params.id;
    }
}

export { UICarousel, UISlideElement };