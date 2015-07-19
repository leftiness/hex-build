var _game;
var _asset;
var _ready;

var Preloader = function (game) {
	_game = game;
}

Preloader.prototype = {

	preload: function () {
		_asset = _game.add.sprite(320, 240, 'preloader');
		_asset.anchor.setTo(0.5, 0.5);

		_game.load.onLoadComplete.addOnce(this.onLoadComplete, Preloader);
		_game.load.setPreloadSprite(_asset);

		_game.load.image('phaser', 'assets/gfx/phaser-logo-small.png');

		_game.load.audio('always-remembered', ['assets/sfx/always-remembered-low-quality.ogg']);
		_game.load.audio('rain', ['assets/sfx/dark-rainy-night-ambience-clipped-low-quality.ogg']);
	},

	create: function () {
		_asset.cropEnabled = false;
	},

	update: function () {
		if (!!_ready) {
			_game.state.start('Splash');
		}
	},

	onLoadComplete: function () {
		_ready = true;
	}

};

module.exports = Preloader;
