import { GeoCheckout } from "./GeoCheckout.class";

class MainTemplate {
  static init() {
    this.inputPhoneMask();
    this.pinSearchForm();
    this.mobileMenu();
    this.mobileExpander();
    this.mobileSearchButton();
    this.bindSearchButton();
  }
  static inputPhoneMask() {
    let selector = "input[name='phone'],.mask-phone";
    Inputmask({
      "mask": "+7 (999) 999-99-99"
    }).mask(selector);
  }
  static pinSearchForm() {
    /*
    let $window = $(window);
    let $searchForm = $(".search-form");
    let $searchField = $searchForm.find(".search-field");
    let currentOffset = 0;
    console.log($searchForm[0]);
    if ($searchForm[0]) {
      let primaryOffset = $searchForm.offset().top;
      let pinHeaderOnScroll = function () {

        //console.log(`currentOffset: ${currentOffset}, primaryOffset: ${primaryOffset}, bool: ${$window.scrollTop() >= currentOffset}`);
        currentOffset = $searchForm.offset().top;
        if ($window.scrollTop() > primaryOffset) {
          $searchForm.addClass("search-form_is-pinned");
          $searchField.addClass("search-field_grey");
        } else if ($window.scrollTop() < primaryOffset) {
          $searchForm.removeClass("search-form_is-pinned");
          $searchField.removeClass("search-field_grey");
        }
      }
       
    }
    
    $(window).on("scroll", pinHeaderOnScroll);
    $(window).trigger("scroll");
    */
  }
  static bindSearchButton() {
    $(".search-form__search-field__search-button").on("click", () => {
        window.location.href = '/catalog/?query=' + $(".search-field__input").val() + '&cityKey=' + GeoCheckout.geoData.cityKey;
    });
  }
  static mobileMenu() {
    let menuOpened = false;
    let $menuElement = $(".mobile-menu");
    let $backButton = $(".js-mobile-menu-back");
    let changeState = function () {
      menuOpened = !menuOpened;
      UIHelpers.scrollLock(menuOpened);
      if (menuOpened) {
        $menuElement.addClass("mobile-menu_is-enabled");
        //Overlay.show(changeState);
      } else {
        $menuElement.removeClass("mobile-menu_is-enabled");
        //Overlay.hide(changeState);
      }
    }
    $(".js-mobile-menu").on("click", changeState);
    $(".js-mobile-menu-back").on("click", changeState);
  }
  static mobileExpander() {
    //Често хз что это. Я уже не помню.
    $(".mobile-expander").each(function () {
      let isShow = false;
      let $item = $(this);
      let changeExpanderState = function () {
        isShow = !isShow;
        let selector = $(this).data().target;
        $("#" + selector).css({
          display: isShow ? "block" : "none"
        });
        $item.find(".sprite").css({
          transform: isShow ? "rotate(180deg)" : "rotate(0deg)"
        });
      };
      $(this).on("click", changeExpanderState);
    });
  };
  static mobileSearchButton() {
    let isShow = false;
    let changeState = function () {
      isShow = !isShow;
      if (isShow) {
        CatalogSearchController.search.focusOnInput();
        $(".search-form").addClass("search-form_visible");
        Overlay.show(changeState);
      } else {
        $(".search-form").removeClass("search-form_visible");
        Overlay.hide();
      }

    }
    $(".js-mobile-search").on("click", changeState);
  }
}
MainTemplate.init();
export {
  MainTemplate
};