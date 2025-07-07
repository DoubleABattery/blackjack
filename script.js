const main = document.querySelector("main");
const deck = [
    {name: "2", value: 2, image: "2C.png"},
    {name: "2", value: 2, image: "2D.png"},
    {name: "2", value: 2, image: "2H.png"},
    {name: "2", value: 2, image: "2S.png"},
    {name: "3", value: 3, image: "3C.png"},
    {name: "3", value: 3, image: "3D.png"},
    {name: "3", value: 3, image: "3H.png"},
    {name: "3", value: 3, image: "3S.png"},
    {name: "4", value: 4, image: "4C.png"},
    {name: "4", value: 4, image: "4D.png"},
    {name: "4", value: 4, image: "4H.png"},
    {name: "4", value: 4, image: "4S.png"},
    {name: "5", value: 5, image: "5C.png"},
    {name: "5", value: 5, image: "5D.png"},
    {name: "5", value: 5, image: "5H.png"},
    {name: "5", value: 5, image: "5S.png"},
    {name: "6", value: 6, image: "6C.png"},
    {name: "6", value: 6, image: "6D.png"},
    {name: "6", value: 6, image: "6H.png"},
    {name: "6", value: 6, image: "6S.png"},
    {name: "7", value: 7, image: "7C.png"},
    {name: "7", value: 7, image: "7D.png"},
    {name: "7", value: 7, image: "7H.png"},
    {name: "7", value: 7, image: "7S.png"},
    {name: "8", value: 8, image: "8C.png"},
    {name: "8", value: 8, image: "8D.png"},
    {name: "8", value: 8, image: "8H.png"},
    {name: "8", value: 8, image: "8S.png"},
    {name: "9", value: 9, image: "9C.png"},
    {name: "9", value: 9, image: "9D.png"},
    {name: "9", value: 9, image: "9H.png"},
    {name: "9", value: 9, image: "9S.png"},
    {name: "10", value: 10, image: "10C.png"},
    {name: "10", value: 10, image: "10D.png"},
    {name: "10", value: 10, image: "10H.png"},
    {name: "10", value: 10, image: "10S.png"},
    {name: "J", value: 10, image: "JC.png"},
    {name: "J", value: 10, image: "JD.png"},
    {name: "J", value: 10, image: "JH.png"},
    {name: "J", value: 10, image: "JS.png"},
    {name: "Q", value: 10, image: "QC.png"},
    {name: "Q", value: 10, image: "QD.png"},
    {name: "Q", value: 10, image: "QH.png"},
    {name: "Q", value: 10, image: "QS.png"},
    {name: "K", value: 10, image: "KC.png"},
    {name: "K", value: 10, image: "KD.png"},
    {name: "K", value: 10, image: "KH.png"},
    {name: "K", value: 10, image: "KS.png"},
    {name: "A", value: 11, image: "AC.png"},
    {name: "A", value: 11, image: "AD.png"},
    {name: "A", value: 11, image: "AH.png"},
    {name: "A", value: 11, image: "AS.png"}
];

var playerHandNames;
var playerHandValues;
var playerHandImages;
var dealerHandValues;
var dealerHandImages;
var dealerHandNames;
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
                    <div class="win-message">You win!</div>
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
    gameSetup();

});

document.querySelector('.play-again').addEventListener('click', function() {
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