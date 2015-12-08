/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-2
// --------------
// GAME LOADER JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


var gameLoader = function(game){}

gameLoader.prototype = {
    preload: function(){

        // Loading
        var loadingScr = this.game.add.sprite(0,0,"loading-screen");

        var loadingBarBack = this.add.sprite(110,400,"loading-bar");
        loadingBarBack.alpha = 0.5;
        var loadingBar = this.add.sprite(110,400,"loading-bar");
        //loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        // Title Assets
        game.load.image('titleBG', 'images/titles/game-title.jpg');
        game.load.image('playBtn', 'images/titles/start-btn.png');
        game.load.image('replayBtn', 'images/stats/play-again-btn.png');

        // User Controls
        game.load.image('jumpBtn', 'images/stats/jumpBtn.png');
        game.load.image('slideBtn', 'images/stats/slideBtn.png');
        game.load.image('sprintBtn', 'images/stats/sprintBtn.png');
        game.load.image('slowBtn', 'images/stats/slowBtn.png');

        // Environment & Platforms
        game.load.image('sky', 'images/world/sky.jpg');
        game.load.image('scenery', 'images/world/scenery.png');
        game.load.image('grass', 'images/world/grass.png');
        game.load.image('ground', 'images/world/ground.jpg');
        game.load.image('road', 'images/world/road.png');
        game.load.image('platform', 'images/world/platform.png');        

        // Stats
        game.load.image('stat_bar', 'images/stats/stat-bar.png');
        game.load.image('health-bar', 'images/stats/life-bar.png');
        game.load.image('speed-bar', 'images/stats/speed-bar.png');
        game.load.image('distance-bar', 'images/stats/distance-bar.png');

        game.load.image('msg-game-over', 'images/stats/game-over.png');
        game.load.image('msg-frame', 'images/stats/msg-frame.jpg');
        game.load.spritesheet('letters', 'images/stats/letters2x.png',100,100);

        // Obstacles
        game.load.image('box', 'images/obstacles/box.png');
        game.load.image('hay_roll', 'images/obstacles/hay-roll.png');
        game.load.image('hay_stack', 'images/obstacles/hay-stack.png');
        game.load.image('trunk', 'images/obstacles/trunk.png');
        game.load.image('hay_box', 'images/obstacles/hay-box.png');
        game.load.spritesheet('cow', 'images/obstacles/cow_walk.png', 180, 120);
        game.load.image('bush', 'images/obstacles/bush.png');
        game.load.spritesheet('crow', 'images/obstacles/crow.png', 50, 50);

        // Effects
        game.load.image('boom', 'images/effects/boom.png');
        game.load.image('star', 'images/effects/star.png');

        // Collectibles
        game.load.image('mango', 'images/fruits/mango.png');
        game.load.image('jackfruit', 'images/fruits/jackfruit.png');
        game.load.image('banana', 'images/fruits/banana.png');
        game.load.image('lemon', 'images/fruits/lemon.png');

        // Player   
        game.load.spritesheet('plrSprite','images/player.png', 120, 148);   

        // Bitmap Font
        game.load.bitmapFont('bangla_font', 'fonts/font.png', 'fonts/font.fnt');

    },
    create: function(){

        this.game.time.events.add(1000,function(){
            this.game.state.start("GameMain");
        },this);
    }
}