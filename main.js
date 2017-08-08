console.log("YO!");

// Defining players by creating an object //

let playerOne = {
    playerSymbol : "X",
    playerName : "Player One",
    id : 0
}

let playerTwo = {
    playerSymbol : "0",
    playerName : "Player Two",
    id : 1
}

// Adding playerOne and PlayerTwo to the game

let players = [playerOne, playerTwo];

let playersTurn = players [0]; // Creating a function for players turn

// Adds the symbol to the board

let placeOnBoard = function(event) {
  // debugger;
  // uses the target and stamps symbol on board from the HTML
  event.currentTarget.innerHTML = playersTurn.playerSymbol;
  checkForWin(); // calling function
  checkForDraw(); // calling function on
  changePlayer(); // calling function on
}

// ------- Change Players ----------- //

let changePlayer = function () {
    // debugger; //  If it is player one, using ID to search for it
  if (playersTurn.id === 0) {
    //Switch to player two
    playersTurn = players[1];
    // else switch to player one
  } else {
    // Put player back to player one
    playersTurn = players[0];
  }
}

// ----- Draw ----//

let checkForDraw = function() {
  let tileHasBeenUsedNumber = 0;
  for (var i = 0; i < 9; i++) { // loop between 1-9 to check which tiles have been used
    if (document.getElementById('tile-'+i).innerHTML != "") { // if tile has been used
      tileHasBeenUsedNumber ++; // increment the number of tiles used
    } // grabs from HTML index and clears it
  }
  if (tileHasBeenUsedNumber == 9) { // if all tiles have been used
    console.log("Draw has happened"); // it is a draw
  }
}

let winningLines = [
  //across
  [0, 1, 2],
  [3, 4, 5],
  [6, 7 ,8],
  //diagonal
  [0, 5, 8],
  [2, 5, 6],
  //down and upwards
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

// check for win

let checkForWin = function() {
  let winningSequence = 0;
  let playerSymbol = playersTurn.playerSymbol; // check that the symbol matches the win lines
  for (var i = 0; i < winningLines.length; i++) { // loops through rows of wiining lines
    winningSequence = 0; // resets winning equence to 0
    for (var j = 0; j < winningLines[i].length; j++) { // loops through each item in win line e.g.0,1,2
      if (document.getElementById("tile-" + winningLines[i][j]).innerHTML === playerSymbol){ // to find a match (reads the columns)
        winningSequence ++;
      }
    }
    if (winningSequence === 3){
      console.log("we have a winner mother fucker", playersTurn.playerName);
    }
  }
}
  // loop over all the winlines.
  // loop over all the current selections
  // to see if theres a win.

// reset

let replay = function () {
  for (var i = 0; i < 9; i++) { // create a loop between 1-9 and
    document.getElementById('tile-'+i).innerHTML = ""; // grabs from HTML index and clears it
  }
}
