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
                $("#totalBuy").empty();
                $("#totalBuy").append($scope.price + " $");
                $("#tableBuy").show();
            }
        }
        function errorCallBack(error) {
            console.log(error);
        }
    }

    $scope.buyAction = function () {
        var actionAlreadyBuy = false;
        var quantityAlreadyBuy;
        quantityBuy = parseInt(quantityBuy);
        var data = {
            'name': $scope.nameFound,
            'quantity': quantityBuy
        };

        $http.get("http://localhost:3000/buyAction/").then(successCallBack, errorCallBack);
        function successCallBack(response) {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].name === $scope.nameFound) {
                    actionAlreadyBuy = true;
                    quantityAlreadyBuy = response.data[i].quantity;
                }
            }
            if (actionAlreadyBuy) {
                var dataModified = {
                    'name': $scope.nameFound,
                    'quantity': quantityBuy + quantityAlreadyBuy
                };
                $http.put("http://localhost:3000/buyAction", dataModified, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(function (response) {
                    window.location.reload();
                }, function error(error) {
                    console.log(error);
                });
            } else {
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
        }
        function errorCallBack(error) {
            console.log(error);
        }
    }
}]);

angular.module('myApp').controller('listAction', ['$scope', '$http', function ($scope, $http) {

    $scope.Action = {};

    $http.get("http://localhost:3000/buyAction/").then(successCallBack, errorCallBack);
    function successCallBack(response) {
        for (let i = 0; i < response.data.length; i++) {
            $http.get("http://localhost:3000/stock/" + response.data[i].name).then(success, error);
            function success(stock) {
                response.data[i].price = stock.data.body.delayedPrice;
                response.data[i].totalAction = stock.data.body.delayedPrice * response.data[i].quantity;
            }
            function error(error) {
                console.log(error);
            }
        }
        $scope.Action = response.data;
    }
    function errorCallBack(error) {
        console.log(error);
    }
}]);