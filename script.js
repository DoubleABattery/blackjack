const main = document.querySelector("main");

document.querySelector('.play').addEventListener('click', function() {
    main.classList.remove('start');
    main.classList.add('game');
    main.innerHTML = `
        <h1>Blackjack</h1>
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

        <div class="dealer-total">Total: <span id="dealer-total">??</span></div>

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
    `;
});