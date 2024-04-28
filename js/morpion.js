"use strict";

const morpion = {
  board: document.getElementById("board"),
  victoryConditions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  init(targetElem) {
    morpion.targetElem = document.querySelector(targetElem);
    morpion.targetElem.appendChild(morpion.createStartGameButton("Jouer"));
  },

  startGame() {
    // clean UI
    document.querySelector(".start-button").remove();
    document.querySelector(".message")?.remove();
    // init game variables
    morpion.cells = new Array(9).fill(null);
    morpion.currentPlayer = "player-1";
    // init game UI
    morpion.board.addEventListener("click", morpion.onCellClick);
    morpion.board.classList.add("active");
    morpion.generateBoard();
  },

  generateBoard() {
    // clean board
    morpion.board.innerHTML = "";
    // generate cells
    morpion.cells.forEach((value, index) => {
      const cell = morpion.createCell(index, value);
      morpion.board.appendChild(cell);
    });
  },

  createCell(index, cellClass) {
    const cell = document.createElement("div");
    cell.dataset.index = index;
    cell.classList.add("cell");
    if (cellClass) {
      cell.classList.add(cellClass);
    }
    return cell;
  },

  onCellClick(event) {
    const cell = event.target;
    // check if clcked element is a cell
    if (cell.classList.contains("cell")) {
      const index = cell.dataset.index;
      // check if cell is empty
      if (morpion.cells[index] === null) {
        morpion.cells[index] = morpion.currentPlayer;
        morpion.generateBoard();
        morpion.checkEndGame();
        morpion.switchPlayer();
      }
    }
  },

  switchPlayer() {
    morpion.currentPlayer =
      morpion.currentPlayer === "player-1" ? "player-2" : "player-1";
  },

  checkEndGame() {
    if (morpion.checkVictory()) {
      morpion.endGame(`Le ${morpion.getPlayerName()} a gagné !`);
    } else {
      morpion.checkGridFilled();
    }
  },

  getPlayerName() {
    return morpion.currentPlayer === "player-1" ? "joueur 1" : "joueur 2";
  },

  checkVictory() {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    return morpion.victoryConditions.reduce((previous, condition) => {
      // check if previous allready found a victory
      if (!previous) {
        // extract cells indexes
        const [a, b, c] = condition;
        // check if cells are not empty and have the same value
        if (
          morpion.cells[a] &&
          morpion.cells[a] === morpion.cells[b] &&
          morpion.cells[a] === morpion.cells[c]
        ) {
          // return true if victory
          return true;
        }
      }
      // return previous value if no victory
      return previous;
      // init previous value to false
    }, false);
  },

  checkGridFilled() {
    // check if all cells are filled
    if (!morpion.cells.includes(null)) {
      morpion.endGame("Match nul !");
    }
  },

  endGame(message) {
    // disable board
    morpion.board.removeEventListener("click", morpion.onCellClick);
    // display message and button
    const messageElem = morpion.createMessage(message);
    const btnElement = morpion.createStartGameButton("Rejouer");
    morpion.targetElem.appendChild(messageElem);
    morpion.targetElem.appendChild(btnElement);
  },

  createMessage(message) {
    const messageElement = document.createElement("p");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    return messageElement;
  },

  createStartGameButton(label) {
    const btnElement = document.createElement("button");
    btnElement.classList.add("start-button");
    btnElement.textContent = label;
    btnElement.addEventListener("click", () => morpion.startGame());
    return btnElement;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  morpion.init("body");
});
