var _game;

var Splash = function (game) {
	_game = game;
};

Splash.prototype = {

	create: function () {
		var x = _game.world.centerX;
		var y = _game.world.centerY;
		var logo = _game.add.sprite(x, y, 'phaser');
		var fadein = _game.add.tween(logo).to( {alpha: 1}, 2000);
		var fadeout = _game.add.tween(logo).to( {alpha: 0}, 1000);

		logo.anchor.setTo(0.5, 0.5);
		logo.alpha = 0;
		fadein.start();
		fadein.chain(fadeout);
		fadeout.delay(1000);

		fadeout.onComplete.add(this.onComplete, Splash);
		_game.input.onDown.add(this.onComplete, Splash);
	},

	onComplete: function () {
		_game.state.start('Menu');
	}

};

module.exports = Splash;
