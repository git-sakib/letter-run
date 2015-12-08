/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-9
// --------------
// GAME PLAYER JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


// Players
var player;
var healthBar;
var runDistance = 0;
var healthPoint = PLAYER_MIN_HEALTH;
var littleMan;

var canJump;
var isJumpKeyDown;
var isSliding;
var isSlideKeyDown;
var isGameOver;
var powerUp = false;

var slideCounter = 0;
var playerInvincible = false;

var gameOverMsg;

// Player 
function initPlayer()
{
    player = game.add.sprite(PLAYER_POS_X, PLAYER_POS_Y, 'plrSprite');
    game.physics.arcade.enable(player);

    player.body.gravity.y = PLAYER_GRAVITY;
    //player.body.collideWorldBounds = true;

    // Run Animation
    //player.animations.add('run',game.math.numberArray(0,29),PLAYER_RUN_SPEED,false);
    player.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],PLAYER_RUN_SPEED,false);
    player.animations.play('run');

    player.body.setSize(PLAYER_BODY_SIZE.WIDTH, PLAYER_BODY_SIZE.HEIGHT);
    player.anchor.setTo(0.5,1);

    // Jump Animation
    player.animations.add('jump',[31,32],1,false);
    player.animations.add('dbljump',[31,36,37,38,39,40,41,32],7,false);

    // Slide Animation
    player.animations.add('slide',[30],1,false);    
    
    // Die Animation
    player.animations.add('dies',[33,34,35],1,false);   

    // Player Blink Tween
    plrTwn = game.add.tween(player).to({alpha:1},500,"Linear",false); 

    player.body.velocity.x = 150;

    //game.camera.follow(player);
    //game.camera.focusOnXY(player.body.x + 500, player.body.y);
    //game.camera.deadzone = new Phaser.Rectangle(100,1,1,1);

}

// Player All Actions & updates
//-----------------------------------------------------    
function player_update(){

    player_animations();

    if(powerUp){
        player_power_up();
        player_speed_down();
    }

    if(playerInvincible)player_power_run();

    player_jump();
      
    player_slide();

    game.camera.focusOnXY(player.x+300,player.y);
}


// Player Animations
//-----------------------------------------------------    
function player_animations(){

    if(player.body.touching.down){
        if(isSliding){
            player.animations.play('slide');
        }else {
            player.animations.play('run');
        }
        canJump = true;
    }else{
        canJump = false;
        player.animations.play('jump');
    }    
}

// Player Power Up
//-----------------------------------------------------    
function player_power_up(){
    // Check and perform Power Up
    if(game.input.keyboard.isDown(powerUpKey) || swipeRight){
        if(player.body.touching.down && !isSliding){
            playerInvincible = true;                    
        }
    }
    if(!playerInvincible && gameSpeedTick % 10 === 0){
        var gst = gameSpeedTick / 10;
        if(gst % 2 === 0)healthBar.blendMode = PIXI.blendModes.ADD;
        else healthBar.blendMode = PIXI.blendModes.NORMAL;
    }
}

// Player Power Run
//-----------------------------------------------------    
function player_power_run(){
    // Remove power up checking health condition
    powerUp = false;    
    if(healthPoint <= PLAYER_MIN_HEALTH){
        playerInvincible = false;
        player.blendMode = PIXI.blendModes.NORMAL;       
    } else if(healthPoint <= PLAYER_MIN_HEALTH + 100){
        game.time.slowMotion = mainGameSpeed;
        healthPoint = healthPoint - POWER_UP_HEALTH_LOSS / 2;
        healthBar.width = healthPoint;
        player.blendMode = PIXI.blendModes.ADD;
    } else {
        healthPoint = healthPoint - POWER_UP_HEALTH_LOSS;
        healthBar.width = healthPoint;
        game.time.slowMotion = POWER_UP_GAME_SPEED;
        player.blendMode = PIXI.blendModes.ADD;
        emitStar(player);
    }
    healthBar.blendMode = PIXI.blendModes.NORMAL;
}

// Player Jump
//-----------------------------------------------------    
function player_jump(){
    if (game.input.keyboard.isDown(jumpKey) || swipeUp){
        if(!isJumpKeyDown && canJump){
            player.body.velocity.y = PLAYER_JUMP_SPEED;
        }
        isJumpKeyDown = true;
    }else{
        isJumpKeyDown = false;
    }    
}

// Player Slide
//-----------------------------------------------------    
function player_slide(){
    if (game.input.keyboard.isDown(slideKey) || swipeDown)
    {
        if(!isJumpKeyDown && canJump && !isSliding && !isSlideKeyDown){
            player.body.setSize(PLAYER_BODY_SIZE.HEIGHT-10, PLAYER_BODY_SIZE.WIDTH-20);
            isSliding = true;
            slideCounter = 0;
        }
        isSlideKeyDown = true;
    }else{
        isSlideKeyDown = false;
    }
    // Slider Duration 
    if(slideCounter >= SLIDE_DURATION){
        isSliding = false;
        player.body.setSize(PLAYER_BODY_SIZE.WIDTH, PLAYER_BODY_SIZE.HEIGHT);
    }
    else{
        slideCounter++;
    }    
}


// Player Speed Down
//-----------------------------------------------------    
function player_speed_down(){
    // Check and perform Power Up
    if(game.input.keyboard.isDown(speedDownKey) || swipeLeft){
        mainGameSpeed = MIN_GAME_SPEED;
        powerUp = false;
        healthPoint = PLAYER_MIN_HEALTH;
        game.add.tween(speedBar).to({width : 20},1000,"Linear",true); 
        game.add.tween(healthBar).to({width : 20},1000,"Linear",true).onComplete.add(function(){
            //console.log(healthPoint);    
        }); 
        healthBar.blendMode = PIXI.blendModes.NORMAL;   
    }
}

// Manage Player Health
//-----------------------------------------------------    
function manageHealth(fruit)
{
    // health update
    if(fruit.key === 'lemon')healthPoint += FRUIT_HEALTH_POINT[0];
    if(fruit.key === 'banana')healthPoint += FRUIT_HEALTH_POINT[1];
    if(fruit.key === 'mango')healthPoint += FRUIT_HEALTH_POINT[2];
    if(fruit.key === 'jackfruit')healthPoint += FRUIT_HEALTH_POINT[3];
    if(healthPoint >= PLAYER_MAX_HEALTH){
        healthPoint = PLAYER_MAX_HEALTH;
        powerUp = true;
    }
    healthBar.width = healthPoint;
}

// Player Dies
//-----------------------------------------------------    
function playerDie(){

    //console.log("Die");
    road.autoScroll(0,0);
    ground.autoScroll(0,0);
    scenery.autoScroll(0,0);
    player.frame = 35;
    isGameOver = true;

    var boom = game.add.sprite(player.body.x + 20, player.body.y, 'boom');
    var tween = game.add.tween(boom).to({ alpha: 0 }, 1000, "Linear", true);

    gameOverMsg = game.add.sprite(GAME_WIDTH/2,GAME_HEIGHT/2,'msg-game-over');
    gameOverMsg.anchor.setTo(0.5,0.5);
    gameOverMsg.width = 0;
    gameOverMsg.height = 0;
    game.add.tween(gameOverMsg).to({width:264, height:247},500,"Linear",true).onComplete.add(function(){
        //game.paused = true;
    });

    // Game Over
    game.time.events.add(2000,function(){
        //game.state.remove('GameMain');
        game.state.start('GameOver');
        //game.state.restart();
    },this);
}
