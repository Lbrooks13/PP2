// --Game variables--
const checkButton = document.querySelector(".submit");
const inputElement = document.querySelector(".guess");
const hintControl = document.querySelector(".hint");
const resultElement = document.querySelector(".result");
const remainingValue = document.querySelector(".rem-val");
const allGuesses = document.querySelector(".all");
const tryAgainButton = document.querySelector(".reset");
const triesLast = document.getElementById("leaderboard");
const allowedGuessPerGame = 4;

let targetNumber;
let numberOfGuesses = allowedGuessPerGame;
let savedScoresArray = [];

// --Event Listeners--

//Random number generation
document.addEventListener("DOMContentLoaded", (e) => {
    targetNumber = getRandomInt(1, 100);
    console.log(targetNumber);
})

//Hides the check button and shows the try again button
tryAgainButton.addEventListener("click", (e) => {
    e.preventDefault();
    checkButton.hidden = false;
    tryAgainButton.hidden = true;
    resetGame();
})

//Input field validation and guesses
checkButton.addEventListener("click", (e) => {
    e.preventDefault();
    resultElement.textContent ="";

    if (!inputElement.value) {
        alert("Please enter a number.");
        clearGuessField();
        return;
    }

    if (inputElement.value > 100) {
        alert("Please enter a number equal to or lower than 100.");
        clearGuessField();
        return;
    }

    if (inputElement.value <= 0) {
        alert("Please enter a number equal to or higher than 1.");
        clearGuessField();
        return;
    }

    const guess = parseInt(inputElement.value, 10);

    if (allGuesses.textContent.includes(inputElement.value)) {
        alert("You cannot use the same number twice.")
        return;
    }

    if (numberOfGuesses !== 1 && guess !== targetNumber) { 
        updateHint(guess, targetNumber);
    }
    else if (numberOfGuesses ===1 && guess !== targetNumber) {
        alert(`Better luck next time! The correct number was: ${targetNumber} `);
        tryAgainButton.hidden = false;
        checkButton.hidden = true;
    }
    else if (guess === targetNumber) {
        resultElement.textContent = alert("Awesome! Well done!");
        tryAgainButton.hidden = false;
        checkButton.hidden = true;
        updateScores(5 - numberOfGuesses);
    }
        
    numberOfGuesses--;
    remainingValue.textContent = numberOfGuesses;
    allGuesses.textContent += guess + ", ";
})


// --Functions--

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
  
//Game hints
function updateHint(guess, value) {
    if (guess < value) {
        hintControl.textContent = "Hint : Higher";
    }
    else {
        hintControl.textContent = "Hint : Lower";
    }
    clearGuessField();
}

//Game reset
function resetGame() {
   
    numberOfGuesses = allowedGuessPerGame;
    resultElement.textContent = "";
    hintControl.textContent = "";
    remainingValue.textContent = "";
    targetNumber = getRandomInt(1, 100);
    allGuesses.textContent = "";
    clearGuessField();
    console.log(targetNumber);
}

//Score update
function updateScores(score) {
    
    if (savedScoresArray.length >= 5) {
        savedScoresArray.pop();
    }

    savedScoresArray.push(score);
    savedScoresArray.sort((a, b) => a - b);
    triesLast.innerHTML = '';

    savedScoresArray.forEach(function(item) {       
        let listItem = document.createElement('li');
        listItem.textContent = item;
        if (item ==1) {
            listItem.textContent += " guess";
        } else { 
            listItem.textContent += " guesses"
        }
        triesLast.appendChild(listItem);
    })
}

//Clear guess input field
function clearGuessField () {
    inputElement.value = "";
}

//Please note : The winning number is logged to the console for testing purposes upon each refresh.