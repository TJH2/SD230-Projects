// currency names object
let currency_names = {
    "AUD": "Australian Dollar",
    "CAD": "Canadian Dollar",
    "CLP": "Chilean Peso",
    "CNY" : "Chinese Yuan",
    "EUR" : "Euro",
    "GBP" : "British Pound Sterling",
    "INR" :"Indian Rupee",
    "JPY" : "Japanese Yen",
    "RUB" : "Russian Ruble",
    "USD" : "United States Dollar",
    "ZAR": "South African Rand"
    }

    // conversion rates to use as backup with API request fails
    let conversion_rates = {
        "AUD": 1.531863,
        "CAD": 1.36029,
        "CLP": 950.662057,
        "CNY" : 7.128404,
        "EUR" : 1.03203,
        "GBP" : 0.920938,
        "INR" : 81.255504,
        "JPY" : 143.376504,
        "RUB" : 57.875038,
        "USD" : 1,
        "ZAR": 17.92624
    }

// function to convert between currencies
function convert_currency(amount, starting_cc, ending_cc) {

    if(amount == "" || starting_cc == "none" || ending_cc == "none") {
        return;
    }

    amount = amount.replace(/[^0-9\.]/g,"");

    // if user selects the same currency for from and to
    if(starting_cc === ending_cc) {
        alert("You need to select two different currencies to use this converter.");
        return;
    }

    else {
        let newAmount = converter(amount, starting_cc, ending_cc); // variable to convert to USD and then convert to new currency
        let reverseAmount = converter(amount, ending_cc, starting_cc);

        // to display full name
        let fullName1 = currency_names[starting_cc];
        let fullName2 = currency_names[ending_cc];

        // toFixed(2) rounds to 2 decimal places
        document.getElementById("conversion").innerHTML = "<p>" + amount + " " + fullName1 + " =</p>" + "<p style='font-size: 20px'>" + newAmount + " " + fullName2 + "</p>" + "<br><p style='font-size: 12px'>" + amount + " " + fullName2 + " = " + reverseAmount + " " + fullName1 + "</p>";

        document.getElementById("fList").innerHTML = 
        "<h3>Convert " + fullName1 + " to " + fullName2 + "</h3>" +
        "<section style='display:grid; grid-template-columns: auto auto;'>" +
        "<p>" + starting_cc + "</p>" +
        "<p>" + ending_cc + "</p>" +
        "</section>" +
        "<hr>";

        document.getElementById("rList").innerHTML = 
        "<h3>Convert " + fullName2 + " to " + fullName1 + "</h3>" +
        "<section style='display:grid; grid-template-columns: auto auto;'>" +
        "<p>" + ending_cc + "</p>" +
        "<p>" + starting_cc + "</p>" +
        "</section>" +
        "<hr>";

        let mults = [1,5,10,25,100,500,1000,5000,10000];

        for(let i = 0; i < mults.length; i++) {
            document.getElementById("fList").innerHTML += "<section style='display:grid; grid-template-columns: auto auto; padding:5px;'>" +
            "<p>" + mults[i] + " " + starting_cc + "</p>" +
            "<p>" + converter(mults[i], starting_cc, ending_cc) + " " + ending_cc + "</p>" +
            "</section>";

            document.getElementById("rList").innerHTML += "<section style='display:grid; grid-template-columns: auto auto; padding:5px;'>" +
            "<p>" + mults[i] + " " + ending_cc + "</p>" +
            "<p>" + converter(mults[i], ending_cc, starting_cc) + " " + starting_cc + "</p>" +
            "</section>";
        }

        if(document.getElementById("container").style.display = "none") {
            document.getElementById("container").style.display = "grid";
        }
    }
    return;
}

// function to reverse the currencies selected
function flip_vals() {
    let from = document.getElementById("from");
    let to = document.getElementById("to");
    let fromV = from.value;
    let toV = to.value;

    from.value = toV;
    to.value = fromV;
    currency_formatter();
    return;
}

function currency_formatter() {
    let value = document.getElementById("amount").value;

    let currency = new Intl.NumberFormat('en-US', {
        currencyDisplay: "symbol",
        style: 'currency',
        currency: document.getElementById("from").value,
    });

    value = value.replace(/[^0-9\.]/g,"");

    if(isNaN(this.value)) {
        value = Array.from(value);
        value.pop();
        value = value.toString();
        value = value.replace(/[^0-9\.]/g,"");
    }

    document.getElementById("amount").value = currency.format(value);
    return;
}

function converter(amount, start, finish) {
    let newAmount = 0.00; // variable to convert to USD and then convert to new currency
    
        // convert to USD
        newAmount = amount / conversion_rates[start];
        // convert from USD to new currency
        newAmount = newAmount * conversion_rates[finish];

        return newAmount;
}

// event listener for displaying currency
document.getElementById("amount").addEventListener("change", function() {
    currency_formatter();
    return;
});

document.getElementById("from").addEventListener("change", function() {
    currency_formatter();
    return;
});

// API Request For Conversion Rates

const xhttpr = new XMLHttpRequest();

xhttpr.open("GET", "https://v6.exchangerate-api.com/v6/a3ff11948999e4e7defae360/latest/USD", true);

xhttpr.send();

xhttpr.onload = ()=> {
    if (xhttpr.status === 200) {
        const response = JSON.parse(xhttpr.response);
        console.log("Successfully Connected To API!");
        conversion_rates = response.conversion_rates; // replaces initial converstion rates with rates from the API
    } else {
        console.log("Could Not Connect To API. Fallback Rates Will Be Used.");
    }
  };



/* UNUSED CODE FROM PREVIOUS VERSION

// function to handle searching currency codes
function search(term){

    document.getElementById("results").innerHTML = "";
    
    // veriable for if term appears
    let termFound = false;

    // for each loop to check for keys/partial values
    Object.keys(currency_names).forEach(key => {
        if(key === term.toUpperCase() || currency_names[key].toLowerCase().includes(term.toLowerCase())) {
            document.getElementById("results").innerHTML += "<p>" + key + " - " + currency_names[key] +"</p>";
            termFound = true;
        }
    });

    if(termFound == false) {
        document.getElementById("results").innerHTML += "<p>I'm sorry, \"" + term + "\" did not match any known currencies. Please try again.</p>";
    }
    return;
}
*/



