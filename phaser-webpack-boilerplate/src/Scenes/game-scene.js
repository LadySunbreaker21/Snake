import Score from "./score-scene";
import SnakeScene from "./snake-scene";




export default class GameScene extends SnakeScene {
    constructor(config) {
      super("GameScene" , config);
      this.snake = null;
      this.fruit = null;
      this.score = 0;
      this.scoreText = null;
      this.isGameOver = false;
     
    }
  
    preload() {
      this.load.image("snake", "assets/snake.png");
      this.load.spritesheet("fruit", "assets/appleSprite.png", {frameWidth: 16, frameHeight: 16});
      this.load.image("background", "assets/background.png");
      this.load.image("pause_button", "assets/pause.png");
    }
  
    create() {
      this.add.image(0, 0, "background").setOrigin(0);
  
      this.snake = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "snake");
      this.snake.setScale(0.5);
      this.physics.add.existing(this.snake);
  
    
  
      // Poner fruta de forma aleatoria
      this.fruit = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height), "fruit");
     
  
      // Colision entre la serpiente y la fruta
      this.physics.add.collider(this.snake, this.fruit, this.collectFruit, null, this);
  
     
      // Puntaje
      this.score = new Score(this, 16, 16, this.layers.ui);
  
      //Pausa
      this.pauseButton = this.add.image(this.game.config.width - 10, 10, "pause_button") //Se ancla en la parte derecha del boton
              .setOrigin(1,0)
              .setScale(2)
              .setInteractive();
      this.pauseButton.on("pointerup", this.pause, this); //Evento pointerup 
          

      this.isGameOver = false;
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
          collectFruit() {
   
            this.score += 10;
            this.scoreText.setText(`Score: ${this.score}`);
        
            // Mover la fruta a una nueva posición aleatoria y detener movimiento
            this.fruit.setPosition(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(0, this.game.config.height));
            this.fruit.body.velocity.x= 0;
            this.fruit.body.velocity.y= 0;
    
    }

    gameOver() {
        
        this.birdCollision.destroy();
        this.isGameOver = true;
        this.pauseButton.setVisible(false);
        this.layers.game.bringToTop(this.bird);
        this.snake.triggerLoseAnimation(()=> {
            this.score.checkHighScore();
            this.scene.restart();
        })
        
  }

  
  
     pause() {
        this.physics.pause();
        this.moveDown.pause();
        this.moveUp.pause();
        this.moveLeft.pause();
        this.moveRight.pause();
        this.isPaused = true;
        this.pauseButton.setVisible(false);

        const continueButtonCallbacks = {
            onClick: this.resume,
            onMouseEnter: text => text.setFill("#0F0"),
            onMouseExit: text => text.setFill("#FFF"),
            }

        const quitButtonCallbacks = {
            onClick: this.quitGame,
            onMouseEnter: text => text.setFill("#F00"),
            onMouseExit: text => text.setFill("#FFF"),
            }

            

    const pauseMenu = {
        items: [
            {label: "Continue", style: {sontSize: "32px", fill: "#FFF"}, ...continueButtonCallbacks},
            {label: "Quit", style: {sontSize: "32px", fill: "#FFF"}, ...quitButtonCallbacks},
        ],


        fisrtItemPosition: {x: this.config.width / 2, y: this.config.height / 2},
        origin: {x: 0.5, y: 0.5},
        spacing: 45
        }

        this.showMenu(pauseMenu);
     }

     resume() {
        this.physics.resume();
        this.moveDown.resume();
        this.moveUp.resume();
        this.moveLeft.resume();
        this.moveRight.resume();
        this.isPaused = false;
        this.pauseButton.setVisible(true);
        this.hideMenu();
      }

      quitGame() {
        this.scene.start("MenuScene")
      }
  }
  