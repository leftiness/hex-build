var _alpha1 = { alpha: 1 };
var _alpha0 = { alpha: 0 };

function AnimationHelper (game) {
	var helper = {

		fadein: function (object, time, autostart) {
			return tween(object, _alpha1, time, autostart);
		},

		fadeout: function (object, time, autostart) {
			return tween(object, _alpha0, time, autostart);
		}

	};

	function tween (object, to, time, autostart) {
		var tween = game.add.tween(object).to(to, time);
		if (!!autostart) {
			tween.start();
		}
		return tween;
	}

	return helper;

}

module.exports = AnimationHelper;
