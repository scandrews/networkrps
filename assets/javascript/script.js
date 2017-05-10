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
// Variable for player1
var player1Stats = {
			guess: "",
			losses: 0,
			name: "",
			whosTurn: "player1",
			wins: 0,
}
// Variable for player2
var player2Stats = {
			guess: "",
			losses: 0,
			name: "",
			whosTurn: "player1",
			wins: 0,
}
var player1Key = "";
var player2Key = "";
var playerFlag = 0;
	// number of players that have registered
	// if a 3 indicates that play has begun
var whoAmI = 0;
var player1Ref = "";
var player2Ref = "";
var winner = "";
var play1 = "";
// var playing = false;
var ties = 0;


// set a listener on the name/click/start game
$("#startGame").on("click", function(event) {
    event.preventDefault();
    player1Stats.name = $("#userName").val().trim();
	// write the name to screen
	$(".userBloc").html("Hi " + player1Stats.name);
	// Write the name to the screen as player 1
	$(".player1Bloc").html("<p>" + player1Stats.name + "</p>");

	if (playerFlag === 0){
		console.log("registering 1st player");
		// first player to register
		playerFlag = 1;
		// create a directory for player stats
		player1Ref = database.ref("/playerStats/1");
		// write to database
		player1Ref.set(player1Stats);
		// Remove user from the connection list when they disconnect.
		player1Ref.onDisconnect().remove();
		console.log("line 57 player1Ref - " + player1Ref);
	}
	else {

	if (playerFlag === 1){

		console.log("registerig 2nd player");
		// second player to register
		playerFlag = 2;
		whoAmI = 1;
		// create a directory for player stats
		player2Ref = database.ref("/playerStats/2");
		// write to database
		player2Ref.set(player1Stats);
		// Remove user from the connection list when they disconnect.
		player2Ref.onDisconnect().remove();
		console.log("line 72 player1Ref - " + player2Ref);
		//set upchoices
		}
	}

});


