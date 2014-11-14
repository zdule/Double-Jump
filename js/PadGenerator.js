PadGenerator = function()
{
	this.updateGenerator();
}

PadGenerator.prototype.updateGenerator = function()
{
	console.log('hi')
	if (Math.random() > 0.5)
		this.currentGenereator = new BasicGenerator(30 + 20*Math.random(),this);
	else
		this.currentGenereator = new LongGenerator(5 + 10*Math.random(),this);
}

PadGenerator.prototype.top = function() 
{
	return this.currentGenereator.top();
}

PadGenerator.prototype.next = function()
{
	return this.currentGenereator.next();
}
//=============================================================
BasicGenerator = function(x,parent)
{
	this.life = x;
	this.parent = parent;
	this.current = this.next();
}
BasicGenerator.prototype.next = function()
{
	this.life--;
	if (Math.random() > 0.95)
		this.current = 160 + 25*Math.random();
	else
		this.current =  70 + 15*Math.random();
	if(this.life <= 0)
		this.parent.updateGenerator();
	return this.current;
}
BasicGenerator.prototype.top = function()
{
	return this.current;
}
//===================================================
LongGenerator = function(x,parent)
{
	this.life = x;
	this.parent = parent;
	this.current = this.next();
}
LongGenerator.prototype.next = function()
{
	this.life--;
	this.current =  160 + 25*Math.random();
	if(this.life <= 0)
		this.parent.updateGenerator();
	return this.current;
}
LongGenerator.prototype.top = function()
{
	return this.current;
}
