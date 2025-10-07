let cards = [];
let sum = 0;
let hasBlackjack = false;
let isAlive = false;

let message = "";
let messageEl = document.querySelector("#message-el");
let cardsEl = document.querySelector("#cards-el");
let sumEl = document.querySelector("#sum-el");

let player = {
  name: "Guest",
  chips: 100,
};

let playerEl = document.querySelector("#player-el");

function getScore() {
  if (player.chips < 0) {
    player.chips = 0;
  }
  playerEl.textContent = player.name + ": $" + player.chips;
}

getScore();
// function to check if a player is old enough, to be integrated later
//let age = 21;
//if (age < 18) {
//  message = "Come back when you are older";
//} else {
//  message = "Welcome to the game";
//}

//rounds down the random number to int, adds 1 to go from 1 to 13
//ace (1) counts as 11, the people (11, 12, 13) count as 10
function getRandCard() {
  let randomCard = Math.floor(Math.random() * 13) + 1;
  if (randomCard === 1) {
    return 11;
  } else if (randomCard > 10) {
    return 10;
  } else {
    return randomCard;
  }
}

//start a new game, reset values
function startGame() {
  cards = [];
  cards[0] = getRandCard();
  cards[1] = getRandCard();
  sum = cards[0] + cards[1];
  isAlive = true;
  hasBlackjack = false;
  renderGame();
}

//adds a card as long as the game is (still) playable
function newCard() {
  if (isAlive && !hasBlackjack) {
    let card = getRandCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    message = "New card?";
  } else if (sum === 21) {
    message = "Blackjack";
    hasBlackjack = true;
    player.chips += 100;
    getScore();
  } else {
    message = "Lost";
    isAlive = false;
    player.chips -= 20;
    getScore();
  }
  messageEl.textContent = message;
}
