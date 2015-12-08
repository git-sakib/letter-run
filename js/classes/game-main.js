/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-19
// --------------
// GAME MAIN JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var gameMain = function(game){}


gameMain.prototype = {

    preload: function(){

    },
    create: function(){

        initGame();  

    },
    update: function(){

        updateGame();

    },
    render: function(){  
        
        debugGame();
    },
    shutdown: function(){

        reset_game();
    }

}
