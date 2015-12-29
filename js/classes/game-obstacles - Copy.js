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

obstacles.create = function(obPosX,obPosY,obKey){

    if(typeof(obKey) === 'undefined' || obKey.length < 1){
        obKey = this.keys[RAND.between(0,this.keys.length-1)];
    }

    var obstacle = game.add.sprite(obPosX,obPosY,obKey);
    obstacle.anchor.setTo(0,1);
    obstacle.alive = false;
    this.group.add(obstacle); 
    obstacle.body.gravity.y = 500;
    return obstacle;   
}

obstacles.make = function(obPosX,obPosY,obKey){

    if(obKey === 'cow')this.makeCow(obPosX,obPosY,obKey);
    else if(obKey === 'crow')this.makeCrow(obPosX,obPosY,obKey);
    else if(obKey === 'hay_roll')this.makeHayRoll(obPosX,obPosY,obKey);
    else if(obKey === 'trunk')this.makeTrunk(obPosX,obPosY,obKey);
    else this.create(obPosX,obPosY,obKey);
}

obstacles.makeCow = function(obPosX,obPosY,obKey){
    var cow = this.create(obPosX,obPosY,obKey);
    cow.animations.add('cow_walk',[0,1],5,true);
    cow.animations.play('cow_walk');   
    cow.body.setSize(cow.width,cow.height-COW_BODY.y,0,0); 
    cow.body.velocity.x = -100;
}

obstacles.makeCrow = function(obPosX,obPosY,obKey){
    for(var i=0;i<3;i++){
        var crow = this.create(obPosX,obPosY,obKey);
        crow.animations.add('crow_fly');
        crow.animations.play('crow_fly',25,true);
        crow.body.velocity.x = -200;    
        obPosX += 100;    
    }

}

obstacles.makeHayRoll = function(obPosX,obPosY,obKey){
    var roll = this.create(obPosX,obPosY,obKey);
    roll.body.velocity.x = -50;
    roll.anchor.setTo(0.5,0.5);
    roll.body.angularVelocity = -150;
    roll.y = UP_LEVELS[1];
}

obstacles.makeTrunk = function(obPosX,obPosY,obKey){
    var trunk = this.create(obPosX,obPosY,obKey);
    trunk.body.velocity.x = -50;
    trunk.anchor.setTo(0.5,0.5);
    trunk.body.angularVelocity = -150;
    trunk.y = UP_LEVELS[1];
}



obstacles.generate = function(){
    while(this.worldX < 10000){
        this.worldX += 1000;
        this.make(this.worldX,GROUND_LEVEL,'crow');
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