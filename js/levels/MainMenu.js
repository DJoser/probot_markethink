
BasicGame.MainMenu = function (game) {

    this.music = null;
    this.playButton = null;
    this.bmpText = null;
    this.dudeintro = null;
};

BasicGame.MainMenu.prototype = {

    create: function () {
        this.stage.backgroundColor = "#87CEFA";

        this.music = this.add.audio('titleMusic');
        this.music.loopFull();

        prueba = this.add.bitmapText(100, 100, 'carrier_command', 'MarkeTHINK!', 70);
        this.add.bitmapText((this.world.width / 2) - (prueba.width / 2), this.world.height / 2, 'carrier_command', 'Press Start', 30);

        this.player = this.add.sprite(this.world.width - 500, this.world.height / 2, 'dudeintro');
        this.player.scale.setTo(10,10);
        this.player.animations.add('standby', [0, 1], 10, true);
        this.player.animations.play('standby');

    },
    update: function () {
        if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.startGame();
        }
    },
    startGame: function (pointer) {
        // Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        this.music.stop();

        // And start the actual game
        this.state.start('Level1');
    }
};