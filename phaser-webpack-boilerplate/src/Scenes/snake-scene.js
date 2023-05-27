export default class SnakeScene extends Phaser.Scene {
    constructor(sceneName, config) {
        super(sceneName);
        this.config = config;
           
        this.activeMenu = null;
    }

   
    create() {

        
           const sky =this.add.image(0, 0, "background").setOrigin(0);
        
    }

    showMenu(menu) {
        let yPos = menu.fisrtItemPosition.y;
        this.activeMenu = this.add.group();

        menu.items.forEach(item => {
            const textObject = this.add.text(menu.fisrtItemPosition.x, yPos, item.label, item.style)
            .setOrigin(menu.origin.x, menu.origin.y)
            .setInteractive();
            yPos += menu.spacing;
            textObject.on("pointerup", item.onClick, this);
            textObject.on("pointerover", ()=> {item.onMouseEnter(textObject)}, this);
            textObject.on("pointerover", ()=> {item.onMouseExit(textObject)}, this);
            this.activeMenu.add(textObject);

        });

    }

    hideMenu() {
        if(this.activeMenu) this.activeMenu.clear(true, true);
        this.activeMenu = null;
    }
}

