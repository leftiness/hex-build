var _game;
var _x;
var _y;
var _xOffset;
var _yOffset;
var _style;
var _menu;
var _self;

var _builder = {

	create: function (game, x, y, xOffset, yOffset, style) {
		_game = game;
		_x = x;
		_y = y;
		_xOffset = xOffset;
		_yOffset = yOffset;
		_style = style;
		_menu = _game.add.group();
		_self = this;
		return _menu;
	},

	add: {

		text: function (value) {
			var i = _menu.total;
			var x;
			var y;
			var text;

			x = _x + (i * _xOffset);
			y = _y + (i * _yOffset);

			text = _game.add.text(x , y, value, _style);
			_menu.add(text);

			return text;
		},

		button: function (value, callback) {
			var text = _self.add.text(value);
			var hitbox = _game.add.sprite(text.x, text.y);
			var button = _game.add.group();

			hitbox.height = text.height;
			hitbox.width = text.width;
			hitbox.alpha = 0.5;
			hitbox.inputEnabled = true;
			hitbox.events.onInputDown.add(callback, hitbox);

			button.add(text);
			button.add(hitbox);
			_menu.add(button);

			return button;
		}

	}

};

module.exports = _builder;
