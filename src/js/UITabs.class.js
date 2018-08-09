/* 

    element = HTMLElement
    currentTab = controlItem
    selectHandlers = {controlItem: callback }
*/
import { UIElement } from './UIController.class.js';
class UITabs extends UIElement{
    tabsList = [];
    props = {
        disableContent: false
    }
    constructor(params) {
        super(params); 
        $.extend(this.props, params.props);
        this.tabsList = [];
        this.element = params.element;
        this.$controls = $(this.element).find(".tabs__control__item");
        this.$content = null;
        this.currentTab = params.defaultTab || null;
        this.selectHandlers = params.selectHandlers || null;
        this.$contentItems = !this.props.disableContent ? $(this.element).find(".tabs__content") : null;
    }
    init() {
        console.log("TABS",this);
        if (!this.props.disableContent) {
            this.$controls.each((controlCounter, controlItem) => {
                let tabControlId = $(controlItem).data().tabControl;
                this.$contentItems.each((contentCounter, contentItem) => {
                    let tabContentId = $(contentItem).data().tabContent;
                    if (tabControlId == tabContentId) this.tabsList.push(new UITabsElement({
                        id: tabControlId,
                        control: $(controlItem),
                        content: $(contentItem),
                        controller: this
                    }));
                });
            });
        } else {
            this.$controls.each((controlCounter, controlItem) => {
                let tabControlId = $(controlItem).data().tabControl;
                this.tabsList.push(new UITabsElement({
                    id: tabControlId,
                    control: $(controlItem),
                    controller: this
                }));
            });
        }
        if (this.currentTab !== null) this.changeTab(this.currentTab);
        this.createKey(this.element, this);
        return this;
    }
    changeTab(id) {
        this.tabsList.forEach((item) => {
            if (item.id.indexOf(id) > -1) this._setTab(id, item.$control, item.$content);
        });
    }
    _setTab(id, $control, $content) {
        console.log(id, $control, $content);
        let activeClass = "tabs__control__item_is-active";
        if ($content != null) this.$contentItems.hide();
        this.$controls.removeClass(activeClass);
        this.tabsList.forEach((item) => {
            if (id != item.id) {
                if ($content != null) $content.show();
                $control.addClass(activeClass);
            }
        });
        this.currentTab = id;
    }
}

class UITabsElement {
    constructor(params) {
        this.id = params.id;
        this.$control = params.control;
        this.$content = params.content;
        this.controller = params.controller;
        this.$control.on("click", () => this.controller._setTab(this.id, this.$control, this.$content));
        if (params.controller.selectHandlers != null) this.$control.on("click", () => {
            let handler = params.controller.selectHandlers[this.id];
            if (handler) handler(this.id);
        });
    }
}

export { UITabs, UITabsElement };