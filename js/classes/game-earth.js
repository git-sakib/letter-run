var GROUND_HEIGHT = 50;
var BLOCK_WIDTH = 500;
var WATER_HEIGHT = 45;

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

earthBlocks = ['G1','W1','G15','W1'];

var earth = {};

earth.init = function(){
	this.group = game.add.group();
    this.group.enableBody = true; 
}


earth.createGround = function(){
    ground = game.add.tileSprite(blocks.pos(), GAME_HEIGHT, blocks.width, GROUND_HEIGHT, 'ground');
    ground.anchor.setTo(0,1);
    this.group.add(ground);
    ground.body.immovable = true;
    blocks.next();
}

earth.createWater = function(){
    var water1 = game.add.tileSprite(blocks.pos(), GAME_HEIGHT, blocks.width, WATER_HEIGHT, 'water');
    var water2 = game.add.tileSprite(blocks.pos(), GAME_HEIGHT, blocks.width, WATER_HEIGHT, 'water');
    water1.anchor.setTo(0,1);
    water2.anchor.setTo(0,1);
    water1.alpha = 0.8;
    water2.alpha = 0.3;
    water1.autoScroll(15,3);
    water2.autoScroll(-15,-3);	

    var grLeft = game.add.sprite(blocks.pos(),GAME_HEIGHT,'groundL');
    grLeft.anchor.setTo(0,1);
    var grRight = game.add.sprite(blocks.pos()+blocks.width,GAME_HEIGHT,'groundL');
    grRight.anchor.setTo(1,1);

    blocks.next();
}

earth.generate = function(arr){
	var gType,gNum;
	for( var i=0;i<arr.length;i++){
		gType = arr[i].charAt(0);
		gNum = arr[i].substr(1);
		if(gType === 'W'){
    		for(var j=0;j<gNum;j++)earth.createWater();			
		} else {
			for(var j=0;j<gNum;j++)earth.createGround();
		}
	}
}