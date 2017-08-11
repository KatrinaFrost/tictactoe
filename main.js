//---------------------- Tic Tac Toe - Project 0 ---------------------------- //

//-- Defining players one and two by creating an object --------------------- //

let numberOfGamesPlayed = 0;
let gameIsOver = false;

let players = [ // array of player objects
  {
    score : 0,
    playerSymbol : '<img src="img/pusheen_cat_unicorn.png">',
    playerName : "Player One",
    id : 0,
    elementName : "scoreOne"
  },
  {
    score : 0,
    playerSymbol : '<img src="img/pusheen_cat_man.png">',
    playerName : "Player Two",
    id : 1,
    elementName : "scoreTwo"
  }
]

// what do I do on page load - this adds the cats to oher persons score
function init (){
  document.getElementById('playerOneScore').innerHTML += '<div id="avatar-0">' + players[0].playerSymbol + '</div>';
  document.getElementById('playerTwoScore').innerHTML += '<div id="avatar-1">' + players[1].playerSymbol + '</div>';
}

let turn = 0; // Creating a function for players turn

//-- Adds the symbol to the board - click event ----------------------------- //

let placeOnBoard = function(event) {
  if(event.currentTarget.innerHTML === "" && gameIsOver === false) {
    // uses the target and stamps symbol on board from the HTML
    event.currentTarget.innerHTML = players[turn].playerSymbol;

    checkForWin(); // calling function
    checkForDraw(); // calling function
    changePlayer(); // calling function

  }
}

// -- Change Players -------------------------------------------------------- //

let changePlayer = function () {

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
    gameNotification("It's a draw!");
    gameOver();
  }
}

// -- Pop up notification --------------------------------------------------- //

function gameNotification(message) {

  let popUp = document.getElementById('pop-up'); // pop up from HTML

  popUp.innerHTML = '<p>' + message + '</p>'; // adds the text to the popup

  window.setTimeout(function() { // after one 1000ms show pop up
    popUp.style.display = 'block'; // display pop up
  }, 1000); // milliseconds

  window.setTimeout(function() {
    popUp.style.display = 'none'; // pop up is hidden
    replay(); // clears the board
  }, 6000); // milliseconds
}

// -- Game over and check for winner announcment ---------------------------- //

let gameOver = function(){
  numberOfGamesPlayed ++; // number of games played plus one
  gameIsOver = true; // boolean set to true - game has ended
  if (numberOfGamesPlayed === 3) { // when three games are played announce winner
    announceWinner(); // calls announcment
  };
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
  let winningSequence = 0; // start at 0
  let playerSymbol = players[turn].playerSymbol; // Checks the symbol matches the win lines
  for (var i = 0; i < winningLines.length; i++) { // Loops through rows of winning lines to find a winner
    winningSequence = 0; // Resets winning sequence to 0
    for (var j = 0; j < winningLines[i].length; j++) { // Loops through each item in win line e.g.0,1,2
      if (document.getElementById("tile-" + winningLines[i][j]).innerHTML == playerSymbol){ // to find a match (reads the columns)
        winningSequence ++;
      }
    }
    if (winningSequence === 3) { // if all three are found there is a winner
      gameNotification(players[turn].playerName + " is the winner!"); // pop up

      animateWinner(); // makes pusheen wobble

// -- Check for a win ------------------------------------------------------- //

      players[turn].score++; // add one to the current players score
      document.getElementById(`${players[turn].elementName}`).innerHTML = players[turn].score; // updating score on the view
      gameOver(); // triggers game over and closes down game just played
    }
  }
}

// -- Makes pusheen wobble -------------------------------------------------- //

let animateWinner = function() {

  document.getElementById('avatar-'+ players[turn].id).className += "win"; // adds a class called win and triggers CSS animation

  window.setTimeout(function() { // after 6s

    if(document.getElementById('avatar-0').classList.contains("win")) // removes class for player one
    {
      document.getElementById('avatar-0').classList.remove("win"); // re adds class to animate everytime player wins
    }
    if(document.getElementById('avatar-1').classList.contains("win")) // removes class for player two
    {
      document.getElementById('avatar-1').classList.remove("win"); // re adds class to animate everytime player wins
    }
  }, 6000);
}

// -- Replay button ---------------------------------------------------------- //

let replay = function () {
  for (var i = 0; i < 9; i++) { // create a loop between 1-9 and...
    document.getElementById('tile-'+i).innerHTML = ""; // grabs from HTML index and clears the board of pusheens
  }
  gameIsOver = false; // when the game is back in play and player can click the board again

}

// -- Reset game after three clicks ------------------------------------------//

let announceWinner = function () {

  if (players[0].score > players[1].score){ // if player one score is more than player two

    gameNotification(players[0].playerName + " is the winner!"); // notifies the winner and the pop up and sends message

  } else if (players[1].score > players[0].score) { // else player two score is more than player one pop activated

    gameNotification(players[1].playerName + " is the winner!");

  } else {
    gameNotification("It's a match better rematch!"); // else it is a draw
  }
  numberOfGamesPlayed = 0; // reset the game to 0

  window.setTimeout(function() { //clears score board after 6s
    clearScoreBoard();
  }, 6000);
}

// -- Clears score on board and players object -------------------------------//


let clearScoreBoard = function () {
  players[0].score = 0; // objects - sets both players score to 0
  players[1].score = 0;
  document.getElementById(`${players[0].elementName}`).innerHTML = players[turn].score; // elements
  document.getElementById(`${players[1].elementName}`).innerHTML = players[turn].score; // updates HTML with score
}

// -- Reset game after three clicks ------------------------------------------//

let reset = function () {
  clearScoreBoard(); // clears score board
  replay(); // clears game board
  document.getElementById('pop-up').style.display = 'none'; // clears score board
}
