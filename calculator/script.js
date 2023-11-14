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
    
    if(isNaN(input)) {
        if(input == ".") {
            for(let i = calc.length -1; i >= 0; i--) {
                if(isNaN(calc[i])) {
                if(calc[i] == ".") { return; }
                                else { break; }
                            }
            }
        }

        else if(input == '+/-') {
            
            for(let i = calc.length -1; i >= 0; i--) {
                if(isNaN(calc[i]) && calc[i] != ".") {
                    if(i == calc.length -1) {
                                return;
                    }
                    calc[i+1] = calc[i+1] * -1;
                    break;
                }
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
                else if(i == 0) {
                    calc[i] = calc[i] * -1;
                    break;
                }
            }
            viz(visuals);
            return;    
        }

        else if(input == "%") {
            let neg = false
            if(calc.length != 0) {
                for(let i = calc.length -1; i >= 0; i--) {
                    if(isNaN(calc[i]) || i == 0) {
                        if(calc[i] == ".") {
                            calc.splice(i+1, 0, "0");
                            calc.splice(i+1, 0, "0");
                        } 
                        else {
                            if(isNaN(calc[i])) {
                                landing(1, i);
                            }
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
                    
                        if(Math.sign(calc[i + shift]) == -1) {
                            calc[i + shift] = calc[i + shift] * -1;
                            neg = true;
                        }
                    
                        if(calc.length - i > shift + 1) {
                            calc.splice(i + shift, 0, ".");
                        } else {
                            calc.splice(i + shift, 0, "0");
                            calc.splice(i + shift, 0, ".");
                        }
                        
                        if(neg) {
                            calc.splice(i + shift, 0, "-0");
                        }
                    }
            }
            }
            return;  
        }

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

    calc.push(input);

    viz(visuals);

    return;
}

function viz(visuals) {
    for(let i = 0; i < calc.length; i++) { 
        visuals += calc[i];
        document.getElementById("visual").innerHTML = visuals;
    }
}

// function to compute problem
    function compute() {
        let amass = "";
    // to avoid unclosed parentheses error
    try {
            answer = eval(calc.join('')); // a method to evaulate the array and add up the value
            if(!Number.isInteger(answer)) { // to keep answer at 2 decimal places if needed
                answer = answer.toFixed(2);
            }
            for(let i = 0; i < calc.length; i++) {
                if(isNaN(calc[i])) {
                    if(calc[i] != "." && calc[i] != "-") {
                        amass += " " + calc[i] + " ";
                    } else if (calc[i] == "-") {
                        if(i == 0 || isNaN(calc[i -1])) {
                            amass += calc[i];
                        } else {amass += " " + calc[i] + " "; }
                    }
                    else {amass += calc[i];}
                } else {amass += calc[i];}
                
            }
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