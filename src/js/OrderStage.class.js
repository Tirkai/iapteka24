class OrderStage{
    static checkbox = null;
    static init(){
        this.confirmPolicyCheck();
    }
    static confirmPolicyCheck(){
        let $element = $("#order-policy-confirm");
        let $orderButton = $("#order-button");
        UIController.awaitReady($element).then((controller) => {            
            console.warn("!!!");
            controller.addListener('onCheckActive',() => {
                $orderButton.prop("disabled",false);
                $orderButton.removeClass("button_disabled");
            });
            controller.addListener('onCheckDeactive',() => {
                $orderButton.prop("disabled",true);
                $orderButton.addClass("button_disabled");
            });
            if(controller.isChecked) controller.callListeners('onCheckActive');
            else controller.callListeners('onCheckDeactive');

        });
        this.checkbox = UIController.getControllerByElement($element);
    }
}
export { OrderStage };