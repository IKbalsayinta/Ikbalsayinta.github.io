/*
KORTE NOTE VOOR SCHOOL
Ik heb dit project gemaakt maar comments zijn engels
voor common practice. Zelf vind ik het ook fijner

Met de mention voor de vriend, hij heeft mij geholpen maar ik heb alle code
zelf geschreven of heavly aangepast.

Laatste verzoek is dat dit niet met iemand anders gedeeld wordt of voor andere
doeleinden gebruikt wordt. Ik wil dit project ook gebruiken voor personal use

update nu ik die code zie heb ik soms ook console log gebruikt om te debuggen. Ben te lui om weg te halen 

Dank je :)
*/


// made by SRP thanks to a friend of mine to get this stupfsdi0c reset/win feature to work
// note, i worked on it myself but just only got the help a little for the difficult parts

let turn = 1;
let player1Score = 0;
let player2Score = 0;
let player1Rebirth = 0;
let player2Rebirth = 0;
let winnerUser = false;
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const grid = document.getElementById("bke-grid");
const score = document.getElementById("score")
const turnDisplay = document.getElementById("turn");
grid.style.gridTemplateColumns = "repeat(3, 1fr)";

function setScore() {
  score.textContent = `${player1Score} (R: ${player1Rebirth}) - ${player2Score} (R: ${player2Rebirth})`;
}


function getDisplay(value) {
    // learned how to write this properly for the first time :D
    if (value === 1) return "X";
    if (value === 2) return "O";
    // weird decision but decided to make those to clarify the old moves
    if (value === 3) return "✗";
    if (value === 4) return "𝐎";
    return "?";
}

function rebirth(user) {
    // remove the entire board (divs)
    for (let i = 0; i < board.length; i++) {
      // remove every one of them to reset it
      const cellBox = document.getElementById("grid-box-" + (i + 1));
      // destroy the element
      cellBox.remove();
    }

    // this part is not rocket science lol
    grid.style.gridTemplateColumns = "repeat(3, 1fr)";
    grid.style.gridTemplateRows = "repeat(3, 1fr)";

    grid.style.zoom = "1"; // reset zoom to default
    grid.innerHTML = ""; // reset the grid to place the new ones

    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    // to make sure it gets inserted
    for (let i = 0; i < board.length; i++) {
      const cellBox = document.createElement("div");
      cellBox.id = "grid-box-" + (i + 1);
      cellBox.className = "grid-box";
      cellBox.onclick = function() { activate(i + 1) };
      cellBox.innerHTML = getDisplay(board[i]);
      cellBox.style.color = "black";
      grid.appendChild(cellBox);
    }
    if (user === 1) {
        player1Rebirth += 1;
        player1Score = 0;
        player2Score = 0;
    } else if (user === 2) {
        player2Rebirth += 1;
        player2Score = 0;
        player1Score = 0;
    }
    setScore();
}


// after a long work and research, thanks to a friend of mine we got this to work :p
function expand() {
    const oldSize = Math.sqrt(board.length); // this is the old size of the board of width and height

    // woah loops to mark the old moves as old
    // SRP (david) logic is so weird but it worked??? -my friend
    // updated note: decided to remove this logic and put it only at the winning part of the board instead of everything
    /*
    for (let i = 0; i < board.length; i++) {
      if (board[i] === 1) {
        board[i] = 3;
      } else if (board[i] === 2) {
        board[i] = 4; 
      }
    }
    */

    const newSize = oldSize + 2;
    const replacedBoard = new Array(newSize * newSize).fill(0); 

    // was a bit in a rush for this but basically it is a loop that just adds the new parts
    for (let row = 0; row < oldSize; row++) {
      for (let col = 0; col < oldSize; col++) {
        const oldParts = row * oldSize + col;            // this are the old parts by calculating the row and col
        const newParts = (row + 1) * newSize + (col + 1);  // this will expand the board by 1 row and 1 col on each side
        replacedBoard[newParts] = board[oldParts];         // this will replace the old parts with the new parts
      }
    }

    board = replacedBoard;

    // this part is not rocket science lol
    grid.style.gridTemplateColumns = `repeat(${newSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${newSize}, 1fr)`;

    grid.innerHTML = ""; // reset the grid to place the new ones

    // to make sure it gets inserted
    for (let i = 0; i < board.length; i++) {
      const cellBox = document.createElement("div");
      cellBox.id = "grid-box-" + (i + 1);
      cellBox.className = "grid-box";
      cellBox.onclick = function() { activate(i + 1) };
      cellBox.innerHTML = getDisplay(board[i]);
      cellBox.style.color = "black";
      grid.appendChild(cellBox);
    }
    // we need to zoom out a bit when the board goes beyond the screen
    
    // check screen width or height
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    if (newSize > (screenWidth / 100) || newSize > (screenHeight / 100)) {
      // calculate the zoom out with the new size
      grid.style.zoom = `${(screenWidth / 100) / newSize / 1.5}`;
    }
    setScore();
}

