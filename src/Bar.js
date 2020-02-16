import Phaser from "phaser";

export default class Bar extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, size) {
    // Create sprite
    super(scene, x, y, "");
    scene.add.existing(this);

    // Physics
    scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.setOffset(0, 0);
    this.body.setImmovable(true);
    this.body.allowRotation = false;

    // Size
    this.size = size;

    // Set size
    this.setSize(0);

    // Move to mouse
    scene.input.on(
      "pointermove",
      pointer => {
        this.setPosition(pointer.x, this.y);
      },
      this
    );

    // Keyboard controls
    this.arrowKeys = scene.input.keyboard.createCursorKeys();
  }

  selectImage(size) {
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

  setSize(size) {
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

  update() {
    // Keyboard controls
    if (this.arrowKeys.left.isDown) {
      this.x -= 6;
    } else if (this.arrowKeys.right.isDown) {
      this.x += 6;
    }
  }
}
