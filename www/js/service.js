/**
 * Created by 李鹏飞 on 2016/1/15.
 */
angular.module('starter.services', [])

.service('carService', function ($q, $http) {

  this.lists = function(){
    var defer = $q.defer();

    $http.get('/data/cars.json').success(function(results) {
      defer.resolve(results);
    }).error(function(error) {
      defer.reject('获取数据失败：'+ error);
    });

    return defer.promise;
  };

  this.car = function(id){
    var defer = $q.defer();

    $http.get('/data/cars.json').success(function(results) {
      defer.resolve(results[id]);
    }).error(function(error) {
      defer.reject('获取数据失败：'+ error);
    });

    return defer.promise;
  };
})

.service('cartService', function ($q, $http) {
  this.cart = {
    "car": null,
    "schemes": [],
    "schemesCount": 0,
    "gifts": [],
    "giftsCount": 0,
    "insurance": null,
    "financial": null,
    "count": 0,
    "preferential": 0
  };

  /**
   * 设置车辆
   * @param car
   */
  this.setCar = function(car){
    this.cart.car = car;
  };

  /**
   * 添加经销商方案
   * @param val
   */
  this.addScheme = function(val){
    this.cart.schemesCount = parseInt(this.cart.schemesCount) + parseInt(val.price);
    this.cart.schemes.push(val);
  };

  /**
   * 添加精品选配
   * @param val
   */
  this.addGift = function(val){
    this.cart.giftsCount = parseInt(this.cart.giftsCount) + parseInt(val.price);
    this.cart.gifts.push(val);
  };

  /**
   * 商业保险
   * @param val
   */
  this.setInsurance = function(val){
    this.cart.insurance = val;
    this.reCalculate();
  };

  /**
   * 设置金融方案
   * @param val
   */
  this.setFinancial = function(val){
    this.cart.financial = val;
  };

  /**
   * 重新计算
   */
  this.reCalculate = function () {
    this.cart.count = 0;

    if(this.cart.schemesCount){
      this.cart.count += parseInt(this.cart.schemesCount);
    }

    if(this.cart.giftsCount){
      this.cart.count += parseInt(this.cart.giftsCount);
    }

    if(this.cart.insurance){
      this.cart.count += parseInt(this.cart.insurance.first);
    }

    if(this.cart.preferential){
      this.cart.count -= parseInt(this.cart.preferential);
    }
  }
});
