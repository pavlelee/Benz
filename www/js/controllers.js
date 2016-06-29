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

  $scope.list = {
    1: {text: "延保两年", price: 6000, checked: true},
    2: {text: "两年轮胎险", price: 1888, checked: false}
  };

  angular.forEach($scope.list, function(value, key) {
    if($scope.cart.schemes[key] && $scope.cart.schemes[key].checked == true){
      $scope.list[key].checked = true;
    }
  });

  $scope.addScheme = function () {
    cartService.cart.schemes = [];
    cartService.cart.schemesCount = 0;
    angular.forEach($scope.list, function(value, key) {
      if(value.checked == true){
        cartService.addScheme(key, value);
      }
    });

    console.log(cartService.cart);
    cartService.reCalculate();
  };

  $scope.goBack = function () {
    $ionicHistory.goBack();
  };

  $scope.addScheme();
})

.controller('GiftsCtrl', function($scope, cartService, $ionicHistory) {
  $scope.cart = cartService.cart;

  $scope.list = {
    1: {text: "3M 贴膜", price: 3888, checked: true},
    2: {text: "凯立德地图导航", price: 3000, checked: false}
  };

  angular.forEach($scope.list, function(value, key) {
    if($scope.cart.gifts[key] && $scope.cart.gifts[key].checked == true){
      $scope.list[key].checked = true;
    }
  });

  $scope.addGifts = function () {
    cartService.cart.gifts = [];
    cartService.cart.giftsCount = 0;
    angular.forEach($scope.list, function(value, key) {
      if(value.checked == true){
        cartService.addGift(key, value);
      }
    });

    console.log(cartService.cart);
    cartService.reCalculate();
  };

  $scope.goBack = function () {
    $ionicHistory.goBack();
  };

  $scope.addGifts();
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
})

.controller('FinancialCtrl', function($scope, cartService, $ionicPopover, $ionicHistory) {
  $scope.cart = cartService.cart;
  $scope.data = [];

  cartService.getFinancial().then(function (result) {
    $scope.data = result;
    $scope.init();
  });
  
  $scope.init = function () {
    if(!$scope.isEmptyObject($scope.cart.financial.items)){
      angular.forEach($scope.cart.financial.items, function(value, key) {
        $scope.data.items[key].checked = true;
      });
    }else{
      angular.forEach($scope.data.items, function(value) {
        value.checked = true;
      });
    }

    $scope.checkItem();
  };

  $scope.checkItem = function () {
    $scope.cart.financialCount = 0;
    $scope.cart.financial.items = {};
    angular.forEach($scope.data.items, function(value, key) {
      if(value.checked == true){
        $scope.cart.financial.items[key] = {
          "text": value.text,
          "price": value.price,
          "badge": value.badge
        };

        $scope.cart.financialCount = parseInt($scope.cart.financialCount) + parseInt(value.price);
      }
    });

    console.log($scope.cart);
  };

  $scope.isEmptyObject = function (obj){
    for(var n in obj){
      return false
    }

    return true;
  };

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event, value) {
    $scope.check = value;
    $scope.popover.show($event);
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.checkBadge = function (value, popover) {
    value.badge = popover.badge;
    value.price = popover.price;

    $scope.checkItem();
    $scope.closePopover();
  };

  $scope.goBack = function () {
    $ionicHistory.goBack();
  };
});
