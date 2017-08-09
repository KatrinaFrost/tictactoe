//---------------------- Tic Tac Toe - Project 0 ---------------------------- //

console.log("YO!");

//-- Defining players one and two by creating an object --------------------- //
let numberOfGamesPlayed = 0;
let gameIsOver = false;

let players = [
  {
    score : 0,
    playerSymbol : "X",
    playerName : "Player One",
    id : 0,
    elementName : "scoreOne"
  },
  {
    score : 0,
    playerSymbol : "0",
    playerName : "Player Two",
    id : 1,
    elementName : "scoreTwo"
  }
]

// let playerOne = {
//     score : 0,
//     playerSymbol : "X",
//     playerName : "Player One",
//     id : 0
// }
//
// let playerTwo = {
//     score : 1,
//     playerSymbol : "0",
//     playerName : "Player Two",
//     id : 1
// }

let turn = 0; // Creating a function for players turn

//-- Adds the symbol to the board ------------------------------------------- //

let placeOnBoard = function(event) {
  if(event.currentTarget.innerHTML === "" && gameIsOver === false) {
    // uses the target and stamps symbol on board from the HTML
    event.currentTarget.innerHTML = players[turn].playerSymbol;
    checkForWin(); // calling function
    checkForDraw(); // calling function on
    changePlayer(); // calling function on
  }
}

// -- Change Players -------------------------------------------------------- //

let changePlayer = function () {
// debugger;

  if (turn === 0) {
    //Switch to player two
    turn = 1;
    // else switch to player one
  } else {
    // Put player back to player one
    turn = 0;
  }
}

// -- When players draw ----------------------------------------------------- //

let checkForDraw = function() {
  let tileHasBeenUsedNumber = 0;
  for (var i = 0; i < 9; i++) { // Loop between 1-9 to check which tiles have been used
    if (document.getElementById('tile-'+i).innerHTML != "") { // Checks if tile has been used
      tileHasBeenUsedNumber ++; // Increment the number of tiles used
    } // Grabs from HTML index and clears it
  }
  if (tileHasBeenUsedNumber == 9) { // If all tiles have been used
    alert("It's a draw!"); // It is a draw
    gameOver();
    replay();
  }
}

let gameOver = function(){
  numberOfGamesPlayed ++;
  gameIsOver = true;
  announceWinner();
}

// -- Winning Line ---------------------------------------------------------- //


let winningLines = [
  //across
  [0, 1, 2],
  [3, 4, 5],
  [6, 7 ,8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
  //down and upwards
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

// -- Check for a win ------------------------------------------------------- //

let checkForWin = function() {
  let winningSequence = 0;
  let playerSymbol = players[turn].playerSymbol; // Checks the symbol matches the win lines
  for (var i = 0; i < winningLines.length; i++) { // Loops through rows of winning lines
    winningSequence = 0; // Resets winning sequence to 0
    for (var j = 0; j < winningLines[i].length; j++) { // Loops through each item in win line e.g.0,1,2
      if (document.getElementById("tile-" + winningLines[i][j]).innerHTML === playerSymbol){ // to find a match (reads the columns)
        winningSequence ++;
      }
    }
    if (winningSequence === 3) {
      alert(players[turn].playerName + " is the winner!");
      players[turn].score++;
      console.log(players[turn].score);
      document.getElementById(`${players[turn].elementName}`).innerHTML = players[turn].score;
      gameOver();
      replay();
    }
  }
}

// -- Reset button ---------------------------------------------------------- //

let replay = function () {
  for (var i = 0; i < 9; i++) { // create a loop between 1-9 and
    document.getElementById('tile-'+i).innerHTML = ""; // grabs from HTML index and clears it
  }
  gameIsOver = false;

}

// -- Reset game after three clicks ------------------------------------------//

let announceWinner = function () {
  if (numberOfGamesPlayed === 3){
    if (players[0].score > players[1].score){
      alert("Winner found" + players[0].playerName);
    } else if (players[1].score < players[0].score) {
      alert("Winner found" + players[1].playerName);
    } else {
      alert("It's a match better rematch!")
    }
    numberOfGamesPlayed = 0;
    clearScoreBoard();
  }
}

let clearScoreBoard = function () {
  players[0].score = 0;
  players[1].score = 0;
  document.getElementById(`${players[0].elementName}`).innerHTML = players[turn].score;
  document.getElementById(`${players[1].elementName}`).innerHTML = players[turn].score;
}

let reset = function () {

}
