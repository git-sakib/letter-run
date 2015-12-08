/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-17
// --------------
// GAME BOOT JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 
var gameBoot = function(game){}

gameBoot.prototype = {

    preload: function(){

        // Load Loader Assets
        this.game.load.image("boot-logo","images/titles/boot-logo.png");
        this.game.load.image("loading-screen","images/titles/loading-screen.jpg");
        this.game.load.image("loading-bar","images/titles/loading-bar.png");
    },
    create : function(){

        var bootLogo = this.game.add.sprite(GAME_WIDTH/2,GAME_HEIGHT/2,'boot-logo');
        bootLogo.anchor.setTo(0.5,0.5);
        this.game.time.events.add(1000,function(){
            this.game.state.start("GameLoader");
        },this);

        // this.game.scale.maxWidth = 960;
        // this.game.scale.maxHeight = 640;
        // //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.game.scale.pageAlignHorizontally = true;
        // this.game.scale.pageAlignVeritcally = true;   
        // this.game.scale.forceOrientation(true,true);
    }
}