import * as Phaser from "phaser";

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  // If ball is waiting or not
  private waiting: boolean = false;

  /**
   * Constructor
   * @param scene Scene to attach to
   * @param x X position to create at
   * @param y Y Position to create at
   * @param waiting If ball should start in waiting state
   */
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
    super.setTexture("img_ball");

    // Setup launch ball
    scene.input.on("pointerdown", this.launchBall.bind(this), this);
    scene.input.keyboard.on("keydown_SPACE", this.launchBall.bind(this), this);
  }

  /**
   * Collide with bar handler
   * @param x position hit at
   */
  public hitBar(x: number): void {
    const { body } = this;

    if (body instanceof Phaser.Physics.Arcade.StaticBody) {
      return;
    }

    body.setVelocityX(this.body.velocity.x + (this.x - x) * 3);
  }

  /**
   * Is waiting
   * @retuns waiting state
   */
  public isWaiting(): boolean {
    return this.waiting;
  }

  /**
   * Launch ball
   * @description Launches ball if in waiting state
   */
  private launchBall(): void {
    if (
      this.body instanceof Phaser.Physics.Arcade.StaticBody ||
      !this.waiting
    ) {
      return;
    }

    this.body.setVelocity(Phaser.Math.Between(-100, 100), -200);
    this.waiting = false;
  }
}
