Player = function(game,sprite)
{
	Phaser.Sprite.call(this,game,game.world.width /2,game.world.height - 150,sprite,1);
	game.physics.arcade.enable(this);
	this.speedConst = 1;
	this.body.gravity.y = this.speedConst*this.speedConst*1000; 
	this.body.collideWorldBounds = true;
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function()
{
	var time = this.game.time.elapsed;
	var acceleration = this.speedConst*this.speedConst*0.8;
	if (this.body.velocity.x > 0)
	{
		this.body.velocity.x -= acceleration*this.game.time.elapsed;
		if (this.body.velocity.x < 0)
			this.body.velocity.x = 0;
	}
	if (this.body.velocity.x < 0)
	{
		this.body.velocity.x += acceleration*this.game.time.elapsed;
		if (this.body.velocity.x > 0)
			this.body.velocity.x = 0;
	}
}
Player.prototype.moveLeft= function()
{
	this.body.velocity.x = -this.speedConst*350;
	this.frame = 0;
}
Player.prototype.moveRight= function()
{
	this.body.velocity.x = this.speedConst*350;
	this.frame = 1;
}
Player.prototype.jump = function()
{
	this.body.velocity.y += -this.speedConst*600;
}
Player.prototype.updateSpeedConst = function(x)
{
	this.speedConst = x/10+1;
	this.body.gravity.y = this.speedConst*this.speedConst*1000;
}