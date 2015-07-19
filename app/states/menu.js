var _game;
var _text;

var Menu = function (game) {
	_game = game;
	_text = null;
}

Menu.prototype = {

	create: function () {
			var x = _game.width / 2;
			var y = _game.height / 2;
			var style = { font: "65px Caudex-Regular", fill: "#ffffff", align: "center"};

			_text = _game.add.text(x - 300, y - 200, "Hex", style);
	}
}

module.exports = Menu;
