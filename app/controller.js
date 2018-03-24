angular.module('myApp').controller('buyAction', ['$scope', '$http', function ($scope, $http) {

    $scope.searchAction = function () {
        $http.get("http://localhost:3000/stock/" + $scope.searchBar).then(successCallBack, errorCallBack);
        function successCallBack(response) {
            if (response.data.statusCode == 404) {
                $("#tableBuy").hide();
                $scope.name = $scope.searchBar;
                $("#notFoundBuy").show();
            } else {
                $("#notFoundBuy").hide();
                $scope.nameFound = response.data.body.symbol;
                $scope.price = response.data.body.delayedPrice;
                priceBuy = $scope.price;
                quantityBuy = 1;
                $("#numberBuy").val(1);
                $("#totalBuy").append($scope.price + " $");
                $("#tableBuy").show();
            }
        }
        function errorCallBack(error) {
            console.log(error);
        }
    }

    $scope.buyAction = function () {
        quantityBuy = parseInt(quantityBuy);
        var data = {
            'name': $scope.nameFound,
            'quantity': quantityBuy
        };
        $http.post("http://localhost:3000/buyAction", data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            window.location.reload();
        }, function error(error) {
            console.log(error);
        });
    }
}]);