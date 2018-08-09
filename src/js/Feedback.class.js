/*
class Feedback {
  static showPopup(params) {
    $.fancybox.open({
      src: "#popup_feedback_" + params.action,
      type: "inline"
    });
  }
  static sendFeedback(event) {
    event.preventDefault();
    let query = "msg_action=" + $(event.target).attr("data-action") + "&" + $(event.target).serialize();
    $.post(Config.endpoints.feedback, query).then(function (resp) {
      resp = JSON.parse(resp);
      if (resp.status == "success") $.fancybox.close();
      setTimeout(function () {
        console.log(resp);
        Toast.createToast({ content: resp.message, type: resp.status });
      }, 300);
    });
  }
  static sendRate(event) {
    let query = "msg_action=score&value=" + $(self).attr("data-feedback-rate") + "&id=" + $(self).attr("data-feedback-rate");
    $.post(Config.endpoints.feedback, query).then(function (resp) {
      console.log(resp);
    });
  }
  static sendSubscribe(event) {
    let query = "msg_action=subscribe&" + $(self).serialize();
    $.post(Config.endpoints.feedback, query).then(function (resp) {
      $(event).html(`
        <span class="highlight-text_green">${Config.strings.feedbackSubscribe}</span>
      `);
    });
  }
  static init() {
    $(".js-popup-feedback-action").each((i, item) => {
      $(item).on("submit", (event) => Feedback.sendFeedback(event));
    });
    $(".js-feedback-rate").on("click", function () {
      Feedback.sendRate($(this));
    });
    $(".js-popup-feedback-show").on("click",function () {
      Feedback.showPopup({action: $(this).attr("data-action")});
    });
  }
}

//Feedback.init();

*/