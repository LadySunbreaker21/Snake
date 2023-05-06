import Phaser from "phaser";

const SNAKE_VELOCITY = 200;

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
    this.snake = null;
    this.fruit = null;
  }

  preload() {
    this.load.image("snake", "assets/snake.png");
    this.load.image("fruit", "assets/bird.png");
    this.load.image("background", "assets/background.png");
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0);

    this.snake = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "snake");
    this.snake.setScale(0.5);
    this.physics.add.existing(this.snake);

    
    const keyboard = this.input.keyboard;
    keyboard.on("keydown-W", () => this.moveUp());
    keyboard.on("keydown-A", () => this.moveLeft());
    keyboard.on("keydown-S", () => this.moveDown());
    keyboard.on("keydown-D", () => this.moveRight());

   //Poner fruta de forma aleatoria.
    this.fruit = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height), "fruit");
  }

  update() {
   
  }


  //Movimiento
  moveRight() {
    this.snake.setVelocityX(SNAKE_VELOCITY);
    this.snake.setVelocityY(0);
  }

  moveLeft() {
    this.snake.setVelocityX(-SNAKE_VELOCITY);
    this.snake.setVelocityY(0);
  }

  moveUp() {
    this.snake.setVelocityX(0);
    this.snake.setVelocityY(-SNAKE_VELOCITY);
  }

  moveDown() {
    this.snake.setVelocityX(0);
    this.snake.setVelocityY(SNAKE_VELOCITY);
  }

}

const config = {
  type: Phaser.AUTO,
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
