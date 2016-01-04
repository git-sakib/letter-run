
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SECTION-9 - GAME PLAYER JS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


var PLAYER_POS_X = 20;
var PLAYER_POS_Y = GROUND_LEVEL;
var PLAYER_BODY_SIZE = {WIDTH: 80, HEIGHT: 130};
var PLAYER_GRAVITY = 760;
var PLAYER_JUMP_SPEED = -450;
var PLAYER_SLIDE_DURATION = 80;

var MAX_POWER = 500;
var MIN_POWER = 20;
var DEC_POWER = 5;

var MAX_RUN_FPS = 70;
var MIN_RUN_FPS = 30;
var INC_RUN_FPS = 0.05;

var MAX_VELOCITY = 600;
var MIN_VELOCITY = 300;
var INC_VELOCITY = 0.1;

var JUMP_ANIM_SPEED = 1;
var DBL_JUMP_ANIM_SPEED = 2;

var SLIDE_DURATION = 80;

// Players
var player;
var healthBar;
var runDistance = 0;

var gameOverMsg;

var boostKeyDown;
var slowKeyDown;
var jumpKeyDown;
var slideKeyDown;


// Player 
function buildPlayer()
{
    player = game.add.sprite(PLAYER_POS_X, PLAYER_POS_Y, 'plrSprite');
    player.scale.setTo(0.7,0.7);

    player.canJump = true;
    player.canSlide = true;
    player.jumpCount = 0;
    player.runFPS = MIN_RUN_FPS; 
    player.slowing = false;
    player.sliding = false;
    player.slideCount = 0;
    player.invincible = false;
    player.powerUp = false;
    player.power = MIN_POWER;


//==========================================================================
// PLAYER INIT
//==========================================================================

    player.init = function(){
        game.physics.arcade.enable(this);
        this.body.gravity.y = PLAYER_GRAVITY;
        this.body.setSize(PLAYER_BODY_SIZE.WIDTH, PLAYER_BODY_SIZE.HEIGHT);
        this.anchor.setTo(0.5,1);
        this.body.velocity.x = MIN_VELOCITY;
    }

    player.setAnimations = function(){
        this.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],MIN_RUN_FPS,false);
        this.animations.add('jump',[31,32],JUMP_ANIM_SPEED,false);
        this.animations.add('dbljump',[36,31,32],DBL_JUMP_ANIM_SPEED,false);
        this.animations.add('slide',[30],1,false);    
        this.animations.add('dies',[33,34,35],1,false);   

        // Setup Player Tweens
        plrBlinkTwn = game.add.tween(this).to({alpha:1},500,"Linear",false); 
        plrRollTwn = game.add.tween(this).to({angle:'+360'}, 500, Phaser.Easing.Linear.None);

    }
    player.init();
    player.setAnimations();

    player.onGround = function(){
        return this.body.touching.down;
    }

    player.setRunFPS = function(){
        this.animations.play('run',Math.round(this.runFPS));
    }





//==========================================================================
// PLAYER RUN
//==========================================================================

    player.run = function(){

        if (this.onGround()){  

            if(this.invincible){
                this.body.velocity.x = MAX_VELOCITY;
                this.runFPS = MAX_RUN_FPS;
            }else if(this.slowing){
                if(this.body.velocity.x > MIN_VELOCITY){
                    this.body.velocity.x -= INC_VELOCITY;
                }else{
                    this.slowing = false;
                }
                if(this.runFPS > MIN_RUN_FPS)this.runFPS -= INC_RUN_FPS;
            } else {
                if(this.body.velocity.x < MAX_VELOCITY)this.body.velocity.x += INC_VELOCITY;
                if(this.runFPS < MAX_RUN_FPS)this.runFPS += INC_RUN_FPS;
            }

            this.animations.play('run',this.setRunFPS());
            this.anchor.setTo(0.5,1);
        }

    }



//==========================================================================
// PLAYER JUMP
//==========================================================================

    player.jump = function(){

        if (this.onGround()){  

            this.jumpCount = false;
            if(jumpKeyDown && this.canJump){
                this.body.velocity.y = PLAYER_JUMP_SPEED;
                this.canJump = false;
            }
            if(!jumpKeyDown && !this.canJump){
                this.canJump = true;
                this.jumpCount = 0;
            }

        }else{

            if(!jumpKeyDown && this.jumpCount < 1){
                this.jumpCount = 1;
            }
            if(jumpKeyDown && this.jumpCount == 1){
                this.body.velocity.y = PLAYER_JUMP_SPEED;
                this.anchor.setTo(0.5,0.5);
                plrRollTwn.start(); 
                plrRollTwn.onComplete.add(function(){
                    this.anchor.setTo(0.5,1);
                },this);           
                this.jumpCount = 2;
            }

        }      
    }


