import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor(config) {
    super("MenuScene", config);
  }

  preload() {

    this.load.image("background", "assets/background.png");
  }
  create() {
   
        const backgroundImage = this.add.image(
          this.game.config.width / 2,
          this.game.config.height / 2,
          "background"
        );
      backgroundImage.setOrigin(0.5);
    
    const startButton = this.add.text(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "Comenzar",
      { fontSize: "32px", fill: "#FFF" }
    );
    startButton.setOrigin(0.5);
    startButton.setInteractive();
    startButton.on("pointerup", this.startGame, this);
  }

  startGame() {
    this.scene.start("MainScene");
  }
}