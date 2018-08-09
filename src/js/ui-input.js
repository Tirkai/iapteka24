/*
if(false){

  Service.keywordInitElementId("select-element", function(){
    let $selects = $(".select-element");
    $selects.each(function(i,item){
      let selectValue = function(value){
        $native.val(value);
        $header.find("span").html(value);
        $(item).attr({"data-select":value});
        showContent(false);
      }
      let showContent = function(value){
        isShow = value;
        $content.css({"display": (isShow ? "block" : "none")});
      }
      let isShow = false;
      let $native = $(item).find(".select-element__native");
      let $header = $(item).find(".select-element__header");
      let $content = $(item).find(".select-element__content");
      let contentTemplate = "";
      $(this).on("click",".select-element__option",function(){
        selectValue($(this).data("value"));
      });
      $(this).on("click",".select-element__header",function(){
        showContent(true);
      });
      $(document).on("click",function(e){
        console.log($(e.target).parent() == $(item));
      });
      $native.children().each(function(i,item){
        contentTemplate += (`
          <div class="select-element__option" data-key="${i}" data-value="${$(item).attr("value")}">
            ${$(item).attr("value")}
          </div>
        `);
      });
      $content.html(contentTemplate);
    });
  });

} 

*/

/* if($(this).hasClass("select-element")){
  return $(this).find(".select-element__native").val();
} */ 