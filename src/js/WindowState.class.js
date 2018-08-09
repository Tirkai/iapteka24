import { Config } from './config.js';
class WindowState {
    static width = $(window).width();
    static isMobile = false;
    static update() {
        this.width = $(window).width();
        this.isMobile = this.width <= Config.responsive.mobileWidth;
    }
    static init() {
        $(window).on("resize", () => this.update());
        this.update();
        return this;
    }
}
WindowState.init();
export { WindowState };