//==========================================================================
// PLAYER SLIDE
//==========================================================================

    player.slide = function(){

        if(this.onGround())
        {
            if(slideKeyDown && !this.sliding && this.canSlide){
                this.sliding = true;
                this.canSlide = false;
                this.slideCount = 0;
            }
            if(!slideKeyDown && !this.sliding){
                this.canSlide = true;
            }
        }
        // Slider Duration 
        if(this.slideCount >= SLIDE_DURATION){
            this.sliding = false;
        }else{
            this.slideCount++;
        }    
    }

//==========================================================================
// PLAYER COLLECT MANGO
//==========================================================================


    player.eat = function()
    {
        // health update
        if(this.power >= MAX_POWER){
            this.power = MAX_POWER;
            this.powerUp = true;
            healthBar.blendMode = PIXI.blendModes.ADD;
        } else {
            this.power += fruits.point;
            healthBar.width = this.power;
        }
        
    }


//==========================================================================
// PLAYER ANIMATIONS UPDATE
//==========================================================================


    player.setAnimations = function(){

        if(this.onGround()){
            if(this.sliding){
                this.animations.play('slide');
                this.body.setSize(PLAYER_BODY_SIZE.HEIGHT-10, PLAYER_BODY_SIZE.WIDTH-20);
            }else {
                this.body.setSize(PLAYER_BODY_SIZE.WIDTH, PLAYER_BODY_SIZE.HEIGHT);
            }
        }else{
            if(this.jumpCount == 2){
                this.animations.play('dbljump',DBL_JUMP_ANIM_SPEED);
                this.body.setSize(PLAYER_BODY_SIZE.WIDTH-20, PLAYER_BODY_SIZE.HEIGHT-30);
            }else {
                this.animations.play('jump',JUMP_ANIM_SPEED);
                this.body.setSize(PLAYER_BODY_SIZE.WIDTH, PLAYER_BODY_SIZE.HEIGHT-20);
            }
        }    
    }


//==========================================================================
// PLAYER BOOST UP
//==========================================================================


    player.boost = function(){

        // Check and perform Power Up
        if(this.powerUp && boostKeyDown){
            if(this.onGround() && !isSliding){
                this.invincible = true;                    
            }
        }

        // if(!playerInvincible && gameSpeedTick % 10 === 0){
        //     var gst = gameSpeedTick / 10;
        //     if(gst % 2 === 0)healthBar.blendMode = PIXI.blendModes.ADD;
        //     else healthBar.blendMode = PIXI.blendModes.NORMAL;
        // }

        if(this.invincible && boostKeyDown){
            this.powerUp = false;    
            if(this.power <= MIN_POWER){
                this.invincible = false;
                this.blendMode = PIXI.blendModes.NORMAL;       
            // } else if(this.power <= MIN_POWER + 100){
            //     this.power = this.power - POWER_UP_HEALTH_LOSS / 2;
            //     healthBar.width = this.power;
            //     this.blendMode = PIXI.blendModes.ADD;
            } else {
                this.power = this.power - DEC_POWER;
                healthBar.width = this.power;
                this.blendMode = PIXI.blendModes.ADD;
                emitStar(this);
            }
            healthBar.blendMode = PIXI.blendModes.NORMAL;            
        }

    }


//==========================================================================
// PLAYER SLOW DOWN
//==========================================================================

    player.slowDown = function(){
        if(this.powerUp && slowKeyDown && !this.slowing){
            console.log();
            this.slowing = true;   
            this.powerUp = false;

            this.power = MIN_POWER;
            //game.add.tween(speedBar).to({width : 20},1000,"Linear",true); 
            game.add.tween(healthBar).to({width : 20},1000,"Linear",true).onComplete.add(function(){
                //console.log(healthPoint);    
            }); 
            healthBar.blendMode = PIXI.blendModes.NORMAL;             
        }    
    }

//==========================================================================
}


function playerUpdate(){

    // Upadate Player with the Input
    boostKeyDown = game.input.keyboard.isDown(boostKey);
    slowKeyDown = game.input.keyboard.isDown(slowKey);
    jumpKeyDown = game.input.keyboard.isDown(jumpKey);
    slideKeyDown = game.input.keyboard.isDown(slideKey);

    player.run();
    player.slide();
    player.jump();
    player.setAnimations();
    player.boost();
    player.slowDown();


    // Player Camera
    game.camera.focusOnXY(player.x+300,0);    
    
}


// Player Animations
//-----------------------------------------------------    


/*

// Player Power Up
//-----------------------------------------------------    


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
