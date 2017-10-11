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
				whosTurn: 0,
				wins: 0,
				ties: 0
	}
	// Variable for player2
	var player2Stats = {
				guess: "",
				losses: 0,
				name: "",
				whosTurn: 0,
				wins: 0,
				ties: 0
	}
	var player1Key = "";
	var player2Key = "";
	var howManyPlayersHaveRegistered = 0;
		// number of players that have registered
		// if a 3 indicates that play has begun
	var whoAmI = 0;
	var player1Ref = "";
	var player2Ref = "";
	var winner = "";
	var inPlay = false;
	// var playing = false;
	var ties = 0;
	var player1WhosTurn = 1;
	var player2WhosTurn = 1;

	// this function is called to start each round
	// Inputs:  myplayer - what player am I
	//			myturn - whos turn is it  
	function initilaizeGame(myplayer, myturn){
		if (myplayer === 1){
			// initialising player 1

			if (myturn === 1){
				console.log("line 55 I am player 1");
				$(".playBloc").html("<p>It's Your Turn</p>")
				$(".player1Bloc").append("<button class='playButton' class='btn btn-default' value='Rock'>Rock</button>");
				$(".player1Bloc").append("<button class='playButton' class='btn btn-default' value='Paper'>Paper</button>");
				$(".player1Bloc").append("<button class='playButton' class='btn btn-default' value='Scissors'>Scissors</button>");
			}
			else{
				console.log("line 66 I am player 1 player 2s turn");
				$(".playBloc").html("waiting for " + player2Stats.name + " to move");
			}
		}
		else{
			// initialising player 2
			if (myturn === 1){
					console.log("I am player 2, player 1s turn");
				// player 1s turn
					$("playBloc").html("waiting for " + player2Stats.name + " to move");
			}
			else{
				// player 2s turn
				console.log("I am player 2, my turn");
				$(".playBloc").html("<p>It's Your Turn</p>")
				$(".player2Bloc").append("<button class='playButton' class='btn btn-default' value='Rock'>Rock</button>");
				$(".player2Bloc").append("<button class='playButton' class='btn btn-default' value='Paper'>Paper</button>");
				$(".player2Bloc").append("<button class='playButton' class='btn btn-default' value='Scissors'>Scissors</button>");
			}
		}
	// end function initilaizegame
	}


	// set a listener on the name/click/start game
	$("#startGame").on("click", function(event) {
	    event.preventDefault();

		if (howManyPlayersHaveRegistered === 0){
			// first player to register
			console.log("registering 1st player");
		    player1Stats.name = $("#userName").val().trim();
			// write the name to screen
			$(".userBloc").html("Hi " + player1Stats.name);
			// Write the name to the screen as player 1
			$(".player1NameBloc").html("<p>" + player1Stats.name + "</p>");
			howManyPlayersHaveRegistered = 1;
			whoAmI = 1;
			// create a directory for player stats
			player1Ref = database.ref("/playerStats/1");
			// write to database
			player1Ref.set(player1Stats);
			// Remove user from the connection list when they disconnect.
			player1Ref.onDisconnect().remove();
			console.log("line 120 player1Ref - " + player1Ref);
		}
		else {

		if (howManyPlayersHaveRegistered === 1){

			// second player to register
			console.log("registerig as player 2");
			player2Stats.name = $("#userName").val().trim();
			// player2Stats.whosTurn = 1;
			// write the name to top screen
			$(".userBloc").html("Hi " + player2Stats.name + "<b>");
			// Write the name to the screen lower box
			$(".player2NameBloc").html("<p>" + player2Stats.name + "</p>");
			howManyPlayersHaveRegistered = 2;
			whoAmI = 2;
			console.log("I am player - " + whoAmI);
			// create a directory for player stats
			player2Ref = database.ref("/playerStats/2");
			// write to database
			player2Ref.set(player2Stats);
			// Remove user from the connection list when they disconnect.
			player2Ref.onDisconnect().remove();
			console.log("line 137 player1Ref - " + player2Ref);
			//set upchoices
			}
		}
	//end start game listener
	});


