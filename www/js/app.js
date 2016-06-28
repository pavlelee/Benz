// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filters'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $window) {

  /**
   * 显示信息
   * @param text
   */
  $rootScope.show = function(text) {
    $rootScope.loading = $ionicLoading.show({
      template: text ? text : 'Loading...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 500,
      showDelay: 0
    });
  };

  /**
   * 隐藏信息
   */
  $rootScope.hide = function() {
    $ionicLoading.hide();
  };

  /**
   * 长提示
   * @param text
   */
  $rootScope.longNotify = function(text) {
    $rootScope.show(text);
    $window.setTimeout(function() {
      $rootScope.hide();
    }, 2999);
  };

  /**
   * 短提示
   * @param text
   */
  $rootScope.quickNotify = function(text) {
    $rootScope.show(text);
    $window.setTimeout(function() {
      $rootScope.hide();
    }, 999);
  };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('home', {
    url: '/home',
    views: {
      'main': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('view', {
    url: '/view/:id',
    views: {
      'main': {
        templateUrl: 'templates/view.html',
        controller: 'ViewCtrl'
      }
    }
  })
  .state('schemes', {
    url: '/schemes',
    views: {
      'main': {
        templateUrl: 'templates/schemes.html',
        controller: 'SchemesCtrl'
      }
    }
  })
  .state('gifts', {
    url: '/gifts',
    views: {
      'main': {
        templateUrl: 'templates/gifts.html',
        controller: 'GiftsCtrl'
      }
    }
  })
  .state('insurance', {
    url: '/insurance',
    views: {
      'main': {
        templateUrl: 'templates/insurance.html',
        controller: 'InsuranceCtrl'
      }
    }
  })
  .state('detail', {
    url: '/detail',
    views: {
      'main': {
        templateUrl: 'templates/detail.html',
        controller: 'DetailCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});