BasicGame.Level2 = function (game) {
};

BasicGame.Level2.prototype = {
    create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);

        //  Our bullet group
        this.bullets = this.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this. bullets.setAll('anchor.y', 1);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        // The enemy's bullets
        this.enemyBullets = this.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(30, 'enemyBullet');
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);

        //  The hero!
        this.player = this.add.sprite(400, 500, 'ship');
        this.player.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.player, Phaser.Physics.ARCADE);

        //  The baddies!
        this.aliens = this.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;

        this.createAliens();

        //  The score
        this.scoreString = 'Score : ';
        this.scoreText = this.add.text(10, 10, this.scoreString + this.score, {font: '34px Arial', fill: '#fff'});

        //  Lives
        this.lives = this.add.group();
        this.add.text(this.world.width - 100, 10, 'Lives : ', {font: '34px Arial', fill: '#fff'});

        //  Text
        this.stateText = this.add.text(this.world.centerX, this.world.centerY, ' ', {font: '84px Arial', fill: '#fff'});
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;

        for (var i = 0; i < 3; i++) {
            var ship = this.lives.create(this.world.width - 100 + (30 * i), 60, 'ship');
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 90;
            ship.alpha = 0.4;
        }

        //  An explosion pool
        this.explosions = this.add.group();
        this.explosions.createMultiple(30, 'kaboom');
        this.explosions.forEach(this.setupInvader, this);

        //  And some controls to play the game with
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    createAliens: function () {

        for (var y = 0; y < 4; y++) {
            for (var x = 0; x < 10; x++) {
                var alien = this.aliens.create(x * 48, y * 50, 'invader');
                alien.anchor.setTo(0.5, 0.5);
                alien.animations.add('fly', [0, 1, 2, 3], 20, true);
                alien.play('fly');
                alien.body.moves = false;
            }
        }

        this.aliens.x = 100;
        this.aliens.y = 50;

        //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
        var tween = this.add.tween(this.aliens).to({x: 200}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        //  When the tween loops it calls descend
        tween.onLoop.add(this.descend, this);
    },

    setupInvader: function (invader) {

        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');

    },

    descend: function () {

        this.aliens.y += 10;

    },

    update: function () {

        if (this.player.alive) {
            //  Reset the player, then check for movement keys
            this.player.body.velocity.setTo(0, 0);

            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -200;
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 200;
            }

            //  Firing?
            if (this.fireButton.isDown) {
                this.fireBullet();
            }

            if (this.time.now > this.firingTimer) {
                this.enemyFires();
            }

            //  Run collision
            this.physics.arcade.overlap(this.bullets, this.aliens, this.collisionHandler, null, this);
            this.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyHitsPlayer, null, this);
        }

    },

    collisionHandler: function (bullet, alien) {

        //  When a bullet hits an alien we kill them both
        bullet.kill();
        alien.kill();

        //  Increase the score
        this.score += 20;
        this.scoreText.text = scoreString + score;

        //  And create an explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(alien.body.x, alien.body.y);
        explosion.play('kaboom', 30, false, true);

        if (this.aliens.countLiving() == 0) {
            score += 1000;
            scoreText.text = scoreString + score;

            this.enemyBullets.callAll('kill', this);
            this.stateText.text = " You Won, \n Click to restart";
            this.stateText.visible = true;

            //the "click to restart" handler
            this.input.onTap.addOnce(this.restart, this);
        }

    },

    enemyHitsPlayer: function (player, bullet) {

        bullet.kill();

        this.live = this.lives.getFirstAlive();

        if (this.live) {
            this.live.kill();
        }

        //  And create an explosion :)
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(this.player.body.x, this.player.body.y);
        explosion.play('kaboom', 30, false, true);

        // When the player dies
        if (this.lives.countLiving() < 1) {
            this.player.kill();
            this.enemyBullets.callAll('kill');

            this.stateText.text = " GAME OVER \n Click to restart";
            this.stateText.visible = true;

            //the "click to restart" handler
            this.input.onTap.addOnce(restart, this);
        }

    },

    enemyFires: function () {

        //  Grab the first bullet we can from the pool
        enemyBullet = enemyBullets.getFirstExists(false);

        livingEnemies.length = 0;

        this.aliens.forEachAlive(function (alien) {

            // put every living enemy in an array
            livingEnemies.push(alien);
        });


        if (enemyBullet && livingEnemies.length > 0) {

            var random = this.rnd.integerInRange(0, livingEnemies.length - 1);

            // randomly select one of them
            var shooter = livingEnemies[random];
            // And fire the bullet from this enemy
            enemyBullet.reset(shooter.body.x, shooter.body.y);

            this.physics.arcade.moveToObject(enemyBullet, player, 120);
            firingTimer = this.time.now + 2000;
        }

    },

    fireBullet: function () {

        //  To avoid them being allowed to fire too fast we set a time limit
        if (this.time.now > this.bulletTime) {
            //  Grab the first bullet we can from the pool
            bullet = bullets.getFirstExists(false);

            if (bullet) {
                //  And fire it
                bullet.reset(player.x, player.y + 8);
                bullet.body.velocity.y = -400;
                this.bulletTime = this.time.now + 200;
            }
        }

    },

    resetBullet: function (bullet) {

        //  Called if the bullet goes out of the screen
        bullet.kill();

    },

    restart: function () {

        //  A new level starts

        //resets the life count
        lives.callAll('revive');
        //  And brings the aliens back from the dead :)
        aliens.removeAll();
        createAliens();

        //revives the player
        player.revive();
        //hides the text
        stateText.visible = false;

    }
};
