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
			wins: 0,
}
// Variable for player2
var player2Stats = {
			guess: "",
			losses: 0,
			name: "",
			wins: 0,
}
var player1Key = "";
var player2Key = "";
var playerFlag = 0;
var player1Ref = "";
var player2Ref = "";
var count = 0;
var play1 = "";
var playing = false;


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
	// Getting an array of each key In the snapshot object
	var svArr = Object.keys(sv);
	// Finding the last user's key
	var lastIndex = svArr.length - 1;
	var lastKey = svArr[lastIndex];
	console.log("line 93 lastKey - " + lastKey);
	console.log("line 94 array length - " + svArr.length);
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
				console.log("line 111 sv[lastKey] - " + sv[lastKey].name);
				$(".player2Bloc").html("<p>" + player2Stats.name + "</p>");
				$(".playBloc").html("Waiting For " + player2Stats.name + " To Choose");
			}
			else{ if (playerFlag === 1){
				// this was triggered by our registering as player 1
				console.log("line 116 player 1 registering");
				// do nothing
			}}
			break;
		case 2:
			// 2 players are registered
			console.log("line 122 playerflag - " + playerFlag);
			switch(playerFlag) {
				case 1:
					// event: at player 1, player 2 registering
					if(playing === false){
						console.log("event: at player 1, player 2 registering"); 
						player2Stats = sv[lastKey];
						$(".player2Bloc").html("<p>" + player2Stats.name + "<p>");
						$(".playBloc").html("<p>It's Your Turn</p>")
						$(".player1Bloc").append("<button type='button' class='btn btn-default' value='rock'>Rock</button>");
						$(".player1Bloc").append("<button type='button' class='btn btn-default' value='paper'>Paper</button>");
						$(".player1Bloc").append("<button type='button' class='btn btn-default' value='scissors'>Scissors</button>");
					}
					// else{
						// at player 1, playing game
						// do nothing
					// }	
					break;
				case 2:
					// 2nd player registering
					// event triggered to the first player by the 
					// Write the name to the screen as player 1
					playerFlag = 3;
					player2Stats = sv[lastIndex];
					$(".player2Bloc").html("<p>" + player2Stats.name + "</p>");
					console.log("the old user - " + player2Stats.name);
					break;
				case 3:
					// this is a play event
					console.log("this is a play event");
					// did he move or did I
					// assume I'm player 2 got palyer 1 move event
					$(".playBloc").html("<p>It's New Your Turn</p>");
					$(".player1Bloc").append("<button type='button' class='btn btn-default' value='rock'>Rock</button>");
					$(".player1Bloc").append("<button type='button' class='btn btn-default' value='paper'>Paper</button>");
					$(".player1Bloc").append("<button type='button' class='btn btn-default' value='scissors'>Scissors</button>");
					
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
	player1Stats.guess = this.value;
	console.log("player 1 ref - " + player1Ref);
	$(".player1Bloc").html("<p id='choice'>You Choose</p><p id='dispChoice'>" + player1Stats.guess + "</p>");
	$(".playBloc").html("<p>Waiting For " + player2Stats.name + " To Make A Choice</p>");
	playing = true;
	player1Ref.set(player1Stats);
	
});


// end database.ref
})





// end doc ready
})