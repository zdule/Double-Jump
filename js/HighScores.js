HighScores = function() {}
HighScores.prototype = Object.create(Phaser.State.prototype);
HighScores.prototype.constructor = HighScores;
HighScores.prototype.preload = function()
{
	this.game.load.image('sky', 'assets/sky.png');
	this.game.load.image('Menu', 'assets/btns/Menu.png');
	this.game.load.image('Retry', 'assets/btns/Retry.png');
}
HighScores.prototype.create = function()
{
	this.game.add.sprite(0, 0, 'sky');
	var ScoreHigh = Math.round(GlobScore);
	this.scoreText = this.game.add.text(150, 32, 'Game over!', { fontSize: '128px', fill: '#000' });
	this.scoreText = this.game.add.text(16, 120, 'Score: '+ScoreHigh, { fontSize: '64px', fill: '#000' });
	this.Txt = this.game.add.text(95, 520, 'Press ENTER to Retry!', { font: 'italic 20px Arial'  });
	this.button = this.game.add.button(2,this.game.world.height-50,'Menu',function(){this.game.state.start('Screen');});
	this.button1 = this.game.add.button(201,this.game.world.height-50,'Retry',this.click);
}
HighScores.prototype.click = function()
{
	if (GlobGameMode == 'Sp')
		this.game.state.start('SinglePlayer');
	else if (GlobGameMode == 'Mp')
		this.game.state.start('TwoPlayer');
	else
		this.game.state.start('Screen')
}
HighScores.prototype.update = function()
{
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER))
		this.click();
}