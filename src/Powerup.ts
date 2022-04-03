import * as Phaser from "phaser";

export type PowerupType = "big" | "fast" | "multi" | "slow" | "small";

// Map type to image
const POWERUP_IMAGES = {
  big: "img_powerup_bar_big",
  fast: "img_powerup_ball_fast",
  multi: "img_powerup_ball_multi",
  slow: "img_powerup_ball_slow",
  small: "img_powerup_bar_small",
};

export default class Powerup extends Phaser.Physics.Arcade.Sprite {
  // Powerup Type
  public powerupType: PowerupType;

  /**
   * Constructor
   * @param scene Scene to attach to
   * @param x X position to create at
   * @param y Y position to create at
   * @param type Type of powerup
   */
  public constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: PowerupType
  ) {
    // Create sprite
    super(scene, x, y, "");
    scene.add.existing(this);

    // Physics
    scene.physics.world.enable(this);

    this.body.setSize(40, 20);
    this.body.setOffset(0, 0);
    this.body.onCollide = true;

    // Select texture
    this.powerupType = type;
    super.setTexture(POWERUP_IMAGES[this.powerupType]);
  }

  /**
   * Get Powerup Type
   * @returns Powerup type
   */
  public getType(): PowerupType {
    return this.powerupType;
  }
}
