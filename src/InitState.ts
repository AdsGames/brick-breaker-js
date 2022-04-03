import * as Phaser from "phaser";

import { baseURL } from "./constants/loading";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  key: "InitState",
};

export default class InitState extends Phaser.Scene {
  public constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    this.createLoadingScreen();
    this.loadSprites();
    this.loadSpriteSheets();
    this.loadAudio();
  }

  public createLoadingScreen(): void {
    // Loading Screen
    this.load.baseURL = baseURL;

    // Background
    this.add.image(550 / 2, 400 / 2, "img_load");

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0xaaaaaa, 0.8);
    progressBox.fillRect(215, 270, 110, 10);

    const progressBar = this.add.graphics();

    const { height, width } = this.cameras.main;

    const assetText = this.make.text({
      style: {
        color: "#000000",
        font: "12px monospace",
      },
      text: "",
      x: width / 2,
      y: height / 2 + 100,
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x000000, 1);
      progressBar.fillRect(217, 272, 106 * value, 6);
    });

    this.load.on("fileprogress", (file: { key: string }) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });
  }

  // eslint-disable-next-line max-lines-per-function
  public loadSprites(): void {
    // Lava
    this.load.image("img_lava", "assets/img/lava.png");
    this.load.spritesheet("img_lava_particle", "assets/img/lava_bubble.png", {
      frameHeight: 8,
      frameWidth: 8,
    });

    this.load.image("img_button_play", "assets/img/button_play.png");
    this.load.image("img_button_help", "assets/img/button_help.png");
    this.load.image("img_button_back", "assets/img/button_back.png");

    this.load.image("img_background", "assets/img/back.png");
    this.load.image("img_help", "assets/img/help.png");

    // Title
    this.load.image("img_title", "assets/img/title.png");

    // Bricks
    this.load.image("img_brick_blue", "assets/img/bricks/blue.png");
    this.load.image("img_brick_brown", "assets/img/bricks/brown.png");
    this.load.image("img_brick_red", "assets/img/bricks/red.png");
    this.load.image("img_brick_yellow", "assets/img/bricks/yellow.png");
    this.load.image("img_brick_white", "assets/img/bricks/white.png");

    // Info bar
    this.load.image("img_info_bar", "assets/img/info_bar.png");
    this.load.image("img_game_over_panel", "assets/img/game_over_panel.png");

    // Ball
    this.load.image("img_ball_fire", "assets/img/ball_fire.png");
    this.load.image("img_ball", "assets/img/ball.png");

    // Bar
    this.load.image("img_bar", "assets/img/bar/bar.png");
    this.load.image("img_bar_small", "assets/img/bar/bar_small.png");
    this.load.image("img_bar_big", "assets/img/bar/bar_big.png");

    // Powerups
    this.load.image(
      "img_powerup_ball_fast",
      "assets/img/powerup/ball_fast.png"
    );
    this.load.image(
      "img_powerup_ball_fire",
      "assets/img/powerup/ball_fire.png"
    );
    this.load.image(
      "img_powerup_ball_slow",
      "assets/img/powerup/ball_slow.png"
    );
    this.load.image(
      "img_powerup_ball_multi",
      "assets/img/powerup/ball_multi.png"
    );
    this.load.image("img_powerup_bar_big", "assets/img/powerup/bar_big.png");
    this.load.image(
      "img_powerup_bar_small",
      "assets/img/powerup/bar_small.png"
    );
    this.load.image("img_powerup_error", "assets/img/powerup/error.png");
  }

  public loadSpriteSheets(): void {
    // Brick particles
    this.load.spritesheet(
      "img_particles_blue",
      "assets/img/bricks/particles_blue.png",
      { frameHeight: 20, frameWidth: 20 }
    );
    this.load.spritesheet(
      "img_particles_brown",
      "assets/img/bricks/particles_brown.png",
      { frameHeight: 20, frameWidth: 20 }
    );
    this.load.spritesheet(
      "img_particles_red",
      "assets/img/bricks/particles_red.png",
      { frameHeight: 20, frameWidth: 20 }
    );
    this.load.spritesheet(
      "img_particles_yellow",
      "assets/img/bricks/particles_yellow.png",
      { frameHeight: 20, frameWidth: 20 }
    );
    this.load.spritesheet(
      "img_particles_white",
      "assets/img/bricks/particles_white.png",
      { frameHeight: 20, frameWidth: 20 }
    );
  }

  public loadAudio(): void {
    // Music
    this.load.audio("music", "assets/sfx/music.mp3");

    // Audio
    this.load.audio("bigger", "assets/sfx/bigger.mp3");
    this.load.audio("bounce", "assets/sfx/bounce.mp3");
    this.load.audio("break", "assets/sfx/break.mp3");
    this.load.audio("dirt", "assets/sfx/dirt.mp3");
    this.load.audio("explode", "assets/sfx/explode.mp3");
    this.load.audio("lava", "assets/sfx/lava.mp3");
    this.load.audio("multiball", "assets/sfx/multiball.mp3");
    this.load.audio("smaller", "assets/sfx/smaller.mp3");
    this.load.audio("slow_down", "assets/sfx/slow_down.mp3");
    this.load.audio("speed_up", "assets/sfx/speed_up.mp3");
  }

  // Create
  public create(): void {
    this.scene.start("MenuState");
  }
}
