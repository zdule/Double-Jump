TwoPlayer = function(game){}
TwoPlayer.prototype = Object.create(Phaser.State.prototype);
TwoPlayer.prototype.constructor = TwoPlayer;
TwoPlayer.prototype.preload = function()
{
	this.game.load.image('sky', 'assets/sky.png');
	this.game.load.image('ground', 'assets/platform1.png');
	this.game.load.spritesheet('player1', 'assets/dude1.png', 32, 48);
	this.game.load.spritesheet('player2', 'assets/baddie1.png', 32, 32);
}
TwoPlayer.prototype.create = function()
{
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.cursors = this.game.input.keyboard.createCursorKeys();
	this.game.add.sprite(0, 0, 'sky');
	this.platforms = this.game.add.group();
	this.platforms.enableBody = true;
	var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
	ground.scale.setTo(10, 10);
	ground.body.immovable = true;
	for (var i = 0; i < 8; i++)
	{
		var ledge = this.platforms.create(0, 450- i*85, 'ground');
		ledge.x = Math.random()*(this.game.world.width-ledge.width);
		ledge.body.immovable = true;
		this.minPad = 450- i*85;
	}
	this.players = this.game.add.group();
	this.players.enableBody = true;
	this.player1 = new Player(this.game,'player1');
	this.player2 = new Player(this.game,'player2');
	this.players.add(this.player1);
	this.players.add(this.player2);
	this.score = 0;
	this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
	this.scoreText.text = "Score: "+this.score;
}
TwoPlayer.prototype.update = function() 
{
	this.game.physics.arcade.collide(this.players, this.platforms,null,function (pl,pt){return pl.y+pl.height < pt.y;});
	this.player1.body.velocity.x *= 0.9;
	this.player2.body.velocity.x *= 0.9;

	if (this.cursors.left.isDown)
		this.player1.moveLeft();
	if (this.cursors.right.isDown)
		this.player1.moveRight();
	if (this.player1.body.touching.down)
		this.player1.jump();

	if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
		this.player2.moveLeft();
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
		this.player2.moveRight();
	if (this.player2.body.touching.down)
		this.player2.jump();

	var p = this.player1;
	if (this.player2.body.y < this.player1.body.y)
		p = this.player2;
	if (p.body.y < 100)
		this.moveAll(100-p.body.y);

	var speed = Math.sqrt(this.score)/5;
	if (speed > 3) speed = 3
	this.moveAll(speed);
	var p = this.player1;
	if (this.player2.body.y > this.player1.body.y)
		p = this.player2;
	if (p.body.y >= this.game.world.height-p.height)
	{
		GlobScore = this.score;
		GlobGameMode = 'Mp';
		this.game.state.start('HighScores');
	}
}
TwoPlayer.prototype.moveAll= function(dx)
{
	
	this.platforms.forEach(function(item){item.body.y += dx; if (item.body.y > this.game.world.height) item.kill();},this);
	this.score += dx/100;
	this.scoreText.text = 'Score: ' + Math.round(this.score);
	this.minPad += dx;
	while (this.minPad > 0)
	{
		var ledge = this.platforms.create(0, this.minPad-85, 'ground');
		ledge.body.x = Math.random()*(this.game.world.width-ledge.width);
		ledge.body.immovable = true;
		this.minPad -= 85;
	}
	this.player1.body.y +=dx;
	this.player2.body.y += dx;
}