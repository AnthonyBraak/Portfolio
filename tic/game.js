const cells = document.querySelectorAll(".cell");
const opponentText = document.querySelector("#text-opponent");
const statusText = document.querySelector("#text-status");

const playerBtn = document.querySelector("#btn-player");
const computerBtn = document.querySelector("#btn-computer");
const backBtn = document.querySelector("#btn-back");
const restartBtn = document.querySelector("#btn-restart");
const easyBtn = document.querySelector("#btn-easy");

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = [];
let history;

let currentPlayer;
let running = false;

playerBtn.addEventListener("click", playPVP);
computerBtn.addEventListener("click", playPVC);
easyBtn.addEventListener("click", goEasy);

cells.forEach((cell) => cell.addEventListener("click", clickCell));
backBtn.addEventListener("click", goBack);
restartBtn.addEventListener("click", restartGame);

let isComputerThinking = false;
let computer = false;
let easyMode = false;

// default mode
playPVP();

function playPVP() {
  opponentText.textContent = "Player 1 vs Player 2";
  computer = false;
  startGame();
}
function playPVC() {
  opponentText.textContent = "Player 1 vs Computer";
  computer = true;
  startGame();
}

function startGame() {
  // Fill with empty Strings for fresh start
  options = ["", "", "", "", "", "", "", "", ""];
  history = [[...options]];
  currentPlayer = "X";
  renderGame();
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}
function clickCell() {
  const cellIndex = this.getAttribute("cellIndex");
  makeMove(cellIndex);
}
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
  // If it's PVC, the computer makes a turn after 0.5 seconds
  if (computer && currentPlayer === "O" && !isComputerThinking) {
    isComputerThinking = true;
    setTimeout(() => {
      computerTurn();
      isComputerThinking = false;
    }, 500);
  }
}
function computerTurn() {
  // Computer tríes to win first
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    const line = [options[a], options[b], options[c]];
    // Get what entries are in each line
    const counts = line.reduce(
      (acc, val) => {
        if (val === currentPlayer) acc.own++;
        else if (val === "") acc.empty++;
        else acc.opponent++;
        return acc;
      },
      { own: 0, opponent: 0, empty: 0 }
    );
    //if two cells of a line are O and the last is empty, Computer wins
    if (counts.own === 2 && counts.empty === 1) {
      const emptyIndex = combo.find((i) => options[i] === "");
      makeMove(emptyIndex);
      return;
    }
  }
  // In normal mode, it tries to block player second
  if (!easyMode) {
    for (let combo of winCombos) {
      const [a, b, c] = combo;
      const line = [options[a], options[b], options[c]];

      const counts = line.reduce(
        (acc, val) => {
          if (val === currentPlayer) acc.own++;
          else if (val === "") acc.empty++;
          else acc.opponent++;
          return acc;
        },
        { own: 0, opponent: 0, empty: 0 }
      );

      if (counts.opponent === 2 && counts.empty === 1) {
        const emptyIndex = combo.find((i) => options[i] === "");
        makeMove(emptyIndex);
        return;
      }
    }
  }

  // Computer picks an empty cell as a fallback
  const emptyCells = options
    .map((val, i) => (val === "" ? i : null))
    .filter((i) => i !== null);
  if (emptyCells.length > 0) {
    const randomIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex);
  }
}
function makeMove(index) {
  if (options[index] !== "" || !running) return;
  options[index] = currentPlayer;
  history.push([...options]);
  renderGame();
  checkWinner();
}
function checkWinner() {
  for (let combo of winCombos) {
    let [a, b, c] = combo;
    let values = [options[a], options[b], options[c]];
    if (values.includes("")) continue;
    if (values.every((val) => val === values[0])) {
      statusText.textContent = `${currentPlayer} wins!`;
      running = false;
      return;
    }
  }
  // If there are no free cells left, it's a draw
  if (!options.includes("")) {
    statusText.textContent = `It's a draw!`;
    running = false;
  } else {
    switchPlayer();
  }
}
function goBack() {
  // If a move has been made
  if (history.length > 1) {
    // If it's PVC, it goes back to the player's last move
    if (computer) {
      if (running) {
        history.pop();
        history.pop();
        options = [...history[history.length - 1]];
        currentPlayer = "X";
        statusText.textContent = `${currentPlayer}'s turn`;
        renderGame();
      } else {
        // if the player won the game, only one history event needs to be deleted
        if (currentPlayer === "X") {
          history.pop();
        } else {
          history.pop();
          history.pop();
        }
        options = [...history[history.length - 1]];
        currentPlayer = "X";
        statusText.textContent = `${currentPlayer}'s turn`;
        renderGame();
        running = true;
      }
    } else {
      history.pop();
      options = [...history[history.length - 1]];
      // Count how many moves are in the current board
      const moveCount = options.filter((cell) => cell !== "").length;
      // X always goes first
      currentPlayer = moveCount % 2 === 0 ? "X" : "O";
      statusText.textContent = `${currentPlayer}'s turn`;
      renderGame();
      running = true;
    }
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  history = [[...options]];
  statusText.textContent = `${currentPlayer}'s turn`;
  renderGame();
  running = true;
}
function renderGame() {
  cells.forEach((cell, index) => {
    cell.textContent = options[index];
  });
}
// Enables easy mode where Computer doesn't block
function goEasy() {
  if (easyMode) {
    easyBtn.textContent = "Go Easy Mode";
    easyMode = false;
  } else {
    easyBtn.textContent = "Go Normal Mode";
    easyMode = true;
  }
}
