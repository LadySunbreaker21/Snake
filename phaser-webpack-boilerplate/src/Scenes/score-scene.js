import SnakeScene from "./snake-scene";

const HIGH_CORE_LABEL ="High score:";
const HIGH_SCORE_SAVE_KEY ="high_score";

export default class ScoreScene extends SnakeScene {
    constructor(config) {
        super("ScoreScene", config);
    }

    create() {
        super.create();
        const loadedHighScore = parseInt(localStorage.getItem(HIGH_SCORE_SAVE_KEY));
        let highScoreValue = isNaN(loadedHighScore) ? 0 : loadedHighScore;
        const highScoreText = this.add.text(this.config.width / 2, this.config.height / 2, 
        HIGH_CORE_LABEL + highScoreValue, {fontSize: "32px"}).setOrigin(0.5);

        this.layers.ui.add(highScoreText);

        const back = this.add.text(this.config.width -16, 16, "Back", {fontSize: "24px"})
        .setOrigin(1, 0)
        .setInteractive();

        back.on("pointerup", ()=> {
            this.scene.start("MenuScene");
        });
        back.on("pointerover", ()=> back.setFill("#0F0"));
        back.on("pointerout", ()=> back.setFill("#FFF"));
    }
}