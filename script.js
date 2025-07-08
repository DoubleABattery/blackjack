const main = document.querySelector("main");
const deck = [
    {name: "2", value: 2, image: "cards/2C.png"},
    {name: "2", value: 2, image: "cards/2D.png"},
    {name: "2", value: 2, image: "cards/2H.png"},
    {name: "2", value: 2, image: "cards/2S.png"},
    {name: "3", value: 3, image: "cards/3C.png"},
    {name: "3", value: 3, image: "cards/3D.png"},
    {name: "3", value: 3, image: "cards/3H.png"},
    {name: "3", value: 3, image: "cards/3S.png"},
    {name: "4", value: 4, image: "cards/4C.png"},
    {name: "4", value: 4, image: "cards/4D.png"},
    {name: "4", value: 4, image: "cards/4H.png"},
    {name: "4", value: 4, image: "cards/4S.png"},
    {name: "5", value: 5, image: "cards/5C.png"},
    {name: "5", value: 5, image: "cards/5D.png"},
    {name: "5", value: 5, image: "cards/5H.png"},
    {name: "5", value: 5, image: "cards/5S.png"},
    {name: "6", value: 6, image: "cards/6C.png"},
    {name: "6", value: 6, image: "cards/6D.png"},
    {name: "6", value: 6, image: "cards/6H.png"},
    {name: "6", value: 6, image: "cards/6S.png"},
    {name: "7", value: 7, image: "cards/7C.png"},
    {name: "7", value: 7, image: "cards/7D.png"},
    {name: "7", value: 7, image: "cards/7H.png"},
    {name: "7", value: 7, image: "cards/7S.png"},
    {name: "8", value: 8, image: "cards/8C.png"},
    {name: "8", value: 8, image: "cards/8D.png"},
    {name: "8", value: 8, image: "cards/8H.png"},
    {name: "8", value: 8, image: "cards/8S.png"},
    {name: "9", value: 9, image: "cards/9C.png"},
    {name: "9", value: 9, image: "cards/9D.png"},
    {name: "9", value: 9, image: "cards/9H.png"},
    {name: "9", value: 9, image: "cards/9S.png"},
    {name: "10", value: 10, image: "cards/10C.png"},
    {name: "10", value: 10, image: "cards/10D.png"},
    {name: "10", value: 10, image: "cards/10H.png"},
    {name: "10", value: 10, image: "cards/10S.png"},
    {name: "J", value: 10, image: "cards/JC.png"},
    {name: "J", value: 10, image: "cards/JD.png"},
    {name: "J", value: 10, image: "cards/JH.png"},
    {name: "J", value: 10, image: "cards/JS.png"},
    {name: "Q", value: 10, image: "cards/QC.png"},
    {name: "Q", value: 10, image: "cards/QD.png"},
    {name: "Q", value: 10, image: "cards/QH.png"},
    {name: "Q", value: 10, image: "cards/QS.png"},
    {name: "K", value: 10, image: "cards/KC.png"},
    {name: "K", value: 10, image: "cards/KD.png"},
    {name: "K", value: 10, image: "cards/KH.png"},
    {name: "K", value: 10, image: "cards/KS.png"},
    {name: "A", value: 11, image: "cards/AC.png"},
    {name: "A", value: 11, image: "cards/AD.png"},
    {name: "A", value: 11, image: "cards/AH.png"},
    {name: "A", value: 11, image: "cards/AS.png"}
];

var gameDeck;
var playerHand = [];
var dealerHand = [];
var playerTotal;
var dealerTotal; 
var dealerWins = 0;
var playerWins = 0;

document.querySelector('.play').addEventListener('click', function() {
    main.classList.remove('start');
    main.classList.add('game');
    main.innerHTML = `
        <div class="game">
            <div class="dealer-cards-container">
                <div id="dealer-card0" class="dealer-card"><img src="cardback.png"></div>
                <div id="dealer-card1" class="dealer-card"><img src="cardback.png"></div>
                <div id="dealer-card2" class="dealer-card"><img src="cardback.png"></div>
                <div id="dealer-card3" class="dealer-card"><img src="cardback.png"></div>
                <div id="dealer-card4" class="dealer-card"><img src="cardback.png"></div>
                <div id="dealer-card5" class="dealer-card"><img src="cardback.png"></div>
                <div id="dealer-card6" class="dealer-card"><img src="cardback.png"></div>
                <div id="dealer-card7" class="dealer-card"><img src="cardback.png"></div>
            </div>

            <div class="center-container">
                <div class="dealer-total">Dealer Total: <span id="dealer-total">??</span></div>
                <div class="wins-counter">
                    <div>Your Wins: <span id="player-wins">0</span></div>
                    <div class="game-result">
                        <div class="win-message"></div>
                        <div class="play-again hidden">Play Again</div>
                    </div>
                    <div>Dealer Wins: <span id="dealer-wins">0</span></div>
                </div>
                <div class="player-side">
                    <button class="hit-button">Hit</button>
                    <div class="player-total">Player Total: <span id="player-total">??</span></div>
                    <button class="stand-button">Stand</button>
                </div>
            </div>

            <div class="player-cards-container">
                <div id="player-card0" class="player-card"><img src="cardback.png"></div>
                <div id="player-card1" class="player-card"><img src="cardback.png"></div>
                <div id="player-card2" class="player-card"><img src="cardback.png"></div>
                <div id="player-card3" class="player-card"><img src="cardback.png"></div>
                <div id="player-card4" class="player-card"><img src="cardback.png"></div>
                <div id="player-card5" class="player-card"><img src="cardback.png"></div>
                <div id="player-card6" class="player-card"><img src="cardback.png"></div>
                <div id="player-card7" class="player-card"><img src="cardback.png"></div> 
            </div>
        </div>
    `;

    document.querySelector('.play-again').addEventListener('click', function() {
        document.querySelector('.play-again').classList.add('hidden');
        document.querySelector('.hit-button').classList.remove('hidden');
        document.querySelector('.stand-button').classList.remove('hidden');
        document.querySelector('.win-message').classList.remove('shown');
        document.querySelector('.win-message').classList.remove('player-won');
        document.querySelector('.win-message').classList.remove('dealer-won');
        document.querySelector('.win-message').classList.remove('tie');
        playerTotal = 0;
        dealerTotal = 0;
        playerHand = [];
        dealerHand = [];
        document.getElementById('dealer-total').innerHTML = "??";
        gameSetup();
    });

    document.querySelector('.hit-button').addEventListener('click', function() {
        playerTotal = hit(playerHand, playerTotal);
        updateScreen();
        if (playerTotal > 21) {
            win("dealer");
        } else if (playerTotal == 21) {
            dealerTurn();
        }
    });

    document.querySelector('.stand-button').addEventListener('click', function() {
        dealerTurn();
    });
    
    gameSetup();

});



