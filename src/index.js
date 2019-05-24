import Phaser from "phaser";
import MenuState from "./MenuState.js";
import HelpState from "./HelpState.js";
import InitState from "./InitState.js";
import GameState from "./GameState.js";
import PreInitState from "./PreInitState.js";
import GameOverState from "./GameOverState.js";

// Create game
window.addEventListener("load", function(event) {
  const config = {
    type: Phaser.AUTO,
    width: 550,
    height: 400,
    backgroundColor: '#000',
    parent: "game-container",
    scene: [ PreInitState, InitState, MenuState, GameState, HelpState, GameOverState ]
	};

  const game = new Phaser.Game(config);
})