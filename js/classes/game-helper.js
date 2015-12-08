/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-15
// --------------
// GAME HELPER JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */



// Random Class for repeatble blocks
//var RAND = new Phaser.RandomDataGenerator();

// Random Class for actual Random blocks
var RAND = {
    between : function(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function checkRandom(){
    if(RAND.between(1,2) == 1)return true;
    return false;
}

function isInArray(num,arr){
    for(var i=0;i<arr.length;i++)if(arr[i] === num)return true;
    return false;
}