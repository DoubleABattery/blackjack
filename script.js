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

document.querySelector('.play').addEventListener('click', async function() {
    main.innerHTML = '';
    main.classList.remove('start');
    main.classList.add('game');
    await (async () => {
        const response = await fetch('game.html');
        const html = await response.text();
        main.innerHTML = html;
    })();
    
    const play_again = document.querySelector('.play-again');
    const hit_button = document.querySelector('.hit-button');
    const stand_button = document.querySelector('.stand-button');
    const win_message = document.querySelector('.win-message');
    const dealer_total = document.getElementById('dealer-total');
    const player_total = document.getElementById('player-total');
    const player_wins = document.getElementById('player-wins');
    const dealer_wins = document.getElementById('dealer-wins');
    const dealer_card0 = document.getElementById("dealer-card0");
    const dealer_card1 = document.getElementById("dealer-card1");
    const blackjack_message = document.querySelector('.blackjack-message');

    play_again.addEventListener('click', function() {
        play_again.classList.add('hidden');
        hit_button.classList.remove('hidden');
        stand_button.classList.remove('hidden');
        win_message.classList.remove('shown');
        win_message.classList.remove('player-won');
        win_message.classList.remove('dealer-won');
        win_message.classList.remove('tie');
        blackjack_message.innerHTML = '';
        playerTotal = 0;
        dealerTotal = 0;
        playerHand = [];
        dealerHand = [];
        dealer_total.innerHTML = "??";
        gameSetup();
    });

    hit_button.addEventListener('click', function() {
        playerTotal = hit(playerHand, playerTotal);
        updateScreen();
        if (playerTotal > 21) {
            win("dealer");
        } else if (playerTotal == 21) {
            dealerTurn();
        }
    });

    stand_button.addEventListener('click', function() {
        dealerTurn();
    });
    
    gameSetup();

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
        if (hand[0].name=="A" && hand[1].name == "A"){
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
        if (hand[hand.length-1].name=="A" && total>=11){
            hand[hand.length-1].value = 1;
        } 
        for (var i = 0; i<hand.length; i++){
            if ((hand[i].name == "A") && (total+hand[hand.length-1].value>21)){
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
        player_total.innerHTML = playerTotal;
    }

    function gameSetup(){
        for (var i = 0; i<8;i++){
            document.getElementById("player-card"+i).innerHTML = '';
            document.getElementById("dealer-card"+i).innerHTML = '';
        }

        gameDeck = structuredClone(deck);
        
        shuffle();
        playerTotal =  deal(playerHand, "player");
        dealerTotal = deal(dealerHand, "dealer");
        updateScreen();

        dealer_card0.innerHTML = `<img src="cardback.png">`;
        dealer_card1.innerHTML = `<img src="${dealerHand[1].image}">`;

        if (playerTotal == 21 && dealerTotal == 21){
            dealer_total.innerHTML = dealerTotal
            dealer_card1.innerHTML = `<img src="${dealerHand[0].image}">`;
            win("tie");
        } else if (dealerTotal == 21){
            dealer_card0.innerHTML = `<img src="${dealerHand[0].image}">`;
            dealer_total.innerHTML = dealerTotal;
            win("dealer");
        } else if (playerTotal == 21){
            win("player");
            blackjack_message.innerHTML = "Blackjack!";
        }
    }

    function dealerTurn(){
        hit_button.classList.add('hidden');
        stand_button.classList.add('hidden');
        setTimeout(dealerHit, 1000);
    }

    function dealerHit(){
        dealer_total.innerHTML = dealerTotal;
        dealer_card0.innerHTML = `<img src="${dealerHand[0].image}">`;
        let i = 2;
        const hitInterval = setInterval(() => { 
            if (dealerTotal >= 17){
                clearInterval(hitInterval);
                if (playerTotal == dealerTotal){
                    win("tie");
                } else if (dealerTotal>21 || dealerTotal < playerTotal){
                    win("player");
                } else if (playerTotal<dealerTotal){
                    win("dealer");
                }
            } else {
                dealerTotal = hit(dealerHand, dealerTotal);
                dealer_total.innerHTML = dealerTotal;
                document.getElementById("dealer-card"+i).innerHTML = `<img src="${dealerHand[i].image}">`;
                i++;
            }
        }, 1000);  
    }

    function win(winner){    
        play_again.classList.remove('hidden');
        hit_button.classList.add('hidden');
        stand_button.classList.add('hidden');
        win_message.classList.add('shown');
        if (winner == "player"){
            win_message.innerHTML = "You won!";
            win_message.classList.add('player-won');
            playerWins += 1;
            player_wins.innerHTML = playerWins;
        } else if (winner == "dealer"){
            win_message.innerHTML = "You lost!";
            win_message.classList.add('dealer-won');
            dealerWins += 1;
            dealer_wins.innerHTML = dealerWins;
        } else {
            win_message.classList.add('tie');
            win_message.innerHTML = "Tie!";
            dealerWins += 1;
            playerWins += 1;
            player_wins.innerHTML = playerWins;
            dealer_wins.innerHTML = dealerWins;
        }
    }
});