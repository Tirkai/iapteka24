class UIController{
    static _elements = {};
    static _updateListeners = [];
    static addElement(key, element){
        this._elements[key] = element;
        this.updateElements();
    }
    static updateElements(){
        this._updateListeners.forEach((item) => {
            console.log("_updateListeners");
            if(item.active) item.listener();
            if(!item.repeat) item.active = false;
        });
    }
    static addUpdateListener(params){
        this._updateListeners.push({
            key: params.key,
            active: true,
            repeat: params.repeat,
            listener: params.listener
        })
    }
    static getControllerByElement(element){
        let elementKey = $(element).attr("data-ui-key");
        return this._elements[elementKey];
    }
    static getControllerByKey(key){
        return this._elements[key];
    }
    static awaitReady(element){
        return new Promise((resolve, reject) => {
            let key = Service.generateKey();
            console.log("k",key);
            let updateListener = {
                key: key,
                repeat: true,
                listener: () => {
                    let controller = UIController.getControllerByElement(element);
                    if(controller.isReady){
                        resolve(controller);
                        UIController._updateListeners.find((item) => item.key == key).active = false;
                    }
                }
            };
            UIController.addUpdateListener(updateListener);
        });  
    }
}

class UIElement{
    _isReady = false;
    _readyListener = new Function();
    listeners = {};
    addListener(name, listener){
        this.listeners[name].push(listener);
    }
    callListener(name){
        this.listeners[name].forEach(listener => listener());
    }
    get isReady(){
        return this._isReady;
    }
    set isReady(value){
        this._isReady = value;
        UIController.updateElements();
    }
    createKey(element, controller){ 
        let key = Service.generateKey();
        $(element).attr("data-ui-key", key);
        UIController.addElement(key, controller);
    }
    ready(callback){
        if(this.isReady) callback(this);
        else this._readyListener = callback;
    }  
    
} 
export { UIController, UIElement };