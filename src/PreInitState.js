import Phaser from "phaser";

export default class PreInitState extends Phaser.Scene {
  constructor() {
    super({ active: true, key: "PreInitState" });
  }

  preload() {
    // Loading Screen
    this.load.baseURL =
      window.location.toString().replace(/[^/]*$/gu, "") +
      document
        .querySelector('script[src$="main.js"]')
        .getAttribute("src")
        .replace("main.js", "");

    this.load.image("img_load", "assets/img/loading.png");
  }

  create() {
    this.scene.start("InitState");
  }
}
