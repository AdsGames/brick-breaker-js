import Phaser from "phaser";

import GameOverState from "./GameOverState.js";
import GameState from "./GameState.js";
import HelpState from "./HelpState.js";
import InitState from "./InitState.js";
import MenuState from "./MenuState.js";
import PreInitState from "./PreInitState.js";

// Create game
window.addEventListener("load", () => {
  const config = {
    backgroundColor: "#000",
    height: 400,
    parent: "game-container",
    scene: [
      PreInitState,
      InitState,
      MenuState,
      GameState,
      HelpState,
      GameOverState,
    ],
    type: Phaser.AUTO,
    width: 550,
  };

  // eslint-disable-next-line no-new
  new Phaser.Game(config);
});
