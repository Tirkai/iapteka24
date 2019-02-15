import { UISearch } from './UISearch.class.js';
import { GeoCheckout } from './GeoCheckout.class.js';
const CS_DEFAULT = "CS_DEFAULT";
const CS_NOTFOUND = "CS_NOTFOUND";
const CS_LIST = "CS_LIST";



class CatalogSearchController {
    search = null;
    static init() {
        this.search = new CatalogSearchElement({
            element: $(".search-form__search-field"),
            input: $(".search-form .search-field__input")
        }).init();
    }
}

class CatalogSearchElement extends UISearch {
    _state = CS_DEFAULT;
    _inputDelayTimeout = null;
    _isLoading = false;
    minQueryLength = 3;
    overlayElement = $(".search-overlay");
    get state(){ return this._state; }
    get isLoading(){ return this._isLoading; }
    set isLoading(value){
        this._isLoading = value;
        if(value) this.preloader.show();
        else this.preloader.hide();
    }
    set state(value){
        this._state = value;
        return this.state;
    }
    constructor(params){
        super(params);    
    }
    createdHandler = () => {
        this.render(this.getTemplate(CS_DEFAULT));
        this.queryKey = $(this.element).data().key;
        this.pageId = mse2FormConfig[this.queryKey].pageId;
        $(this.input).on("input",() => {
            this.createSearchRequest($(this.input).val(), this.updateLiveSearch.bind(this));
        });
        this.preloader = new UIPreloader({
            container: $(".search-form__search-field__preloader"),
            hideDelay: 1000
        }).init();
    };
    focusHandler = () => {
        this.overlayElement.show();
        UIHelpers.scrollLock(true);
    }
    blurHandler = () => {
        this.overlayElement.hide();
        //setTimeout(() => this.render(this.getTemplate(CS_DEFAULT)), 300);
        UIHelpers.scrollLock(false);
    }
    render(value) {
        $(this.liveElement).html(value);
    }
    createSearchRequest(query, callback){
        if(query.length < this.minQueryLength) return false;
        clearTimeout(this._inputDelayTimeout);
        this._inputDelayTimeout = setTimeout(() => {
            this.isLoading = true;
            Debug.log(this, "Create Search Request", this);
            $.post(Config.dataRequest.msearch2,{
                action: "search",
                key: this.queryKey,
                pageId: this.pageId,
                query: query,
                cityKey: GeoCheckout.geoData.cityKey
            }).then((resp) => {
                Debug.log([query, JSON.parse(resp)], "Search Database Response", this);
                callback(query, resp);
                this.isLoading = false;
            }).catch((e) => {
                console.warn("SEARCH ", e);
            });
        },300);
        
    }
    setInputQuery(value){
        $(this.input).val(value);
        $(this.input).trigger("input");
        this.focusOnInput();
        //this.createSearchRequest(value, this.updateLiveSearch.bind(this));
    }
    updateLiveSearch(query, value) {
        let data = JSON.parse(value).data;
        Debug.log(data, "Update Live Search Data", this);
        if (data.results.length) {
            this.render(data.results.map((item) => this.getTemplate(CS_LIST, item)));
            this.state = CS_LIST;
        } else {
            this.render(this.getTemplate(CS_NOTFOUND));
            this.state = CS_NOTFOUND;
            Speller.checkText(query, (spellerResponse) => {
                Debug.log(spellerResponse, "Speller Response", this);
                this.createSearchRequest(spellerResponse.result, (searchQuery, searchResponse) => {
                    if(JSON.parse(searchResponse).data.results.length){
                        Debug.log(spellerResponse.result, "Speller Result", this);
                        this.render(this.getTemplate(CS_NOTFOUND, spellerResponse.result));  
                    };
                });
            })
        }
    }
    focusOnInput() {
        setTimeout(() => this.input.focus().focus(), 300);
    }
    getTemplate(type, item = null) {
        switch (type) {
            case CS_LIST:
                {
                    return `
                    <div class="search-field__live-search__item">
                        <a href="${item.url || '#'}" class="justify-between">
                            <div class="justify-start align-center">
                                <div class="search-field__live-search__item__picture">
                                    <img src="${item.image || '/assets/components/minishop2/img/web/ms2_small.png'}">
                                </div>
                                <div class="search-field__live-search__item__title">
                                    ${item.value || null} 
                                </div>
                            </div>
                            <div class="align-center">
                                <div class="search-field__live-search__item__price">
                                ${  item.price > 0 ?
                                    `<div class="search-field__live-search__item__price__value">от ${item.price} руб</div>` :
                                    `<div class="search-field__live-search__item__price__notfound">Нет в наличии</div>`
                                }
                                
                                </div>
                            </div>
                        </a>   
                    </div> 
                `
                }
            case CS_NOTFOUND:
                {
                    return `
                    <div class="search-field__live-search__not-found">
                        <div class="search-field__live-search__not-found__item">
                            По вашему запросу ничего не найдено
                        </div>
                        <div class="${item == null ? 'hidden ': ''}highlight-links search-field__live-search__not-found__item">
                            Возможно вы имели ввиду
                            <a onClick="CatalogSearchController.search.setInputQuery('${item}')">${item}</a>?
                        </div>
                        <div class="search-field__live-search__not-found__item">
                            <div class="ex-10">Не можете найти нужный товар?</div>
                            <div style="font-size: 30px" class="ex-10">
                                +7 (4842) <span class="highlight-text_bold">56-27-88</span> 
                            </div>
                            <div class="ex-10">
                                Позвоните нам, и мы поможем! Круглосуточно
                            </div>
                        </div>
                        
                    </div>
                `
                }
            case CS_DEFAULT:
                {
                    return `
                <div class="search-field__live-search__item justify-start align-center">
                    <div class="search-field__live-search__item__title">
                        Введите поисковый запрос
                    </div>
                </div>     
                `
                }
        }
    }
}
export { CatalogSearchController, CatalogSearchElement };