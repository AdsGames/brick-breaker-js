import * as Phaser from "phaser";
import Lava from "./Lava";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  key: "GameOverState",
};

export default class GameOverState extends Phaser.Scene {
  public lava!: Lava;

  private score: number = 0;

  private level: number = 0;

  public constructor() {
    super(sceneConfig);
  }

  public init({ score, level }: { score: number; level: number }): void {
    this.score = score;
    this.level = level;
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

    // Text
    this.add
      .sprite(550 / 2, 400 / 2, "img_game_over_panel")
      .setInteractive()
      .on("pointerdown", () => this.scene.start("MenuState"), this);

    const textConf = {
      color: "#000",
      fontFamily: "Consolas, monospace",
      fontSize: "18px",
    };

    this.add.text(170, 160, "Game Over!", {
      ...textConf,
      fontSize: "38px",
    });

    this.add.text(180, 200, `Score: ${this.score}`, textConf);

    this.add.text(180, 220, `Level: ${this.level}`, textConf);
  }
}
