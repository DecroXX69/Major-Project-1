let r = document.getElementById('rule-btn');
let pg = document.getElementById('rulepage');
let cross = document.getElementById('whi');
let rock = document.querySelector('.rock');
let paper = document.querySelector('.paper');
let scissor = document.querySelector('.scissor');
let userScoreElement = document.getElementById('user-score-value');
let compScoreElement = document.getElementById('comp-score-value');
let userChoiceElement = document.getElementById('user-choice');
let compChoiceElement = document.getElementById('comp-choice');
let playAgainBtn = document.getElementById('play-again'); 
let userChoice;
let compChoice;
let uscore = parseInt(localStorage.getItem('userScore')) || 0;
let cscore = parseInt(localStorage.getItem('compScore')) || 0;
let resultsDiv = document.querySelector('.results');
let resultDivs = document.querySelectorAll('.results_result');
const gameDiv = document.querySelector('.game');
const resultWinner = document.querySelector('.results_winner');
const resultText = document.querySelector('.results_text');
const ruleBtnContainer = document.querySelector('.lel')
const nextBtnContainer = document.querySelector('.next')
const nextBtn = document.querySelector('.next-btn');
const rulesTempBtn = document.querySelector('.rules-temp');
let n = document.querySelector('.new')
let all = document.querySelector('.all')
const greetSection = document.getElementById('greet-section');
const greetPlayAgainBtn = document.getElementById('greet-play-again');
const greetRulesBtn = document.querySelector('.new-greet');
userScoreElement.textContent = uscore;
compScoreElement.textContent = cscore;


pg.style.display = 'none';
n.classList.remove('hidden')
all.classList.remove('hidden')

r.addEventListener("click", function() {
    if (pg.style.display === "block") {
        pg.style.display = "none";
    } else {
        pg.style.display = "block";
    }
});

n.addEventListener("click", function() {
    if (pg.style.display === "block") {
        pg.style.display = "none";
    } else {
        pg.style.display = "block";
    }
});

cross.addEventListener("click", function() {
    pg.style.display = "none";
});

rock.addEventListener('click', function() {
    userChoice = 'rock';
    compChoice = CompChoice();
    Win(userChoice, compChoice);
});

paper.addEventListener('click', function() {
    userChoice = 'paper';
    compChoice = CompChoice();
    Win(userChoice, compChoice);
});

scissor.addEventListener('click', function() {
    userChoice = 'scissor';
    compChoice = CompChoice();
    Win(userChoice, compChoice);
});


function CompChoice() {
    const choices = ['rock', 'paper', 'scissor'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
    
}

function displayResults(userChoice, compChoice) {
    resultDivs[0].innerHTML = `<div class="inner"><img src="./images/${userChoice}.png" alt="${userChoice}" style="width: 55px; height: 55px;" /></div>`;
    
        resultDivs[1].innerHTML = `<div class="inner"><img src="./images/${compChoice}.png" alt="${compChoice}" style="width: 55px; height: 55px;" /></div>`;
        updateResultBackgrounds(userChoice, compChoice);
       
   
    gameDiv.classList.add('hidden'); 
    resultsDiv.classList.remove('hidden'); 
    displayWinner(userChoice, compChoice);
}


function displayWinner(userChoice, compChoice) {
    const results = [{ name: userChoice, beats: getBeats(userChoice) }, { name: compChoice, beats: getBeats(compChoice) }];
    const userWins = isWinner(results);
    const pcWins = isWinner(results.reverse());

    if (userWins) {
        resultText.innerHTML = "<b>YOU WIN</b> <br> <b>AGAINST PC</b>";
        resultDivs[0].classList.add('winner');
        resultDivs[1].classList.remove('winner');
        playAgainBtn.innerText = "PLAY AGAIN";
        ruleBtnContainer.classList.remove('hidden')
        nextBtnContainer.classList.remove('hidden')
        n.classList.add('hidden')
        
    } else if (pcWins) {
        resultText.innerHTML = "<b>YOU LOST</b> <br> <b>AGAINST PC</b>";
        resultDivs[1].classList.add('winner');
        resultDivs[0].classList.remove('winner');
        playAgainBtn.innerText = "PLAY AGAIN";
        ruleBtnContainer.classList.add('hidden')
        nextBtnContainer.classList.add('hidden')
        n.classList.remove('hidden')
 
    } else {
        resultText.innerText = "TIE UP";
        resultDivs[0].classList.remove('winner');
        resultDivs[1].classList.remove('winner');
        playAgainBtn.innerText = "REPLAY";
        n.classList.remove('hidden')
    }

    resultWinner.classList.remove('hidden');
    resultsDiv.classList.add('show-winner');
    playAgainBtn.addEventListener('click', resetGame);
}

function getBeats(choice) {
    if (choice === 'rock') return 'scissor';
    if (choice === 'paper') return 'rock';
    if (choice === 'scissor') return 'paper';
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}


function Win(userChoice, compChoice) {
    displayResults(userChoice, compChoice);

    if ((userChoice === 'rock' && compChoice === 'scissor') ||
        (userChoice === 'paper' && compChoice === 'rock') ||
        (userChoice === 'scissor' && compChoice === 'paper')) {
        uscore++;
        userScoreElement.textContent = uscore;
       
    } else if (userChoice === compChoice) {
       
    console.log("its a tie")
    } else {
        cscore++;
        compScoreElement.textContent = cscore;
        
    }

    localStorage.setItem('compScore', cscore);
    localStorage.setItem('userScore', uscore);
}

function updateResultBackgrounds(userChoice, compChoice) {
    
    let userResult = document.querySelector('.user-result');
    let compResult = document.querySelector('.comp-result');
    switch (userChoice) {
        case 'rock':
            userResult.classList.add('bg-rock');
            break;
        case 'paper':
            userResult.classList.add('bg-paper');
            break;
        case 'scissor':
            userResult.classList.add('bg-scissor');
            break;
    }

    switch (compChoice) {
        case 'rock':
            compResult.classList.add('bg-rock');
            break;
        case 'paper':
            compResult.classList.add('bg-paper');
            break;
        case 'scissor':
            compResult.classList.add('bg-scissor');
            break;
    }
}

playAgainBtn.addEventListener('click', resetGame)
function resetGame() {
    
    resultDivs[0].innerHTML = '';
    resultDivs[1].innerHTML = '';
    
   
    resultDivs[0].classList.remove('bg-rock', 'bg-paper', 'bg-scissor', 'winner');
    resultDivs[1].classList.remove('bg-rock', 'bg-paper', 'bg-scissor', 'winner');

    resultWinner.classList.add('hidden');
    resultsDiv.classList.remove('show-winner');
    
  
    gameDiv.classList.remove('hidden');
    resultsDiv.classList.add('hidden');
    
    userChoice = null;
    compChoice = null;
    
    ruleBtnContainer.classList.add('hidden')
    nextBtnContainer.classList.add('hidden')
    n.classList.remove('hidden')
}

nextBtn.addEventListener('click', function() {
    greetSection.classList.remove('hidden');
    all.classList.add('hidden');
});


greetPlayAgainBtn.addEventListener('click', function() {
    greetSection.classList.add('hidden');
    resetGame();
    all.classList.remove('hidden')
});

greetRulesBtn.addEventListener("click", function() {
    if (pg.style.display === "block") {
        pg.style.display = "none";
    } else {
        pg.style.display = "block";
    }
});