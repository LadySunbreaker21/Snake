import Phaser from "phaser";

const SNAKE_VELOCITY = 200;
const GLOBAL_CONFIG = {
  width: 800,
  height: 600,
}

class MainScene extends Phaser.Scene {
  constructor(config) {
    super("MainScene" , config);
    this.snake = null;
    this.fruit = null;
    this.score = 0;
    this.scoreText = null;
  }

  preload() {
    this.load.image("snake", "assets/snake.png");
    this.load.image("fruit", "assets/bird.png");
    this.load.image("background", "assets/background.png");
    this.load.image("pause_button", "assets/pause.png");
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0);

    this.snake = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "snake");
    this.snake.setScale(0.5);
    this.physics.add.existing(this.snake);

    // Eventos de Movimiento
    this.input.keyboard.on("keydown-D", this.moveRight, this);

    // Evento 02
    this.input.keyboard.on("keydown-A", this.moveLeft, this);

    // Evento 03
    this.input.keyboard.on("keydown-W", this.moveUp, this);

     // Evento 03
     this.input.keyboard.on("keydown-S", this.moveDown, this);
    


    // Poner fruta de forma aleatoria
    this.fruit = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height), "fruit");

    // Colision entre la serpiente y la fruta
    this.physics.add.collider(this.snake, this.fruit, this.collectFruit, null, this);

    // Puntaje
    this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, { fontSize: "32px", fill: "#000" });

    //Pausa
    this.pauseButton = this.add.image(this.game.config.width - 10, 10, "pause_button") //Se ancla en la parte derecha del boton
            .setOrigin(1,0)
            .setScale(2)
            .setInteractive();
    this.pauseButton.on("pointerup", this.pause, this); //Evento pointerup 
        

    this.isPaused = false;
  }

  update() {

     // Verificar si la serpiente se sale de la pantalla
  if (this.snake.x < 0 || this.snake.x > this.game.config.width || this.snake.y < 0 || this.snake.y > this.game.config.height) {
     this.score = 0;
     this.scene.restart();
    
  
  }
}

  // Movimiento general 
  moveRight() {
    this.snake.body.velocity.x = SNAKE_VELOCITY;
    this.snake.body.velocity.y = 0;
  }

  moveLeft() {
    this.snake.body.velocity.x = - SNAKE_VELOCITY;
    this.snake.body.velocity.y = 0;
  }

  moveUp() {
    this.snake.body.velocity.y =  - SNAKE_VELOCITY;
    this.snake.body.velocity.x = 0;
  }

  moveDown() {
    this.snake.body.velocity.y =  SNAKE_VELOCITY;
    this.snake.body.velocity.x = 0;
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

   pause() {
      this.physics.pause();
      this.moveDown.pause();
      this.moveUp.pause();
      this.moveLeft.pause();
      this.moveRight.pause();
      this.isPaused = true;
      this.pauseButton.setVisible(false);
   }
}


const config = {
  type: Phaser.AUTO,
  ...GLOBAL_CONFIG,
  width: 640,
  height: 480,
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

const game = new Phaser.Game(config);
