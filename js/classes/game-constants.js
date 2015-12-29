/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-1
// GAME CONSTANTS JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Main Game Width Height
var GAME_WIDTH = 50000;
var GAME_HEIGHT = 640;

var GROUND_HEIGHT = 70;
var BLOCK_WIDTH = 500;
var WATER_HEIGHT = 50;

var GROUND_LEVEL = GAME_HEIGHT - GROUND_HEIGHT;


// Stat Bar Position
var STATS_POS_X = 0;
var STATS_POS_Y = 0;


// KeySetup 1
var jumpKey = Phaser.Keyboard.SPACEBAR;
var slideKey = Phaser.Keyboard.CONTROL;
var powerUpKey = Phaser.Keyboard.SHIFT;
var speedDownKey = Phaser.Keyboard.ALT;
var runRightKey = Phaser.Keyboard.RIGHT;
var runLeftKey = Phaser.Keyboard.LEFT;

// KeySetup 2
// var jumpKey = Phaser.Keyboard.UP;
// var slideKey = Phaser.Keyboard.DOWN;
// var powerUpKey = Phaser.Keyboard.RIGHT;
// var speedDownKey = Phaser.Keyboard.LEFT;

// KeySetup 3
// var jumpKey = Phaser.Keyboard.W;
// var slideKey = Phaser.Keyboard.S;
// var powerUpKey = Phaser.Keyboard.D;
// var speedDownKey = Phaser.Keyboard.A;
