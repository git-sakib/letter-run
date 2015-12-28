/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-9
// --------------
// GAME PLAYER JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Player Setup
var PLAYER_POS_X = 20;
var PLAYER_POS_Y = GROUND_LEVEL;
var PLAYER_BODY_SIZE = {WIDTH: 80, HEIGHT: 130};
var PLAYER_GRAVITY = 760;
var PLAYER_JUMP_SPEED = -450;
var PLAYER_SLIDE_DURATION = 80;
var PLAYER_MAX_HEALTH = 500;
var PLAYER_MIN_HEALTH = 20;

var MAX_RUN_ANIM_SPEED = 60;
var MIN_RUN_ANIM_SPEED = 30;
var RUN_ANIM_SPEED = 45;

var MAX_VELOCITY = 400;
var MIN_VELOCITY = 200;
var NORMAL_VELOCITY = 300;

var JUMP_ANIM_SPEED = 1;
var DBL_JUMP_ANIM_SPEED = 2;

var SLIDE_DURATION = 80;

// Players
var player;
var healthBar;
var runDistance = 0;
var healthPoint = PLAYER_MIN_HEALTH;
var littleMan;

var canJump;
var canDblJump;
var isJumpKeyDown;
var isSliding;
var isSlideKeyDown;
var isGameOver;
var powerUp = false;

var slideCounter = 0;
var playerInvincible = false;

var gameOverMsg;

var rightKeyDown;
var leftKeyDown;
var jumpKeyDown;
var slideKeyDown;
var onGround;


// Player 
function buildPlayer()
{
    player = game.add.sprite(PLAYER_POS_X, PLAYER_POS_Y, 'plrSprite');
    player.scale.setTo(0.7,0.7);

    player.canJump = true;
    player.canSlide = true;
    player.jumpCount = 0;
    player.runAnimSpeed = RUN_ANIM_SPEED; 


    player.init = function(){
        game.physics.arcade.enable(this);
        this.body.gravity.y = PLAYER_GRAVITY;
        this.body.setSize(PLAYER_BODY_SIZE.WIDTH, PLAYER_BODY_SIZE.HEIGHT);
        this.anchor.setTo(0.5,1);
    }

    player.setAnimations = function(){
        this.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],RUN_ANIM_SPEED,false);
        this.animations.add('jump',[31,32],JUMP_ANIM_SPEED,false);
        this.animations.add('dbljump',[36,31,32],DBL_JUMP_ANIM_SPEED,false);
        this.animations.add('slide',[30],1,false);    
        this.animations.add('dies',[33,34,35],1,false);   

        // Player Blink Tween
        //plrTwn = game.add.tween(this).to({alpha:1},500,"Linear",false); 
        plrRollTwn = game.add.tween(this).to({angle:'+360'}, 500, Phaser.Easing.Linear.None, false);

    }
    player.init();
    player.setAnimations();




    player.accelerate = function(){
        if(this.body.velocity.x < MAX_VELOCITY)this.body.velocity.x++;
        //player.run(60);
        if(this.runAnimSpeed < MAX_RUN_ANIM_SPEED)this.runAnimSpeed++;
        this.animations.play('run',this.runAnimSpeed);
    }

    player.deccelerate = function(){
        if(this.body.velocity.x > MIN_VELOCITY)this.body.velocity.x--;
        if(this.runAnimSpeed > MIN_RUN_ANIM_SPEED)this.runAnimSpeed--;
        this.animations.play('run',this.runAnimSpeed);
    }

    player.run = function(){
        //if(typeof(runSpeed) ==='undefined') this.runAnimSpeed;

        if(this.runAnimSpeed > RUN_ANIM_SPEED)this.runAnimSpeed--;
        if(this.runAnimSpeed < RUN_ANIM_SPEED)this.runAnimSpeed++;

        if(this.body.velocity.x > NORMAL_VELOCITY)this.body.velocity.x--;
        if(this.body.velocity.x < NORMAL_VELOCITY)this.body.velocity.x++;

        this.animations.play('run',this.runAnimSpeed);
        player.anchor.setTo(0.5,1);

    }

    player.onGround = function(){
        return this.body.touching.down;
    }

    player.jump = function(){
        this.body.velocity.y = PLAYER_JUMP_SPEED;
    }

    player.dblJump = function(){
        this.body.velocity.y = PLAYER_JUMP_SPEED;
    }


}


function playerUpdate(){

    // Upadate Player with the Input
    rightKeyDown = game.input.keyboard.isDown(runRightKey);
    leftKeyDown = game.input.keyboard.isDown(runLeftKey);
    jumpKeyDown = game.input.keyboard.isDown(jumpKey);
    slideKeyDown = game.input.keyboard.isDown(slideKey);
    onGround = player.onGround();

    playerRun();
    playerSlide();
    playerJump();
    playerAnimations();

    // Player Camera
    game.camera.focusOnXY(player.x+300,0);    
    
}


