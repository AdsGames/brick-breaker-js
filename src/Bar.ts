import * as Phaser from "phaser";

export default class Bar extends Phaser.Physics.Arcade.Sprite {
  public size: number = 0;

  public arrowKeys!: Phaser.Types.Input.Keyboard.CursorKeys;

  public constructor(scene: Phaser.Scene, x: number, y: number, size: number) {
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

  public setBarSize(size: number): void {
    // Change size
    if (this.size + size > -1 && this.size + size < 3) this.size += size;

    // Get image
    super.setTexture(this.selectImage(this.size));

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

  public update(): void {
    // Keyboard controls
    if (this.arrowKeys.left?.isDown ?? false) {
      this.x -= 6;
    } else if (this.arrowKeys.right?.isDown ?? false) {
      this.x += 6;
    }
  }

  private selectImage(size: number): string {
    switch (size) {
      case 0:
        return "img_bar_small";
      case 1:
        return "img_bar";
      case 2:
        return "img_bar_big";
      default:
        return "img_bar";
    }
  }
}
