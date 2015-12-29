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

        game.physics.arcade.collide(player, earth.group);
        game.physics.arcade.collide(player, platforms.group);                
        game.physics.arcade.collide(earth.group, obstacles.group);
        game.physics.arcade.collide(player, obstacles.group);
        game.physics.arcade.collide(player, boxes.group);

        // game.physics.arcade.overlap(player, platforms.group, platforms.hit);
        // game.physics.arcade.overlap(player, obstacles.group, obstacles.hit);       
        // game.physics.arcade.overlap(player, fruits.group, fruits.collect);
        // game.physics.arcade.overlap(player, boxes.group, boxes.hit);

        playerUpdate();
        
        //stats_update();

        //resetTouch();
        
    }
    else{
        if(player.alive){
            player.body.setSize(120,60);
            player.animations.play('dies',10);
            //player.alive = false;
        }
    }

}


function showGameOver(){

    powerup = false;
    playerInvincible = false;
    //game.state.start("GameOver");
}
