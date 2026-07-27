/* Homepage X's and O's game. One cell always starts marked with an X so a
   first-time visitor sees the board is "live." The player is always O
   (their cursor becomes an O over the grid via CSS); after every player
   move the page picks a random open cell for X. On a win or draw the board
   briefly announces the result, then resets so it's replayable. */
(function () {
  var WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  var grid = document.querySelector('.ttt');
  if (!grid) return;

  var cells = Array.prototype.slice.call(grid.querySelectorAll('.ttt__cell'));
  var status = document.querySelector('.ttt__status');
  var board = [];
  var over = false;

  var winSound = new Audio('sounds/win-applause.mp3');
  winSound.volume = 0.5;
  var loseSound = new Audio('sounds/lose-awh.mp3');
  loseSound.volume = 0.5;

  function emptyIndexes() {
    var out = [];
    for (var i = 0; i < board.length; i++) if (!board[i]) out.push(i);
    return out;
  }

  function winner() {
    for (var i = 0; i < WIN_LINES.length; i++) {
      var line = WIN_LINES[i];
      var a = board[line[0]], b = board[line[1]], c = board[line[2]];
      if (a && a === b && b === c) return a;
    }
    return null;
  }

  function render() {
    cells.forEach(function (cell, i) {
      cell.disabled = over || !!board[i];
      cell.classList.toggle('is-filled-x', board[i] === 'X');
      cell.classList.toggle('is-filled-o', board[i] === 'O');
    });
  }

  function setStatus(text) {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle('is-visible', !!text);
  }

  function start() {
    board = new Array(9).fill(null);
    over = false;
    var starter = Math.floor(Math.random() * 9);
    board[starter] = 'X';
    setStatus('');
    render();
  }

  function endGame(text) {
    over = true;
    setStatus(text);
    render();
    if (text === 'You win!') {
      winSound.currentTime = 0;
      winSound.play().catch(function () {});
    } else if (text === 'Computer wins!') {
      loseSound.currentTime = 0;
      loseSound.play().catch(function () {});
    }
    setTimeout(start, 1600);
  }

  function computerMove() {
    var open = emptyIndexes();
    if (!open.length) return;
    var pick = open[Math.floor(Math.random() * open.length)];
    board[pick] = 'X';
  }

  function handleCellClick(index) {
    if (over || board[index]) return;

    board[index] = 'O';
    var win = winner();
    if (win) {
      endGame('You win!');
      return;
    }
    if (!emptyIndexes().length) {
      endGame("It's a draw!");
      return;
    }

    computerMove();
    render();

    win = winner();
    if (win) {
      endGame(win === 'O' ? 'You win!' : 'Computer wins!');
      return;
    }
    if (!emptyIndexes().length) {
      endGame("It's a draw!");
    }
  }

  cells.forEach(function (cell, i) {
    cell.addEventListener('click', function () { handleCellClick(i); });
  });

  start();
})();
