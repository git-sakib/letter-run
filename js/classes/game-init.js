/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-4
// --------------
// GAME INIT JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


// Environment
var cursors;
var road, grass, earthGrp;
var sky;
var scenery;

// Stats
var statBar;
var score;
var scoreTxt;
var distanceTxt;
var distanceBar;
var speedBar;
var timeTxt;
var statGrp;

var muteBtn;

// Game Speed Control
//var mainGameSpeed = MIN_GAME_SPEED;

// Initialization 
function initGame(){
  
    game.physics.startSystem(Phaser.Physics.ARCADE); // init Physics

    game.world.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);

    earth.init();
    earth.generate();

    initStats();    // Stats of the Game
    
    buildPlayer();   // Add the Player
    
    initEmitters(); // Game Effects


    isGameOver = false;
    canJump = false;
    isJumpKeyDown = false;

    fruits.init();
    //fruits.generate();

    obstacles.init();
    //obstacles.generate();

    boxes.init();
    //boxes.generate(); 

    platforms.init();
    //platforms.generate();

    // reset local storage data
    //removeStorageData();

    //scenery.visible = false;
    //sky.visible = false;
    //statGrp.visible = false;
    //player.visible = false;
}


// Init Statistics
function initStats(){

    statGrp = game.add.group();

    // Life Bar
    healthBar = game.add.tileSprite(STATS_POS_X + 230, STATS_POS_Y + 30, healthPoint, 30,'health-bar');
    statGrp.add(healthBar);
    //console.log(healthBar.width);

    // Speed Bar
    speedBar = game.add.tileSprite(STATS_POS_X + 40, STATS_POS_Y + 60, 20, 52, 'speed-bar');
    speedBar.width = 20;
    statGrp.add(speedBar);

    statBar = game.add.sprite(STATS_POS_X, STATS_POS_Y, 'stat_bar');
    statGrp.add(statBar);

    fruitTxt = game.add.bitmapText(STATS_POS_X + 160, STATS_POS_Y + 30, 'bangla_font', fruits.count, 30);

    statGrp.add(fruitTxt);
    
    // Distance 
    distanceBar = game.add.sprite(STAGE_WIDTH - 180, GAME_HEIGHT - 50, 'distance-bar');
    distanceTxt = game.add.bitmapText(STAGE_WIDTH - 140, GAME_HEIGHT - 35, 'bangla_font', runDistance.toFixed(0), 32);
    distanceTxt.align = "right";

    statGrp.add(distanceBar);
    statGrp.add(distanceTxt);

    statGrp.fixedToCamera = true;
    // Time
    //timeTxt = game.add.bitmapText(50, GAME_HEIGHT - 40, 'bangla_font', '', 36);
}


function stats_update()
{
    // Updating Distance Text
    //runDistance += DISTANCE_PER_RUN;
    //distanceTxt.text = runDistance.toFixed(0) + " ";
    //distanceTxt.x = GAME_WIDTH - distanceTxt.textWidth - 50;

    // Updating Time Duration
    //timeTxt.text = game.time.totalElapsedSeconds().toFixed(0); 
}


// Main Funcation for Restarting and Ressetting the Game
function reset_game(){

    //mainGameSpeed = MAIN_GAME_SPEED;
    // runDistance = Phaser.Math.ceil(runDistance);
    // distanceTxt.text = runDistance.toFixed(0) + " ";
    // game.time.reset();
    // //timeTxt.text = game.time.totalElapsedSeconds().toFixed(0);
    // healthPoint = PLAYER_MIN_HEALTH;
    // healthBar.width = healthPoint;
    // powerup = false;
    // playerInvincible = false;
    // gameSpeedTick = 0;
    // isGameOver = false;
    // blockCounter = 0;
    // gameEventDelay = 0;
    // gameEvents.removeAll();
    //console.log('Resetting All');
}
