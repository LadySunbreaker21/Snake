
export default class Apple extends Phaser.GameObjects.Sprite {
    constructor(texture) {
        super(texture);
        this.scene = scene;
        scene.add.existing(this);
    

        this.anims.create({
          key: "applemove",
          frames: this.anims.generateFrameNumbers("fruit", {start: 1, end: 8}),
          frameRate: 13,
          repeat: -1
        });

        this.play("fruit");
        this.setFlipX(true);
        this.setScale(3);

        this.body.setSize(14,8);
    }

    
     // Función para recoger la fruta
     collectFruit() {
     
      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
  
      // Mover la fruta a una nueva posición aleatoria y detener movimiento
      this.fruit.setPosition(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height));
      this.fruit.body.velocity.x= 0;
      this.fruit.body.velocity.y= 0;
      
  }
}