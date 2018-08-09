class WavesEffectController{
    static init(){
      Waves.attach('.product__amount-inc,.product__amount-dec,.button:not(.button_disabled)');
      Waves.init();
    }
    static attach(selector){
        Waves.attach(selector);
        Waves.init();
    }
}   
WavesEffectController.init(); 