/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-8
// -----------------
// GAME PLATFORM JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var MAX_BOX_IN_LINE = 15;

// Declarations
var boxes = {
    worldX: 0
};

// initialize
boxes.init = function(){

    this.group = game.add.group();
    this.group.x = 0; 
    this.group.y = 0;
    this.group.enableBody = true;

}

// make boxs
boxes.create = function(maxLevel){

    var xpos = this.worldX;
    var ypos = GROUND_LEVEL;
    var boxNum = RAND.between(3,MAX_BOX_IN_LINE);

    for(var i=0;i<maxLevel;i++){
        for(var j=1;j<=boxNum;j++){
            var box = game.add.sprite(xpos, ypos,'box');
            box.anchor.set(0,1);
            this.group.add(box);
            box.body.immovable = true;
            xpos = xpos + box.width;
        }
        ypos = ypos - box.height;
        if(boxNum > 3)boxNum -= 3;
        else break; 
        this.worldX = this.worldX + box.width * 3;
        xpos = this.worldX;
    }

}

boxes.generate = function(){
    this.worldX = 1000;
    while(this.worldX < 20000){
        this.create(5);  
        this.worldX += 3000;  
    }
    
}