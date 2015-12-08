/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-18
// --------------
// GAME TITLE JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


var gameTitle = function(game){}

gameTitle.prototype = {
    preload: function(){

    },
    create: function(){

        var titleBG = this.game.add.sprite(0,0,"titleBG");

        var startBtn = this.game.add.button(830,530,"playBtn",this.startGame,this);
        startBtn.anchor.setTo(0.5,0.5);
        startBtn.scale.setTo(0,0);

        animScaleInOut(startBtn,100,1);

        //removeStorageData();
        //console.log(localStorage.bestScore + " " + localStorage.totalScore);
    },
    startGame: function(){
        this.game.state.start("GameMain");
    }
}
