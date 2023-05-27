import Phaser from "phaser";
import MenuScene from "./Scenes/menu-scene";


const SNAKE_VELOCITY = 200;
const GLOBAL_CONFIG = {
  width: 800,
  height: 600,
};


class MainScene extends Phaser.Scene {
  constructor(config) {
    super("MainScene", config);
    this.snake = null;
    this.fruit = null;
    this.score = 0;
    this.scoreText = null;
    this.tail = [];
    this.isPaused = false;
  }
  

  preload() {
    
    this.load.spritesheet("snake", "assets/snakeSprite.png", { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet("fruit", "assets/appleSprite.png", { frameWidth: 16, frameHeight: 16 });
    this.load.image("background", "assets/background.png");
    this.load.image("pause_button", "assets/pause.png");
  }

  

  create() {

    
    this.add.image(0, 0, "background").setOrigin(0);

    this.snake = this.add.sprite(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "snake"
    );
    this.snake.setScale(0.5);
    this.physics.add.existing(this.snake);

    this.anims.create({
      key: "snakeAnimation",
      frames: this.anims.generateFrameNumbers("snake", { start: 1, end: 4 }),
      frameRate: 3,
      repeat: -1,
    });
    this.snake.play("snakeAnimation");
    this.snake.setScale(4);




    // Eventos de Movimiento
    this.input.keyboard.on("keydown-D", this.moveRight, this);
    this.input.keyboard.on("keydown-A", this.moveLeft, this);
    this.input.keyboard.on("keydown-W", this.moveUp, this);
    this.input.keyboard.on("keydown-S", this.moveDown, this);

    // Poner fruta de forma aleatoria
    this.fruit = this.physics.add.sprite(
      Phaser.Math.Between(0, this.game.config.width),
      Phaser.Math.Between(0, this.game.config.height),
      "fruit"
    );

    this.anims.create({
      key: "fruitAnimation",
      frames: this.anims.generateFrameNumbers("fruit", { start: 1, end: 7 }),
      frameRate: 3,
      repeat: -1,
    });
    this.fruit.play("fruitAnimation");
    this.fruit.setScale(3);

    // Colision entre la serpiente y la fruta
    this.physics.add.collider(this.snake, this.fruit, this.collectFruit, null, this);

    // Puntaje
    this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, { fontSize: "32px", fill: "#000" });

    // Pausa
    this.pauseButton = this.add.image(this.game.config.width - 10, 10, "pause_button")
      .setOrigin(1, 0)
      .setScale(2)
      .setInteractive();
    this.pauseButton.on("pointerup", this.pause, this);

    this.isPaused = false;
  }

  showMenu(menu) {
    let yPos = menu.firstItemPosition.y;
    this.activeMenu = this.add.group();

    menu.items.forEach(item => {
      const textObject = this.add.text(menu.firstItemPosition.x, yPos, item.label, item.style)
        .setOrigin(menu.origin.x, menu.origin.y)
        .setInteractive();
      yPos += menu.spacing;
      textObject.on("pointerup", item.onClick, this);
      textObject.on("pointerover", () => { item.onMouseEnter(textObject) }, this);
      textObject.on("pointerover", () => { item.onMouseExit(textObject) }, this);
      this.activeMenu.add(textObject);
    });
  }

  hideMenu() {
    if (this.activeMenu) this.activeMenu.clear(true, true);
    this.activeMenu = null;
  }

  update() {
    // Verificar si la serpiente se sale de la pantalla
    if (this.snake.x < 0 || this.snake.x > this.game.config.width || this.snake.y < 0 || this.snake.y > this.game.config.height) {
      this.fruit.stop("fruitAnimation");

      const gameOverText = this.add.text(
        this.game.config.width / 2,
        this.game.config.height / 2 - 100,
        "Game Over",
        { fontSize: "48px", fill: "#FFF" }
      );
      gameOverText.setOrigin(0.5);
      
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
        this.score = 0;
        
        
      });
    }
  
  }

  moveRight() {
    this.snake.body.velocity.x = SNAKE_VELOCITY;
    this.snake.body.velocity.y = 0;
    this.snake.setRotation(Phaser.Math.Angle.Between(0, 0, this.snake.body.velocity.x, this.snake.body.velocity.y));
  }

  moveLeft() {
    this.snake.body.velocity.x = -SNAKE_VELOCITY;
    this.snake.body.velocity.y = 0;
    this.snake.setRotation(Phaser.Math.Angle.Between(0, 0, this.snake.body.velocity.x, this.snake.body.velocity.y));
  }

  moveUp() {
    this.snake.body.velocity.y = -SNAKE_VELOCITY;
    this.snake.body.velocity.x = 0;
    this.snake.setRotation(Phaser.Math.Angle.Between(0, 0, this.snake.body.velocity.x, this.snake.body.velocity.y));
  }

  moveDown() {
    this.snake.body.velocity.y = SNAKE_VELOCITY;
    this.snake.body.velocity.x = 0;
    this.snake.setRotation(Phaser.Math.Angle.Between(0, 0, this.snake.body.velocity.x, this.snake.body.velocity.y));
  }


  collectFruit() {
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    // Mover la fruta a una nueva posición aleatoria y detener movimiento
    this.fruit.setPosition(
      Phaser.Math.Between(0, this.game.config.width),
      Phaser.Math.Between(0, this.game.config.height)
    );
    this.fruit.body.velocity.x = 0;
    this.fruit.body.velocity.y = 0;

    // Agregar nueva parte de la serpiente
    const newPart = this.add.sprite(
      this.snake.x,
      this.snake.y,
      "snake"
    );
    newPart.setScale(0.5);
    this.tail.push(newPart);
  }

  pause() {
    this.physics.pause();
    this.isPaused = true;
    this.pauseButton.setVisible(false);
    this.fruit.stop("fruitAnimation");
    this.snake.stop("snakeAnimation");

    const continueButtonCallbacks = {
      onClick: this.resume,
      onMouseEnter: text => text.setFill("#0F0"),
      onMouseExit: text => text.setFill("#FFF"),
    };

    const quitButtonCallbacks = {
      onClick: this.quitGame,
      onMouseEnter: text => text.setFill("#F00"),
      onMouseExit: text => text.setFill("#FFF"),
    };

    const pauseMenu = {
      items: [
        { label: "Continue", style: { fontSize: "32px", fill: "#FFF" }, ...continueButtonCallbacks },
        { label: "Quit", style: { fontSize: "32px", fill: "#FFF" }, ...quitButtonCallbacks },
      ],

      firstItemPosition: { x: GLOBAL_CONFIG.width / 2, y: GLOBAL_CONFIG.height / 2 },
      origin: { x: 0.5, y: 0.5 },
      spacing: 45
    };

    this.showMenu(pauseMenu);
  }

  resume() {
    this.physics.resume();
    this.isPaused = false;
    this.pauseButton.setVisible(true);
    this.hideMenu();
    this.fruit.play("fruitAnimation");
    this.snake.play("snakeAnimation");
  }

  quitGame() {
    this.score = 0;
    this.scene.restart();
  }
}

const config = {
  type: Phaser.AUTO,
  ...GLOBAL_CONFIG,
  pixelArt: true,
  scene: [
    new MainScene(GLOBAL_CONFIG),
    new MenuScene(GLOBAL_CONFIG)
  ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
};

const game = new Phaser.Game(config);