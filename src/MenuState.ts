import * as Phaser from "phaser";
import Lava from "./Lava.js";

export default class MenuState extends Phaser.Scene {
  public constructor() {
    super({ active: false, key: "MenuState" });
  }

  public preload() {
    // Preload
  }

  public create() {
    // Background
    this.add.image(550 / 2, 400 / 2, "img_background");

    // Title
    this.add.image(550 / 2, 100, "img_title");

    // Play button
    const buttonPlay = this.add.sprite(550 / 2, 220, "img_button_play");
    buttonPlay.setInteractive();
    buttonPlay.on("pointerdown", () => this.scene.start("GameState"), this);

    // Help button
    const buttonHelp = this.add.sprite(550 / 2, 310, "img_button_help");
    buttonHelp.setInteractive();
    buttonHelp.on("pointerdown", () => this.scene.start("HelpState"), this);

    // Lava
    new Lava(this, 550 / 2, 400 - 10, "img_lava", "img_lava_particle");
  }
}
