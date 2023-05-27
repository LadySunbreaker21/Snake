class GameOverScene extends Phaser.Scene {
    constructor(config) {
      super("GameOverScene", config);
    }
  
    create() {
      // Agrega una imagen de fondo o cualquier elemento que desees mostrar en la pantalla de Game Over
  
      // Agrega un botón de reinicio
      const restartButton = this.add.text(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "Restart",
        { fontSize: "32px", fill: "#FFF" }
      );
      restartButton.setOrigin(0.5);
      restartButton.setInteractive();
      restartButton.on("pointerup", () => {
        this.scene.start("MainScene");
      });
    }
  }