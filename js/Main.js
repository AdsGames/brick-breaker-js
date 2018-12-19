import MenuState from "./MenuState.js";
import HelpState from "./HelpState.js";
import InitState from "./InitState.js";
import GameState from "./GameState.js";
import PreInitState from "./PreInitState.js";

// Config for game
var config = {
  type: Phaser.AUTO,
  width: 550,
  height: 400,
  backgroundColor: '#000',
  parent: "game-container",
  scene: [ PreInitState, InitState, MenuState, GameState, HelpState ]
};

// Create game
var game = new Phaser.Game(config);