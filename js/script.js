let CARDS_QUANTITY = 0;

function loadPage() {
  alert("Hello, welcome to the Parrot Card Game!");

  askCardsNumber();
}

function askCardsNumber () {

    while ((CARDS_QUANTITY % 2 !== 0) || (CARDS_QUANTITY < 4) || (CARDS_QUANTITY > 14)) {
        CARDS_QUANTITY = Number(prompt("Please, type the number of cards you want to play with (between 4 and 14)."));
    }

    playGame();
}

function renderCards (cards) {
    const board = document.querySelector(".board");

    for (let i = 0 ; i < cards.length ; i ++) {
        const card = `<li class="card" data-identifier="card" onclick="flipCard(this)">
        <div class='front-face face' data-identifier="front-face">
            <img src='assets/images/front.png'>
        </div>
            <div class='back-face face' data-identifier="back-face">
            <img src='assets/images/${cards[i]}parrot.gif'>
            </div>
        </li>`;
    
        board.innerHTML += card;
    }
}

function sortCards (cards, types) {

    for (let i = 0 ; i < (CARDS_QUANTITY /2) ; i ++) {
        const parrot = types[i];
        cards.push(parrot);
        cards.push(parrot);
    }

    cards.sort(comparator);
}

function playGame () {

    const types = ['bobross', 'explody', 'fiesta', 'metal', 'revertit', 'triplets', 'unicorn'];
    const cards = [];

    sortCards(cards, types);
    renderCards(cards);
}

function comparator() { 
	return Math.random() - 0.5; 
}

loadPage();
