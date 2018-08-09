// I NEED REFACTOR
class MiniCart {
  static update(data) {
    if ($(".mini-cart").length) {
      let cart = data.data.cart;
      if (cart.length > 6) this.miniCartList.customScroll();
      else this.miniCartList.customScroll('destroy');
      this.listItems.html(cart.map((item) => this.getTemplate(item)));
      if (cart.length > 0) $(".mini-cart__content").removeClass("hidden");
      else $(".mini-cart__content").addClass("hidden");
    }

  }
  static removeItem(item) {
    $(item).closest(".mini-cart__form-delete").submit().hide();
  }
  static init() {
    if ($(".mini-cart").length) {
      this.miniCartList = $(".mini-cart__content__list");
      this.listItems = $(".mini-cart__content__list__items");
      if (this.listItems.children().length >= 6) {
        this.miniCartList.customScroll();
      }
      this.listItems.on("click", ".mini-cart__form-delete", function () {
        let removedItemId = $(this).data("id");
        $("#" + removedItemId).hide();
      });
    }

  }
  static getTemplate(item, i) {
    return `
      <div class="mini-cart__content__list__item">
        <div class="mini-cart__content__list__item__el mini-cart__content__list__item__title">
          ${item.name}
        </div>
        <div class="mini-cart__content__list__item__el mini-cart__content__list__item__count">
          ${item.count} шт.
        </div>
        <div class="mini-cart__content__list__item__el mini-cart__content__list__item__price">
          ${item.cost} руб.
        </div>
        <form method="post" class="mini-cart__form-delete ms2_form">
          <input type="hidden" name="key" value="${item.key}">
          <button class="button button_round" type="submit" name="ms2_action" value="cart/remove">
            <div class="row-product__delete-button sprite sprite-cart-remove"></div>
          </button>
        </form>
      </div>
    `;
  }
}
export { MiniCart };