BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		//this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		//this.load.image('titlepage', 'assets/sky.png');
		this.load.audio('titleMusic', ['assets/music/Red Hot Chili Peppers - Californication.mp3']);
		this.load.audio('level1Music', ['assets/music/Eurythmics - Sweet Dreams (8-Bit).mp3']);


		// Intro
        this.load.bitmapFont('carrier_command',
            'assets/fonts/bitmapFonts/carrier_command.png',
            'assets/fonts/bitmapFonts/carrier_command.xml');
        this.load.image('montana', 'assets/sprites/Intro/montanas.png');
        this.load.image('pergaminoizquierda', 'assets/sprites/Intro/pergaminoizquierda.png');
        this.load.image('pergaminoderecha', 'assets/sprites/Intro/pergaminoderecha.png');
        this.load.image('pergaminocentro', 'assets/sprites/Intro/pergaminocentro.png');
        this.load.spritesheet('dudeintro','assets/sprites/Intro/dudeintro.png',32,32);

		// Nivel 1
		this.load.spritesheet('hero', 'assets/sprites/level1/mktgirl.png',18,23);
		this.load.image('pixel', 'assets/sprites/level1/pixel_1.png');
		this.load.image('buscador','assets/sprites/level1/buscador.png')

		// Nivel 2
		this.load.image('bullet', 'assets/sprites/level2/bullet.png');
		this.load.image('enemyBullet', 'assets/sprites/level2/enemy-bullet.png');
		this.load.spritesheet('invader', 'assets/sprites/level2/fantasma amarillo.png', 19, 19);
		this.load.spritesheet('ship', 'assets/sprites/level2/player.png',24,21);
		this.load.spritesheet('kaboom', 'assets/sprites/level2/explode.png', 128, 128);
		this.load.image('starfield', 'assets/sprites/level2/starfield.png');
		this.load.image('background', 'assets/sprites/level2/background2.png');

		// Nivel 3
		this.load.audio('drivin-home', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/drivin-home-low.mp3');
		this.load.audio('ho-ho-ho', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/ho-ho-ho.mp3');
		this.load.audio('hop', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jump-sound.mp3');
		this.load.image('platform', 'assets/sprites/level3/ground.png');
		this.load.spritesheet('santa-running', 'assets/sprites/level3/santa-running.png', 37, 52);
		this.load.image('snow-bg', 'assets/sprites/level3/snow-bg.png');
		this.load.image('snowflake', 'assets/sprites/level3/snowflake.png');
		this.load.image("logo", "assets/sprites/level3/game-logo.png");
		this.load.image("instructions", "assets/sprites/level3/instructions.png");
		this.load.image("game-over", "assets/sprites/level3/game-over.png");
		this.load.image("startbtn", "assets/sprites/level3/start-btn.png");
		this.load.image("playbtn", "assets/sprites/level3/play-btn.png");
		this.load.image("restartBtn", "assets/sprites/level3/restart-btn.png");

		// Nivel 4
		this.load.image('sky', 'assets/sprites/level4/sky.png');
		this.load.image('ground', 'assets/sprites/level4/platform.png');
		this.load.image('star', 'assets/sprites/level4/star.png');
		this.load.spritesheet('dude', 'assets/sprites/level4/dude.png', 32, 48);
	},

	create: function () {
	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}
	}
};
