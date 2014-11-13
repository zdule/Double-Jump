Player = function(game,sprite)
{
	Phaser.Sprite.call(this,game,game.world.width /2,game.world.height - 150,sprite,1);
	game.physics.arcade.enable(this);
	this.body.gravity.y = 1000; 
	this.body.collideWorldBounds = true;
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.moveLeft= function()
{
	this.body.velocity.x = -350;
	this.frame = 0;
}
Player.prototype.moveRight= function()
{
	this.body.velocity.x = 350;
	this.frame = 1;
}
Player.prototype.jump = function()
{
	this.body.velocity.y += -600;
}