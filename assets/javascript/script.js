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
	}
	// Variable for player2
	var player2Stats = {
				guess: "",
				losses: 0,
				name: "",
				whosTurn: 0,
				wins: 0,
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

	// this function is called
	// Inputs:  myplayer - what player am I
	//			myturn - whos turn is it  
	function initilaizeGame(myplayer, myturn){
		// player1Stats.guess = "";
		// player2Stats.guess = "";
		if (myplayer === 1){
			// initialising player 1

			if (myturn === 1){
				console.log("line 55 I am player 1");
				player1Stats.whosTurn = 1;
				player2Stats.whosTurn = 1;
				$(".playBloc").html("<p>It's Your Turn</p>")
				$(".player1Bloc").html("<button class='playButton' class='btn btn-default' value='rock'>Rock</button>");
				$(".player1Bloc").append("<button class='playButton' class='btn btn-default' value='paper'>Paper</button>");
				$(".player1Bloc").append("<button class='playButton' class='btn btn-default' value='scissors'>Scissors</button>");
			}
			else{
				console.log("line 65 I am player 1 player 2s turn");
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
				// player1Stats.whosTurn = 2;
				player2Stats.whosTurn = 2;
				$(".playBloc").html("<p>It's Your Turn</p>")
				$(".player2Bloc").append("<button class='playButton' class='btn btn-default' value='rock'>Rock</button>");
				$(".player2Bloc").append("<button class='playButton' class='btn btn-default' value='paper'>Paper</button>");
				$(".player2Bloc").append("<button class='playButton' class='btn btn-default' value='scissors'>Scissors</button>");

				// var button = $("<button>");
		  //       button.addClass("gifyButtons");
		  //       button.text(gifyAnimals[i]);
		  //       $(".buttonBloc").append(button)


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
			console.log("I am player - " + whoAmI);
			// create a directory for player stats
			player1Ref = database.ref("/playerStats/1");
			// write to database
			player1Ref.set(player1Stats);
			// Remove user from the connection list when they disconnect.
			player1Ref.onDisconnect().remove();
			console.log("line 115 player1Ref - " + player1Ref);
		}
		else {

		if (howManyPlayersHaveRegistered === 1){

			// second player to register
			console.log("registerig as player 2");
			player2Stats.name = $("#userName").val().trim();
			player2Stats.whosTurn = 1;
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
		var lastIndex = currentArray.length - 1;
		var lastKey = currentArray[lastIndex];
		console.log("line 160 lastKey - " + lastKey);
		console.log("line 161 array length - " + currentArray.length);
		// Using the last user's key to access the last added user object
		// Use array length to determin how many players have registered
		if (currentArray.length === 1){
			// only one player has registered
			if (howManyPlayersHaveRegistered === 0){
			// 2nd player is just starting
				// since 1 player is already registered (I'm player 2 starting up)
				whoAmI = 2;
				howManyPlayersHaveRegistered = 1;
				//write first players record to player 1 stats
// check this 
				player1Stats = currentdatabase[1];
				console.log("line 166 player1Stats - " + player1Stats);
			}
			else
				if (howManyPlayersHaveRegistered === 1) {
					// this was triggered by our registering as player 1 - Do Nothing
					console.log("line 173 player 1 registering");
				}
		}
		else if (currentArray.length === 2){
				// 2 players are registered
				player1Stats = currentdatabase[1];
				player2Stats = currentdatabase[2];
				console.log("line 185 howManyPlayersHaveRegistered - " + howManyPlayersHaveRegistered);
				switch(howManyPlayersHaveRegistered) {
					case 1:
						// event: at player 1, 2nd player registering
						console.log("event: at player 1, player 2 registering");
						howManyPlayersHaveRegistered = 3;
						// player2Stats = currentdatabase[lastKey];
						$(".player2NameBloc").html("<p>" + player2Stats.name + "<p>");
						initilaizeGame(1,1)
						break;
					case 2:
						// at player 2, 2nd player registering
						howManyPlayersHaveRegistered = 3;
						// player2Stats = currentdatabase[2];
						// Write the name to the screen as player 1
						console.log("the other player - " + player2Stats.name);
						$(".player1NameBloc").html("<p>" + player1Stats.name + "<p>");
						$(".playBloc").html("Waiting for " + player1Stats.name + " to go");
						break;
					case 3:
						// this is a play event
						console.log("player 1s name - " + player1Stats.name);
						console.log("player 2s name - " + player2Stats.name);
						if(inPlay === false){
							// play event first player moved
							inPlay = true;
							console.log("line 211 first player moved");
							console.log("whoAmI - " + whoAmI);
							console.log("player1WhosTurn - ", player1WhosTurn);
							console.log("player2WhosTurn - ", player2WhosTurn);

							if(whoAmI === 1 && player1WhosTurn === 1){
								player1WhosTurn = 2;
								console.log("at player 1, player 1 made first move");
								$(".player1Bloc").html("You chose " + player1Stats.guess);
								initilaizeGame(1, 2);
							}
							else if (whoAmI === 1 && player1WhosTurn === 2){
								player1WhosTurn = 1;
								// at player 1, player 1 made first move
								console.log("at player 1, player 2 made first move");
								// $(".player2Bloc").html("He Chose " + player2Stats.guess)
								$(".outComeBloc").html("");
								initilaizeGame(1, 1);
							}
							else if (whoAmI === 2 && player2WhosTurn === 1){
								player2WhosTurn = 2;
								console.log("at player 2, player 1 made first move");
								$(".outComeBloc").html("");
								initilaizeGame(2, 2);
							}
							else if (whoAmI === 2 && player2WhosTurn === 2){
								player2WhosTurn = 1;
								console.log("at player 2, player 2 made first move");
								$(".player2Bloc").html("you chose " + player2Stats.guess);
								// clear the buttons
								$(".outComeBloc").html("");
								initilaizeGame(2, 1);
							}

						}
						else{
							// play event second player moved
							console.log("line 249 second player moved - resolve");
							console.log("whoAmI - " + whoAmI);
							console.log("player1WhosTurn - ", player1WhosTurn);
							console.log("player2WhosTurn - ", player2WhosTurn);
							inPlay = false;
							if(whoAmI === 1 && player1WhosTurn === 1){
								player1WhosTurn = 2;
								console.log("at player 1, player 1s turn");
								$(".player1Bloc").html("You chose " + player1Stats.guess);
								resolveGame();
								writeOutCome();
								initilaizeGame(1, 1);
							}
							else if (whoAmI === 1 && player1WhosTurn === 2){
								player1WhosTurn = 2;
								console.log("at player 1, player 2s turn");
								$(".player2Bloc").html("He Chose " + player2Stats.guess);
								writeOutCome();
								initilaizeGame(1, 2);
							}
							else if(whoAmI === 2 && player2WhosTurn === 1){
								player2WhosTurn = 2;
								console.log("at player 2, player 1s turn");
								$(".player1Bloc").html("He chose " + player1Stats.guess);
								writeOutCome();
								initilaizeGame(2, 1);
							}
							else if(whoAmI === 2 && player2WhosTurn === 2 ){
								player2WhosTurn = 2;
								console.log("at player 2, player 2s turn");
								$(".player2Bloc").html("you chose " + player2Stats.guess);
								resolveGame();
								writeOutCome();		
								initilaizeGame(2, 2);
							}
						}
						// $(".playBloc").html("<p>Waiting For " + player2Stats.name + " To Make A Choice</p>");
						// howManyPlayersHaveRegistered = 3;
						break;
					default:
						console.log("wtf")
				// end switch
				}
				// break;
			// end else if
			}
	// end listener on database activity
	});

	// listen for a player 1 play click
	$(".player1Bloc").on("click", "button", function(event){
		console.log("got a click");
			player1Stats.guess = this.value;
			// player1whosTurn = 2;
			console.log("player 1 stats - ", player1Stats);
			$(".player1Bloc").html("<p id='choice'>You Chose</p><p id='dispChoice'>" + player1Stats.guess + "</p>");
			$(".playBloc").html("<p>Waiting for " + player2Stats.name + " to move</p>");
			// $(".player2Bloc").html("");
			// player1Stats.whosTurn = "player2";
			player1Ref.set(player1Stats);
	});
	// listen for player 2 play click
	$(".player2Bloc").on("click", "button", function(event){
			player2Stats.guess = this.value;
			// player2whosTurn = 1;
			console.log("player 2 stats - ", player2Stats);
			console.log("player 1 stats - ", player1Stats);
			$(".player2Bloc").html("<p id='choice'>You Chose</p><p id='dispChoice'>" + player2Stats.guess + "</p>");
			$(".playBloc").html("<p>Waiting for " + player1Stats.name + " to move</p>");
			// $(".player1Bloc").html("");
			player2Ref.set(player2Stats);

			// end player 2 made a move
			

	// end play event
	});

	function writeOutCome(){
			console.log("winner is " + winner);
	        $(".outComeBloc").html("<p id='choice'>The winner is</p><p id='dispChoice'>" + winner + "</p>");
		    $(".player1ResultsBloc").html("<p>wins: " + player1Stats.wins + " losses: " + player1Stats.losses + "</p>");
			$(".player2ResultsBloc").html("<p>wins: " + player2Stats.wins + " losses: " + player2Stats.losses + "</p>");
	};

	function resolveGame (){
			console.log("line 326 in resolve game");
			console.log("player 1 stats", player1Stats);
			console.log("player 2 stats", player2Stats);
			// game logic
			if ((player1Stats.guess === "rock") && (player2Stats.guess === "scissors")) {
				player1Stats.wins++;
				player2Stats.losses++;
				winner = player1Stats.name;
			}
			else if ((player1Stats.guess === "rock") && (player2Stats.guess === "paper")) {
				player2Stats.wins++;
				player1Stats.losses++;
				winner = player2Stats.name;
			}
			else if ((player1Stats.guess === "scissors") && (player2Stats.guess === "rock")) {
				player2Stats.wins++;
				player1Stats.losses++;
				winner = player2Stats.name;
			}
			else if ((player1Stats.guess === "scissors") && (player2Stats.guess === "paper")) {
				player1Stats.wins++;
				player2Stats.losses++;
				winner = player1Stats.name;
			}
			else if ((player1Stats.guess === "paper") && (player2Stats.guess === "rock")) {
				player1Stats.wins++;
				player2Stats.losses++;
				winner = player1Stats.name;
			}
			else if ((player1Stats.guess === "paper") && (player2Stats.guess === "scissors")) {
				player2Stats.wins++;
				player1Stats.losses++;
				winner = player2Stats.name;
			}
				else if (player1Stats.guess === player2Stats.guess) {
				ties++;
				winner = "tie";
	        }
	// end resolve game
	}

// end doc ready
})