Ext.ns("C3.data");

C3.data.get3Randoms = function(min, max) {
    if(!min) min = 0;
    if(!max) max = 100;
    var result = [];
    result.push(Math.floor(Math.random() * (max-min)));
    result.push(Math.floor(Math.random() * result[0]));
    result.push(result[0] - result[1]);
    result[0] += min;
    result[1] += min;
    result[2] += min;
    return result;
};

C3.data.createDataPoints = function(num) {
    var result = [];
    for(var i = 0; i < num; i++) {

        var spending = C3.data.get3Randoms(30, 90).sort(function(a,b){return b-a}),
            previous = C3.data.get3Randoms(50, 100).sort(function(a,b){return b-a}),
            usage = C3.data.get3Randoms(),
            weather = C3.data.get3Randoms(40,70).sort();

        result.push({
            key : i,
            startDate : "5/7/12", endDate : "6/7/12",
            spendingTotal : spending[0], spendingElectricity : spending[1], spendingGas : spending[2],
            previousTotal : previous[0], previousElectricity : previous[1], previousGas : previous[2],
            electricityUsage : usage[0], gasUsage : usage[1], co2Usage : usage[2],
            weatherLow : weather[0], weatherAverage : weather[1], weatherHigh : weather[2]
        });
    }
    return result;
};

C3.data.daily = C3.data.createDataPoints(30);

C3.data.monthly = C3.data.createDataPoints(12);

C3.data.annual = [
    {type: "previous", spendingTotal: 60, spendingElectricity: 50, spendingGas: 10, electricityUsage : 55, gasUsage : 20, co2Usage : 10},
    {type: "current", spendingTotal: 50, spendingElectricity: 42, spendingGas: 8, electricityUsage : 45, gasUsage : 10, co2Usage : 5},
    {type: "efficient", spendingTotal: 30, spendingElectricity: 25, spendingGas: 5, electricityUsage : 25, gasUsage : 30, co2Usage : 0},
    {type: "average", spendingTotal: 80, spendingElectricity: 60, spendingGas: 20, electricityUsage : 75, gasUsage : 70, co2Usage : 25}
];