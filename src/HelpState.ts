import * as Phaser from "phaser";
import Lava from "./Lava";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  key: "HelpState",
};

export default class HelpState extends Phaser.Scene {
  public lava!: Lava;

  public constructor() {
    super(sceneConfig);
  }

  public create(): void {
    // Background
    this.add.image(550 / 2, 400 / 2, "img_background");

    // Lava
    this.lava = new Lava(
      this,
      550 / 2,
      400 - 10,
      "img_lava",
      "img_lava_particle"
    );

    // Help page
    this.add.image(550 / 2, 190, "img_help");

    // Play button
    const buttonBack = this.add.sprite(60, 360, "img_button_back");
    buttonBack.setInteractive();
    buttonBack.on("pointerdown", () => this.scene.start("MenuState"), this);
  }
}
