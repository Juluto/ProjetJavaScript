angular.module('shop').service('Product', [function() {
  var Product = function(data) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
  }
  return Product;
}]);
