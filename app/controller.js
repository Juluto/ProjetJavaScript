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
        var priceAlreadyBuy;
        quantityBuy = parseInt(quantityBuy);
        priceBuy = parseFloat(priceBuy);
        var data = {
            'name': $scope.nameFound,
            'quantity': quantityBuy,
            'price': priceBuy
        };

        $http.get("http://localhost:3000/buyAction/").then(successCallBack, errorCallBack);
        function successCallBack(response) {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].name === $scope.nameFound) {
                    actionAlreadyBuy = true;
                    quantityAlreadyBuy = response.data[i].quantity;
                    priceAlreadyBuy = response.data[i].price;
                }
            }
            if (actionAlreadyBuy) {
                var dataModified = {
                    'name': $scope.nameFound,
                    'quantity': quantityBuy + quantityAlreadyBuy,
                    'price': priceBuy + priceAlreadyBuy
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
    $scope.OneAction = {};

    $http.get("http://localhost:3000/buyAction/").then(successCallBack, errorCallBack);
    function successCallBack(response) {
        for (let i = 0; i < response.data.length; i++) {
            $http.get("http://localhost:3000/stock/" + response.data[i].name).then(success, error);
            function success(stock) {
                response.data[i].benefice = (response.data[i].quantity * stock.data.body.delayedPrice) - (response.data[i].price * response.data[i].quantity);
                if (response.data[i].benefice > 0) {
                    response.data[i].benefice = "+" + response.data[i].benefice;
                    $("#benefice" + response.data[i].name).css('color', 'green');
                } else if (response.data[i].benefice == 0) {
                    $("#benefice" + response.data[i].name).css('color', 'black');
                } else if (response.data[i].benefice < 0) {
                    $("#benefice" + response.data[i].name).css('color', 'red');
                }
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


    $scope.seeAction = function () {
        $http.get("http://localhost:3000/action/" + this.x.name).then(successCallBack, errorCallBack);
        function successCallBack(response) {
            console.log(response);
            $http.get("http://localhost:3000/nameAction/" + response.data[0].name).then(successCallBack, errorCallBack);
            function successCallBack(responseNameAction) {
                $scope.name = responseNameAction.data.body.companyName;
            }
            function errorCallBack(error) {
                console.log(error);
            }
            $scope.symbol = response.data[0].name;
            $scope.quantity = response.data[0].quantity;
            $scope.ownBuy = response.data[0].price + " $";
            $http.get("http://localhost:3000/stock/" + response.data[0].name).then(successPriceAction, errorPriceAction);
            function successPriceAction(responsePriceAction) {
                $scope.price = responsePriceAction.data.body.delayedPrice + " $";
                $("#gain").empty();
                $("#gain").append(responsePriceAction.data.body.delayedPrice + " $");
                priceSell = responsePriceAction.data.body.delayedPrice;
                $scope.gainTotal = response.data[0].quantity * responsePriceAction.data.body.delayedPrice + " $";
                $scope.benefice = responsePriceAction.data.body.delayedPrice - (response.data[0].price / 1) + " $";
                $scope.beneficeTotal = (response.data[0].quantity * responsePriceAction.data.body.delayedPrice) - (response.data[0].price * response.data[0].quantity) + " $";
                priceBenefice = response.data[0].price;
                benefice = responsePriceAction.data.body.delayedPrice - response.data[0].price;
                if (benefice > 0) {
                    $scope.benefice = "+" + $scope.benefice;
                    $("#benefice").css('color', 'green');
                } else if (benefice == 0) {
                    $("#benefice").css('color', 'black');
                } else if (benefice < 0) {
                    $("#benefice").css('color', 'red');
                }
                beneficeTotal = (response.data[0].quantity * responsePriceAction.data.body.delayedPrice) - (response.data[0].price * response.data[0].quantity);
                if (beneficeTotal > 0) {
                    $scope.beneficeTotal = "+" + $scope.beneficeTotal;
                    $("#beneficeTotal").css('color', 'green');
                } else if (beneficeTotal == 0) {
                    $("#beneficeTotal").css('color', 'black');
                } else if (beneficeTotal < 0) {
                    $("#beneficeTotal").css('color', 'red');
                }
            }
            function errorPriceAction(error) {
                console.log(error);
            }
        }
        function errorCallBack(error) {
            console.log(error);
        }
        $("#numberSell").val(1);
        $("#tableSell").show();
    }
}]);