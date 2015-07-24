var _game;

var _alpha1 = { alpha: 1 };
var _alpha0 = { alpha: 0 };

var _helper = {

	fadein: function (game, object, time, autostart) {
		return tween(game, object, _alpha1, time, autostart);
	},

	fadeout: function (game, object, time, autostart) {
		return tween(game, object, _alpha0, time, autostart);
	}

};

function tween (game, object, to, time, autostart) {
	var tween = game.add.tween(object).to(to, time);
	if (!!autostart) {
		tween.start();
	}
	return tween;
}

module.exports = _helper;
