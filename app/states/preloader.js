var _game;
var _asset;
var _ready;

var Preloader = function (game) {
	_asset = null;
	_ready = false;
	_game = game;
}

Preloader.prototype = {

	preload: function () {
		_asset = _game.add.sprite(320, 240, 'preloader');
		_asset.anchor.setTo(0.5, 0.5);

		_game.load.onLoadComplete.addOnce(this.onLoadComplete, Preloader);
		_game.load.setPreloadSprite(_asset);
		_game.load.image('phaser', 'assets/gfx/phaser-logo-small.png');

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