// set a listener on player register
database.ref("/playerStats").on("value",function(snapshot){
	// on database event
	// storing the snapshot.val() in a variable for convenience
	if(snapshot.val() == null){
		return
	}
	var sv = snapshot.val();
	console.log("line 96 sv - " + sv);
	// Getting an array of each key In the snapshot object
	var svArr = Object.keys(sv);
	// Finding the last user's key
	var lastIndex = svArr.length - 1;
	var lastKey = svArr[lastIndex];
	console.log("line 101 lastKey - " + lastKey);
	console.log("line 102 array length - " + svArr.length);
	// Using the last user's key to access the last added user object
	// Use array length to determin how many players have registered
	switch(svArr.length){
		case 0:
			// on program load
			// no player has registered
			// do nothing
			console.log("database listener first player to reg")
			break;
		case 1:
		// one player has registered
			if (playerFlag === 0){
			// 2nd player is just starting
				// since 1 player is already registered (I'm player 2 starting up)
				playerFlag = 1;
				//write first players record to player 2 stats
				player2Stats = sv[lastKey];
				console.log("line 121 player2Stats - " + player2Stats);
				console.log("line 122 sv[lastKey] - " + sv[lastKey].name);
				$(".player2Bloc").html("<p>" + player2Stats.name + "</p>");
				// $(".playBloc").html("Waiting For " + player2Stats.name + " To Choose");
			}
			else{ if (playerFlag === 1){
				// this was triggered by our registering as player 1
				console.log("line 128 player 1 registering");
				// do nothing
			}}
			break;
		case 2:
			// 2 players are registered
			console.log("line 134 playerflag - " + playerFlag);
			switch(playerFlag) {
				// 
				case 1:
					// event: at player 1, 2nd player registering
					console.log("event: at player 1, player 2 registering"); 
					player2Stats = sv[lastKey];
					$(".player2Bloc").html("<p>" + player2Stats.name + "<p>");
					$(".playBloc").html("<p>It's Your Turn</p>")
					$(".player1Bloc").append("<button type='button' class='btn btn-default' value='rock'>Rock</button>");
					$(".player1Bloc").append("<button type='button' class='btn btn-default' value='paper'>Paper</button>");
					$(".player1Bloc").append("<button type='button' class='btn btn-default' value='scissors'>Scissors</button>");
					break;
				case 2:
					// 2nd player registering
					// event triggered to the first player by the 
					// Write the name to the screen as player 1
					playerFlag = 3;
					player2Stats = sv[1];
					$(".player2Bloc").html("<p>" + player2Stats.name + "</p>");
					console.log("the other player - " + player2Stats.name);
					break;
				case 3:
					// this is a play event
					console.log("player1Stats - " + player1Stats.name + player2Stats.whosTurn);
					if(player1Stats.whosTurn === "player2"){
						// at player 1 player, 1 moved
						player1Stats = sv[2];
						player2Stats = sv[1];
						console.log("this is a play event at player 1");
						// player2Stats = sv[2];
						// $(".playBloc").html("<p>It's New Your Turn</p>");
						// $(".player1Bloc").append("<button type='button' class='btn btn-default' value='rock'>Rock</button>");
						// $(".player1Bloc").append("<button type='button' class='btn btn-default' value='paper'>Paper</button>");
						// $(".player1Bloc").append("<button type='button' class='btn btn-default' value='scissors'>Scissors</button>");
					}
					else if(player1Stats.whosTurn === "player1") {
						// at player 2 player 1 made a move  OR

						console.log("line 172 play event at player 2, player 1 moved");
						// if (whoAmI === 1){
							console.log("line 177");
						// }else{
							player2Stats = sv[2];
							player1Stats = sv[1]
							$(".playBloc").html("<p>It's Now Your Turn</p>");
							$(".player1Bloc").append("<button type='button' class='btn btn-default' value='rock'>Rock</button>");
							$(".player1Bloc").append("<button type='button' class='btn btn-default' value='paper'>Paper</button>");
							$(".player1Bloc").append("<button type='button' class='btn btn-default' value='scissors'>Scissors</button>");
						// }
					}
					// else if(player1Stats.whosTurn === "gameOver"){
					// 	// not sure what to do here
					// }
					

					break;
				default:
					console.log("wtf")
			}
			break;
		default:
			console.log("got the default")
	}

// listen for a play event
$("button").on("click", function(event){
	if(player1Stats.whosTurn === "player1"){
		player1Stats.guess = this.value;
		console.log("player 1 ref - " + player1Ref);
		$(".player1Bloc").html("<p id='choice'>You Choose</p><p id='dispChoice'>" + player1Stats.guess + "</p>");
		$(".playBloc").html("<p>Waiting For " + player2Stats.name + " To Make A Choice</p>");
		playerFlag = 3;
		player1Stats.whosTurn = "player2";
		player1Ref.set(player1Stats);
	}
	else
		if(player1Stats.whosTurn === "player2"){
			player2Stats.guess = this.value;
			console.log("player 2 ref - " + player2Ref);
			$(".player1Bloc").html("<p id='choice'>You Choose</p><p id='dispChoice'>" + player2Stats.guess + "</p>");
			$(".playBloc").html("<p></p>");

			// game logic
			if ((player1Stats.guess === "rock") && (player2Stats.guess === "scissors")) {
				player1Stats.wins++;
				winner = player1Stats.name;
				console.log("winner is " + winner);
			}
			else if ((player1Stats.guess === "rock") && (player2Stats.guess === "paper")) {
				player2Stats.wins++;
				winner = player2Stats.name;
				console.log("winner is " + winner);
			}
			else if ((player1Stats.guess === "scissors") && (player2Stats.guess === "rock")) {
				player2Stats.wins++;
				winner = player2Stats.name;
				console.log("winner is " + winner);
			}
			else if ((player1Stats.guess === "scissors") && (player2Stats.guess === "paper")) {
				player1Stats.wins++;
				winner = player1Stats.name;
				console.log("winner is " + winner);
			}
			else if ((player1Stats.guess === "paper") && (player2Stats.guess === "rock")) {
				player1Stats.wins++;
				winner = player1Stats.name;
				console.log("winner is " + winner);
			}
			else if ((player1Stats.guess === "paper") && (player2Stats.guess === "scissors")) {
				player2Stats.wins++;
				winner = player2Stats.name;
				console.log("winner is " + winner);
			}
				else if (player1Stats.guess === player2Stats.guess) {
				ties++;
				winner = "tie";
				console.log("winner is " + winner);
	        }
	        $(".outComeBloc").html("<p id='choice'>The winner is</p><p id='dispChoice'>" + winner + "</p>");
	        if(player1Stats.whosTurn === "player2"){

	    	    $(".player1Bloc").append("<p>wins: " + player1Stats.wins + " losses: " + player1Stats.losses + "</p>");
				$(".player2Bloc").append("<p>wins: " + player2Stats.wins + " losses: " + player2Stats.losses + "</p>");
				// create a directory for player stats
				anyPlayerRef = database.ref("/playerStats/2");
				console.log("line 259 player1Ref - " + player1Ref);
	        }
	        else{
	    	    $(".player2Bloc").append("<p>wins: " + player1Stats.wins + " losses: " + player1Stats.losses + "</p>");
				$(".player1Bloc").append("<p>wins: " + player2Stats.wins + " losses: " + player2Stats.losses + "</p>");
				// create a directory for player stats
				anyPlayerRef = database.ref("/playerStats/1");
				console.log("line 259 player1Ref - " + player2Ref);
	        }
			// write to database
			player1Stats.whosTurn = "player1";
			anyPlayerRef.set(player1Stats);


		// end player 2 made a move
		}

// end play event
});


// end database.ref
})





// end doc ready
})