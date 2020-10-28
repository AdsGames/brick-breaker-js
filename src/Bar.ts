import * as Phaser from "phaser";

const MOVEMENT_SPEED = 6;

type BarSize = 0 | 1 | 2;

// Map type to image
const BAR_IMAGES: Record<BarSize, string> = {
  0: "img_bar_small",
  1: "img_bar",
  2: "img_bar_big",
};

export default class Bar extends Phaser.Physics.Arcade.Sprite {
  // Size of bar
  private size: BarSize = 0;

  // Arrow keys of scene
  private readonly arrowKeys!: Phaser.Types.Input.Keyboard.CursorKeys;

  /**
   * Constructor
   * @param scene Scene to attach to
   * @param x X position to create at
   * @param y Y Position to create at
   * @param size Size of bar
   */
  public constructor(scene: Phaser.Scene, x: number, y: number, size: BarSize) {
    // Create sprite
    super(scene, x, y, "");
    scene.add.existing(this);

    // Physics
    scene.physics.world.enable(this);

    // Setup body
    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setCollideWorldBounds(true);
      this.body.setOffset(0, 0);
      this.body.setImmovable(true);
      this.body.allowRotation = false;
    }

    // Size
    this.size = size;

    // Set size
    this.setBarSize(0);

    // Move to mouse
    scene.input.on(
      "pointermove",
      (pointer: Phaser.Input.Pointer) => {
        this.setPosition(pointer.x, this.y);
      },
      this
    );

    // Keyboard controls
    this.arrowKeys = scene.input.keyboard.createCursorKeys();
  }

  /**
   * Set Bar Size
   * @description Sets up body and image of bar on resize
   * @param size Size of bar
   */
  public setBarSize(size: -1 | 0 | 1): void {
    // Change size
    if (this.size + size > -1 && this.size + size < 3) this.size += size;

    // Get image
    super.setTexture(BAR_IMAGES[this.size]);

    // Set body size
    switch (this.size) {
      case 0:
        this.body.setSize(60, 16);
        break;
      case 1:
        this.body.setSize(90, 16);
        break;
      case 2:
        this.body.setSize(140, 16);
        break;
      default:
        this.body.setSize(90, 16);
        break;
    }
  }

  /**
   * Update
   * @description Update bar movement
   */
  public update(): void {
    // Keyboard controls
    if (this.arrowKeys.left?.isDown ?? false) {
      this.x -= MOVEMENT_SPEED;
    } else if (this.arrowKeys.right?.isDown ?? false) {
      this.x += MOVEMENT_SPEED;
    }
  }
}
