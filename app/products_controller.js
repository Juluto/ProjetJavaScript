angular.module('shop').controller('ProductsController', ['$scope', 'Product', function($scope, Product){
  $scope.product = new Product({name: 'toto', description: 'coucou', price: '5'});
}]);