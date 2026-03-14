import * as Phaser from "phaser";

export default class Lava extends Phaser.Physics.Arcade.Sprite {
  public lavaEmitter!: Phaser.GameObjects.Particles.ParticleEmitter;

  public constructor(scene: Phaser.Scene, x: number, y: number) {
    // Lava
    super(scene, x, y, "img_lava");

    // World physics
    scene.physics.world.enable(this);

    // Physics
    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setImmovable(true);
      this.body.setSize(scene.sys.game.scale.width, 10);
      this.body.setOffset(0, 10);
      this.body.onCollide = true;
    }

    // Lava particles
    this.lavaEmitter = scene.add.particles(0, 380, "img_lava_particle", {
      speed: { min: 50, max: 100 },
      gravityX: 0,
      gravityY: 200,
      scale: { end: 0.2, start: 1 },
      angle: { max: 310, min: 230 },
      lifespan: { max: 500, min: 100 },
      frequency: 100,
    });

    this.lavaEmitter.addEmitZone({
      type: "random",
      source: new Phaser.Geom.Rectangle(0, 0, 550, 1),
      quantity: 1,
    });
  }
}
