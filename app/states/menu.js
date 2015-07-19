var _game;
var _text;
var _music;
var _rain;
var _timer;

var Menu = function (game) {
	_game = game;
}

Menu.prototype = {

	create: function () {
			var x = _game.width;
			var y = _game.height;
			var style = { font: '120px Caudex-Regular', fill: '#000000', align: 'center'};
			var graphics = _game.add.graphics(0, 0);
			var rec;

			_game.stage.backgroundColor = '#ffffff';
			graphics.beginFill('#000000', 1);
			rec = graphics.drawRect(0, 0, x, y);
			_game.add.tween(rec).to({ alpha: 0}, 1000).start();

			_timer = _game.time.create(false);
			_text = _game.add.text(x - 700, y - 500, 'Hex', style);
			_music = _game.add.audio('always-remembered');
			_rain = _game.add.audio('rain', 0.5);
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
