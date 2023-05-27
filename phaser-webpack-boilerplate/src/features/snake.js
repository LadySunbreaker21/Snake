const SNAKE_VELOCITY = 200;


export default class Snake extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        
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

    }
    
    
   
}
