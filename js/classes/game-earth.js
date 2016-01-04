
var blocks = {
	width: BLOCK_WIDTH,
	num: 0,
	pos: function(){
		return this.width * this.num;
	},
	next: function(){
		this.num++;
	}
};

earthBlocks = ['G200'];
//earthBlocks = ['G2','W1','G2','W2','G20'];

var earth = {};

earth.init = function(){
    sky = game.add.sprite(0,0,'sky');
    sky.fixedToCamera = true;
    scenery = game.add.tileSprite(0, -50, GAME_WIDTH, GAME_HEIGHT, 'scenery');    

	this.group = game.add.group();
    this.group.enableBody = true; 

    this.river = game.add.group();
    this.river.enableBody = true; 

}

earth.createGround = function(){
    ground = game.add.tileSprite(blocks.pos(), GAME_HEIGHT, blocks.width, GROUND_HEIGHT, 'ground');
    ground.anchor.setTo(0,1);
    this.group.add(ground);
    ground.body.immovable = true;
    ground.body.setSize(blocks.width, GROUND_HEIGHT-5,0,5);
    blocks.next();
}

earth.createWater = function(){
    var water1 = game.add.tileSprite(blocks.pos(), GAME_HEIGHT, blocks.width, WATER_HEIGHT, 'water');
    var water2 = game.add.tileSprite(blocks.pos(), GAME_HEIGHT, blocks.width, WATER_HEIGHT, 'water');
    this.river.add(water1);
    this.river.add(water2);
    water1.anchor.setTo(0,1);
    water2.anchor.setTo(0,1);
    water1.alpha = 0.8;
    water2.alpha = 0.3;
    water1.autoScroll(-80,-3);
    water2.autoScroll(80,3);	
}

earth.bankLeft = function(){
    var grLeft = game.add.sprite(blocks.pos(),GAME_HEIGHT,'bankL');
    grLeft.anchor.setTo(0,1);	
}

earth.bankRight = function(){
    var grRight = game.add.sprite(blocks.pos()+blocks.width,GAME_HEIGHT,'bankR');
    grRight.anchor.setTo(1,1);
}

earth.generate = function(){
	var gType,gNum;
	for( var i=0;i<earthBlocks.length;i++){
		gType = earthBlocks[i].charAt(0);
		gNum = earthBlocks[i].substr(1);
		if(gType === 'W'){
			this.bankLeft();
    		for(var j=0;j<gNum;j++){
    			this.createWater();	
    			if(j < gNum-1)blocks.next();
    		}
    		this.bankRight();
    		blocks.next();		
		} else {
            //console.log('ground');
			for(var j=0;j<gNum;j++)this.createGround();
		}
	}
}