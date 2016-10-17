BasicGame.Level1 = function (game) {
    this.player;
    this.platforms;
    this.cursors;

    this.stars;
    this.score = 0;
    this.scoreText;

    this.bpmText;

    this.collectStar = function (player, star) {

        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    }
};

BasicGame.Level1.prototype = {
    create: function () {
        // Configurar Juego
        this.physics.startSystem(Phaser.Physics.ARCADE);

        // Plataformas
        platforms = this.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, this.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        // Jugador
        player = this.add.sprite(32, this.world.height - 150, 'dude');
        this.physics.arcade.enable(player);
        this.camera.follow(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        // Estrellas
        stars = this.add.group();
        stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var star = stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        // Controles
        cursors = this.input.keyboard.createCursorKeys();

        // Textos del juego
        bmpText = this.add.bitmapText(10, 100, 'carrier_command', 'Level 1!', 34);
        scoreText = this.add.bitmapText(16, 16, 'carrier_command', 'score: 0', 10);

    },

    update: function () {

        if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.nextLevel();
        }

        //  Collide the player and the stars with the platforms
        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(stars, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        //this.physics.arcade.overlap(player, stars, collectStar, null, this);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown)// && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }
    },
    render: function () {
        //this.debug.inputInfo(32, 32);
    },
    nextLevel: function (pointer) {
        // And start the actual game
        this.state.start('Level2');
    },
    gofull: function () {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        }
        else {
            game.scale.startFullScreen(false);
        }
    }
};
