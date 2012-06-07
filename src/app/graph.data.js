//date: "5/5/12"
//date: "4/5/12"
//date: "3/5/12"
//date: "2/5/12"
//date: "1/5/12"
//date: "12/5/11"
//date: "11/5/11"
//date: "10/5/11"
//date: "10/5/11"
//date: "9/5/11"
//date: "8/5/11"
//date: "7/5/11"
//date: "6/5/11"
//date: "5/5/11"
//date: "4/5/11"
//date: "3/5/11"
//date: "2/5/11"
//date: "1/5/11"
//date: "12/5/10"
//date: "11/5/10"
//date: "10/5/10"
//date: "9/5/10"
//date: "8/5/10"
//date: "7/5/10"

var annualData = {
    grain : "annual",
    data : {
        lastPeriod : {
            startDate : "6/5/11",
            endDate : "6/5/12",
            amount : 40
        },
        previousPeriod : {
            startDate : "6/5/10",
            endDate : "6/5/11",
            amount : 40
        },
        efficient : {
            amount : 10
        },
        average : {
            amount : 60
        }
    }
};

var monthlyData = {
    grain : "month",
    data: [
        {
            startDate: "5/6/12",
            endDate: "6/5/12",
            total : {
                spending : { value : 40, unit : "$" }
            },
            electricity : {
                spending: { value : 40, unit : "$" },
                usage : { value : 40, unit : "kWh" }
            },
            gas : {
                spending: { value : 40, unit : "$" },
                usage : { value : 40, unit : "therms" }
            },
            co2 : {
                usage : { value : 40, unit : "therms" }
            },
            weather : {
                low : { value : 40, unit : "F" },
                high : { value : 50, unit : "F" }
            }
        },{
            startDate: "5/6/12",
            endDate: "6/5/12",
            total : {
                spending : { value : 40, unit : "$" }
            },
            electricity : {
                spending: { value : 40, unit : "$" },
                usage : { value : 40, unit : "kWh" }
            },
            gas : {
                spending: { value : 40, unit : "$" },
                usage : { value : 40, unit : "therms" }
            },
            co2 : {
                usage : { value : 40, unit : "therms" }
            },
            weather : {
                low : { value : 40, unit : "F" },
                high : { value : 50, unit : "F" }
            }
        }
    ]
};

var dailyData = {
    grain : "daily",
    data: [
        {
            startDate: "5/6/12",
            endDate: "6/5/12",
            total : {
                spending : { value : 40, unit : "$" }
            },
            electricity : {
                spending: { value : 40, unit : "$" },
                usage : { value : 40, unit : "kWh" }
            },
            gas : {
                spending: { value : 40, unit : "$" },
                usage : { value : 40, unit : "therms" }
            },
            co2 : {
                usage : { value : 40, unit : "therms" }
            },
            weather : {
                low : { value : 40, unit : "F" },
                high : { value : 50, unit : "F" }
            }
        },{
            startDate: "5/6/12",
            endDate: "6/5/12",
            total : {
                spending : { value : 40, unit : "$" }
            },
            electricity : {
                spending: { value : 40, unit : "$" },
                usage : { value : 40, unit : "kWh" }
            },
            gas : {
                spending: { value : 40, unit : "$" },
                usage : { value : 40, unit : "therms" }
            },
            co2 : {
                usage : { value : 40, unit : "therms" }
            },
            weather : {
                low : { value : 40, unit : "F" },
                high : { value : 50, unit : "F" }
            }
        }
    ]
};
