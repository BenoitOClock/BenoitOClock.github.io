"use strict";

const morpion = {
  board: document.getElementById("board"),
  cells: new Array(9).fill(null),
  currentPlayer: "player1",
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

  init() {
    morpion.board.addEventListener("click", morpion.onCellClick);
    morpion.generateBoard();
  },

  generateBoard() {
    morpion.board.innerHTML = "";
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
    if (cell.classList.contains("cell")) {
      const index = cell.dataset.index;
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
      morpion.currentPlayer === "player1" ? "player2" : "player1";
  },

  checkEndGame() {
    if (morpion.checkVictory()) {
      morpion.showMessage(`${morpion.currentPlayer} a gagné !`);
      morpion.disableBoard();
    } else {
      morpion.checkGridFilled();
    }
  },

  checkVictory() {
    return morpion.victoryConditions.reduce((previous, condition) => {
      if (!previous) {
        const [a, b, c] = condition;
        if (
          morpion.cells[a] &&
          morpion.cells[a] === morpion.cells[b] &&
          morpion.cells[a] === morpion.cells[c]
        ) {
          return true;
        }
      }
      return previous;
    }, false);
  },

  checkGridFilled() {
    if (!morpion.cells.includes(null)) {
      morpion.disableBoard();
      morpion.showMessage("Match nul !");
    }
  },

  showMessage(message) {
    const messageElement = document.createElement("p");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
  },

  disableBoard() {
    morpion.board.removeEventListener("click", morpion.onCellClick);
  },
};

morpion.init();
