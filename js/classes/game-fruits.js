/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-6
// --------------
// GAME FRUIT JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Fruits
var fruitTxt;

var FRUIT_KEY = 'mango';
var FRUIT_POINT = 2;
var UP_LEVEL_FACTOR = 100;
var UP_LEVELS = [GROUND_LEVEL, GROUND_LEVEL - UP_LEVEL_FACTOR, GROUND_LEVEL - UP_LEVEL_FACTOR * 2, GROUND_LEVEL - UP_LEVEL_FACTOR * 3];

var fruits = {
    // declarations
    total : 0,
    count : 0,
    point : FRUIT_POINT,
    key: FRUIT_KEY,
    gapX: 20,
    gapY: 20,
    worldX: 0
};


fruits.init = function(){
    fruits.group = game.add.group();
    fruits.group.enableBody = true;       
}


fruits.create = function(frPosX, frPosY, frSize, frType){

    // Defining Default values
    if(typeof(frType) === 'undefined')frType = 2; //RAND.between(1,10);  
    if(typeof(frSize) === 'undefined')frSize = RAND.between(5,7); 

    var xp = frPosX;
    var yp = frPosY;

    if(frType % 2 !== 0)yp += 50;

    for(var i=0;i<frSize;i++){

        var fruit = game.add.sprite(xp,yp,this.key);
        this.group.add(fruit);
        fruit.scale.setTo(0.4,0.4);
        game.add.tween(fruit).to({y: fruit.y+10},100,"Linear",true,RAND.between(0,100),-1,true);

        xp = xp + fruit.width + this.gapX;
        if(frType % 2 === 0){
            if(i >= frSize/2 - 1)yp += this.gapY;
            else yp -= this.gapY;
        }

    }    
}

fruits.generate = function(){

    var yp = UP_LEVELS[1];
    while(this.worldX < 10000){
        this.worldX += 1000;
        this.create(this.worldX,yp);     
    }
    //console.log(fruitGrp);    
}

// Collect Fruits
fruits.collect = function(fruit)
{
    game.add.tween(fruit).to({x: fruitTxt.world.x, y: fruitTxt.world.y, alpha: 1},300,"Linear",true).onComplete.add(function(){
        fruits.group.removeChild(fruit);
        fruit.destroy();
    });

    fruitTxt.setText(++fruits.count);
    if(!playerInvincible)manageHealth(fruit);
}