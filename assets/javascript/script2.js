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
var playerFlag = 0;

// on initial load check if first player
database.ref().on("value", function(snapshot) {
	// var firstPlayer = snapshot.();
	if (snapshot.child("name").exists()){
		// If second player set flag
		playerFlag = 2;
	}
	else{
		// If first player set flag
		playerFlag = 1;
		}
console.log("playerFlag - " + playerFlag);
// close database.ref
});

// This function will do all of the communication with the firebase
function updateGame(){
	// CHeck if first player to register
		if (playerFlag == 2){
			// If second player - write screen and database record as player 2
			$(".player2Bloc").text(playerStats.name);
			database.ref().push({
				playerStats
			});
			var tempUser = database.ref().val();
			alert("tempUser - " + tempUser)
			console.log("User in database - " + tempUser);
		}
		else{
			// If first player write screen and database record as player 1
			$(".player1Bloc").text(playerStats.name);
			database.ref().push({
				playerStats
			});
			var tempUser = database.ref().val();
			alert("tempUser - " + tempUser)
			console.log("User in database - " + tempUser);
			// end else	
			}
// end function updateGame
}
updateGame();


// end doc ready
})