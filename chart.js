$(function() {

    getThreholds();

});


function getThreholds() {
    var result = null;
    $.ajax({
        type: "GET",
        url: "thresholds.txt",
        dataType: "text",
        success: function(data) {
            parseThresholds(data);
        }
    });
}

function parseThresholds(thresholds) {

    var lineArray = thresholds.split('\n'),
            dayArray = [],
            thresholdArray = [];

    for (var i in lineArray) {
        var daily = lineArray[i].split('\t')
        if (daily[0]) {
            dayArray.push(daily[0]);
            thresholdArray.push( parseFloat(daily[1]));
        }
    }
//    drawGraph(dayArray, thresholdArray);
    drawHighChartGraph(dayArray, thresholdArray);
}

function drawHighChartGraph(dayArray, lineArray) {
        $('#container').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Istanbul Ili Barajlardaki Su Oranlari'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' :
                    'Pinch the chart to zoom in'
            },
            xAxis: {
	           categories:  dayArray
		},
            yAxis: {
                title: {
                    text: 'Doluluk Oranı %'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 0},
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
    
            series: [{
                type: 'area',
                name: '%',
                data: lineArray
            }]
        });
}


function drawGraph(dayArray, lineArray) {

    var lineChartData = {
        labels: dayArray,
        datasets: [
            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: lineArray
            }
        ]
    },
    lineOptions = {
        pointDotRadius: 2,
        bezierCurve : false,
        pointDotStrokeWidth : 0.5,
    };

    var myLine = new Chart(document.getElementById("myChart").getContext("2d")).Line(lineChartData, lineOptions);


}
