var _game;
var _x;
var _y;
var _xOffset;
var _yOffset;
var _style;
var _menu;
var _self;

var MenuFactory = function (game, x, y, xOffset, yOffset, style) {
	_game = game;
	_x = x;
	_y = y;
	_xOffset = xOffset;
	_yOffset = yOffset;
	_style = style;
	_menu = _game.add.group();
	_self = this;
};

MenuFactory.prototype = {

	add: {

		text: function (text) {
			var i = _menu.total;
			var x;
			var y;
			var text;

			x = _x + (i * _xOffset);
			y = _y + (i * _yOffset);

			text = _game.add.text(x , y, text, _style);
			_menu.add(text);

			return text;
		},

		button: function (text, callback) {
			var text = _self.add.text(text);
			var hitbox = _game.add.sprite(text.x, text.y);

			hitbox.height = text.height;
			hitbox.width = text.width;
			hitbox.alpha = 0.5;
			hitbox.inputEnabled = true;
			hitbox.events.onInputDown.add(callback, hitbox);

			return hitbox;
		}

	}

};

module.exports = MenuFactory;
