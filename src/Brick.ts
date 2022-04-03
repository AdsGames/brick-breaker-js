import * as Phaser from "phaser";

export type BrickType = "blue" | "brown" | "red" | "white" | "yellow";

// Map type to image
const BRICK_IMAGES: Record<BrickType, string> = {
  blue: "img_brick_blue",
  brown: "img_brick_brown",
  red: "img_brick_red",
  white: "img_brick_white",
  yellow: "img_brick_yellow",
};

export default class Brick extends Phaser.Physics.Arcade.Sprite {
  // Type of brick
  private readonly brickType: BrickType;

  /**
   * Constructor
   * @param scene Scene to attach to
   * @param x X position to create at
   * @param y Y Position to create at
   * @param type Brick type
   */
  public constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: BrickType
  ) {
    // Create sprite
    super(scene, x, y, "");
    scene.add.existing(this);

    // Physics
    scene.physics.world.enable(this);

    // Setup body
    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setCollideWorldBounds(true);
      this.body.setSize(64, 24);
      this.body.setOffset(-2, -2);
      this.body.setImmovable(true);
      this.body.onCollide = true;
    }

    // Select texture
    this.brickType = type;
    super.setTexture(BRICK_IMAGES[this.brickType]);
  }

  public getBrickType(): BrickType {
    return this.brickType;
  }
}
