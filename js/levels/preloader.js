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
		this.load.image('titlepage', 'assets/sky.png');
		this.load.audio('titleMusic', ['assets/music/Red Hot Chili Peppers - Californication.mp3']);
		this.load.audio('level1Music', ['assets/music/Eurythmics - Sweet Dreams (8-Bit).mp3']);


		// Intro
        this.load.bitmapFont('carrier_command',
            'assets/fonts/bitmapFonts/carrier_command.png',
            'assets/fonts/bitmapFonts/carrier_command.xml');
        this.load.image('montana', 'assets/sprites/montanas.png');
        this.load.image('pergaminoizquierda', 'assets/sprites/pergaminoizquierda.png');
        this.load.image('pergaminoderecha', 'assets/sprites/pergaminoderecha.png');
        this.load.image('pergaminocentro', 'assets/sprites/pergaminocentro.png');
        this.load.spritesheet('dudeintro','assets/sprites/dudeintro.png',32,32);

		// Nivel 1
		this.load.image('hero', 'assets/sprites/dude.png');
		this.load.image('pixel', 'assets/sprites/pixel_1.png');

		// Nivel 2
		this.load.image('bullet', 'assets/sprites/level3/bullet.png');
		this.load.image('enemyBullet', 'assets/sprites/level3/enemy-bullet.png');
		this.load.spritesheet('invader', 'assets/sprites/level3/invader32x32x4.png', 32, 32);
		this.load.image('ship', 'assets/sprites/level3/player.png');
		this.load.spritesheet('kaboom', 'assets/sprites/level3/explode.png', 128, 128);
		this.load.image('starfield', 'assets/sprites/level3/starfield.png');
		this.load.image('background', 'assets/sprites/level3/background2.png');

		// Nivel 3
		this.load.image('sky', 'assets/sky.png');
		this.load.image('ground', 'assets/platform.png');
		this.load.image('star', 'assets/star.png');
		this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
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
