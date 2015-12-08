/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-7
// --------------
// GAME OBSTACLES JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


// Obstacles
var obstacleGrp;
var obstacleArr = ['cow','bush','trunk','hay_roll','hay_box','hay_stack','crow','box'];
//var obstacleArr = ['cow','bush'];
var isObstacles = false;

// Init Obstacles
function initObstacles()
{
    // define the obstacle group
    obstacleGrp = game.add.group();
    obstacleGrp.enableBody = true;  
    obstacleGrp.x = 0; obstacleGrp.y = 0;

    var obstacle;
    for(var i=0;i<obstacleArr.length-1;i++){
        obstacle = game.add.sprite(ELEMENT_CREATE_POS,GROUND_LEVEL + 10,obstacleArr[i]);
        obstacle.anchor.setTo(0,1);
        obstacle.alive = false;
        obstacleGrp.add(obstacle);      
    }

    obstacle = game.add.tileSprite(ELEMENT_CREATE_POS,GROUND_LEVEL + 10,226,111,obstacleArr[obstacleArr.length-1]);
    obstacle.anchor.setTo(0,1);
    obstacle.alive = false;
    obstacleGrp.add(obstacle); 
    //console.log(obstacleGrp);

}

// Make Obstacles
function createObstacle(obKey, obLevel, obPosX, obSize, inPlatform, fruitsOn)
{

    // Defining Default values
    if(typeof(obKey)        ==='undefined') obKey = -1;
    if(typeof(obLevel)      ==='undefined') obLevel = -1;   
    if(typeof(obPosX)       ==='undefined') obPosX = ELEMENT_CREATE_POS; 
    if(typeof(obSize)       ==='undefined') obSize = 1;  
    if(typeof(inPlatform)   ==='undefined') inPlatform = false;   
    if(typeof(fruitsOn)     ==='undefined') fruitsOn = true;   

    var obstacle;
    var xpos = obPosX; 
    var ypos = (obLevel >= 0) ? PLATFORM_LEVEL[obLevel] + 40 : GROUND_LEVEL + 10;
    var obstacleKey;
    var obstacleIndex = RAND.between(0,7);
    if(obKey >= 0){
        obstacleKey = obstacleArr[obKey];
        obstacleIndex = obKey;
    } else {
        obstacleKey = obstacleArr[obstacleIndex];
    }
    var yFactor = 0;
    var fruitPos = ypos - 200;
    var fruitType = -1;
    
    //console.log(obstacleIndex + ' ' + obstacleKey);

    if(obstacleKey === 'box'){
        ypos = ypos - OBSTACLE_FLOAT_Y;
        fruitPos = ypos + 10;
        fruitType = 1;
        obPosX = obPosX + 50;
        obSize = 3;
        //console.log(ypos + ' ' + fruitPos);
    }
    if(obstacleKey === 'crow'){
        ypos = ypos - OBSTACLE_FLOAT_Y ;
        obPosX = obPosX + 50;
        obSize = 3;
    }

    //console.log(obSize);

    //for(var i=0;i<obSize;i++)
    //{

        obstacle = obstacleGrp.getAt(obstacleIndex);
        obstacle.alive = true;
        obstacle.x = xpos;
        obstacle.y = ypos;
        obstacle.body.immovable = true;
        // obstacle.anchor.setTo(0,1);
        // obstacleGrp.add(obstacle);
        // obstacle.body.immovable = true;

        // Physics Body Size
        if(obstacleKey === 'bush' || obstacleKey === 'hay_stack')yFactor = 30;
        if(obstacleKey === 'cow'){
            yFactor = 20;
            obstacle.animations.add('cow_walk',[0,1],5,true);
            obstacle.animations.play('cow_walk');
        }
        if(obstacleKey === 'crow'){
            // yFactor = 20;
            obstacle.animations.add('crow_fly');
            obstacle.animations.play('crow_fly',25,true);
            //obstacle.body.velocity.x = -20;
        }
        
        // Animations
        if(obstacleKey === 'trunk' || obstacleKey === 'hay_roll'){
            obstacle.anchor.setTo(0.5,0.5);
            obstacle.y = obstacle.y - obstacle.height / 2;
        }


        obstacle.body.setSize(obstacle.width-10,obstacle.height-yFactor,0,0);    
        
        //xpos = xpos + obstacle.width;  
    //}
    
    if(fruitsOn && checkRandom()){
        
        createFruits(RAND.between(0,10), fruitPos, obPosX, fruitType, 5, false, true);
    }     
}


// Obstacle Hit with Player
function obstacleHit(){
    if(playerInvincible){
        //player.body.velocity.y = PLAYER_JUMP_SPEED;
        //canJump = false;
    } else {
        playerDie();
    }
}