var quantityBuy;
var priceBuy;
var priceBuy;
var totalBuy;
var total;

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
});