// set a listener on database activity
	database.ref("/playerStats").on("value",function(snapshot){
		// storing the snapshot.val() in a variable for convenience
		var currentdatabase = snapshot.val();
		// Getting an array of each key In the snapshot object
		var currentArray = Object.keys(currentdatabase);
		// Finding the last user's key
		// var lastIndex = currentArray.length - 1;
		// var lastKey = currentArray[lastIndex];
		console.log("line 148 array length - " + currentArray.length);
		console.log("line 149 how many palyers have registered - ", howManyPlayersHaveRegistered);
		// Using the last user's key to access the last added user object
		// Use array length to determin how many players have registered
		if (currentArray.length === 1){
			// only one player has registered
			if (howManyPlayersHaveRegistered === 0){
			// 2nd player is just starting
				// since 1 player is already registered (I'm player 2 starting up)
				whoAmI = 2;
				howManyPlayersHaveRegistered = 1;
				// write first players record to player 1 stats
				// $(".player1NameBlocBloc").html("<p>" + currentdatabase[1].name + "</p>");
				player1Stats = currentdatabase[1];
				console.log("line 161 player1Stats - ", currentdatabase[1]);
			}
			else if (howManyPlayersHaveRegistered === 1) {
					// this was triggered by our registering as player 1 - Do Nothing
				}
		}
		else if (currentArray.length === 2){
			// 2 players are registered
			console.log("line 171 howManyPlayersHaveRegistered - " + howManyPlayersHaveRegistered);
			switch(howManyPlayersHaveRegistered) {
				case 1:
					// event: at player 1, 2nd player registering
					console.log("event: at player 1, player 2 registering");
					howManyPlayersHaveRegistered = 3;
					player2Stats.name = currentdatabase[2].name
					$(".player2NameBloc").html("<p>" + currentdatabase[2].name + "<p>");
					initilaizeGame(1,1)
					break;
				case 2:
					// at player 2, 2nd player registering
					console.log("I am - " + player2Stats.name);
					howManyPlayersHaveRegistered = 3;
					// Write the name to the screen as player 1
					$(".player1NameBloc").html("<p>" + currentdatabase[1].name + "<p>");
					$(".playBloc").html("Waiting for " + currentdatabase[1].name + " to go");
					break;
				case 3:
					// this is a play event
					if(inPlay === false){
						// play event first player moved
						inPlay = true;
						console.log("line 212 first player moved");
						console.log("whoAmI - " + whoAmI);

						if(whoAmI === 1 && player1WhosTurn === 1){
							player1WhosTurn = 2;
							console.log("at player 1, player 1 just moved");
							$(".outComeBloc").html("");
							$(".player2Bloc").html("");
							$(".player1Bloc").html("You Chose " + currentdatabase[1].guess);
							initilaizeGame(1, 2);
						}
						else if (whoAmI === 1 && player1WhosTurn === 2){
							player1WhosTurn = 1;
							console.log("at player 1, player 2 just moved");
							// $(".player2Bloc").html("He Chose " + player2Stats.guess)
							$(".outComeBloc").html("");
							$(".player1Bloc").html("");
							$(".player2Bloc").html("");
							player2Stats.guess = currentdatabase[2].guess;
							initilaizeGame(1, 1);
						}
						else if (whoAmI === 2 && player2WhosTurn === 1){
							player2WhosTurn = 2;
							console.log("at player 2, player 1 just moved");
							$(".outComeBloc").html("");
							$(".player1Bloc").html("");
							$(".player2Bloc").html("");
							player1Stats.guess = currentdatabase[1].guess;
							initilaizeGame(2, 2);
						}
						else if (whoAmI === 2 && player2WhosTurn === 2){
							player2WhosTurn = 1;
							console.log("at player 2, player 2 made first move");
							$(".outComeBloc").html("");
							$(".player1Bloc").html("");
							$(".player2Bloc").html("You Chose " + currentdatabase[2].guess);
							initilaizeGame(2, 1);
						}

					} else {
						// play event second player moved
						console.log("line 246 second player moved - resolve");
						console.log("whoAmI - " + whoAmI);
						inPlay = false;
						if(whoAmI === 1 && player1WhosTurn === 1){
							console.log("at player 1, player 1s turn");
							player1WhosTurn = 1;
							$(".player1Bloc").html("You Chose " + player1Stats.guess);
							$(".player2Bloc").html("He Chose " + player2Stats.guess);
							resolveGame();
							writeOutCome();
							initilaizeGame(1, 1);
						}
						else if (whoAmI === 1 && player1WhosTurn === 2){
							console.log("at player 1, player 2s turn");
							player1WhosTurn = 2;
							player2Stats = currentdatabase[2];
							$(".player2Bloc").html("He Chose " + player2Stats.guess);
							resolveGame();
							writeOutCome();
							initilaizeGame(1, 2);
						}
						else if(whoAmI === 2 && player2WhosTurn === 1){
							console.log("at player 2, player 1s turn");
							player2WhosTurn = 1;
							player1Stats = currentdatabase[1];
							$(".player1Bloc").html("He chose " + player1Stats.guess);
							resolveGame();
							writeOutCome();
							initilaizeGame(2, 1);
						}
						else if(whoAmI === 2 && player2WhosTurn === 2 ){
							console.log("at player 2, player 2s turn");
							player2WhosTurn = 2;
							$(".player2Bloc").html("you chose " + player2Stats.guess);
							$(".player1Bloc").html("He Chose " + player1Stats.guess);
							resolveGame();
							writeOutCome();		
							initilaizeGame(2, 2);
						}
					}
					break;
				default:
					console.log("wtf")
			// end switch
			}
		// end else if
		}
	// end listener on database activity
	});

	// listen for a player 1 play click
	$(".player1Bloc").on("click", "button", function(event){
		player1Stats.guess = this.value;
		player1Stats.whosTurn++;
		console.log("player 1 stats - ", player1Stats);
		console.log("player 2 stats - ", player2Stats);
		$(".player1Bloc").html("<p id='choice'>You Chose</p><p id='dispChoice'>" + player1Stats.guess + "</p>");
		$(".playBloc").html("<p>Waiting for " + player2Stats.name + " to move</p>");
		player1Ref.set(player1Stats);
	});
	
	// listen for player 2 play click
	$(".player2Bloc").on("click", "button", function(event){
		player2Stats.guess = this.value;
		player2Stats.whosTurn++;
		console.log("player 2 stats - ", player2Stats);
		console.log("player 1 stats - ", player1Stats);
		$(".player2Bloc").html("<p id='choice'>You Chose</p><p id='dispChoice'>" + player2Stats.guess + "</p>");
		$(".playBloc").html("<p>Waiting for " + player1Stats.name + " to move</p>");
		player2Ref.set(player2Stats);
	});
	// end play event

	function writeOutCome(){
			console.log("winner is " + winner);
	        $(".outComeBloc").html("<p id='choice'>The winner is</p><p id='dispChoice'>" + winner + "</p>");
		    $(".player1ResultsBloc").html("<p>Wins: " + player1Stats.wins + " Losses: " + player1Stats.losses + "</p><p>Ties: " + player1Stats.ties + "</p>");
			$(".player2ResultsBloc").html("<p>Wins: " + player2Stats.wins + " Losses: " + player2Stats.losses + "</p><p>Ties: " + player2Stats.ties + "</p>");
	};

	function resolveGame (){
			console.log("line 316 in resolve game");
			// game logic
			if ((player1Stats.guess === "Rock") && (player2Stats.guess === "Scissors")) {
				player1Stats.wins++;
				player2Stats.losses++;
				winner = player1Stats.name;
			}
			else if ((player1Stats.guess === "Rock") && (player2Stats.guess === "Paper")) {
				player2Stats.wins++;
				player1Stats.losses++;
				winner = player2Stats.name;
			}
			else if ((player1Stats.guess === "Scissors") && (player2Stats.guess === "Rock")) {
				player2Stats.wins++;
				player1Stats.losses++;
				winner = player2Stats.name;
			}
			else if ((player1Stats.guess === "Scissors") && (player2Stats.guess === "Paper")) {
				player1Stats.wins++;
				player2Stats.losses++;
				winner = player1Stats.name;
			}
			else if ((player1Stats.guess === "Paper") && (player2Stats.guess === "Rock")) {
				player1Stats.wins++;
				player2Stats.losses++;
				winner = player1Stats.name;
			}
			else if ((player1Stats.guess === "Paper") && (player2Stats.guess === "Scissors")) {
				player2Stats.wins++;
				player1Stats.losses++;
				winner = player2Stats.name;
			}
				else if (player1Stats.guess === player2Stats.guess) {
				ties++;
				winner = "Tie";
				player2Stats.ties = ties;
				player1Stats.ties = ties;
	        } else {console.log("error in resolve no winner or tie")};
			console.log("player 1 stats", player1Stats);
			console.log("player 2 stats", player2Stats);
	// end resolve game
	}

// end doc ready
})