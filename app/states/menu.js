var _menuBuilder = require('../util/menuBuilder');
var _animationHelper = require('../util/animationHelper');

var _game;
var _music;
var _menu;
var _timer;
var _self;

var Menu = function (game) {
	_game = game;
	_self = this;
}

Menu.prototype = {

	create: function () {
			_timer = _game.time.create(false);
			_timer.start();
			_music = _game.add.audio('always-remembered');
			_self.fadeFromBlack();
			_self.drawTitle();
			_self.drawMainMenu();
	},

	update: function () {
		_music.onDecoded.addOnce(_self.startMusicAndRain);
	},

	startMusicAndRain: function () {
		var rain = _game.add.audio('rain', 0.5);

		_timer.add(5000, function () {
			_music.play();
		});

		_timer.loop(100000, function () {
			if (!_music.isPlaying) {
				_music.play();
			}
			var loop = _game.add.audio('rain', 0.5);
			loop.play();
		});

		rain.play();
	},

	fadeFromBlack: function () {
		var x = _game.width;
		var y = _game.height;
		var graphics = _game.add.graphics(0, 0);
		var rec;

		_game.stage.backgroundColor = '#ffffff';
		graphics.beginFill('#000000', 1);
		rec = graphics.drawRect(0, 0, x, y);
		_animationHelper.fadeout(_game, rec, 1000, true);
	},

	drawTitle: function () {
		var x = _game.width;
		var y = _game.height;
		var style = {
			font: '120px Caudex-Regular',
			fill: '#000000',
		};
		var title = _game.add.text(x - 700, y - 500, 'Hex', style);
	},

	drawMainMenu: function () {
		var x = _game.width;
		var y = _game.height;
		var style = {
			font: '24px Caudex-Regular',
			fill: '#000000',
		};

		_menu = _menuBuilder.create(_game, x - 200, y - 200, 0, 30, style);
		_menu.alpha = 0;

		_menuBuilder.add.button('New', function () {
			alert('TODO New');
		});
		_menuBuilder.add.button('Load', function () {
			alert('TODO Load');
		});
		_menuBuilder.add.button('Options', function () {
			alert('TODO Options');
		});

		_timer.add(5500, function () {
			_animationHelper.fadein(_game, _menu, 500, true);
		});
	}

}

module.exports = Menu;
