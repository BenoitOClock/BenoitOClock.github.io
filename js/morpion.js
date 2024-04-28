"use strict";

const morpion = {
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
  cells: new Array(9).fill(null),
  currentPlayer: "player1",

  init() {
    const board = document.getElementById("board");
    board.addEventListener("click", morpion.onCellClick);
    morpion.generateCells();
  },

  generateCells() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    morpion.cells.forEach((value, index) => {
      const cell = document.createElement("div");
      cell.dataset.index = index;
      cell.classList.add("cell");
      if (value !== null) {
        cell.classList.add(value);
      }
      board.appendChild(cell);
    });
  },

  onCellClick(event) {
    const cell = event.target;
    if (cell.classList.contains("cell")) {
      const index = cell.dataset.index;
      if (morpion.cells[index] === null) {
        morpion.cells[index] = morpion.currentPlayer;
        morpion.generateCells();
        morpion.checkVictory();
        morpion.checkGridFilled();
        morpion.switchPlayer();
      }
    }
  },

  switchPlayer() {
    morpion.currentPlayer =
      morpion.currentPlayer === "player1" ? "player2" : "player1";
  },

  checkVictory() {
    morpion.victoryConditions.forEach(condition => {
      const [a, b, c] = condition;
      if (
        morpion.cells[a] &&
        morpion.cells[a] === morpion.cells[b] &&
        morpion.cells[a] === morpion.cells[c]
      ) {
        morpion.showMessage(`${morpion.currentPlayer} a gagné !`);
        morpion.disableBoard();
      }
    });
  },

  checkGridFilled() {
    if (!morpion.cells.includes(null)) {
      morpion.disableBoard();
      morpion.showMessage("Match nul !");
    }
  },

  showMessage(message) {
    document.querySelectorAll(".message").forEach(element => element.remove());
    const messageElement = document.createElement("p");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
  },

  disableBoard() {
    const board = document.getElementById("board");
    board.removeEventListener("click", morpion.onCellClick);
  },
};

morpion.init();
