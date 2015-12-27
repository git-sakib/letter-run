/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// section-1
// GAME CONSTANTS JS
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Main Game Width Height
var GAME_WIDTH = 50000;
var GAME_HEIGHT = 640;
//var GAME_PLAY_MODE = 'Easy';
var GAME_PLAY_MODE = 'Hard';

// Ground, Earth & Road
var ROAD_HEIGHT = 50;
var GROUND_LEVEL = GAME_HEIGHT - ROAD_HEIGHT;
var GRASS_HEIGHT = 20;
var ROAD_POS_Y = GROUND_LEVEL - GRASS_HEIGHT;
var GROUND_HEIGHT = 30;

var ELEMENT_CREATE_POS = 1200;


// Platform Related
var PLATFORM_LEVEL = [GROUND_LEVEL - 100, GROUND_LEVEL - 200, GROUND_LEVEL - 300];
var PLATFORM_GAP_X = 200;
var PLATFORM_SIZE = 500;
var PLATFORM_START_X = ELEMENT_CREATE_POS;
var CHILD_DESTROY_POS = -2000;

// // Player Setup
// var PLAYER_POS_X = 20;
// var PLAYER_POS_Y = 500;
// var PLAYER_BODY_SIZE = {WIDTH: 80, HEIGHT: 130};
// var PLAYER_GRAVITY = 760;
// var PLAYER_JUMP_SPEED = -450;
// var PLAYER_MAX_HEALTH = 500;
// var PLAYER_MIN_HEALTH = 20;
var FRUIT_HEALTH_POINT = [10,30,50,100];
var POWER_UP_HEALTH_LOSS = 1;
var POWER_OUT_TIME = 300;

// Fruit Setup
var FRUIT_START_X = ELEMENT_CREATE_POS;
var FRUIT_LEVEL = 200;

// Obstacles
var OBSTACLE_FLOAT_Y = 100;


// Game Speed Controle
var GAME_SPEED = 10;
var MOVE_SPEED = 10;
var SCENE_SPEED = -100;
var EARTH_SPEED = -500;

var PLATFORM_SPEED = 10;
var DISTANCE_PER_RUN = 0.05;
var POWER_UP_GAME_SPEED = 0.5;
var MIN_GAME_SPEED = 1.2;
var MAX_GAME_SPEED = 0.7;
var INC_GAME_SPEED = 0.01;

// Game Events related
var GAME_DELAY_NORMAL = 2000; // 2 sec
// Stat Bar Position
var STATS_POS_X = 0;
var STATS_POS_Y = 0;
var NEXT_LETTER_POINT = 1000;


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



// -----------------------------
// All New Contants
// ----------------------------

// Platforms
var CONST_PLATFORM_START;