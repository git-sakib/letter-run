/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-13
// --------------
// GAME TOUCH JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


var swipeUp = false;
var swipeDown = false;
var swipeLeft = false;
var swipeRight = false;

var jumpBtn, slideBtn, sprintBtn, slowBtn;


function resetTouch(){
    swipeUp = false;
    swipeDown = false;
    swipeLeft = false;
    swipeRight = false;
}

// Listen For Touch Event
function listenTouch(){
    var swipeCoordX,swipeCoordY,swipeCoordX2,swipeCoordY2;
    var swipeMinDistanceUD = 20;
    var swipeMinDistanceLR = 50;

    game.input.onDown.add(function(pointer) {
        swipeCoordX = pointer.clientX;
        swipeCoordY = pointer.clientY;    
    }, this);

    game.input.onUp.add(function(pointer) {
        swipeCoordX2 = pointer.clientX;
        swipeCoordY2 = pointer.clientY;
        if(swipeCoordX2 < swipeCoordX - swipeMinDistanceLR){
            //console.log("left");
            swipeLeft = true;
        }else if(swipeCoordX2 > swipeCoordX + swipeMinDistanceLR){
            //console.log("right");
            swipeRight = true;
        }else if(swipeCoordY2 < swipeCoordY - swipeMinDistanceUD){
            //console.log("up");
            swipeUp = true;
        }else if(swipeCoordY2 > swipeCoordY + swipeMinDistanceUD){
            //console.log("down");
            swipeDown = true;
        }
    }, this);

    //console.log(swipeUp);
}

function initTouchBtns(){
    // Jump Btn
    jumpBtn = game.add.button(GAME_WIDTH-200,GAME_HEIGHT/2-75,'jumpBtn',function(){
        console.log('player jumps');
        game.add.tween(jumpBtn.scale).to({x:1.2,y:1.2},100,"Linear",true).onComplete.add(function(){
            game.add.tween(jumpBtn.scale).to({x:1,y:1},100,"Linear",true);
        },this);
    },this);

    // Slide Btn
    slideBtn = game.add.button(50,GAME_HEIGHT/2-75,'slideBtn',function(){
        console.log('player Slides');
    },this);

    // Sprint Btn
    sprintBtn = game.add.button(GAME_WIDTH-100,GAME_HEIGHT/2-150,'sprintBtn',function(){
        console.log('player Sprint');
    },this);


    // Slow Btn
    slowBtn = game.add.button(0,GAME_HEIGHT/2-150,'slowBtn',function(){
        console.log('player Slows');
    },this);


}


