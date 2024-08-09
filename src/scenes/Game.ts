import { Scene } from "phaser";

export class Game extends Scene {
    constructor() {
        super("Game");
    }
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    preload() {
        this.load.setPath("assets");
        this.load.image("sky", "sky.png");
        this.load.image("ground", "platform.png");
        this.load.image("star", "star.png");
        this.load.image("bomb", "bomb.png");
        this.load.spritesheet("dude", "dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });

        // FROM INITIAL CREATION
        // this.load.image("background", "bg.png");
        // this.load.image("logo", "logo.png");
    }

    create() {
        // Create initial scene
        this.add.image(400, 300, "sky");
        this.add.image(400, 300, "star");
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

        this.platforms.create(600, 400, "ground");
        this.platforms.create(50, 250, "ground");
        this.platforms.create(750, 220, "ground");

        // Create player sprite
        this.player = this.physics.add.sprite(100, 450, "dude");

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        // FROM INITIAL CREATION
        // this.add.image(512, 384, "background");
        // this.add.image(512, 350, "logo").setDepth(100);
        // this.add
        //     .text(
        //         512,
        //         490,
        //         "Make something fun!\nand share it with us:\nsupport@phaser.io",
        //         {
        //             fontFamily: "Arial Black",
        //             fontSize: 38,
        //             color: "#ffffff",
        //             stroke: "#000000",
        //             strokeThickness: 8,
        //             align: "center",
        //         }
        //     )
        //     .setOrigin(0.5)
        //     .setDepth(100);
    }

    update(time: number, delta: number): void {
        const keyboard = this.input.keyboard;
        if (keyboard){
            this.cursors = keyboard.createCursorKeys();

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play("turn");
        }

        if (this.cursors.up.isDown && this.player.body?.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
    }
}
