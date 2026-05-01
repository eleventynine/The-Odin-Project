const gameboard = (() => {
  const BLANK = " ";
  const board = [
    ["X", "X", "O"],
    ["X", "O", "O"],
    ["O", "O", "X"],
  ];

  const clear = () => {
    board.forEach((row) => {
      row.forEach((cell, index, array) => (array[index] = BLANK));
    });
  };

  const placeMark = (mark, row, column) => {
    if (row < 0 || row > 2 || column < 0 || column > 2) {
      console.error(`Invalid positions: row: ${row} column: ${column}`);
      return;
    }

    // verify a mark doesn't exist there already
    if (board[row][column] !== BLANK) {
      console.error(`Already a mark at this location: [${row}][${column}]`);
      return;
    }

    // place mark
    board[row][column] = mark;
  };

  const getBoard = () => board;

  const debugDraw = () => {
    let dataStr = "";

    for (let i = 0; i < 3; i++) {
      dataStr += i;
      for (let j = 0; j < 3; j++) {
        dataStr += `|${board[i][j]}|`;
      }
      dataStr += "\n";
    }
    console.log(dataStr);
  };

  return { clear, placeMark, getBoard, debugDraw };
})();

function Player(name, mark) {
  if (!new.target) {
    throw Error("You need to use the 'new' operator");
  }
  this.name = name;
  this.mark = mark;
}

const game = (() => {
  const p1 = new Player("Player 1", "X");
  const p2 = new Player("Player 2", "O");

  const initialize = () => {
    gameboard.clear();
  };

  /**
   *
   */
  const checkGameState = () => {};

  const checkRowWin = (player) => {
    const board = gameboard.getBoard();
    let winCells = [];
    for (let row = 0; row < 3; row++) {
      let win = board[row].every((mark) => mark === player.mark);
      if (win) {
        for (let col = 0; col < 3; col++) {
          winCells.push({ row: row, col: col });
        }

        console.log(`${player.name} won row check`);
        return winCells;
      }
    }

    return [];
  };

  const checkColumnWin = (player) => {
    const board = gameboard.getBoard();
    let winCells = [];
    for (let col = 0; col < 3; col++) {
      for (let row = 0; row < 3; row++) {
        if (board[row][col] === player.mark) {
          winCells.push({ row: row, col: col });
        }
      }

      if (winCells.length === 3) {
        console.log(`${player.name} ${player.mark} won column check`);
        return winCells;
      }

      return [];
    }
  };

  const checkDiagonalWin = (player) => {
    const board = gameboard.getBoard();
    let winCells = [];

    // check diagnals - top left to bottom right
    for (let i = 0; i < 3; i++) {
      if (board[i][i] === player.mark) {
        winCells.push({ row: i, col: i });
      }
    }

    if (winCells.length === 3) {
      console.log(`${player.name} won diag topleft check`);
      return winCells;
    } else {
      winCells = [];
    }

    // check diagnals - bottom left to top right
    for (let row = 2, col = 0; row >= 0; row--, col++) {
      if (board[row][col] === player.mark) {
        winCells.push({ row, col });
      }
    }

    if (winCells.length === 3) {
      console.log(`${player.name} won diag bottomleft check`);
      return winCells;
    }

    return [];
  };

  /**
   * Checks the board for a win state for the player. Returns an array
   * with the cells resulting in a win, otherwise returns an empty array
   * @param {player object} player
   */
  const checkWin = (player) => {
    const board = gameboard.getBoard();
    let winCells = [];

    // check rows
    winCells = checkRowWin(player);
    if (winCells.length) {
      return winCells;
    }

    // check columns
    winCells = checkColumnWin(player);
    if (winCells.length) {
      return winCells;
    }

    // check diagnals - top left to bottom right
    winCells = checkDiagonalWin(player);
    if (winCells.length) {
      return winCells;
    }

    return [];
  };

  const checkDraw = () => {
    // if there is no win and all cells are filled, it is a draw
  };

  return { checkGameState, checkWin, checkDraw };
})(gameboard);

gameboard.debugDraw();

const p1 = new Player("Player 1", "X");
const p2 = new Player("Player 2", "O");
console.log(game.checkWin(p1));
console.log(game.checkWin(p2));
