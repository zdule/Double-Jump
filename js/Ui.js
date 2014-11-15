Ui = function() {}
Ui.prototype = Object.create(Phaser.State.prototype);
Ui.prototype.constructor = Ui;
Ui.prototype.preload = function()
{
	this.game.load.image('sky', 'assets/sky.png');
	this.game.load.image('TwoPlayer', 'assets/btns/TwoPlayer.png');
	this.game.load.image('SinglePlayer', 'assets/btns/SinglePlayer.png');
	this.game.load.image('logo', 'assets/Logo.png');
}
Ui.prototype.create = function()
{
	this.game.add.sprite(0, 0, 'sky');
	this.game.add.sprite(50,0,'logo');
	this.button = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY,'TwoPlayer',function(){this.game.state.start('TwoPlayer');});
	this.button1 = this.game.add.button(this.game.world.centerX-100,this.game.world.centerY+50,'SinglePlayer',function(){this.game.state.start('SinglePlayer');});
}
Ui.prototype.update = function()
{

}