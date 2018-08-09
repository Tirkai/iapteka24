var _Debug = (function () {
  $(document).ready(function () {
    if(localStorage.getItem("_debug_mark-edges") == "true"){
      _export.markEdges(localStorage.getItem("_debug_mark-edges"));
    }
  });
  var _export = {
    markEdges: function (state) {
      var selector = "*";
      if(state){
        $(selector).addClass("_mark-edges");
      } else {
        $(selector).removeClass("_mark-edges");
      }
      localStorage.setItem("_debug_mark-edges",state);
    }
  };
  return _export;
})();

class Debug{
  static log(...p){
    console.log(p);
  }
} 