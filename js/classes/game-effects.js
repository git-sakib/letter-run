/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-14
// --------------
// GAME EFFECTS JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


var starEmitter;

function initEmitters()
{
    // Star Emitter For The Player Power Up
    starEmitter = game.add.emitter(0, 0, 100);
    starEmitter.makeParticles('star');
    starEmitter.gravity = 500;
    starEmitter.lifespan = 500;
    game.physics.enable(starEmitter);
    
}

function emitStar(player){

    // emiting Stars
    game.physics.arcade.collide(earthGrp,starEmitter);
    starEmitter.x = player.body.x + 50;
    starEmitter.y = player.body.y - 30;
    starEmitter.emitParticle();
    player.blendMode = PIXI.blendModes.ADD;
    
}
