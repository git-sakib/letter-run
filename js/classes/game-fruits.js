/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-6
// --------------
// GAME FRUIT JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Fruits
var fruitGrp;
var fruitTxt = [];
var fruitCount = [];
var fruitArr = ['lemon','lemon','lemon','lemon','lemon','banana','banana','banana','mango','mango','jackfruit'];

// init Fruits
function initFruits(){

    fruitGrp = game.add.group();
    fruitGrp.enableBody = true;           

    for(var i=0;i<10;i++){
        var fruit = game.add.sprite(ELEMENT_CREATE_POS,0,'jackfruit');
        fruit.alive = false;
        fruitGrp.add(fruit);
    }
    for(var i=0;i<10;i++){
        var fruit = game.add.sprite(ELEMENT_CREATE_POS,0,'mango');
        fruit.alive = false;
        fruitGrp.add(fruit);
    }
    for(var i=0;i<10;i++){
        var fruit = game.add.sprite(ELEMENT_CREATE_POS,0,'banana');
        fruit.alive = false;
        fruitGrp.add(fruit);
    }
    for(var i=0;i<10;i++){
        var fruit = game.add.sprite(ELEMENT_CREATE_POS,0,'lemon');
        fruit.alive = false;
        fruitGrp.add(fruit);
    }    

    //console.log(fruitGrp);    
}

// Create Fruits
function createFruits(frKey, frLevel, frPosX, frType, frSize, inPlatform, inObstacle)
{
    // Defining Default values
    if(typeof(frKey)        ==='undefined') frKey = -1;
    if(typeof(frLevel)      ==='undefined') frLevel = -1;   
    if(typeof(frPosX)       ==='undefined') frPosX = FRUIT_START_X;
    if(typeof(frType)       ==='undefined') frType = -1;   
    if(typeof(frSize)       ==='undefined') frSize = -1;  
    if(typeof(inPlatform)   ==='undefined') inPlatform = false;
    if(typeof(inObstacle)   ==='undefined') inObstacle = false;   

    // vars
    var xpos = frPosX;
    var ypos; 
    //var fruit;
    var fruitKey;
    
    if(inObstacle)ypos = frLevel;
    else ypos = (frLevel >= 0) ? PLATFORM_LEVEL[frLevel] - FRUIT_LEVEL : GROUND_LEVEL - FRUIT_LEVEL;
    
    if(frKey >= 0)fruitKey = fruitArr[frKey];
    else fruitKey = fruitArr[RAND.between(0,10)];
    
    if(frType < 0)frType = RAND.between(1,4);
    if(frSize < 0)frSize = RAND.between(5,7);
    // Plian Jump Level
    var yp = ypos;
    if(frType % 2 !== 0)yp += 50;

    //console.log(frSize);

    for(var i=0;i<frSize;i++)
    {
        var j,k;
        if(fruitKey === 'lemon')j=3;
        else if(fruitKey === 'banana')j=2;
        else if(fruitKey === 'mango')j=1;
        else j = 0;

        k = i + (j * 10);

        fruit = fruitGrp.getAt(k); //game.add.sprite(xpos,yp,fruitKey);
        fruit.x = xpos;
        fruit.y = yp;
        fruit.alpha = 1;
        fruit.alive = true;

        fruit.scale.setTo(0.5,0.5);
        game.add.tween(fruit).to({y: fruit.y+10},100,"Linear",true,RAND.between(0,100),-1,true);
        //fruitGrp.add(fruit);
        xpos = xpos + fruit.width + 20;
        if(frType % 2 === 0){
            if(i >= frSize/2 - 1)yp += 20;
            else yp -= 20;
        }

        
    }  
}

// Collect Fruits
function collectFruit(player, fruit)
{
    var fruitTmp = game.add.sprite(fruit.world.x, fruit.world.y, fruit.key);
    fruitTmp.scale.setTo(0.5,0.5);
    fruit.alive = false;
    fruit.x = ELEMENT_CREATE_POS;
    //fruitGrp.removeChild(fruit);
    game.add.tween(fruitTmp).to({x: fruitTxt[fruit.key].x - 100, y: fruitTxt[fruit.key].y, alpha: 0},300,"Linear",true).onComplete.add(function(){
        fruitTmp.destroy();
    });

    fruitTxt[fruit.key].setText(++fruitCount[fruit.key]);
    
    if(!playerInvincible)manageHealth(fruit);

}