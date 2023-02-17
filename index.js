let database = ["", "", "", "", "", "", "", "", ""];
let cell = document.querySelectorAll("#grid .cell");
let logger = document.querySelector("div#logger p");
let XorO;
let currentTurn = false;
let gameEnd = false;

// FUNCTION RESET
function reset() {
  for (let r = 0; r < database.length; r++) {
    database[r] = "";
    logger.textContent = "";
    cell[r].classList.remove("highlight");
    gameEnd = false;
    display();
  }
}

function log(message) {
  logger.innerHTML = message;
}

// DISPLAY CELL CASE
function display() {
  for (let i = 0; i < cell.length; i++) {
    cell[i].textContent = database[i];
    if (database[i] == "X") {
      cell[i].classList.add("otherColor");
    } else {
      cell[i].classList.remove("otherColor");
    }
  }
}

// FUNCTION PUSH CONTENT IN DATABASE
function play(nbCase) {
  if (gameEnd) {
    alert("Play again ?");
  } else {
    if (cell[nbCase].textContent == "O" || cell[nbCase].textContent == "X") {
      alert("Play on another cell");
    } else if (currentTurn) {
      database[nbCase] = "O";
      display();
      currentTurn = false;
    } else {
      database[nbCase] = "X";
      display();
      currentTurn = true;
    }
    checkStatus();
  }
}

// FUNCTION CHECK STATUS
function checkStatus() {
  for (let i = 0; i < 2; i++) {
    XorO = i == 0 ? "O" : "X";
    for (let c = 0; c < database.length; c += 3) {
      // LINES
      if (
        database[c] == XorO &&
        database[c + 1] == XorO &&
        database[c + 2] == XorO
      ) {
        log(`<b>Player ${XorO}</b> wins !`);
        gameEnd = true;
        highlight(c, [c + 1], [c + 2]);
        // console.log(c);
      }
    }
    // COLUMNS
    for (l = 0; l < 3; l++) {
      if (
        database[l] == XorO &&
        database[l + 3] == XorO &&
        database[l + 6] == XorO
      ) {
        log(`<b>Player ${XorO}</b> wins !`);
        gameEnd = true;
        highlight(l, [l + 3], [l + 6]);
        // console.log(l);
      }
    }
    // DIAGONALS
    if (database[0] == XorO && database[4] == XorO && database[8] == XorO) {
      log(`<b>Player ${XorO}</b> wins !`);
      gameEnd = true;
      highlight([0], [4], [8]);
    } else if (
      database[2] == XorO &&
      database[4] == XorO &&
      database[6] == XorO
    ) {
      log(`<b>Player ${XorO}</b> wins !`);
      gameEnd = true;
      highlight([2], [4], [6]);
    }
  }
  if (!gameEnd && database.indexOf("") == -1) {
    log("Tied ! Restart ?");
  }
}

function highlight(a, b, c) {
  cell[a].classList.add("highlight");
  cell[b].classList.add("highlight");
  cell[c].classList.add("highlight");
}
