import * as Phaser from "phaser";

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  public ballType: number = 0;

  private waiting: boolean = false;

  public constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    waiting: boolean
  ) {
    // Create sprite
    super(scene, x, y, "");
    scene.add.existing(this);

    // Physics
    scene.physics.world.enable(this);

    // Setup body
    this.body.setSize(10, 10);
    this.body.setOffset(0, 0);
    this.body.onCollide = true;

    // Waiting
    this.waiting = waiting;

    // Select image
    super.setTexture(this.selectImage(this.ballType));

    // Setup inputs
    this.setupInput(scene);
  }

  public hitBar(x: number): void {
    const { body } = this;

    if (body instanceof Phaser.Physics.Arcade.StaticBody) {
      return;
    }

    body.setVelocityX(this.body.velocity.x + (this.x - x) * 3);
  }

  public isWaiting(): boolean {
    return this.waiting;
  }

  private selectImage(type: number): string {
    switch (type) {
      case 0:
        return "img_ball";
      case 1:
        return "img_ball_fire";
      default:
        return "img_ball";
    }
  }

  private setupInput(scene: Phaser.Scene): void {
    const { body } = this;

    if (body instanceof Phaser.Physics.Arcade.StaticBody) {
      return;
    }

    // Move ball
    scene.input.on(
      "pointerdown",
      () => {
        if (this.waiting) {
          body.setVelocity(Phaser.Math.Between(-100, 100), -200);
          this.waiting = false;
        }
      },
      this
    );

    scene.input.keyboard.on(
      "keydown_SPACE",
      () => {
        if (this.waiting) {
          body.setVelocity(Phaser.Math.Between(-100, 100), -200);
          this.waiting = false;
        }
      },
      this
    );
  }
}
