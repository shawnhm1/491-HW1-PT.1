var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}
Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function ()
{
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function ()
{
};

function KisameOne(game, spritesheet)
{
    this.animation = new Animation(spritesheet, 84.6, 75, 5, 0.08, 5, true, 1);
    this.x = 0;
    this.y = 160;
    this.speed = 200;
    this.game = game;
    this.ctx = game.ctx;
}

KisameOne.prototype.draw = function ()
{
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

KisameOne.prototype.update = function ()
{
   if (this.animation.elapsedTime < this.animation.totalTime)
        this.x += this.game.clockTick * this.speed;
    if (this.x > 763) this.x = -230;
}

AM.queueDownload("./img/Megman prototype.png");
AM.queueDownload("./img/Kisame_Run.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Megman prototype.png")));
    gameEngine.addEntity(new KisameOne(gameEngine, AM.getAsset("./img/Kisame_Run.png")))
    
  
    console.log("All Done!");
});