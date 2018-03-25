var label;
var x = [];
var dataGraph = [];

function drawGraph() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: x,
            datasets: [{
                label: label,
                borderColor: 'rgb(100, 149, 237)',
                data: dataGraph,
            }]
        },

        // Configuration options go here
        options: {}
    });
}

$(document).ready(function () {
    
});