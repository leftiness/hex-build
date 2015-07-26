var _alpha1 = { alpha: 1 };
var _alpha0 = { alpha: 0 };

function AnimationHelper (game) {
	var helper = {};
	helper.sprite = {};
	helper.state = {};

	helper.sprite.fadein = function (object, time, autostart) {
		return tween(object, _alpha1, time, autostart);
	};

	helper.sprite.fadeout = function (object, time, autostart) {
		return tween(object, _alpha0, time, autostart);
	};

	helper.state.fadeFromBlack = function (time, autostart) {
		var graphics = game.add.graphics(0, 0);
		var rec;

		graphics.beginFill('#000000', 1);
		rec = graphics.drawRect(0, 0, game.width, game.height);
		return helper.sprite.fadeout(rec, 1000, true);
	};

	helper.state.fadeToBlack = function (time, autostart) {
		var graphics = game.add.graphics(0, 0);
		var rec;

		graphics.beginFill('#000000', 1);
		rec = graphics.drawRect(0, 0, game.width, game.height);
		rec.alpha = 0;
		return helper.sprite.fadein(rec, 1000, true);
	};

	function tween (object, to, time, autostart) {
		return game.add.tween(object).to(to, time, Phaser.Easing.default, !!autostart);
	}

	return helper;

}

module.exports = AnimationHelper;
