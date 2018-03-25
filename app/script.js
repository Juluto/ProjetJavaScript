var quantityBuy;
var priceBuy;
var totalBuy;
var total;
var quantitySell;
var benefice;
var priceSell;
var gain;
var priceBenefice;
var benefice;
var beneficeTotal;

$(document).ready(function () {
    $("#tableBuy").hide();
    $("#notFoundBuy").hide();
    $("#numberBuy").val(1);
    $("#tableSell").hide();

    $("#numberBuy").on('input', function () {
        if ($(this).val() == "") {
            $("#totalBuy").empty();
        } else {
            quantityBuy = $(this).val();
            quantityBuy = parseInt(quantityBuy);
            if (quantityBuy <= 0) {
                $("#totalBuy").empty();
            } else {
                totalBuy = priceBuy * quantityBuy;
                $("#totalBuy").empty();
                $("#totalBuy").append(totalBuy + " $");
            }
        }
    });

    $("#numberSell").on('input', function () {
        if ($(this).val() == "") {
            $("#benefice").empty();
            $("#gain").empty();
        } else {
            quantitySell = $(this).val();
            quantitySell = parseInt(quantitySell);
            if (quantitySell <= 0) {
                $("#benefice").empty();
                $("#gain").empty();
            } else {
                gain = priceSell * quantitySell;
                $("#gain").empty();
                $("#gain").append(gain + " $");
                benefice = (priceSell - priceBenefice) * quantitySell;
                $("#benefice").empty();
                $("#benefice").append(benefice + " $");
            }
        }
    });
});

