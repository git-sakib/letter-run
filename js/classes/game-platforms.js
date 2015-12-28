/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-8
// -----------------
// GAME PLATFORM JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


// Declarations
// var platformGrp;
// var isPlatformRunning = false;

var PF_LEVELS = [GROUND_LEVEL, GROUND_LEVEL - UP_LEVEL_FACTOR, GROUND_LEVEL - UP_LEVEL_FACTOR * 2, GROUND_LEVEL - UP_LEVEL_FACTOR * 3];
var PLATFORM_GAP_X = 200;
var PLATFORM_SIZE = 300;

var platforms = {
    worldX:0
};


platforms.init = function(){
    this.group = game.add.group();
    this.group.x = 0; 
    this.group.y = 0;
    this.group.enableBody = true;    

    this.worldX = 2000;
}


platforms.create = function(pfLevelArr){

    var xpos = this.worldX;
    var ypos;

    for(var i=0;i<pfLevelArr.length;i++){

        ypos = PF_LEVELS[pfLevelArr[i]];

        // Platform
        var platform = game.add.tileSprite(xpos, ypos, PLATFORM_SIZE, 50, 'platform');
        this.group.add(platform);

        platform.body.checkCollision.left = false;
        platform.body.checkCollision.right = false;
        platform.body.checkCollision.down = false;     
           
        platform.body.immovable = true;
        platform.body.setSize(PLATFORM_SIZE,21,0,29);     

        xpos = xpos + platform.width + PLATFORM_GAP_X;

    }

    this.worldX = xpos;

}


platforms.generate = function(){
    this.create([1,2,3,1,2,]);
}



// Platform Hit with Player
platforms.hit = function(){
    if(playerInvincible){
        //player.body.velocity.y = PLAYER_JUMP_SPEED;
        //canJump = false;
    } else {
        playerDie();
    }
}