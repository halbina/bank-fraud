

$(document).ready(function() {

Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Vonesat n\353 Hyrje'
    },
    subtitle: {
        text: 'Vonesat e paraqitura n\353 minuta'
    },
    xAxis: {
        categories: ['MinMinuta', 'MaxMinuta'],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Minutat'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} min</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'V\353rmic\353',
        data: [10, 18]

    }, {
        name: 'Qaf\353 e Prushit',
        data: [2, 3]

    }, {
        name: 'Qaf\353 e Morin\353s',
        data: [3, 4]

    }, {
        name: 'Kull\353',
        data: [3, 5]

    },{
        name: 'Merdar\353',
        data: [2, 3]

    }, {
        name: 'Hani i Elezit',
        data: [10, 13]

    }, {
    	name: 'Glloboqic\353',
        data: [3, 6]

    }]
});
   
   }); 
     




$(document).ready(function() {

Highcharts.chart('container1', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Vonesat n\353 Dalje'
    },
    subtitle: {
        text: 'Vonesat e paraqitura n\353 minuta'
    },
    xAxis: {
        categories: ['MinMinuta', 'MaxMinuta'],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Minutat'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} min</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'V\353rmic\353',
        data: [3, 5]

    }, {
        name: 'Qaf\353 e Prushit',
        data: [4, 5]

    }, {
        name: 'Qaf\353 e Morin\353s',
        data: [5, 6]

    }, {
        name: 'Kull\353',
        data: [1, 3]

    },{
        name: 'Merdar\353',
        data: [1, 2]

    }, {
        name: 'Hani i Elezit',
        data: [4, 5]

    }, {
        name: 'Glloboqic\353',
        data: [2, 3]

    }]
});
    
    
});




$(document).ready(function() {

Highcharts.chart('container2', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Vonesat n\353 Hyrje'
    },
    subtitle: {
        text: 'Vonesat e paraqitura n\353 metra'
    },
    xAxis: {
        categories: ['MinMetra', 'MaxMetra'],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Metrat'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} metra</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'V\353rmic\353',
        data: [3, 7]

    }, {
        name: 'Qaf\353 e Prushit',
        data: [5, 6]

    }, {
        name: 'Qaf\353 e Morin\353s',
        data: [1, 2]

    }, {
        name: 'Kull\353',
        data: [3, 5]

    },{
        name: 'Merdar\353',
        data: [2, 3]

    }, {
        name: 'Hani i Elezit',
        data: [4, 6]

    }, {
        name: 'Glloboqic\353',
        data: [4, 5]

    }]
});
       
});




$(document).ready(function() {

Highcharts.chart('container3', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Vonesat n\353 Dalje'
    },
    subtitle: {
        text: 'Vonesat e paraqitura n\353 metra'
    },
    xAxis: {
        categories: ['MinMetra', 'MaxMetra'],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Metrat'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} metra</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'V\353rmic\353',
        data: [2, 4]

    }, {
        name: 'Qaf\353 e Prushit',
        data: [2, 3]

    }, {
        name: 'Qaf\353 e Morin\353s',
        data: [2, 3]

    }, {
        name: 'Kull\353',
        data: [2, 4]

    },{
        name: 'Merdar\353',
        data: [5, 8]

    }, {
        name: 'Hani i Elezit',
        data: [7, 8]

    }, {
        name: 'Glloboqic\353',
        data: [2, 3]

    }]
});
       
});

$(document).ready(function() {
                       
                        function getSelectedOption(sel) {
    var opt;
    for ( var i = 0, len = sel.options.length; i < len; i++ ) {
        opt = sel.options[i];
        if ( opt.selected === true ) {
            break;
        }
    }
    return opt;
}


var opt = getSelectedOption(sel);


console.log( opt.value );
console.log( opt.text );
                    
    });

    




