
BasicGame.MainMenu = function (game) {

    this.music = null;
    this.playButton = null;
    this.bmpText = null;
    this.dudeintro = null;
    this.montana = null;

    this.pergaminoizquierda = null;
    this.pergaminoderecha = null;
    this.pergaminocentro = null;
};

BasicGame.MainMenu.prototype = {

    create: function () {
        this.stage.backgroundColor = "#87CEFA";

        this.music = this.add.audio('titleMusic');
        this.music.loopFull();

        this.montana = this.add.sprite(0,0,'montana');
        this.montana.scale.set(7,7);

        this.pergaminoizquierda = this.add.sprite(0,0,'pergaminoizquierda');
        this.pergaminoizquierda.scale.set(9,9);
        this.pergaminoderecha = this.add.sprite(900,0,'pergaminoderecha');
        this.pergaminoderecha.scale.set(9,9);
        this.pergaminocentro = this.add.sprite(200,2,'pergaminocentro');
        this.pergaminocentro.scale.set(26,9);

        this.player = this.add.sprite(this.world.width - 465, this.world.height  - 485, 'dudeintro');
        this.player.scale.setTo(7,7);
        this.player.animations.add('standby', [0, 1], 10, true);
        this.player.animations.play('standby');

        prueba = this.add.bitmapText(150, 90, 'carrier_command', 'MarkeTHINK!', 70);
        this.add.bitmapText((this.world.width / 2) - (prueba.width / 2), (this.world.height / 2) - 50, 'carrier_command', 'Press Start', 30);
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