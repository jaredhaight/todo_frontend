'use strict';
var login = angular.module('loginCheck',[]).
factory('$logincheck', function(){
  return function(token){
      if (token) return true;
      return false;
      };
});

// Declare app level module which depends on filters, and services
angular.module('todojs', ['todojs.filters', 'todojs.directives','todoListSvc', 'ngCookies', 'loginCheck']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: loginCtrl});
    $routeProvider.when('/list', {templateUrl: 'partials/todolist.html', controller: todoListCtrl});
    $routeProvider.when('/user/:username', {templateUrl: 'partials/userlist.html', controller: userListCtrl});
    $routeProvider.when('/logout', {templateUrl: 'partials/login.html', controller: logoutCtrl});
    $routeProvider.otherwise({redirectTo: '/list'});
  }]).run(function($logincheck, $location, $cookieStore){
        var token = $cookieStore.get('token');
        var path = $location.path();
        console.log(path);
        if ($logincheck(token) && path == '/login') {
          var user = $cookieStore.get('username');
          console.log($location.path());
          $location.path('/user/'+user);
        }
        if (path == '/logout') {
            $cookieStore.remove('token');
            $cookieStore.remove('username');
            $location.path('/login');
        }
        if (!($logincheck(token))) {
            $location.path('/login')
        }
      });
