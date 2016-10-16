
BasicGame.MainMenu = function (game) {

    this.music = null;
    this.playButton = null;
    this.bmpText = null;
};

BasicGame.MainMenu.prototype = {

    create: function () {
        //this.stage.backgroundColor = "#FFFFFF";

        this.music = this.add.audio('titleMusic');
        this.music.loopFull();

        this.bmpText = this.add.bitmapText(10, 100, 'carrier_command', 'MARKE THINK!', 34);
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