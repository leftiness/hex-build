var AnimationHelper = require('./animationHelper');

var _game;
var _x;
var _y;
var _xOffset;
var _yOffset;
var _style;
var _group;

var _builder = {

	newInstance: function (game, x, y, xOffset, yOffset, style, group) {
		_game = game;
		_x = x;
		_y = y;
		_xOffset = xOffset;
		_yOffset = yOffset;
		_style = style;
		_group = group;

		return _builder;
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
			var selected = _game.add.text(text.x - 20, text.y, '|', _style);

			selected.alpha = 0;

			hitbox.height = text.height;
			hitbox.width = text.width;
			hitbox.alpha = 0.5;
			hitbox.events.onInputDown.add(callback);
			hitbox.events.onInputOver.add(function () {
				selected.alpha = 1;
			});
			hitbox.events.onInputOut.add(function () {
				selected.alpha = 0;
			});

			button.add(text);
			button.add(hitbox);

			menu.add(button);
			menu.hitboxes.push(hitbox);

			return button;
		},

		menu: function () {
			var menu = _game.add.group();
			var helper = AnimationHelper(_game);

			menu.alpha = 0;
			menu.hitboxes = [];
			menu.group = _group;

			_group.add(menu);

			menu.enter = function (time) {
				time = time || 200;
				helper.fadein(menu, time, true);
				menu.hitboxes.forEach(function (hitbox) {
					hitbox.inputEnabled = true;
				});
				menu.group.bringToTop(menu);
			};

			menu.exit = function (time) {
				time = time || 200;
				helper.fadeout(menu, time, true);
				menu.hitboxes.forEach(function (hitbox) {
					hitbox.inputEnabled = false;
				});
				menu.group.sendToBack(menu);
			};

			return menu;
		},

		submenu: function (value, parent, group) {
			var sub = _builder.add.menu();
			var button = _builder.add.button(value, function () {
				sub.enter();
				parent.exit();
			}, parent);

			_builder.add.button('Return', function () {
				parent.enter();
				sub.exit();
			}, sub);

			return sub;
		}

	}

};

module.exports = _builder;
