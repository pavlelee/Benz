angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, carService, $rootScope) {
  $scope.items = [];

  carService.lists().then(function (result) {
    $scope.items = result;
    console.log($scope.items);
  }, function (error) {
    $rootScope.quickNotify(error);
  })
})

.controller('ViewCtrl', function($scope, $stateParams, carService, cartService) {
  $scope.item = [];

  carService.car($stateParams.id).then(function (result) {
    cartService.setCar(result);
    $scope.item = cartService.cart;
    console.log($scope.item);
  }, function (error) {
    $rootScope.quickNotify(error);
  });

  $scope.reCalculate = function () {
    cartService.reCalculate();
    console.log(cartService.cart);
  }
})

.controller('SchemesCtrl', function($scope, cartService, $ionicHistory) {
  $scope.cart = cartService.cart;

  $scope.list = [
    { text: "延保两年", price: 6000, checked: true },
    { text: "两年轮胎险", price: 1888, checked: false }
  ];

  $scope.addScheme = function () {
    cartService.cart.schemes = [];
    cartService.cart.schemesCount = 0;
    angular.forEach($scope.list, function(value) {
      if(value.checked == true){
        cartService.addScheme(value);
      }
    });

    console.log(cartService.cart);
    cartService.reCalculate();
    $ionicHistory.goBack();
  }
})

.controller('GiftsCtrl', function($scope, cartService, $ionicHistory) {
  $scope.cart = cartService.cart;

  $scope.list = [
    { text: "3M 贴膜", price: 3888, checked: true },
    { text: "凯立德地图导航", price: 3000, checked: false }
  ];

  $scope.addGifts = function () {
    cartService.cart.gifts = [];
    cartService.cart.giftsCount = 0;
    angular.forEach($scope.list, function(value) {
      if(value.checked == true){
        cartService.addGift(value);
      }
    });

    console.log(cartService.cart);
    cartService.reCalculate();
    $ionicHistory.goBack();
  }
})

.controller('InsuranceCtrl', function($scope, cartService, $ionicHistory) {
  console.log(cartService.cart);
  $scope.cart = cartService.cart;

  var first = $scope.cart.car.price * 0.5;
  var per = Math.ceil(first/36);

  $scope.insurance = {
    "first": first,
    "month": 36,
    "scale": 50,
    "per_month_pay": per
  };

  $scope.changeScale = function () {
    $scope.insurance.first = Math.ceil($scope.cart.car.price * ($scope.insurance.scale/100));
    $scope.insurance.per_month_pay = Math.ceil(($scope.cart.car.price - $scope.insurance.first)/36);
  };

  $scope.setInsurance = function () {
    cartService.setInsurance($scope.insurance);

    console.log(cartService.cart);
    $ionicHistory.goBack();
  }
})

.controller('DetailCtrl', function($scope, cartService, $ionicHistory) {
  console.log(cartService.cart);
  $scope.cart = cartService.cart;
  

  $scope.changeScale = function () {
    $scope.insurance.first = Math.ceil($scope.cart.car.price * ($scope.insurance.scale/100));
    $scope.insurance.per_month_pay = Math.ceil(($scope.cart.car.price - $scope.insurance.first)/36);
  };

  $scope.setInsurance = function () {
    cartService.setInsurance($scope.insurance);

    console.log(cartService.cart);
    $ionicHistory.goBack();
  }
});