function shuffle(){
  var tempDeck = [];
  for(var i = 0; i<52; i++){
    var k = Math.floor(Math.random() * gameDeck.length);
    tempDeck.push(gameDeck[k]);
    gameDeck.splice(k,1);
  }
  gameDeck = tempDeck;
}

function deal(hand, player){
  for(var i = 0; i<2; i++){
    hand.push(gameDeck.pop());
  }
  if (hand[0].name=="ace" && hand[1].name == "ace"){
    hand[0].value = 11;
    hand[1].value = 1;
  }
  if (player == "player"){
    playerHand = hand;
  } else {
    dealerHand = hand;
  }
  return hand[0].value + hand[1].value;
}

function hit(hand, total){
  hand.push(gameDeck.pop());
  if (hand[hand.length-1].name=="Ace" && total>=11){
    hand[hand.length-1].value = 1;
  } 
  for (var i = 0; i<hand.length; i++){
    if ((hand[i].name == "Ace") && (total+hand[hand.length-1].value>21)){
      hand[i].value = 1;
    }
  }
  total = 0;
  for (var j = 0; j<hand.length; j++){
    total += hand[j].value;
  }
  return total;
}

function updateScreen(){
  for (var i = 0; i<playerHand.length;i++){
    document.getElementById("player-card"+i).innerHTML = `<img src="${playerHand[i].image}">`;
  }
  document.getElementById("player-total").innerHTML = playerTotal;
}

function gameSetup(){
  for (var i = 0; i<8;i++){
    document.getElementById("player-card"+i).innerHTML = '';
    document.getElementById("dealer-card"+i).innerHTML = '';
  }

  gameDeck = structuredClone(deck);
  console.log(gameDeck);
  
  shuffle();
  playerTotal =  deal(playerHand, "player");
  dealerTotal = deal(dealerHand, "dealer");
  updateScreen();
  
  document.getElementById("dealer-card0").innerHTML = `<img src="cardback.png">`;
  document.getElementById("dealer-card1").innerHTML = `<img src="${dealerHand[1].image}">`;

  if (playerTotal == 21 && dealerTotal == 21){
    document.getElementById('dealer-total').innerHTML = dealerTotal
    document.getElementById("dealer-card1").innerHTML = `<img src="${dealerHand[0].image}">`;
    win("tie");
  } else if (dealerTotal == 21){
    document.getElementById("dealer-card0").innerHTML = `<img src="${dealerHand[0].image}">`;
    document.getElementById("dealer-total").innerHTML = dealerTotal;
    win("dealer");
  } else if (playerTotal == 21){
    win("player");
  }
}

function dealerTurn(){
  document.querySelector('.hit-button').classList.add('hidden');
  document.querySelector('.stand-button').classList.add('hidden');
  document.getElementById("dealer-card0").innerHTML = `<img src="${dealerHand[0].image}">`;
  while (dealerTotal<17){
    dealerTotal = hit(dealerHand, dealerTotal);
  }
  for (var i = 0; i<dealerHand.length;i++){
    document.getElementById("dealer-card"+i).innerHTML = `<img src="${dealerHand[i].image}">`;
  }
  document.getElementById("dealer-total").innerHTML = dealerTotal;
  if (playerTotal == dealerTotal){
    win("tie");
  } else if (dealerTotal>21){
    win("player");
  } else if (playerTotal > dealerTotal){
    win("player");
  } else if (playerTotal<dealerTotal){
    win("dealer");
  }
}

function win(winner){
    win_message = document.querySelector('.win-message');     
    document.querySelector('.play-again').classList.remove('hidden');
    document.querySelector('.hit-button').classList.add('hidden');
    document.querySelector('.stand-button').classList.add('hidden');
    win_message.classList.add('shown');
    if (winner == "player"){
        win_message.innerHTML = "You won!";
        win_message.classList.add('player-won');
        playerWins += 1;
        document.getElementById('player-wins').innerHTML = playerWins;
    } else if (winner == "dealer"){
        win_message.innerHTML = "You lost!";
        win_message.classList.add('dealer-won');
        dealerWins += 1;
        document.getElementById('dealer-wins').innerHTML = dealerWins;
    } else {
        win_message.innerHTML = "Tie";
        win_message.classList.add('tie');
        dealerWins += 1;
        playerWins += 1;
        document.getElementById('player-wins').innerHTML = playerWins;
        document.getElementById('dealer-wins').innerHTML = dealerWins;
    }
}