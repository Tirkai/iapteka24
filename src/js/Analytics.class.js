import { Config } from './config.js';
class AnalyticsController {
    static counter = null;
    static init() {
        this.counter = new AnalyticsCounter({
            counterId: Config.analytics.metrikaCounterId,
        });
        this.counter.init();
        
    }
    static getModel(value) {
        return this._conditionModels[value];
    }
    static _conditionModels = {
        external(params, applyTarget) {
            return () => null;
        },
        pageUrl(params, applyTarget) {
            return () => {
                if(params.strict){
                    if (location.href == params.url) applyTarget()
                } else {
                    if(location.href.indexOf(params.url) > -1) applyTarget()
                }
                
            };
        },
        onClick(params, applyTarget) {
            return () => $(params.element).on("click", () => applyTarget());
        },
        onSubmit(params, applyTarget) {
            return () => $(params.element).on("submit", () => applyTarget());
        }
    };
}

class AnalyticsCounter {
    targets = {};
    queue = [];
    observers = [];
    constructor(params) {
        
        this.counterId = params.counterId;
    }
    init() {
        if(window.targets != undefined) this.addTargets(window.targets);
        return this;
    }
    addTarget(targetId, target) { 
        let targetItem = new AnalyticsTarget(targetId, target);
        this.targets[targetId] = targetItem.init();
        return targetItem;
    }
    addTargets(targets) {
        for(let key in targets){
            this.addTarget(key, targets[key]);
        }
    }
    callTarget(targetId) { 
        this.targets[targetId].applyTarget();
    }
}


class AnalyticsTarget {
    condition = null;
    props = {};
    constructor(targetId, params) {
        this.targetId = targetId;
        this.model = params.model || "external";
        this.arguments = params.arguments || {};
        this.caller = params.caller || null;
        this.desc = params.desc || null;
    }
    applyTarget() {
        Debug.log(this, "Apply Analytics Target", this);
        window[`yaCounter${AnalyticsController.counter.counterId}`].reachGoal(this.targetId);
        
    }
    init() {
        let model = AnalyticsController.getModel(this.model);
        this.condition = model(this.arguments, this.applyTarget.bind(this));
        this.condition();
        return this;
    }
}


$(document).on("yacounter" + Config.analytics.metrikaCounterId + "inited", () => AnalyticsController.init());


export { AnalyticsController, AnalyticsCounter, AnalyticsTarget };
/*
AnalyticsController.counter.addTargets([{
        targetId: "test",
        model: "pageUrl",
        desc: "test",
        arguments: {
            url: "http://apteka.fvds.ru/catalog"
        }
    },
    {
        targetId: "test3",
        model: "onSubmit",
        desc: "test",
        arguments: {
            element: ".js-auth-register-form"
        }
    },
    {
        targetId: "test2",
        desc: "test2"
    }
]);
*/