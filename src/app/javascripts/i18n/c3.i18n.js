Ext.ns("C3.i18n.graph");

C3.i18n.applyArgs = function(string) {
    var res = string;
    for (var i = 1; i < arguments.length; i++) {
        var primRegExp = new RegExp("\\{" + (i - 1) + "\\}", "ig");
        res = res.replace(primRegExp, arguments[i]);
    }
    return res;
};

C3.i18n.getParam = function(key) {
    var href = window.location.search;
    if(null != href) {
        var params = href.substring(1).split("&");
        for(var i = 0; i < params.length; i++) {
            if(params[i].indexOf(key) == 0 && params[i].charAt(key.length) == "=") {
                return decodeURI(params[i].split("=")[1]);
            }
        }
        return null;
    }
    return null;
};

C3.i18n.current = {

    spending : "Spending",
    electricity : "Electricity",
    gas : "Gas",
    co2 : "CO<sub>2</sub>",

    buildingEndUse : "Building End Use",

    annual : "Annual",
    monthly : "Monthly",
    daily : "Daily",

    total : "Total",

    previousPeriod : "Previous Period",
    planActions : "Plan Actions",
    weather : "Weather",

    annualEnergySpending : "ANNUAL ENERGY SPENDING",
    howDoYouCompare : "How do you compare to similar businesses",
    spendSimilar : "You spend {0} more than similar businesses",
    spendEfficient : "Your spend {0} more than energy efficient businesses"

};

C3.i18n.locales = {
    en : C3.i18n.current,
    es : {
        spending : "Gasto",
        electricity : "Electricidad",
        gas : "Gas",
        co2 : "CO<sub>2</sub>",

        buildingEndUse : "Uso del Edificio",

        annual : "Anual",
        monthly : "Mensual",
        daily : "Diario",

        total : "Total",

        previousPeriod : "Periodo Anterior",
        planActions : "Acciones del Plan",
        weather : "Clima",

        annualEnergySpending : "GASTO ANUAL DE ENERGIA",
        howDoYouCompare : "Como se compara a las empresas similares",
        spendSimilar : "Usted gasta {0} mas que empresas similares",
        spendEfficient : "Usted gasta {0} mas que empresas eficientes"
    }
};

(function(){
    var locale = C3.i18n.getParam("locale");
    if(locale && C3.i18n.locales[locale]) {
        Ext.apply(C3.i18n.current, C3.i18n.locales[locale]);
    }
})();





