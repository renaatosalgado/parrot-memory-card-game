let CARDS_QUANTITY = 0;

let FIRST_CARD = null;
let SECOND_CARD = null;
let FLIPPED_CARDS = 0;
let MOVES = 0;

let COUNTER = 0;
let ID_COUNTER;

function loadPage() {
  alert("Hello, welcome to the Parrot Card Game!");

  askCardsNumber();
}

function askCardsNumber() {
  while (
    CARDS_QUANTITY % 2 !== 0 ||
    CARDS_QUANTITY < 4 ||
    CARDS_QUANTITY > 14
  ) {
    CARDS_QUANTITY = Number(
      prompt(
        "Please, type the number of cards you want to play with (between 4 and 14)."
      )
    );
  }

  playGame();
}

function renderCards(cards) {
  const board = document.querySelector(".board");

  for (let i = 0; i < cards.length; i++) {
    const card = `<li class="card" data-identifier="card" onclick="flipCard(this), addMove();">
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

function sortCards(cards, types) {
  for (let i = 0; i < CARDS_QUANTITY / 2; i++) {
    const parrot = types[i];
    cards.push(parrot);
    cards.push(parrot);
  }

  cards.sort(comparator);
}

function playGame() {
  const types = [
    "bobross",
    "explody",
    "fiesta",
    "metal",
    "revertit",
    "triplets",
    "unicorn",
  ];
  const cards = [];

  sortCards(cards, types);
  renderCards(cards);
  startCounter();
}

function startCounter() {
  ID_COUNTER = setInterval(function () {
    COUNTER++;
    document.querySelector(".counter span").innerHTML = COUNTER;
  }, 1000);
}

function addMove() {
  document.querySelector(".moves span").innerHTML = MOVES;
}

function comparator() {
  return Math.random() - 0.5;
}

function flipCard(flippedCard) {
  if (flippedCard.classList.contains("flipped")) {
    return;
  }

  if (SECOND_CARD !== null) {
    return;
  }

  MOVES++;

  if (FIRST_CARD === null) {
    FIRST_CARD = flippedCard;
  } else {
    SECOND_CARD = flippedCard;

    if (FIRST_CARD.innerHTML === SECOND_CARD.innerHTML) {
      FLIPPED_CARDS += 2;
      resetCards();
      setTimeout(verifyEndGame, 1000);
    } else {
      setTimeout(unflipCards, 1000);
    }
  }

  flippedCard.classList.add("flipped");
}

function unflipCards() {
  FIRST_CARD.classList.remove("flipped");
  SECOND_CARD.classList.remove("flipped");
  resetCards();
}

function resetCards() {
  FIRST_CARD = null;
  SECOND_CARD = null;
}

function resetGame() {
  COUNTER = 0;
  document.querySelector(".counter span").innerHTML = COUNTER;

  MOVES = 0;
  document.querySelector(".moves span").innerHTML = MOVES;

  CARDS_QUANTITY = 0;
  FLIPPED_CARDS = 0;
  resetCards();
}

function resetBoard() {
    document.querySelector(".board").innerHTML = "";
}

function verifyEndGame() {
  if (FLIPPED_CARDS === CARDS_QUANTITY) {
    document.querySelector("ul").innerHTML = "";

    alert(`You won the game in ${COUNTER} seconds, with ${MOVES} moves.`);

    clearInterval(ID_COUNTER);

    const playAgain = confirm("Do you wanna play again?");

    if (playAgain) {
      resetGame();
      askCardsNumber();
    } else {
      resetGame();
      document.querySelector(".board").innerHTML = `
      <p>Thank you for playing!</p>
      <button onclick="resetBoard(), askCardsNumber();">Play again</button>
      `
    }
  }
}

loadPage();
