/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-5
// --------------
// GAME EVENTS JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


var gameEvents;
var gameBlock;
var blockCounter = 0;
var eventArr = [];
var gameEventDelay = 0;

function manageEvents(){
    
	// Set Delay for Starting
	gameEventDelay = 5000;

	// Semi Random
	gameEvents = game.time.create();//game.time.events;

	// Easy Mode
    while(!isGameOver && blockCounter < 1000)
    {
    	gameBlock = RAND.between(1,20);
		if(isInArray(gameBlock,[1,2,6,8,10,12,16,18])){
			gameEvents.add(gameEventDelay, createFruits, this);
			gameEventDelay += 2500;
		}
		else if(isInArray(gameBlock,[7,11,19])){
			gameEvents.add(gameEventDelay, createPlatformBlock, this);
			gameEventDelay += 33000;
		}    	
		else {
			gameEvents.add(gameEventDelay, createObstacle, this);
			gameEventDelay += 2500;
		}
		blockCounter++;
    }

    gameEvents.start();
    
}