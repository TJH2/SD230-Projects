// currency names/display object
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
function convert_currency(amount, fromCC, toCC) {

    // to make sure a user has input an amount
    if(amount == "") {
        return;
    }
    // regex to remove currency symbol from amount value
    amount = amount.replace(/[^0-9\.]/g,"");

    // sends alert if user tries to convert a currency to itself, since that is pointless
    if(fromCC === toCC) {
        alert("You need to select two different currencies to use this converter.");
        return;
    }

    else {
        let newAmount = converter(amount, fromCC, toCC); // converted currency amount
        let reverseAmount = converter(amount, toCC, fromCC); // amount converted with reverse currencies

        // to display full name of currencies
        let fromFullName = currency_names[fromCC];
        let toFullName = currency_names[toCC];

        // DISPLAYING INFORMATION ON THE PAGE TO THE USER

        document.getElementById("conversion").innerHTML = "<p>" + amount + " " + fromFullName + " =</p>" + "<p style='font-size: 20px'>" + newAmount + " " + toFullName + "</p>" + "<br><p style='font-size: 12px'>" + amount + " " + toFullName + " = " + reverseAmount + " " + fromFullName + "</p>";

        document.getElementById("fList").innerHTML = 
        "<h3>Convert " + fromFullName + " to " + toFullName + "</h3>" +
        "<section style='display:grid; grid-template-columns: auto auto;'>" +
        "<p>" + fromCC + "</p>" +
        "<p>" + toCC + "</p>" +
        "</section>" +
        "<hr>";

        document.getElementById("rList").innerHTML = 
        "<h3>Convert " + toFullName + " to " + fromFullName + "</h3>" +
        "<section style='display:grid; grid-template-columns: auto auto;'>" +
        "<p>" + toCC + "</p>" +
        "<p>" + fromCC + "</p>" +
        "</section>" +
        "<hr>";

        let mults = [1,5,10,25,100,500,1000,5000,10000];

        for(let i = 0; i < mults.length; i++) {
            document.getElementById("fList").innerHTML += "<section style='display:grid; grid-template-columns: auto auto; padding:5px;'>" +
            "<p>" + mults[i] + " " + fromCC + "</p>" +
            "<p>" + converter(mults[i], fromCC, toCC) + " " + toCC + "</p>" +
            "</section>";

            document.getElementById("rList").innerHTML += "<section style='display:grid; grid-template-columns: auto auto; padding:5px;'>" +
            "<p>" + mults[i] + " " + toCC + "</p>" +
            "<p>" + converter(mults[i], toCC, fromCC) + " " + fromCC + "</p>" +
            "</section>";
        }

        // display starts off none for currency calculations, but will be made visible after first conversion
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

// function to handle currency formatting for display of amount
function currency_formatter() {
    let value = document.getElementById("amount").value;

    let currency = new Intl.NumberFormat('en-US', {
        currencyDisplay: "symbol",
        style: 'currency',
        currency: document.getElementById("from").value,
    });

    value = value.replace(/[^0-9\.]/g,"");
    
    //removes additional decimal if accidentally placed
    if(isNaN(value)) {
        value = Array.from(value);
        value.pop();
        value = value.toString();
        value = value.replace(/[^0-9\.]/g,"");
    }

    document.getElementById("amount").value = currency.format(value);
    return;
}

// function that converts initial currency amount to amount in new currency
function converter(amount, start, finish) {
    let newAmount = 0.00; // variable to convert to USD and then convert to new currency
    
        // convert to USD
        newAmount = amount / conversion_rates[start];
        // convert from USD to new currency
        newAmount = newAmount * conversion_rates[finish];

        // limits the amount of decimal places to 5 for easy viewing
        if(newAmount.toString().length - Math.round(newAmount).toString().length > 5) {
            newAmount = newAmount.toFixed(5);
        }

        return newAmount;
}

// event listener for displaying currency
document.getElementById("amount").addEventListener("change", function() {
    currency_formatter();
    return;
});

// event listen to display new currency when it is chosen by user
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
        alert("Successfully Connected To API!");
        conversion_rates = response.conversion_rates; // replaces initial converstion rates with rates from the API
    } else {
        alert("Could Not Connect To API. Fallback Rates Will Be Used.");
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



