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
			guess: "",
			losses: 0,
			name: "",
			wins: 0,
}
var playerFlag = 1;
var count = 0;
var play1 = "";

// create a directory for player stats
var connectionsRef = database.ref("/players");
var player1Ref = database.ref("/playerStats");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");
console.log("connected ref - " + connectedRef);

// When the client's connection state changes...
connectedRef.on("value", function(snap) {
	// If they are connected..
	if (snap.val()) {
		// Add user to the connections list.
		var con = connectionsRef.push(true);
		console.log("line 44 con - " + con);
		// Remove user from the connection list when they disconnect.
		con.onDisconnect().remove();
	  }
});

// listener on playerstats - when player record is written
database.ref("/playerStats").on("value", function(snapshot) {
	console.log("line 52 playerstats - " + database.ref("/players"));


	if (database.ref("/players") == null){
		alert("oh shit");
	}else{
		alert("got the else, players - " + database.ref("/players"));
	}

		// console.log("line 59 - 2nd Player - " + secondPlayer);
		// alert("line 60 - First Player - " + secondPlayer);

// close database.ref
});

// set a listener on second player register
database.ref("/players").on("value",function(snapshot){
	// storing the snapshot.val() in a variable for convenience
	var sv = snapshot.val();
      
	// Getting an array of each key In the snapshot object
	var svArr = Object.keys(sv);

	// Finding the last user's key
	var lastIndex = svArr.length - 1;

	var lastKey = svArr[lastIndex];

	// Using the last user's key to access the last added user object
	var player2Stats = sv[lastKey]
	if(lastKey == play1){
		console.log("false alarm - " + lastKey);
		// not a new user
	}
	else{
		// new user registered
		console.log("the new user - " + player2Stats);
		$(".player2Bloc").text(player2Stats.name);
	}
})




// set a listener on the name/click/start game
$("#startGame").on("click", function(event) {
    event.preventDefault();
    playerStats.name = $("#userName").val().trim();
	// write the name to screen
	$(".userBloc").html("Hi " + playerStats.name);

	// Check if first player to register

	alert("line 105 playerFlag - " + playerFlag);
	// Write screen and database record as player 1
	$(".player1Bloc").text(playerStats.name);

	// Save new value to Firebase
	// database.ref("/playerstats").set({
	// 	playerstats
	// });

	console.log("line 114 playerRef - " + player1Ref);
	play1 = player1Ref.push(playerStats);
	console.log("line 116 player one handle - " + play1);
	play1.onDisconnect().remove();
	playerFlag = 2;

});





// end doc ready
})