/*

Service.keywordInitElementId("slider",function () {
  var $slider = $(".slider");
  var $sliderItems = $slider.find(".slider__container__item");
  var $pointItems = $slider.find(".slider__container__points__item");
  var slideId = -1;
  var timer = null;
  var changeTimeout = null;
  var changeSlide = function (value, isSet) {
    if(isSet){
      slideId = value;
    } else {
      slideId += value;
      if(slideId >= $sliderItems.length) slideId = 0;
      if(slideId < 0) slideId = $sliderItems.length - 1;
    }
    $sliderItems.each(function (i, item) {
      if($(item).attr("data-slide") == slideId){
        $(item).show();
        $(item).addClass("slider__container__item_is-show");
      } else {
        $(item).removeClass("slider__container__item_is-show");
        setTimeout(function () {
          $(item).hide();
        },300);
      }
    });
    $pointItems.each(function (i, item) {
      if($(item).attr("data-slider-point") - 1 == slideId){
        $(item).addClass("slider__container__points__item_active");
      } else {
        $(item).removeClass("slider__container__points__item_active");
      }
    });
  };
  var arrowNavigate = function (params) {
    clearTimeout(changeTimeout);
    changeTimeout = setTimeout(function () {
      changeSlide(params.value, false);
      clearTimeout(timer);
      loop();
    },300);
  };
  var loop = function () {
    timer = setTimeout(function () {
      changeSlide(1,false);
      loop();
    },5000);
  };
  (function () {
    changeSlide(1);
    loop();
  })();

  $pointItems.on("click",function () {
    var pointId = $(this).attr("data-slider-point") - 1;
    clearTimeout(changeTimeout);
    changeTimeout = setTimeout(function () {
      changeSlide(pointId,true);
      clearTimeout(timer);
      loop();
    },300);

  });

  $(".slider__container__nav__item_left").on("click",function () {
    arrowNavigate({
      value: -1,
      element: $(this)
    });
  });
  $(".slider__container__nav__item_right").on("click",function () {
    arrowNavigate({
      value: 1,
      element: $(this)
    });
  });
});

*/
class MainPage{
  static init(){

  }
}
/*
Service.keywordInitElementId("review",function () {
  var review = $(".review");
  if(review.length){
    var reviewData = {};
    var reviewCurrentId = 0;
    var reviewText = review.find(".review-container__content__data__text"),
        reviewName = review.find(".js-review-name"),
        nextArrow = review.find(".review-container__arrow-right"),
        prevArrow = review.find(".review-container__arrow-left");
    var updateReview = function (value) {
      console.log(reviewCurrentId + " / " + reviewData.length);
      reviewCurrentId += value;
      if(reviewCurrentId >= reviewData.length) reviewCurrentId = 0;
      if(reviewCurrentId < 0) reviewCurrentId = reviewData.length - 1;
      var reviewItem = reviewData[reviewCurrentId];
      review.find(".review-container__content").css("opacity","0");
      setTimeout(function () {
        reviewText.html(reviewItem.text);
        reviewName.html(reviewItem.name);
        review.find(".review-container__content").css("opacity","1");
      },500);
    };
    $.post("/data/reviews.json").then(function(resp){
      reviewData = resp;
      updateReview(0);
    });
    nextArrow.on("click",function () {
      updateReview(1);
    });
    prevArrow.on("click",function () {
      updateReview(-1);
    });
  }
});
*/
/*
Service.keywordInitElementId("subscribe__form",function () {
  $(".subscribe__form").on("submit",function (e) {
    var $self = $(this);
    Feedback.sendSubscribe($self);
    e.preventDefault();
  });
});*/
