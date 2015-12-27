/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-10
// --------------
// GAME UPDATE JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


var gameSpeedTick = 0;

// The main update loop

function updateGame(){

    if(!isGameOver)
    {
        
        //setGameSpeed();
        
        //listenTouch();

        game.physics.arcade.collide(player, earthGrp);
        game.physics.arcade.collide(player, platformGrp);                
        game.physics.arcade.collide(earthGrp, obstacles.group);
        game.physics.arcade.collide(player, obstacles.group);
        game.physics.arcade.collide(player, boxes.group);

        // game.physics.arcade.overlap(player, platformGrp, platformHit);
        game.physics.arcade.overlap(player, obstacles.group, obstacleHit);       
        game.physics.arcade.overlap(player, fruits.group, collectFruit);

        playerUpdate();
        
        //player.animations.play('run');
        
        // platformGrp.forEach(moveChild,this,'platformGrp');
        // fruitGrp.forEach(moveChild,this,'fruitGrp');
        // obstacles.group.forEach(moveChild,this,'obstacles.group');
        
        //stats_update();

        //resetTouch();
        
    }
    else{
        if(player.alive){
            player.body.setSize(120,60);
            player.animations.play('dies',10);
            player.alive = false;
        }
    }

}


function moveChild(child,grp){
    if(child.x < CHILD_DESTROY_POS){
        child.alive = false; 
        child.x = 1000;
    } else {
        if(!child.alive)return;
        var moveFactor = 0;
        if(child.key === 'trunk' || child.key === 'hay_roll'){
            child.rotation -= 0.1;
            child.x -= MOVE_SPEED + 0.5 + moveFactor;
        } else {
            child.x -= MOVE_SPEED + moveFactor;   
        }
    }
}



function showGameOver(){

    powerup = false;
    playerInvincible = false;
    //game.state.start("GameOver");
}
