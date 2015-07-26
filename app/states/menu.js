var _menuBuilder = require('../util/menuBuilder');
var AnimationHelper = require('../util/animationHelper');

var _game;
var _music;
var _timer;
var _self;

var _x;
var _y;
var _style;

var Menu = function (game) {
	_game = game;
	_self = this;
	_x = game.width;
	_y = game.height;
	_style = {
		font: '24px Caudex-Regular',
		fill: '#000000'
	};
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
		var graphics = _game.add.graphics(0, 0);
		var rec;
		var helper = AnimationHelper(_game);

		_game.stage.backgroundColor = '#ffffff';
		graphics.beginFill('#000000', 1);
		rec = graphics.drawRect(0, 0, _x, _y);
		helper.fadeout(rec, 1000, true);
	},

	drawTitle: function () {
		var style = {
			font: '120px Caudex-Regular',
			fill: '#000000'
		};
		var title = _game.add.text(_x - 700, _y - 500, 'Hex', style);
	},

	drawMainMenu: function () {
		var menu = _game.add.group();
		var x = _x - 200;
		var y = _y - 200;
		var builder = _menuBuilder.newInstance(_game, x, y, 0, 30, _style, menu);
		var mainMenu = builder.add.menu();
		var newMenu = builder.add.submenu('New', mainMenu, menu);
		var loadMenu = builder.add.submenu('Load', mainMenu, menu);
		var optionsMenu = builder.add.submenu('Options', mainMenu, menu);
		var once;

		builder.add.submenu('Gameplay', optionsMenu, menu);
		builder.add.submenu('Video', optionsMenu, menu);
		builder.add.submenu('Audio', optionsMenu, menu);

		menu.bringToTop(mainMenu);

		function fadeMainMenu () {
			if (!!!once) {
				once = true;
				mainMenu.enter(500);
			}
		}

		_game.input.onDown.addOnce(fadeMainMenu);
		_timer.add(5500, fadeMainMenu);
	},

	confirmNew: function () {
			alert('TODO New');
	}

};

module.exports = Menu;
