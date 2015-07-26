var AnimationHelper = require('./animationHelper');

function MenuBuilder(game, x, y, xOffset, yOffset, style, group) {
	var builder = {};
	builder.add = {};

	builder.add.text = function (value, menu) {
		var i = menu.total;
		var xPos = x + (i * xOffset);
		var yPos = y + (i * yOffset);
		var text = game.add.text(xPos, yPos, value, style);
		menu.add(text);

		return text;
	};

	builder.add.button = function (value, callback, menu) {
		var text = builder.add.text(value, menu);
		var hitbox = game.add.sprite(text.x, text.y);
		var button = game.add.group();
		var selected = game.add.text(text.x - 20, text.y, '|', style);

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
	};

	builder.add.menu = function () {
		var menu = game.add.group();
		var helper = AnimationHelper(game);

		menu.alpha = 0;
		menu.hitboxes = [];
		menu.group = group;

		group.add(menu);

		menu.enter = function (time) {
			time = time || 200;
			helper.sprite.fadein(menu, time, true);
			menu.hitboxes.forEach(function (hitbox) {
				hitbox.inputEnabled = true;
			});
			menu.group.bringToTop(menu);
		};

		menu.exit = function (time) {
			time = time || 200;
			helper.sprite.fadeout(menu, time, true);
			menu.hitboxes.forEach(function (hitbox) {
				hitbox.inputEnabled = false;
			});
			menu.group.sendToBack(menu);
		};

		return menu;
	};

	builder.add.submenu = function (value, parent, group) {
		var sub = builder.add.menu();
		var button = builder.add.button(value, function () {
			sub.enter();
			parent.exit();
		}, parent);

		builder.add.button('Return', function () {
			parent.enter();
			sub.exit();
		}, sub);

		return sub;
	};

	return builder;

}

module.exports = MenuBuilder;
