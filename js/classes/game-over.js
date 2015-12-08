/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-20
// --------------
// GAME OVER JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var gameOver = function(game){}


gameOver.prototype = {

    preload: function(){

    },
    create: function(){

        showGameStats();
    },
    update: function(){
        game.input.onUp.add(function(pointer){
         stopAllAnims();
        });
    },
    shutdonw: function(){  
        reset_game_stats();
    }
}