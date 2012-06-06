Ext.ns("C3.PEAT.ux.Graph.data");

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

C3.PEAT.ux.Graph.data.annual = new Ext.data.JsonStore({
    fields: ["name", "data"],
    data: [
        {name: "Previous Year", data: 10},
        {name: "Current Year", data: 20},
        {name: "Efficient", data: 10},
        {name: "Average", data: 50}
    ]
});

C3.PEAT.ux.Graph.data.monthly = new Ext.data.JsonStore({
    fields: ["name", "total", "electricity", "gas"],
    data: [
        {name: "Jan", total: 10, electricity: 5, gas: 5},
        {name: "Feb", total: 20, electricity: 10, gas: 10},
        {name: "Mar", total: 10, electricity: 8, gas: 2},
        {name: "Apr", total: 50, electricity: 10, gas: 40},
        {name: "May", total: 40, electricity: 30, gas: 10},
        {name: "Jun", total: 10, electricity: 0, gas: 10},
        {name: "Jul", total: 70, electricity: 55, gas: 15},
        {name: "Aug", total: 20, electricity: 15, gas: 5},
        {name: "Sep", total: 80, electricity: 45, gas: 35},
        {name: "Oct", total: 90, electricity: 80, gas: 10},
        {name: "Nov", total: 70, electricity: 65, gas: 5},
        {name: "Dec", total: 30, electricity: 15, gas: 15}
    ]
});