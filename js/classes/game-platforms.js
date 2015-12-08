/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-8
// -----------------
// GAME PLATFORM JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


// Declarations
var platformGrp;
var isPlatformRunning = false;

// initialize
function initPlatforms()
{
    platformGrp = game.add.group();
    platformGrp.x = 0; platformGrp.y = 0;
    platformGrp.enableBody = true;

    for(var i=0;i<10;i++){

        // Platform
        var platform = game.add.tileSprite(ELEMENT_CREATE_POS, 0, PLATFORM_SIZE, 50, 'platform');
        platform.alive = false;
        platformGrp.add(platform);

    }

}

// make platforms
function createPlatform(pfLevelArr, fruitsOn, obstaclesOn)
{
    // Defining Default values
    if(typeof(fruitsOn)     ==='undefined') fruitsOn = true;
    if(typeof(obstaclesOn)  ==='undefined') obstaclesOn = true;  

    var platform,pGround;
    var xpos = PLATFORM_START_X;
    var ypos;

    for(var i=0;i<pfLevelArr.length;i++){

        ypos = PLATFORM_LEVEL[pfLevelArr[i]];

        // Platform
        platform = platformGrp.getAt(i); //game.add.tileSprite(xpos, ypos, PLATFORM_SIZE, 50, 'platform');
        //platformGrp.add(platform);
        platform.alive = true;
        platform.x = xpos;
        platform.y = ypos;
        //console.log(platform.y);
       
        platform.body.immovable = true;
        platform.body.setSize(PLATFORM_SIZE,21,0,29);     

        xpos = xpos + platform.width + PLATFORM_GAP_X;

        if(obstaclesOn && checkRandom()){
            createObstacle(RAND.between(4,7), pfLevelArr[i], platform.x + PLATFORM_SIZE / 2, 1, true);
        }         
        else if(fruitsOn && checkRandom()){
            createFruits(RAND.between(0,10), pfLevelArr[i], platform.x + PLATFORM_SIZE / 2, -1, -1, true);
        } 
    }
}

// Platform Blocks
function createPlatformBlock()
{
    var n = RAND.between(1,6);
    if(n == 1)createPlatform([0,1,1,0,1,1,0,1,0]);
    if(n == 2)createPlatform([0,1,0,1,0,1,2,1,0]);
    if(n == 3)createPlatform([0,1,1,0,1,1,0,1,0]);
    if(n == 4)createPlatform([0,1,1,2,2,2,1,1,0]);
    if(n == 5)createPlatform([0,1,2,1,0,1,2,1,0]);
    if(n == 6)createPlatform([0,1,1,2,2,1,2,2,1]);
}

// Platform Hit with Player
function platformHit(){
    if(playerInvincible){
        //player.body.velocity.y = PLAYER_JUMP_SPEED;
        //canJump = false;
    } else {
        playerDie();
    }
}