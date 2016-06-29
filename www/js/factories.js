/**
 * Created by 李鹏飞 on 2016/6/29.
 */
angular.module('starter.factories', [])
.factory('localStorage', ['$window', function($window) {
  var getPrefixKey = function (key) {
    return 'CourierPickUp.local.' + key;
  };

  return {
    set: function(key, value) {
      $window.localStorage[getPrefixKey(key)] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[getPrefixKey(key)] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[getPrefixKey(key)] = JSON.stringify(value);
    },
    getObject: function(key, defaultValue) {
      defaultValue = defaultValue ? defaultValue : {};
      if($window.localStorage[getPrefixKey(key)]){
        var data =  JSON.parse($window.localStorage[getPrefixKey(key)]);
        return angular.extend(data, defaultValue);
      }else{
        return defaultValue;
      }
    }
  }
}]);
