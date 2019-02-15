
//import 'Source/css/bundle.less';
import { Config, DefineConst } from './config.js';
import { Service } from './Service.class.js';
import { Debug } from './Debug.class.js';
import { UIController, UIElement } from './UIController.class.js';
import { UIHelpers } from './UIHelpers.class.js';
import { UICounter } from './UICounter.class.js';
import { UICheckboxController, UICheckbox } from './UICheckbox.class.js';
import { UISelect, UISelectOption } from './UISelect.class.js';
import { UISearch } from './UISearch.class.js';
import { UITabs, UITabsElement } from './UITabs.class.js';
import { UIPreloader } from './UIPreloader.class.js';
import { UICarousel, UISlideElement } from './UICarousel.class.js';
import { Overlay } from './Overlay.class.js';
import { Toast } from './Toast.class.js';
import { YandexMapApi, Map } from './YandexMapApi.class.js';
import { WindowState } from './WindowState.class.js';
import { Distance } from './Distance.class.js';
import { CatalogSearchController, CatalogSearchElement } from './CatalogSearchController.class.js';
import { Promo } from './Promo.class.js';
import { Cart } from './Cart.class.js';
import { CartProduct } from './CartProduct.class.js';
import { GeographyOrder, GeographyOrderProductsList } from './GeographyOrder.class.js';
import { GeoCheckout } from './GeoCheckout.class.js';
import { OrderStage } from './OrderStage.class.js';
import { Thanks } from './Thanks.class.js';
import { ProductPage } from './ProductPage.class.js';
import { OpticsController, OpticsElement, Lenses, Glasses } from './Optics.class.js';
import { FeedbackController, FeedbackForm, FeedbackBinding } from './FeedbackController.class.js';
import { MainTemplate } from './MainTemplate.class.js';
import { Catalog } from './Catalog.class.js';
import { MiniCart } from './MiniCart.class.js';
import { GeoNetwork } from './GeoNetwork.class.js';
import { PharmacyPage } from './PharmacyPage.class.js';
import { Speller } from './Speller.class.js';
import { PharmacyInfo } from './PharmacyInfo.class.js';
import { FindPharmacy } from './FindPharmacy.class.js';
import { AnalyticsController, AnalyticsCounter, AnalyticsTarget } from './Analytics.class.js';
import { AuthController, AuthView, AuthFrameItem } from './Auth.class.js';
import { CustomScrollController } from './CustomScrollController.class.js';
import { FancyboxController } from './FancyboxController.class.js';
import { WavesEffectController } from './WavesEffectController.class.js';
import { Init } from './Init.class.js';
class AppController{
    static modules = [];
    static init(){
        this.globalDefine([
            {name: "Config", module: Config},
            {name: "DefineConst", module: DefineConst},
            {name: "Service", module: Service},
            {name: "Debug", module: Debug},
            {name: "UIController", module: UIController},
            {name: "UIElement", module: UIElement},
            {name: "UIHelpers", module: UIHelpers},
            {name: "UICounter", module: UICounter},
            {name: "UICheckboxController", module: UICheckboxController},
            {name: "UICheckbox", module: UICheckbox},
            {name: "UISelect", module: UISelect},
            {name: "UISelectOption", module: UISelectOption},
            {name: "UISearch", module: UISearch},
            {name: "UITabs", module: UITabs},
            {name: "UITabsElement", module: UITabsElement},
            {name: "UIPreloader", module: UIPreloader},
            {name: "UICarousel", module: UICarousel},
            {name: "UISlideElement", module: UISlideElement},
            {name: "Overlay", module: Overlay},
            {name: "Toast", module: Toast},
            {name: "Distance", module: Distance},
            {name: "WindowState", module: WindowState},
            {name: "YandexMapApi", module: YandexMapApi},
            {name: "Map", module: Map},
            {name: "CatalogSearchController", module: CatalogSearchController},
            {name: "CatalogSearchElement", module: CatalogSearchElement},
            {name: "Promo", module: Promo},
            {name: "Cart", module: Cart},
            {name: "CartProduct", module: CartProduct},
            {name: "GeographyOrder", module: GeographyOrder},
            {name: "GeographyOrderProductsList", module: GeographyOrderProductsList},
            {name: "GeoCheckout", module: GeoCheckout},
            {name: "OrderStage", module: OrderStage},
            {name: "Thanks", module: Thanks},
            {name: "ProductPage", module: ProductPage},
            {name: "OpticsController", module: OpticsController},
            {name: "OpticsElement", module: OpticsElement},
            {name: "Lenses", module: Lenses},
            {name: "Glasses", module: Glasses},
            {name: "FeedbackController", module: FeedbackController},
            {name: "FeedbackForm", module: FeedbackForm},
            {name: "FeedbackBinding", module: FeedbackBinding},
            {name: "MainTemplate", module: MainTemplate},
            {name: "Catalog", module: Catalog},
            {name: "MiniCart", module: MiniCart},
            {name: "GeoNetwork", module: GeoNetwork},
            {name: "PharmacyPage", module: PharmacyPage},
            {name: "FindPharmacy", module: FindPharmacy},
            {name: "Speller", module: Speller},
            {name: "PharmacyInfo", module: PharmacyInfo},
            {name: "AnalyticsController", module: AnalyticsController},
            {name: "AnalyticsCounter", module: AnalyticsCounter},
            {name: "AnalyticsTarget", module: AnalyticsTarget},
            {name: "AuthController", module: AuthController},
            {name: "AuthView", module: AuthView},
            {name: "AuthFrameItem", module: AuthFrameItem},
            {name: "CustomScrollController", module: CustomScrollController},
            {name: "FancyboxController", module: FancyboxController},
            {name: "WavesEffectController", module: WavesEffectController},
            {name: "Init", module: Init}
        ])
    }
    static globalDefine(modules){
        for(let item of modules){
            global[item.name] = item.module;
            this.modules[item.name] = item.module;
        }
        console.log(this.modules);
    }
}
AppController.init();
export { AppController };