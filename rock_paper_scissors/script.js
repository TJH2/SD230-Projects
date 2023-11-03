const options = ["ROCK", "PAPER", "SCISSORS"];
let buttonAlt = true;
// starting scores and timer value
let pScore = 0;
let cScore = 0;
let timer = 10;

document.getElementById("pScore").innerText = pScore;
document.getElementById("cScore").innerText = cScore;

// function to change the function that clicking the button performs, whether it starts a round or determines the outcome
function checker() {
    if(buttonAlt) {
        startRound();
    }
    else {
        outcome(document.querySelector("input[name=\"choice\"]:checked"), false);
    }
}
// function to determine the outcome of the game, takes in boolean tooLong which is determined by whether timer has run out
function outcome(playerChoice, tooLong) {

    let computerChoice = options[random_number(3)]; //randomly generated result for computer
    let result; // result message
    
    // conditional to handle if player pushes button before making a selection, timer runs out, or normal game
    if(playerChoice == null && tooLong == false) {
        return;
    }
    else if(playerChoice == null) {
        playerChoice = options[random_number(3)];
    }
    else {
        playerChoice = document.querySelector('input[name="choice"]:checked').value;
    }

    buttonAlt = true; // changes checker function

    document.getElementById("play").style.display="none"; // hides button so player can't click it again until round is over

    // HANDLING RESULTS

    //draw
    if(playerChoice == computerChoice) {
        result = "You and the computer both chose " + playerChoice + ". The game ends in a draw.";
        document.getElementById("result").style.color = "black";
    }
                
    else {
        // player won, add 1 point for player
        if(playerChoice === "PAPER" && computerChoice === "ROCK") {
            result = playerChoice + " covers " + computerChoice + ". <span style='color:green'>You win!</span>";
            pScore++;
        } 
        else if(playerChoice === "ROCK" && computerChoice === "SCISSORS") {
            result = playerChoice + " breaks " + computerChoice + ". <span style='color:green'>You win!</span>";
            pScore++;
        } 
        else if(playerChoice === "SCISSORS" && computerChoice === "PAPER") {
            result = playerChoice + " cuts " + computerChoice + ". <span style='color:green'>You win!</span>";
            pScore++;
        }
        // player lost, add 1 point for computer
        else if(playerChoice === "PAPER" && computerChoice === "SCISSORS") {
            result = computerChoice + " cuts " + playerChoice + ". <span style ='color:red'>You lose...</span>";
            cScore++;
        }
        else if(playerChoice === "ROCK" && computerChoice === "PAPER") {
            result = computerChoice + " covers " + playerChoice + ". <span style ='color:red'>You lose...</span>";
            cScore++;
        }
        else if(playerChoice === "SCISSORS" && computerChoice === "ROCK") {
            result = computerChoice + " breaks " + playerChoice + ". <span style ='color:red'>You lose...</span>";
            cScore++;
        }

    }

    displayDelay(result, tooLong, playerChoice, computerChoice);
    
    return;
}
// function to use intervals to display different images as well as RPS one word as a time
function displayDelay(result, tooLong, pChoice, cChoice) {
    let arr = ["ROCK...","PAPER...","SCISSORS...","SHOOT!"];
    let imgArr = ["therock.png","paper.jpg","scissors.jpg","placeholder.png"];
    count = 0;
    document.getElementById("result").innerHTML = "";

    let loop = setInterval( function() { // handles images/words
        document.getElementById("player_image").src = imgArr[count];
        document.getElementById("computer_image").src = imgArr[count];
        if(count < 4) { 
            document.getElementById("result").innerHTML += arr[count];
            count++;
        } else { // ends intervals, determines final images and resets starting values.
            clearInterval(loop);
            picSwitch(pChoice,"player_image");         
            picSwitch(cChoice,"computer_image"); 
            document.getElementById("pScore").innerText = pScore;
            document.getElementById("cScore").innerText = cScore;
            document.getElementById("play").innerText = "PLAY AGAIN!";
            document.getElementById("play").style.display="inline-block";
            let labels = document.getElementsByTagName('label');
            for( let i = 0; i < labels.length; i++ ) { // makes labels unclickable until round starts
                labels[i].style.display = "none";         
            }
            if(document.querySelector('input[name="choice"]:checked') != null) { // unchecks previous choice
                document.querySelector('input[name="choice"]:checked').checked = false;
            }
            if(tooLong) { // if timer ran out adds an additional message
                document.getElementById("result").innerHTML = "You took too long so the computer chose for you. " + result;
            }
            else { document.getElementById("result").innerHTML = result; }
        }
                }, 800);
    return;
                
}

// function to handle final image connected to outcome for player/comp
function picSwitch(input, id) {
    switch(input) {
        case "ROCK":
        document.getElementById(id).src = "therock.png";
        break;
        case "PAPER":
        document.getElementById(id).src = "paper.jpg";
        break;
        case "SCISSORS":
        document.getElementById(id).src = "scissors.jpg";
        break; 
    }  
    return;
}
// a function to set up everything for the game as well as start 10s timer
function startRound() {
    let count = 10;
    buttonAlt = false;
    document.getElementById("result").innerText = "";
    document.getElementById("play").innerText = "PLAY HAND!";
    let labels = document.getElementsByTagName('label');
    for( let i = 0; i < labels.length; i++ ) {
        labels[i].style.display = "inline-block";         
    }

    let loop = setInterval( function() {
        count--;
        document.getElementById("timer").innerText = count;
        if(count == 5) {
            document.getElementById("timer").style.color = "red";
        } else if( count == -1) {
            clearInterval(loop);
            document.getElementById("timer").style.color = "black";
            document.getElementById("timer").innerText = "10";
            outcome(document.querySelector("input[name=\"choice\"]:checked"), true); 
        }
    }, 1000);

    document.getElementById("play").addEventListener("click", () => { // event listener to stop time once button has been clicked
        if(document.querySelector("input[name=\"choice\"]:checked")) {
        clearInterval(loop);
        document.getElementById("timer").style.color = "black";
        document.getElementById("timer").innerText = "10";
        }
    });
    return;
}
        

// Random Number Generator
function random_number(number) {
    return Math.floor(Math.random() * number);
}

// ensures no labels are checked if user refreshes their page
if(document.querySelector('input[name="choice"]:checked') != null) {
    document.querySelector('input[name="choice"]:checked').checked = false;
}