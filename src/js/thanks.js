Service.keywordInitElementId("stages__thanks",function () {
  $(".js-feedback-rate").on("click",function () {
    $(".stages__thanks__rate").hide();
    $(".stages__thanks__feedback").show();
/*
    $(".js-rate-feedback-form").on("submit",function (e) {
      e.preventDefault();
      $.post("/endpoints/feedback.php", {
        msg_action: "feedback",
        comment: $(".stages__thanks__feedback__textarea").val()
      }).then(function(resp){
        $(".js-rate-feedback-form").html("Спасибо за ваш отзыв!");
      });
    });
*/
  });
});
