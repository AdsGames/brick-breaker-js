import * as Phaser from "phaser";

import { baseURL } from "./constants/loading";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  key: "PreInitState",
  visible: false,
};

export default class PreInitState extends Phaser.Scene {
  public constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    // Set base url
    this.load.baseURL = baseURL;
    this.load.image("img_load", "assets/img/loading.png");
  }

  public create(): void {
    this.scene.start("InitState");
  }
}
