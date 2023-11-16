let calc = [];
let answer = 0;
let lightMode = true;

function hold(input) {
    let visuals = "";

    // because eval() can't handle n(n), instert a * before ()
    //if(isNaN(calc[calc.length -1]) == false && input == "(") {
    //hold("*");
    //}
    // to ensure that each number only has one decimal
    // if the last NaN value is a . then don't add it, else add it in
    
    // code to make sure that only one decimal per number is added
    if(isNaN(input)) {
        if(input == ".") {
            for(let i = calc.length -1; i >= 0; i--) {
                if(isNaN(calc[i])) {
                if(calc[i] == ".") { return; }
                                else { break; }
                            }
            }
        }

        // code to handle pos/neg feature
        else if(input == '+/-') {
            
            for(let i = calc.length -1; i >= 0; i--) {
                // when the reversed array stops on a non-number, multiply the number before it by -1
                if(isNaN(calc[i]) && calc[i] != ".") {
                    if(i == calc.length -1) {
                                return;
                    }
                    calc[i+1] = calc[i+1] * -1;
                    break;
                }
                // if the next non-number in the reversed array is a ., ignore it
                else if(calc[i] == ".") {
                    if(isNaN(calc[i-1])) {
                    calc.splice(i, 0, "-0");
                    break;
                    }
                    else if(calc[i-1] == "-0") {
                        calc.splice(i-1, 1);
                        break;
                    }
                }
                // if theres only one value in the array, and its a number, multiply it by -1
                else if(i == 0) {
                    calc[i] = calc[i] * -1;
                    break;
                }
            }
            viz(visuals);
            return;    
        }

        // code for the percent feature
        else if(input == "%") {

            if(isNaN(calc[calc.length-1])) {
                return;
            }

            if(calc.length != 0) {
                // reverses through the array until it hits either a non-number or the start of the array
                for(let i = calc.length -1; i >= 0; i--) {
                    if(isNaN(calc[i]) || i == 0) {
                        // if it hits a decimal, adds 00 behind the decimal
                        if(calc[i] == ".") {

                            if(i !=0 && !isNaN(calc[i-1])) {
                                if(i - 1 !=0 && !isNaN(calc[i-2])) {
                                    calc.splice(i,1);
                                    calc.splice(i-2, 0, ".");
                                }
                                else {
                                    calc.splice(i,1);
                                    calc.splice(i-1, 0, "0");
                                    calc.splice(i-1, 0, ".");
                                }
                            }
                            else {
                            calc.splice(i+1, 0, "0");
                            calc.splice(i+1, 0, "0");
                            }
                        } 
                        else {
                            // if it hits a non-decimal non-number
                            if(isNaN(calc[i])) {
                                landing(1, i);
                            }
                            // if it hits the beginning of the array
                            else {
                                landing(0, i);
                            }
                        }
                        viz(visuals);
                        break;
                    }
                    // function to help handle % depending on if i is an operator or the start of the array. created a function to reduce code
                    function landing(shift) {

                        let neg = false;
                        // checks to see if its dealing with a negative number
                        if(Math.sign(calc[i + shift]) == -1) {
                            calc[i + shift] = calc[i + shift] * -1;
                            neg = true;
                        }
                    
                        if(calc.length - i > shift + 1) { // multiple digit # 55 -> .55
                            let dif = (calc.length - i) - shift;
                            calc.splice(i + (dif - 2) + shift, 0, ".");
                        } else { // single digit # 5 -> .05
                            calc.splice(i + shift, 0, "0");
                            calc.splice(i + shift, 0, ".");
                        }
                        
                        if(neg) { // if the number is negative insert a -0 -5 -> -0.05
                            calc.splice(i + shift, 0, "-0");
                        }
                    }
            }
            }
            return;  
        }

        // dont add non-number to calculations if there are no numbers, or if there are no numbers between it and the last non-number
        else if(calc.length == 0 || isNaN(calc[calc.length -1])) {
            return;
        }
        
    }

    else if(input == 0 && (calc.length == 0 || (isNaN(calc[calc.length-1]) && calc[calc.length-1] != "."))) { // to handle the issue with starting off with a 0
       return;
    }

    // will keep computed value unless user tries to input a # after the value
    if(calc.length == 1 && answer != 0 && (isNaN(input) == false || input == ".")) {
        answer = 0;
        calc = [];
    }

    // add input to the array
    calc.push(input);
    // display the array
    viz(visuals);

    return;
}

// function to display the contents of the array within the calculator to the user
function viz(visuals) {
    for(let i = 0; i < calc.length; i++) { 
        visuals += calc[i];
        document.getElementById("visual").innerHTML = visuals;
    }
}

// function to compute problem
    function compute() {
        let amass = ""; // for printing results to running total
    // to check for errors
    try {
            answer = eval(calc.join('')); // a method to evaulate the array and add up the value
            // limits the amount of decimal places to 5 for easy viewing
            if(answer.toString().length - Math.round(answer).toString().length > 5) {
                answer = answer.toFixed(5);
            }
            for(let i = 0; i < calc.length; i++) {
                // all operators should have a space between them and the numbers
                if(isNaN(calc[i]) && calc[i] != ".") { 
                    amass += " " + calc[i] + " ";   
                } 
                else {amass += calc[i];}  
            }
            // for displaying the running totals in the box
            document.getElementById("runningTotal").innerHTML = document.getElementById("runningTotal").innerHTML + "<p>" + amass + " = " + answer +"</p>";
            
            
            
            calc = [answer];
            document.getElementById("visual").innerHTML = calc[0];
    } catch(e) {
        alert("Please add numbers to computer.");
    }
}

// function to handle the delete feature
function back() {
    let visuals = "";
    if(calc) {
        calc.pop();
                
        for(let i = 0; i < calc.length; i++) {
            visuals += calc[i];
        }
        document.getElementById("visual").innerHTML = visuals;
    }

}

// function to clear the calculator
function fresh() {
    answer = 0;
    document.getElementById("runningTotal").innerHTML = document.getElementById("runningTotal").innerHTML + "<p>|----------------------clear---------------------|</p>";
    document.getElementById("visual").innerText = "";
    calc = [];
}

// function for basic dark/light mode toggle
function modeHandler() {
    const everything = document.querySelectorAll("header, h2, button, p, div, section");

    if(lightMode == true) {
        document.body.style.backgroundColor = "#023020";

        for (let i = 0; i < everything.length; i++) {
            everything[i].style.color = "green";
            everything[i].style.borderColor = "purple";
            everything[i].style.backgroundColor = "black";
          }
        lightMode = false;
        document.getElementById("modeHandler").innerText = "Light Theme";
    }
    else {
        document.body.style.backgroundColor = "white";

        for (let i = 0; i < everything.length; i++) {
            everything[i].style.color = "black";
            everything[i].style.borderColor = "black";
            everything[i].style.backgroundColor = "white";
          }

        lightMode = true;
        document.getElementById("modeHandler").innerText = "Dark Theme";
    }
}