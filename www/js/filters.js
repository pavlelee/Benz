/**
 * Created by 李鹏飞 on 2016/2/2.
 */
angular.module('starter.filters', [])
.filter('currency', ['$sce', function () {
  return function(s) {
    s = (s/100).toString();

    if (/[^0-9\.]/.test(s)){
      return "----"
    }

    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");

    var re = /(\d)(\d{3},)/;
    while (re.test(s)){
      s = s.replace(re, "$1,$2");
    }

    s = s.replace(/(\d*),(\d\d)$/, "$1");
    return '¥' + s.replace(/^\./, "0.");
  };
}]);
