class Service {
  static defaultValue(value, def) {
    return value != undefined ? value : (def != undefined ? def : null);
  }
  static checkPageUrl(page) {
    return location.pathname.indexOf(page) > -1;
  }
  static initComponent(id, callback) {
    $(document).ready(function () {
      if ($("." + id).length) {
        Debug.log(callback, `Inited ${id}`, this);
        callback();
      }

    });
  }
  static getQueryParams() {
    let params = location.search.replace("?","").split("&");
    let result = {};
    params.map((item) => {
      let pair = item.split("=");
      result[pair[0]] = pair[1];
    });
    return result;
  }
  static randomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  static keywordInitElementId(keyword, callback) {
    $(document).ready(function () { 
      if ($("." + keyword).length) callback();
    });
  }
  static generateKey(length = 16) {
    let key = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) key += possible.charAt(Math.floor(Math.random() * possible.length));
    return key;
  }
  static getUnixTime() {
    return Math.round(new Date().getTime() / 1000);
  }
  static scoped(callback) {
    return callback();
  }
  static letterCase(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
export {
  Service
};