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
var playerTotal = 0;
var dealerTotal = 0;
var chipsAmount = 700;
var potAmount = 0;
var gotBlackjack = false;

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
    const player_side = document.querySelector('.player-side');
    const chips = document.getElementById('chips');
    const pot = document.getElementById('pot');
    const betting = document.querySelector('.betting');
    const bet_button = document.querySelector('.bet-button');
    const slider = document.querySelector('.slider');
    const textInput = document.querySelector('.text')
    const dealer_card0 = document.getElementById("dealer-card0");
    const dealer_card1 = document.getElementById("dealer-card1");
    const blackjack_message = document.querySelector('.blackjack-message');
    
    const double_down = document.createElement('button');
    double_down.classList.add('double-down-button');
    double_down.innerHTML = 'Double Down';
    
    toggleRoundUI("hide");

    slider.oninput = () => {
        document.getElementById("bet-amount").innerHTML = slider.value;
        textInput.value = slider.value
    }

    textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter'){
            textInput.blur();
        }
    });

    textInput.addEventListener('blur', function() {
        let value = Math.ceil(textInput.value);
        if (value>chipsAmount){
            textInput.value=chipsAmount
        } else if (value<1){
            textInput.value=1
        }
        document.getElementById("bet-amount").innerHTML = textInput.value;
        slider.value = textInput.value;
    });

    bet_button.addEventListener('click', function() {
        potAmount = parseInt(slider.value);
        pot.innerHTML = potAmount;
        chipsAmount = chipsAmount - potAmount;
        chips.innerHTML = chipsAmount;
        toggleRoundUI("show");
        gameSetup();
    });

    document.querySelector(".buy-back").addEventListener('click', function() {
        document.getElementById("chips-warning-container").classList.add("hidden");
        chipsAmount = 700;
        slider.setAttribute("max", `${chipsAmount}`);
        document.getElementById("bet-amount").innerHTML = slider.value;
        textInput.value = slider.value;
        chips.innerHTML = chipsAmount;
    });

    play_again.addEventListener('click', function() {
        play_again.classList.add('hidden');
        win_message.classList.remove('shown');
        win_message.classList.remove('player-won');
        win_message.classList.remove('dealer-won');
        win_message.classList.remove('tie');
        betting.classList.remove('hidden');
        gotBlackjack = false;
        if (chipsAmount == 0){
            document.getElementById("chips-warning-container").classList.remove("hidden");
        } else {
            slider.setAttribute("max", `${chipsAmount}`);
        }
        document.getElementById("bet-amount").innerHTML = slider.value;
        textInput.value = slider.value;
        player_total.classList = [];
        blackjack_message.innerHTML = '';
        playerTotal = 0;
        dealerTotal = 0;
        playerHand = [];
        dealerHand = [];
        dealer_total.innerHTML = "??";
        for (var i = 0; i<8;i++){
            document.getElementById("player-card"+i).innerHTML = '';
            document.getElementById("dealer-card"+i).innerHTML = '';
        }
        toggleRoundUI("hide");
    });

    hit_button.addEventListener('click', function() {
        playerTotal = hit(playerHand, playerTotal);
        updateScreen();
        if (playerTotal > 21) {
            win("dealer");
            player_total.classList.add('bust');
            showDealerCard();
        } else if (playerTotal == 21) {
            dealerTurn();
        }
    });

    double_down.addEventListener('click', function() {
        chipsAmount -= potAmount;
        potAmount += potAmount;
        pot.innerHTML = potAmount;
        chips.innerHTML = chipsAmount;
        player_side.removeChild(double_down);
        playerTotal = hit(playerHand, playerTotal);
        updateScreen();
        if (playerTotal > 21) {
            win("dealer");
            player_total.classList.add('bust');
            showDealerCard();
        } else {
            dealerTurn();
        }
    });

    stand_button.addEventListener('click', function() {
        dealerTurn();
    });
    
    function toggleRoundUI(toggle) {
        if (toggle==="hide"){
            player_side.classList.add('hidden');
            document.querySelector('.dealer-total').classList.add('hidden');
        } else {
            player_side.classList.remove('hidden');
            document.querySelector('.dealer-total').classList.remove('hidden');
            hit_button.classList.remove("hidden");
            stand_button.classList.remove("hidden");
        }
    }

    function shuffle(){
        var tempDeck = [];
        for(var i = 0; i<52; i++){
            var k = Math.floor(Math.random() * gameDeck.length);
            tempDeck.push(gameDeck[k]);
            gameDeck.splice(k,1);
        }
        gameDeck = tempDeck;
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

    function sleep(){
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    function showDealerCard(){
        dealer_card1.innerHTML = `<img src="${dealerHand[1].image}">`;
        dealer_total.innerHTML = dealerTotal;
    }

    async function gameSetup(){
        player_total.innerHTML = '';
        dealer_total.innerHTML = '';
        betting.classList.add('hidden');
        hit_button.classList.add('hidden');
        stand_button.classList.add('hidden');

        gameDeck = structuredClone(deck);
        
        shuffle();

        for(let i = 0; i<2; i++){
            playerHand.push(gameDeck.pop());
            dealerHand.push(gameDeck.pop());
            
            if (i==1){
                if (playerHand[0].name=="A" && playerHand[1].name == "A"){
                    playerHand[1].value = 1;
                }
                if (dealerHand[0].name=="A" && dealerHand[1].name == "A"){
                    dealerHand[1].value = 1;
                }
            }

            playerTotal+=playerHand[i].value;
            dealerTotal+=dealerHand[i].value;
        }

        await sleep();
        document.getElementById("player-card0").innerHTML = `<img src="${playerHand[0].image}">`;
        player_total.innerHTML = playerHand[0].value;
        await sleep();
        dealer_card0.innerHTML = `<img src="${dealerHand[0].image}">`;
        dealer_total.innerHTML = dealerHand[0].value;

        await sleep();
        document.getElementById("player-card1").innerHTML = `<img src="${playerHand[1].image}">`;
        player_total.innerHTML = playerTotal;
        await sleep();
        dealer_card1.innerHTML = `<img src="cardback.png">`;
        dealer_total.innerHTML = '??';

        await sleep();
        hit_button.classList.remove('hidden');
        stand_button.classList.remove('hidden');

        if ((playerTotal==9 || playerTotal==10 || playerTotal==11) && chipsAmount>=potAmount){
            hit_button.before(double_down);
        }

        if (playerTotal == 21 && dealerTotal == 21){
            showDealerCard();
            win("tie");
        } else if (dealerTotal == 21){
            showDealerCard();
            win("dealer");
        } else if (playerTotal == 21){
            gotBlackjack = true;
            win("player");
            blackjack_message.innerHTML = "Blackjack!";
            player_total.classList.add('blackjack');
        }
    }

    function dealerTurn(){
        hit_button.classList.add('hidden');
        stand_button.classList.add('hidden');
        if (player_side.contains(double_down)){
            player_side.removeChild(double_down);
        }
        setTimeout(dealerHit, 1000);
    }

    function dealerHit(){
        showDealerCard();
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
        if (player_side.contains(double_down)){
            player_side.removeChild(double_down);
        }
        play_again.classList.remove('hidden');
        hit_button.classList.add('hidden');
        stand_button.classList.add('hidden');
        win_message.classList.add('shown');
        if (winner == "player"){
            if (gotBlackjack){
                chipsAmount += Math.ceil(2.5*potAmount);
            } else{
                chipsAmount += 2*potAmount;
            }
            win_message.innerHTML = "You won!";
            win_message.classList.add('player-won');
        } else if (winner == "dealer"){
            win_message.innerHTML = "You lost!";
            win_message.classList.add('dealer-won');
        } else {
            win_message.classList.add('tie');
            win_message.innerHTML = "Tie!";
            chipsAmount += potAmount;
        }
        pot.innerHTML = 0;
        chips.innerHTML = chipsAmount;
    }
});