// Player Run
//-----------------------------------------------------    
function playerRun(){

    if (onGround){ 
        if(rightKeyDown){
            player.accelerate();
        }else if(leftKeyDown){
            player.deccelerate();
        }else {
            player.run();
        }    
    }
}


// Player Jumps
//-----------------------------------------------------    
function playerJump(){

    if (onGround){   // can jump

        // Player Jumps
        player.jumpCount = false;
        if(jumpKeyDown && player.canJump){
            player.jump();
            player.canJump = false;
            //console.log('Jumps');
        }
        if(!jumpKeyDown && !player.canJump){
            player.canJump = true;
            player.jumpCount = 0;
        }

    }else{

        // Player Double Jump
        if(!jumpKeyDown && player.jumpCount < 1){
            player.jumpCount = 1;
        }
        if(jumpKeyDown && player.jumpCount == 1){
            //console.log('Dbl Jumps');
            player.dblJump();
            player.anchor.setTo(0.5,0.5);
            plrRollTwn.start(); 
            plrRollTwn.onComplete.add(function(){
                player.anchor.setTo(0.5,1);
            },this);           
            player.jumpCount = 2;
        }

    }      
}



// Player Slide
//-----------------------------------------------------    
function playerSlide(){

    if(onGround)
    {
        if(slideKeyDown && !isSliding && player.canSlide){
            isSliding = true;
            player.canSlide = false;
            slideCounter = 0;
        }
        if(!slideKeyDown && !isSliding){
            player.canSlide = true;
        }
    }
    // Slider Duration 
    if(slideCounter >= SLIDE_DURATION){
        isSliding = false;
    }
    else{
        slideCounter++;
    }    
}


// Player Animations
//-----------------------------------------------------    
function playerAnimations(){

    if(onGround){
        if(isSliding){
            player.animations.play('slide');
            player.body.setSize(PLAYER_BODY_SIZE.HEIGHT-10, PLAYER_BODY_SIZE.WIDTH-20);
        }else {
            player.run();
            player.body.setSize(PLAYER_BODY_SIZE.WIDTH, PLAYER_BODY_SIZE.HEIGHT);
        }
    }else{
        if(player.jumpCount == 2){
            player.animations.play('dbljump',DBL_JUMP_ANIM_SPEED);
            //player.animations.play('jump',DBL_JUMP_ANIM_SPEED);
            player.body.setSize(PLAYER_BODY_SIZE.WIDTH-20, PLAYER_BODY_SIZE.HEIGHT-30);
        }else {
            player.animations.play('jump',JUMP_ANIM_SPEED);
            player.body.setSize(PLAYER_BODY_SIZE.WIDTH, PLAYER_BODY_SIZE.HEIGHT-20);
        }
    }    
}

/*

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
        if(!isJumpKeyDown){
            if(canJump){
                player.body.velocity.y = PLAYER_JUMP_SPEED;
            }
            if(canDblJump) {
                player.body.velocity.y = player.body.velocity.y + PLAYER_JUMP_SPEED ;
                canDblJump = false;
            }
        }
        isJumpKeyDown = true;
    }else{
        isJumpKeyDown = false;
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

*/

// Manage Player Health
//-----------------------------------------------------    
function manageHealth(fruit)
{
    // health update
    healthPoint += fruits.point;
    if(healthPoint >= PLAYER_MAX_HEALTH){
        healthPoint = PLAYER_MAX_HEALTH;
        powerUp = true;
    }
    healthBar.width = healthPoint;
}



// Player Dies
//-----------------------------------------------------    
function playerDie(){

    console.log("Die");
    //road.autoScroll(0,0);
    //ground.autoScroll(0,0);
    //scenery.autoScroll(0,0);
    player.frame = 35;
    isGameOver = true;

    var boom = game.add.sprite(player.body.x + 20, player.body.y, 'boom');
    var tween = game.add.tween(boom).to({ alpha: 0 }, 1000, "Linear", true);

    // gameOverMsg = game.add.sprite(GAME_WIDTH/2,GAME_HEIGHT/2,'msg-game-over');
    // gameOverMsg.anchor.setTo(0.5,0.5);
    // gameOverMsg.width = 0;
    // gameOverMsg.height = 0;
    // game.add.tween(gameOverMsg).to({width:264, height:247},500,"Linear",true).onComplete.add(function(){
    //     //game.paused = true;
    // });

    // Game Over
    game.time.events.add(2000,function(){
        //game.state.remove('GameMain');
        //game.state.start('GameOver');
        //game.state.restart();
    },this);
}
