/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-16
// --------------
// GAME DEBUG JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// All Debug Related Blocks

function debugGame(){

    showDebugShapes();
    showDebugTexts();
    //game.debug.stop();
}


function showDebugShapes(){

    //game.debug.body(player);
    //game.debug.body(road);
    //platformGrp.forEach(function(child){ this.game.debug.body(child); },this);   
    //fruitGrp.forEach(function(child){ this.game.debug.body(child); },this);   
    //obstacles.group.forEach(function(child){ this.game.debug.body(child); },this); 
    //boxes.group.forEach(function(child){ this.game.debug.body(child); },this); 
}


function showDebugTexts(){

    var xpos = 40;
    var ypos = 120;
    var yp = 20;
    game.debug.text('Player Speed: ' + player.body.velocity.x.toFixed(2),   xpos,ypos += yp);
    // game.debug.text('Platforms: ' + platformGrp.length,         xpos,ypos += yp);
    // game.debug.text('Obstacles: ' + obstacleGrp.length,         xpos,ypos += yp);
    // game.debug.text('Fruits: ' + fruitGrp.length,               xpos,ypos += yp);
    // game.debug.text('Events: ' + gameEvents.length,             xpos,ypos += yp);
}
