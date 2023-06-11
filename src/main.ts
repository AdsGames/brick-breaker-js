import * as Phaser from "phaser";

import GameOverState from "./GameOverState";
import GameState from "./GameState";
import HelpState from "./HelpState";
import InitState from "./InitState";
import MenuState from "./MenuState";
import PreInitState from "./PreInitState";

const config: Phaser.Types.Core.GameConfig = {
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
  scale: {
    mode: Phaser.Scale.FIT,
  },
};

export const game = new Phaser.Game(config);
