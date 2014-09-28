$(function() {

    getThreholds();

});


function getThreholds() {
    var result = null;
    $.ajax({
        type: "GET",
        url: "http://hasansama.com/barajdoluluk/thresholds.txt",
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
    drawHighChartGraph(dayArray, thresholdArray);
}

function drawHighChartGraph(dayArray, lineArray) {
        $('#container').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'İstanbul İli Baraj Doluluk Oranları'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
			'Veriler iski.gov.tr adresinden günlük olarak alınıp arşivlenmiştir.' : ''
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
