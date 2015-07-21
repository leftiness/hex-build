var _menuFactory = require('../util/menuFactory');

var _game;
var _title;
var _music;
var _rain;
var _timer;
var _menu;

var Menu = function (game) {
	_game = game;
}

Menu.prototype = {

	create: function () {
			var x = _game.width;
			var y = _game.height;
			var titleStyle = {
				font: '120px Caudex-Regular',
				fill: '#000000',
			};
			var itemStyle = {
				font: '24px Caudex-Regular',
				fill: '#000000',
			};
			var graphics = _game.add.graphics(0, 0);
			var rec;

			_game.stage.backgroundColor = '#ffffff';
			graphics.beginFill('#000000', 1);
			rec = graphics.drawRect(0, 0, x, y);
			_game.add.tween(rec).to({ alpha: 0}, 1000).start();

			_timer = _game.time.create(false);
			_title = _game.add.text(x - 700, y - 500, 'Hex', titleStyle);
			_music = _game.add.audio('always-remembered');
			_rain = _game.add.audio('rain', 0.5);

			_menu = new _menuFactory(_game, x - 200, y - 200, 0, 30, itemStyle);
			_menu.add.text('Hello');
			_menu.add.text('Goodbye');
			_menu.add.text('lol');
			_menu.add.button('button', function () {
				console.log('button');
			});
	},

	update: function () {
		_music.onDecoded.addOnce(this.onDecoded, Menu);
	},

	onDecoded: function () {
		_timer.add(5000, function () {
			_music.play();
		});

		_timer.loop(100000, function () {
			if (!_music.isPlaying) {
				_music.play();
			}
			var _loop = _game.add.audio('rain', 0.5);
			_loop.play();
		});

		_timer.start();
		_rain.play();
	}

}

module.exports = Menu;
