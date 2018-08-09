var Validate = (function () {
  var patterns = {
    fio: /^[a-zA-Z]{3,7}$/,
    email: /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
    phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/
  };
  var _export = {
    bindHandler: function (items) {
      console.log(items);
      items.forEach(function (item) {
        $(item.element).on("blur",function () {
          $(this).attr("data-focused","true");
        });
      });
    },
    checkValid: function (items,callback) {
      var result = {
        totaly: false,
        conditions: []
      };
      items.forEach(function (item, i, arr) {
        var itemValue = $(item.element).val();
        var itemElement = $(item.element);
        var itemResult = false;
        if(item.condition == "pattern"){
          itemResult = patterns[item.pattern].test(itemValue) || (!item.required ? (itemValue == "") : false);
          result.conditions.push(itemResult);
        }
        //console.log(item.condition);
        if(item.condition == "length"){
          //console.log("length: /" + itemValue + "/ " + item.params.min + " " + item.params.max);
          itemResult = itemValue.length.toString() >= item.params.min && itemValue.length.toString() <= item.params.max;
          itemResult = itemResult || (!item.required ? (itemValue == "") : false);
          result.conditions.push(itemResult);
          //console.log("length res" + (itemValue >= item.params.min && itemValue <= item.params.max));
        }
        if(item.condition == "checked"){
          itemResult = $(item.element).prop("checked");
          result.conditions.push(itemResult);
        }
        if(itemResult && typeof item.success == "function") item.success(itemResult);
        else if(typeof item.error == "function" && $(itemElement).attr("data-focused")) item.error(itemResult);
        //console.log(result);
      });
      var countValidConditions = 0;
      result.conditions.forEach(function (item, i, arr) {
        if(item) countValidConditions++;
        //console.log(countValidConditions + " - " + result.conditions.length);
      });

      result.totaly = (countValidConditions == result.conditions.length);
      if(result.totaly) callback.success();
      else callback.error();
    }
  };
  return _export;
}());

/*

[
{
 element: "#order_fio_input",
 condition: "pattern",
 pattern: "email",
 success: ""
}
]
*/
