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
    const particles = scene.add.particles("img_lava_particle");
    this.lavaEmitter = particles.createEmitter({});

    this.lavaEmitter.setSpeed({ max: 100, min: 50 });
    this.lavaEmitter.setGravity(0, 200);
    this.lavaEmitter.setScale({ end: 0.2, start: 1 });
    this.lavaEmitter.setAngle({ max: 310, min: 230 });

    this.lavaEmitter.setLifespan({ max: 500, min: 100 });
    this.lavaEmitter.setFrequency(100);
    this.lavaEmitter.setPosition(0, 380);

    const emitZoneRect = {
      quantity: 1,
      source: new Phaser.Geom.Rectangle(0, 0, 550, 1),
      type: "random",
    };

    this.lavaEmitter.setEmitZone(emitZoneRect);
  }
}
