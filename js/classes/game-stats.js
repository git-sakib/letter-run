/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-11
// --------------
// GAME STATS JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


var statsGroup;
var fruitTotalTxt = [];
var tweens = [];
var msgFrame;
var totalDistanceTxt;
var totalPointTxt;
var totalPoint;
var totalCounter = 0;
var totalGamePoint = 0;    // From Database
var bestGamePoint = 0;     // From Database
var totalGamePointTxt;
var bestGamePointTxt;
var letters = [];
var preLetterFrame, letterFrame;
var curLetter;
var replayBtn;

// Game Over
//-----------------------------------------------------    

function initGameStats(){

    // SAVE & LOAD @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // re set user best and total
    //resetUserData();


    // LOAD LOCAL DATA @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    if(isLocalStorage())loadStorageData();


    statsGroup = game.add.group();

    // Main Frame
    msgFrame = game.add.sprite(0,0,'msg-frame');
    statsGroup.add(msgFrame);

    // Fruits and Distance
    var xpos = 355;
    var ypos = 85;
    var ygap = 63;
    fruitTotalTxt[0] = game.add.bitmapText(xpos,ypos+=ygap,'bangla_font',fruitCount['jackfruit'] + ' * ' + FRUIT_HEALTH_POINT[3] / 10,32);
    fruitTotalTxt[1] = game.add.bitmapText(xpos,ypos+=ygap,'bangla_font',fruitCount['mango'] + ' * ' + FRUIT_HEALTH_POINT[2] / 10,32);
    fruitTotalTxt[2] = game.add.bitmapText(xpos,ypos+=ygap,'bangla_font',fruitCount['banana'] + ' * ' + FRUIT_HEALTH_POINT[1] / 10,32);
    fruitTotalTxt[3] = game.add.bitmapText(xpos,ypos+=ygap,'bangla_font',fruitCount['lemon'] + ' * ' + FRUIT_HEALTH_POINT[0] / 10,32);
    totalDistanceTxt = game.add.bitmapText(xpos,ypos+=ygap,'bangla_font','' + runDistance.toFixed(0),32);
    statsGroup.addMultiple([fruitTotalTxt[0],fruitTotalTxt[1],fruitTotalTxt[2],fruitTotalTxt[3],totalDistanceTxt]);
    fruitTotalTxt[0].scale.setTo(0,0);
    fruitTotalTxt[1].scale.setTo(0,0); 
    fruitTotalTxt[2].scale.setTo(0,0); 
    fruitTotalTxt[3].scale.setTo(0,0); 
    totalDistanceTxt.scale.setTo(0,0); 

    // Total Point Calculation & Animation
    totalPoint = runDistance 
    + (fruitCount['jackfruit'] * FRUIT_HEALTH_POINT[0] / 10) 
    + (fruitCount['mango'] * FRUIT_HEALTH_POINT[1] / 10) 
    + (fruitCount['banana'] * FRUIT_HEALTH_POINT[2] / 10) 
    + (fruitCount['lemon'] * FRUIT_HEALTH_POINT[3] / 10);
    totalPointTxt = game.add.bitmapText(355,ypos+=ygap+5,'bangla_font','0',48);
    statsGroup.add(totalPointTxt);

    // Total Game Point Calculation & Animation
    bestGamePointTxt = game.add.bitmapText(500,170,'bangla_font','' + bestGamePoint,48);
    statsGroup.add(bestGamePointTxt);

    // Best Game Point Calculation & Animation
    totalGamePointTxt = game.add.bitmapText(500,260,'bangla_font','' + totalGamePoint,48);    
    statsGroup.add(totalGamePointTxt);
    totalGamePoint += totalPoint * 1;
    //console.log(totalGamePoint);

    // Letters
    letterFrame = parseInt( totalGamePoint / NEXT_LETTER_POINT );
    preLetterFrame = parseInt( (totalGamePoint - totalPoint) / NEXT_LETTER_POINT );
    showLetters(preLetterFrame);

    // Replay Button And Tweens
    replayBtn = game.add.button(GAME_WIDTH/2-120,GAME_HEIGHT-110,'replayBtn',function(){
        reset_game_stats();
        restart_game();
    },this);
    replayBtn.y = GAME_HEIGHT + 200;
    statsGroup.add(replayBtn);

    //reset_game_stats();

}


// Manage Game Stats
function showGameStats()
{
    initGameStats();

    var delay = 0;

    // Fruits
    animScaleInOut(fruitTotalTxt[0],delay);     delay += 500;
    animScaleInOut(fruitTotalTxt[1],delay);     delay += 500;
    animScaleInOut(fruitTotalTxt[2],delay);     delay += 500;
    animScaleInOut(fruitTotalTxt[3],delay);     delay += 500;

    // Distance
    animScaleInOut(totalDistanceTxt,delay);     delay += 500;
    // Point
    animScore(totalPointTxt,totalPoint,delay);  delay += 1000;
    // Best POint
    if(totalPoint > bestGamePoint){
        animScore(bestGamePointTxt,totalPoint,delay);  delay += 1000;
        bestGamePoint = totalPoint;
        //starEffect(bestGamePointTxt);
    }
    // Total Point
    animScore(totalGamePointTxt,totalGamePoint,delay);  delay += 1000;

    // Letter Found
    game.time.events.add(delay,function(){
        letterUpdate();
    },this);
    delay += 1000;

    // Replay Button
    game.time.events.add(delay,function(){
        game.add.tween(replayBtn).to({y:GAME_HEIGHT-110},1000,"Linear",true);
    },this);   

    // SAVE & LOAD @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Save Data in the Json Database
    //updateUserData();
    //saveUserData();

    // SAVE TO LOCAL STORAGE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    if(isLocalStorage())saveStorageData();

}


