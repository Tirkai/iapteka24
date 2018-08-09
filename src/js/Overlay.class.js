
class Overlay{
    static element = $(".overlay");
    static show(callback){
        this.element.addClass("overlay_active");
        this.element.one("click",() => {
            this.hide();
            callback();
        });
    }
    static hide(){
        this.element.removeClass("overlay_active"); 
        this.element.unbind();
    }
} 
export { Overlay };