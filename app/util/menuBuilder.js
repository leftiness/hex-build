var _game;
var _x;
var _y;
var _xOffset;
var _yOffset;
var _style;

var _builder = {

	create: function (game, x, y, xOffset, yOffset, style) {
		var menu = game.add.group();

		_game = game;
		_x = x;
		_y = y;
		_xOffset = xOffset;
		_yOffset = yOffset;
		_style = style;

		return menu;
	},

	add: {

		text: function (value, menu) {
			var i = menu.total;
			var x;
			var y;
			var text;

			x = _x + (i * _xOffset);
			y = _y + (i * _yOffset);

			text = _game.add.text(x , y, value, _style);
			menu.add(text);

			return text;
		},

		button: function (value, callback, menu) {
			var text = _builder.add.text(value, menu);
			var hitbox = _game.add.sprite(text.x, text.y);
			var button = _game.add.group();

			hitbox.height = text.height;
			hitbox.width = text.width;
			hitbox.alpha = 0.5;
			hitbox.inputEnabled = true;
			hitbox.events.onInputDown.add(callback, hitbox);

			button.add(text);
			button.add(hitbox);
			menu.add(button);

			return button;
		}

	}

};

module.exports = _builder;
