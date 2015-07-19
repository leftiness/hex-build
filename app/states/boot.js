var _game;

var Boot = function (game) {
	_game = game;
};

Boot.prototype = {

	preload: function () {
		_game.load.image('preloader', 'assets/gfx/preloader.gif');
	},

	create: function () {

		_game.input.maxPointers = 1;

		if (_game.device.desktop) {
			_game.stage.scale.pageAlignHorizontally = true;
		} else {
			_game.scale = _game.scale;
			_game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			_game.scale.minWidth =	480;
			_game.scale.minHeight = 260;
			_game.scale.maxWidth = 640;
			_game.scale.maxHeight = 480;
			_game.scale.forceLandscape = true;
			_game.scale.pageAlignHorizontally = true;
			_game.scale.setScreenSize(true);
		}

		_game.state.start('Preloader');
	}

};

module.exports = Boot;
