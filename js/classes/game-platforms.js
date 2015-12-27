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
    platformGrp.x = 0; 
    platformGrp.y = 0;
    platformGrp.enableBody = true;

    createPlatform([1,2,3,1,2,]);

}

// make platforms
function createPlatform(pfLevelArr)
{

    var platform,pGround;
    var xpos = PLATFORM_START_X;
    var ypos;

    for(var i=0;i<pfLevelArr.length;i++){

        ypos = PLATFORM_LEVEL[pfLevelArr[i]];

        // Platform
        var platform = game.add.tileSprite(ELEMENT_CREATE_POS, 0, PLATFORM_SIZE, 50, 'platform');
        platform.alive = false;
        platformGrp.add(platform);
        //platform.alive = true;
        platform.x = xpos;
        platform.y = ypos;
        //console.log(platform.y);
       
        platform.body.immovable = true;
        platform.body.setSize(PLATFORM_SIZE,21,0,29);     

        xpos = xpos + platform.width + PLATFORM_GAP_X;

    }
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