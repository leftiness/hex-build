var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.state.add('Boot', require('./states/boot'));
game.state.add('Preloader', require('./states/preloader'));
game.state.add('Splash', require('./states/splash'));
game.state.add('Menu', require('./states/menu'));

game.state.start('Boot');
