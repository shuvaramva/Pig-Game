/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var dice = document.querySelector('.dice');
var rollDiceBtn = document.querySelector('.btn-roll');
var holdBtn = document.querySelector('.btn-hold');
var newGameBtn = document.querySelector('.btn-new');
var activeStatus = 0;

var player = {
    roundScore: 0,
    totalScore: [0,0]
}

resetScore();
function resetScore(){
    //In case of new game
    document.getElementById('name-' + activeStatus).textContent = 'Player '+ (activeStatus + 1);
    document.querySelector('.player-' + activeStatus + '-panel').classList.remove('winner');

    activeStatus = 0;
    for( var i = 0; i < player.totalScore.length; i++ ){
        player.totalScore[i] = 0;
        player.roundScore = 0;
        document.querySelector('#score-' + i).textContent = 0;
        document.querySelector('#current-' + i).textContent = 0;
    }
    document.querySelector('.player-' + activeStatus + '-panel').classList.add('active');
    dice.style.display = 'none';
    rollDiceBtn.disabled = false;
    holdBtn.disabled = false;
}

function changePlayer(){
    document.querySelector('.player-' + activeStatus + '-panel').classList.toggle('active');
    if( activeStatus == 0 ){
        activeStatus  = 1;
    }else{
        activeStatus  = 0;
    }
    document.querySelector('.player-' + activeStatus + '-panel').classList.toggle('active');
}

rollDiceBtn.addEventListener ('click', function(){
    
    var diceNum = Math.floor( Math.random() * 6 ) + 1;
    dice.style.display = 'block';
    dice.src = 'dice-' + diceNum + '.png';

    //change player score/status

    //if dice number is 1 reset the round score to 0
    //and change the player
    if( diceNum != 1 ){
        player.roundScore += diceNum;
        document.querySelector('#current-' + activeStatus).textContent = player.roundScore;
    }else{
        player.roundScore = 0;
        document.querySelector('#current-' + activeStatus).textContent = player.roundScore;
        changePlayer();
    }
});

holdBtn.addEventListener ('click', function(){
    player.totalScore[activeStatus] += player.roundScore;
    player.roundScore = 0;
    document.querySelector('#score-' + activeStatus).textContent = player.totalScore[activeStatus];
    document.querySelector('#current-' + activeStatus).textContent = 0;

    dice.style.display = 'none';

    if( player.totalScore[activeStatus] >= 100 ){
        document.getElementById('name-' + activeStatus).textContent = 'Winner';
        document.querySelector('.player-' + activeStatus + '-panel').classList.remove('active');
        document.querySelector('.player-' + activeStatus + '-panel').classList.add('winner');
        rollDiceBtn.disabled = true;
        holdBtn.disabled = true;
    }else{
        changePlayer();
    }
    
});

//new game
newGameBtn.addEventListener('click', function(){
    resetScore();
});