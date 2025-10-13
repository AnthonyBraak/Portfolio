let cards = [];
let sum = 0;
let hasBlackjack = false;
let isAlive = false;

let message = "";
const messageEl = document.querySelector("#message-el");
const cardsEl = document.querySelector("#cards-el");
const sumEl = document.querySelector("#sum-el");
const btnNew = document.querySelector("#btn-new");
const birthday = document.querySelector("#birthday");
const ageContainer = document.querySelector("#age-container");
const gameContainer = document.querySelector("#game-container");

let player = {
  name: "Guest",
  chips: 100,
};

const playerEl = document.querySelector("#player-el");

function getScore() {
  if (player.chips < 0) {
    player.chips = 0;
  }
  playerEl.textContent = player.name + ": $" + player.chips;
}

// function to check if a player is old enough

function checkAge() {
  const now = new Date();
  const currentY = now.getFullYear();
  const ageGet = birthday.value;
  const age = new Date(ageGet);
  const ageYear = age.getFullYear();
  const realAge = currentY - ageYear;
  if (realAge >= 18) {
    message = "Welcome to the game";
    gameContainer.style.display = "inline";
    ageContainer.style.display = "none";
    getScore();
  } else {
    message =
      "To play, you must be at least 18. Come back when you are older than " +
      realAge;
  }
  messageEl.textContent = message;
}

//rounds down the random number to int, adds 1 to go from 1 to 13
//ace (1) counts as 11, the people (11, 12, 13) count as 10
function getRandCard() {
  const randomCard = Math.floor(Math.random() * 13) + 1;
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
  btnNew.style.display = "inline";
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
    btnNew.style.display = "none";
    getScore();
  } else {
    message = "Lost";
    isAlive = false;
    player.chips -= 20;
    btnNew.style.display = "none";
    getScore();
  }
  messageEl.textContent = message;
}