// added this here BECAUSE I DONT WANT TO CHECK THIS EVERY TIME :SOB:
function winner(player, row, col) {
  console.log("winner found");
  /*
  There was this weird issue that it duplicates the winner for some reason.
  I solved it by adding a check if the user already returned a move before
  activating the winner function again.
  */
  if (winnerUser) return; // if there is a winner then return
    winnerUser = true; // set the winner to true
    // adding the score and stuff
    if (player === 1) {
        player1Score++;
        // put the old move of the winning row/col here
        board[row * Math.sqrt(board.length) + col] = 3;
    } else if (player === 2) {
        player2Score++;
        // put the old move of the winning row/col here
        board[row * Math.sqrt(board.length) + col] = 4;
    }
    // was thinking about a rebirth thing instead of expanding it.
    // expand(); //fun fact: I was so tired that this took me 4 min to figure out for some reason
    if (player1Score >= 3) {
        rebirth(1);
        console.log("Player 1 wins");
    } else if (player2Score >= 3) {
        rebirth(2);
        console.log("Player 2 wins");
    } else {
        expand();
        console.log("expanded")
    }
}
  
// anyways now with the most painful part of this code the win check
function checkWinner() {
    // Woah get the sqrt again (i hate this)
    const lengthSqrt = Math.sqrt(board.length); // gets the lenght of the board again

    // if 3 then win
    const onARow = 3;

    // LOOPS YAY
    for (let row = 0; row < lengthSqrt; row++) {
      for (let col = 0; col < lengthSqrt; col++) {

        // i love old moves so just skip them
        const value = board[row * lengthSqrt + col];
        if (value == 0 || value == 3 || value == 4) continue;

        // on this part i had a lot of help from a friend of mine because i had struggles with the logic
        
        // this will checks the wins
        // horizontal check
        if (board[row * lengthSqrt + (col + 1)] === value && board[row * lengthSqrt + (col + 2)] === value) {
          winner(value, row, col);
        }
        // vertical check
        if (board[(row + 1) * lengthSqrt + col] === value && board[(row + 2) * lengthSqrt + col] === value) {
          winner(value, row, col);
        }
        // diagonal check
        if (board[(row + 1) * lengthSqrt + (col + 1)] === value && board[(row + 2) * lengthSqrt + (col + 2)] === value) {
          winner(value, row, col);
        }
        // another diagonal check
        if (board[(row + 1) * lengthSqrt + (col - 1)] === value && board[(row + 2) * lengthSqrt + (col - 2)] === value) {
          winner(value, row, col);
        }
      }
      if (!board.includes(0)) {
        expand();
      }
    }
}

  
  
// tbh i think this is self explanatory
function activate(cell) {
    // disable winner again, refer to the winner function
    winnerUser = false;
    cellBox = document.getElementById("grid-box-" + cell);
    if (cellBox.innerHTML == "?") {
        if (turn == 1) {
            cellBox.innerHTML = "X";
            cellBox.style.color = "red";
            turn = 2;
            board[Number(cell) - 1] = 1;
        } else {
            cellBox.innerHTML = "O";
            cellBox.style.color = "blue";
            turn = 1;
            board[Number(cell) - 1] = 2;
        }
        turnDisplay.textContent = "Player " + turn + " turn";
        checkWinner();
    }
}

