// This is the javaScript for the networked Rock Paper Scissors Game
$(document).ready(function() {


// Initialize Firebase
var config = {
	apiKey: "AIzaSyAJS4YQWU5DmESeYueG1qH1NGkjv3DncEY",
	authDomain: "fir-click-counter-7cdb9.firebaseapp.com",
	databaseURL: "https://networkedrps.firebaseio.com/",
	storageBucket: "fir-click-counter-7cdb9.appspot.com"
	};

firebase.initializeApp(config);

// database reference
var database = firebase.database();
// Variable for player
var playerStats = {
		name: "",
		wins: 3,
		losses: 2,
		guess: "george"
}




// This function will do all of the communication with the firebase
function updateGame(){
	// Initially we'll check to see if another player has started

   //  database.ref().get({
   //      player: []
   //      	player1Name: name,
			// player1Wins: wins,
			// player1Losses: losses,
   //    });

   //  if(player[].name == null){
   //  	// We are the first player to register
   //  }

// If not then write a record as player 1
    database.ref().set({
        	player1Name: playerStats.name,
			player1Wins: playerStats.wins,
			player1Losses: playerStats.losses,
			player1Guess: playerStats.guess
      });

// end function updateGame
}



// set a listener on the name/start game
$("#startGame").on("click", function(event) {
    event.preventDefault();
    playerStats.name = $("#userName").val().trim();
	$(".userBloc").html("Hi " + playerStats.name);
	$(".player1Bloc").text(playerStats.name);
	updateGame()
});

// Set a database listener on another player register
// database.ref().on("value", function(snapshot) {
// Get the new user info
	database.ref().get({
		player2Name: playerStats.name,
		player2Wins: playerStats.wins,
		player2Losses: playerStats.losses,
		player2Guess: playerStats.guess
          });

       console.log(snapshot.val());
// });


// end doc ready
})