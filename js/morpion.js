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

  /**
   * set the target element to append the game and start the game
   * @param {string} targetElem - target css selector
   */
  init(targetElem) {
    morpion.targetElem = document.querySelector(targetElem);
    morpion.targetElem.appendChild(morpion.createStartGameButton("Jouer"));
  },

  /**
   * start the game
   */
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

  /**
   * generate the game board
   */
  generateBoard() {
    // clean board
    morpion.board.innerHTML = "";
    // generate cells
    morpion.cells.forEach((value, index) => {
      const cell = morpion.createCell(index, value);
      morpion.board.appendChild(cell);
    });
  },

  /**
   * create a cell element with index and class
   *
   * @param {number} index - cell index
   * @param {string} cellClass  - cell class
   * @returns {HTMLElement} - cell element
   */
  createCell(index, cellClass) {
    const cell = document.createElement("div");
    cell.dataset.index = index;
    cell.classList.add("cell");
    if (cellClass) {
      cell.classList.add(cellClass);
    }
    return cell;
  },

  /**
   * cell click event handler
   * check if cell is empty and switch player
   *
   * @param {Event} event - click event
   */
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

  /**
   * switch player
   */
  switchPlayer() {
    morpion.currentPlayer =
      morpion.currentPlayer === "player-1" ? "player-2" : "player-1";
  },

  /**
   * check end game conditions
   */
  checkEndGame() {
    if (morpion.checkVictory()) {
      morpion.endGame(`Le ${morpion.getPlayerName()} a gagné !`);
    } else {
      morpion.checkGridFilled();
    }
  },

  /**
   * get the current player name
   *
   * @returns {string} - player name
   */
  getPlayerName() {
    return morpion.currentPlayer === "player-1" ? "joueur 1" : "joueur 2";
  },

  /**
   * check victory conditions
   *
   * @returns {boolean} - true if victory
   */
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

  /**
   * check if all cells are filled
   */
  checkGridFilled() {
    // check if all cells are filled
    if (!morpion.cells.includes(null)) {
      morpion.endGame("Match nul !");
    }
  },

  /**
   * Terminate the game
   *
   * @param {string} message -  end game message
   */
  endGame(message) {
    // disable board
    morpion.board.removeEventListener("click", morpion.onCellClick);
    // display message and button
    const messageElem = morpion.createMessage(message);
    const btnElement = morpion.createStartGameButton("Rejouer");
    morpion.targetElem.appendChild(messageElem);
    morpion.targetElem.appendChild(btnElement);
  },

  /**
   * Create a message element
   *
   * @param {string} message - message to display
   * @returns {HTMLElement} - message element
   */
  createMessage(message) {
    const messageElement = document.createElement("p");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    return messageElement;
  },

  /**
   * Create a start game button
   *
   * @param {string} label - button label
   * @returns {HTMLElement} - button element
   */
  createStartGameButton(label) {
    const btnElement = document.createElement("button");
    btnElement.classList.add("start-button");
    btnElement.textContent = label;
    btnElement.addEventListener("click", () => morpion.startGame());
    return btnElement;
  },
};

// start the game when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  morpion.init("body");
});
