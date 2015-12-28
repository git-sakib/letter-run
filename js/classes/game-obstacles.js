// all constants

var COW_BODY = {x:0,y:20};

var obstacles = {
    worldX : 0, 
    keys : ['cow','bush','trunk','hay_roll','hay_box','hay_stack','crow']
};

obstacles.init = function(){

    this.group = game.add.group();
    this.group.enableBody = true;  
    this.group.x = 0; 
    this.group.y = 0;
}

obstacles.create = function(obKey){

    var obstacle = game.add.sprite(0,0,obKey);
    obstacle.anchor.setTo(0,1);
    obstacle.alive = false;
    this.group.add(obstacle); 
    obstacle.body.gravity.y = 500;
    return obstacle;   
}

obstacles.make = function(obPosX,obPosY,obKey){

    if(typeof(obKey) === 'undefined' || obKey.length < 1){
        obKey = this.keys[RAND.between(0,this.keys.length-1)];
    }

    var obstacle = this.create(obKey);
    obstacle.alive = true;
    obstacle.x = obPosX;
    obstacle.y = obPosY;

    if(obKey === 'cow')this.makeCow(obstacle);
    if(obKey === 'crow')this.makeCrow(obstacle);
    if(obKey === 'hay_roll')this.makeHayRoll(obstacle);
    if(obKey === 'trunk')this.makeTrunk(obstacle);
}

obstacles.makeCow = function(cow){
    cow.animations.add('cow_walk',[0,1],5,true);
    cow.animations.play('cow_walk');   
    cow.body.setSize(cow.width,cow.height-COW_BODY.y,0,0); 
    cow.body.velocity.x = -100;
}

obstacles.makeCrow = function(crow){
    crow.animations.add('crow_fly');
    crow.animations.play('crow_fly',25,true);
    crow.body.velocity.x = -200;
}

obstacles.makeHayRoll = function(roll){
    roll.body.velocity.x = -50;
    roll.anchor.setTo(0.5,0.5);
    roll.body.angularVelocity = -150;
    roll.y = UP_LEVELS[1];
}

obstacles.makeTrunk = function(trunk){
    trunk.body.velocity.x = -50;
    trunk.anchor.setTo(0.5,0.5);
    trunk.body.angularVelocity = -150;
    trunk.y = UP_LEVELS[1];
}



obstacles.generate = function(){
    while(this.worldX < 10000){
        this.worldX += 1000;
        this.make(this.worldX,GROUND_LEVEL,'');
    }
}


obstacles.update = function(){

}





// Obstacle Hit with Player
obstacles.hit = function(){
    if(playerInvincible){
        //player.body.velocity.y = PLAYER_JUMP_SPEED;
        //canJump = false;
    } else {
        playerDie();
    }
}