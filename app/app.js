//create a module myApp
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:"index.html",
        controller:'mainCtrl'
    })
    .otherwise({
        redirectTo: "/"
    });
});