function letterUpdate(){

    if(letterFrame > preLetterFrame){
        var xp = GAME_WIDTH/2; var yp = GAME_HEIGHT/2;   
        curLetter = game.add.sprite(xp,yp,'letters');
        curLetter.frame = letterFrame;
        curLetter.anchor.setTo(0.5,0.5);
        curLetter.width = 0; curLetter.height = 0;
        curLetter.tint = 0x000000;
        game.add.tween(curLetter).to({tint: 0xFFFFFF, width: 500, height: 500}, 2000, "Linear", true).onComplete.add(function(){
            curLetter.blendMode = PIXI.blendModes.ADD;
            game.add.tween(curLetter).to({width: 0, height: 0, x: letters[letterFrame].x, y:letters[letterFrame].y}, 1000, "Linear", true).onComplete.add(function(){
                //letters[letterFrame].alpha = 1;
                for(var i=letterFrame;i>=0;i--)letters[i].alpha = 1;
            }); 

        }); 
    }
}

// Manage Letters
function showLetters(letterPointer){
    var xp = 500;
    var yp = 340;
    for(var i=0;i<26;i++){
        if(i % 8 === 0){ yp += 40; xp = 500; }
        letters[i] = game.add.sprite(xp,yp,'letters');
        letters[i].frame = i;
        letters[i].anchor.setTo(0.5,0.5);
        letters[i].scale.setTo(0.4,0.4);
        letters[i].blendMode = PIXI.blendModes.ADD;
        if(i > letterPointer)letters[i].alpha = 0.1;
        xp += 40;
    }
}

// Animate and Gradually Increase Scores
function animScore(elm,score,startDelay,speed){

    if(typeof(speed)==='undefined')speed = 1;
    var val = elm.text * 1;
    if(score < val)return;
    var myEvents = game.time.create(true);
    var incFactor = 10; //Phaser.Math.ceil((score - val) / 100);
    //console.log(val);
    myEvents.loop(speed,function(){
        if(val < score){
            val = val + incFactor;
            elm.setText('' + val.toFixed(0));
        } else {
            elm.setText('' + score.toFixed(0) );
            myEvents.stop();
        }
    },this,elm);
    myEvents.start(startDelay);
}

// Animate Scale Property of an Element
function animScaleInOut(elm,startDelay,speed)
{
    if(typeof(speed)==='undefined')speed = 10;
    var myEvents = game.time.create(true);
    myEvents.repeat(speed,15,function(){
        elm.scale.setTo(elm.scale.x+=0.1,elm.scale.y+=0.1);
    },this,elm);
    myEvents.start(startDelay);
    myEvents = game.time.create(true);
    myEvents.repeat(speed,5,function(){
        elm.scale.setTo(elm.scale.x-=0.1,elm.scale.y-=0.1);
    },this,elm);
    myEvents.start(startDelay+250);
}

// Stop All
function stopAllAnims(){

    game.time.events.removeAll();
    game.time.reset();

    fruitTotalTxt[0].setText(fruitCount['jackfruit'] + ' * ' + FRUIT_HEALTH_POINT[3] / 10);
    fruitTotalTxt[1].setText(fruitCount['mango'] + ' * ' + FRUIT_HEALTH_POINT[2] / 10);
    fruitTotalTxt[2].setText(fruitCount['banana'] + ' * ' + FRUIT_HEALTH_POINT[1] / 10);
    fruitTotalTxt[3].setText(fruitCount['lemon'] + ' * ' + FRUIT_HEALTH_POINT[0] / 10);

    fruitTotalTxt[0].scale.setTo(1,1); 
    fruitTotalTxt[1].scale.setTo(1,1); 
    fruitTotalTxt[2].scale.setTo(1,1);
    fruitTotalTxt[3].scale.setTo(1,1); fruitTotalTxt[0].scale.setTo(1,1); fruitTotalTxt[0].scale.setTo(1,1);

    totalDistanceTxt.setText('' + runDistance.toFixed(0));
    totalDistanceTxt.scale.setTo(1,1);

    totalPointTxt.setText(totalPoint.toFixed(0));
    bestGamePointTxt.setText(bestGamePoint.toFixed(0));
    totalGamePointTxt.setText(totalGamePoint.toFixed(0));

    if(letterFrame > preLetterFrame){
        for(var i=letterFrame;i>=0;i--)letters[i].alpha = 1;
    } 

    replayBtn.y = GAME_HEIGHT-110;

    // SAVE TO LOCAL STORAGE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    if(isLocalStorage())saveStorageData();
    
}

// Reset Game Stats
function reset_game_stats(){
    totalPoint = 0;
    bestGamePoint = 0;
    totalGamePoint = 0;
    letterPointer = -1;
    bestGamePointTxt.setText(bestGamePointTxt);
    totalGamePointTxt.setText(totalGamePoint);
}

// Restart Game
function restart_game(){
    runDistance = 0;
    //console.log(powerup + playerInvincible + healthPoint);
    
    // SAVE & LOAD @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // re set user best and total
    //resetUserData();
    mainGameSpeed = MIN_GAME_SPEED;
    game.time.reset();
    game.state.start('GameMain');
    
}
