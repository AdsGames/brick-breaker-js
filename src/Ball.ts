import * as Phaser from "phaser";

export default class Ball extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, waiting) {
    // Create sprite
    super(scene, x, y, "");
    scene.add.existing(this);

    // Physics
    scene.physics.world.enable(this);

    this.body.setSize(10, 10);
    this.body.setOffset(0, 0);

    this.body.onCollide = true;

    // Size
    this.type = 0;

    // Waiting
    this.waiting = waiting;

    // Select image
    super.setTexture(this.selectImage(this.type));

    // Move ball
    scene.input.on(
      "pointerdown",
      () => {
        if (this.waiting) {
          this.body.setVelocity(Phaser.Math.Between(-100, 100), -200);
          this.waiting = false;
        }
      },
      this
    );

    scene.input.keyboard.on(
      "keydown_SPACE",
      () => {
        if (this.waiting) {
          this.body.setVelocity(Phaser.Math.Between(-100, 100), -200);
          this.waiting = false;
        }
      },
      this
    );
  }

  selectImage(type) {
    switch (type) {
      case 0:
        return "img_ball";
      case 1:
        return "img_ball_fire";
      default:
        return "img_ball";
    }
  }

  hitBar(x) {
    this.body.setVelocityX(this.body.velocity.x + (this.x - x) * 3);
  }

  isWaiting() {
    return this.waiting;
  }
}
