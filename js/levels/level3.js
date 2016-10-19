BasicGame.Level3 = function (game) {
    this.width = window.innerWidth;
    this.height = window.innerHeight > 480 ? 480 : window.innerHeight;
    this.gameScore = 0;
    this.highScore = 0;
};

BasicGame.Level3.prototype = {

    create: function(){
        this.stage.backgroundColor = "#DDDDDD";

        this.highScore = this.gameScore > this.highScore ? Math.floor(this.gameScore) : this.highScore;
        this.gameScore = 0;
        this.currentFrame = 0;
        this.particleInterval = 2 * 60;
        this.gameSpeed = 580;
        this.isGameOver = false;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.music = this.game.add.audio("drivin-home");
        this.music.loop = true;
        this.music.play();

        this.bg = this.game.add.tileSprite(0, 0, this.width, this.height, 'snow-bg');
        this.bg.fixedToCamera = true;
        this.bg.autoScroll(-this.gameSpeed / 6, 0);

        this.emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        this.platforms.createMultiple(5, 'platform', 0, false);
        this.platforms.setAll('anchor.x', 0.5);
        this.platforms.setAll('anchor.y', 0.5);

        var plat;

        for(var i=0; i<5; i++){
            plat = this.platforms.getFirstExists(false);
            plat.reset(i * 192, this.game.world.height - 24);
            plat.width = 192;
            plat.height = 24;
            this.game.physics.arcade.enable(plat);
            plat.body.immovable = true;
            plat.body.bounce.set(0);
        }

        this.lastPlatform = plat;

        this.santa = this.game.add.sprite(100, this.game.world.height - 200, 'santa-running');
        this.santa.scale.set(2.5,2.5);
        this.santa.animations.add("run",[0,1],10,true);
        this.santa.animations.play('run');

        this.game.physics.arcade.enable(this.santa);

        this.santa.body.gravity.y = 1500;
        this.santa.body.collideWorldBounds = true;

        this.emitter.makeParticles('snowflake');
        this.emitter.maxParticleScale = 4;
        this.emitter.minParticleScale = 2;
        this.emitter.setYSpeed(100, 200);
        this.emitter.gravity = 0;
        this.emitter.width = this.game.world.width * 1.5;
        this.emitter.minRotation = 0;
        this.emitter.maxRotation = 40;

        this.game.camera.follow(this.santa);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.emitter.start(false, 0, 0);
        this.score = this.game.add.text(20, 20, '', { font: "24px Arial", fill: "white", fontWeight: "bold" });

        if(this.highScore > 0){
            this.highScore = this.game.add.text(20, 45, 'Best: ' + this.highScore, { font: "18px Arial", fill: "white" });
        }

    },

    update: function(){
        var that = this;
        if(!this.isGameOver){
            this.gameScore += .5;
            this.gameSpeed += .03;
            this.score.text = 'Score: ' + Math.floor(this.gameScore);

            this.currentFrame++;
            var moveAmount = this.gameSpeed / 100;
            this.game.physics.arcade.collide(this.santa, this.platforms);

            if(this.santa.body.bottom >= this.game.world.bounds.bottom){
                this.isGameOver = true;
                //this.endGame();

            }

            if(this.cursors.up.isDown && this.santa.body.touching.down ||
                this.spacebar.isDown && this.santa.body.touching.down ||
                this.game.input.mousePointer.isDown && this.santa.body.touching.down ||
                this.game.input.pointer1.isDown && this.santa.body.touching.down){
                this.jumpSound = this.game.add.audio("hop");
                this.jumpSound.play();
                this.santa.body.velocity.y = -500;
            }


            if(this.particleInterval === this.currentFrame){
                this.emitter.makeParticles('snowflake');
                this.currentFrame = 0;
            }

            this.platforms.children.forEach(function(platform) {
                platform.body.position.x -= moveAmount;
                if(platform.body.right <= 0){
                    platform.kill();
                    var plat = that.platforms.getFirstExists(false);
                    plat.reset(that.lastPlatform.body.right + 192, that.game.world.height - (Math.floor(Math.random() * 50)) - 24);
                    plat.body.immovable = true;
                    that.lastPlatform = plat;
                }
            });

        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.nextLevel();
        }

    },
    nextLevel: function (pointer) {
        // And start the actual game
        this.state.start('MainMenu');
        this.music.stop();
    }
};
