var backImage,backgr;
var player, player_running, player_collided;
var ground,ground_img;
var banana, banana_img;
var bananasGroup;
var over, over_img;
var stone, stone_img;
var stonesGroup;
var reset, reset_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  player_collided = loadAnimation("Monkey_01.png");
  banana_img = loadImage ("banana.png");
  stone_img = loadImage("stone.png");
  over_img = loadImage("gameOver.png");
  reset_img = loadImage("restart.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("collided",player_collided);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  over = createSprite(380,160,30,40);
  over.addImage(over_img);

  reset = createSprite(380,230,30,40);
  reset.addImage(reset_img);
  reset.scale = 0.2;

  bananasGroup = new Group();
  stonesGroup = new Group();

}

function draw() { 
  background(0);

 // backgr.add.text(750,30,"score");

  if(gameState===PLAY){
    player.changeAnimation("Running",player_running);

  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    spawnBananas();
    spawnStones();

    over.visible = false;
    reset.visible = false;
  
    player.collide(ground);

    if (stonesGroup.isTouching(player)){
      gameState = END;
    }

  }

  else if (gameState == END){
    player.collide(ground);
    player.changeAnimation("collided",player_collided);
    player.velocityY = player.velocityY + 0.8;

    bananasGroup.setLifetimeEach(0);
    stonesGroup.setLifetimeEach(-1);
    stonesGroup.setVelocityXEach(0);

    backgr.velocityX = 0;

    over.visible = true;
    reset.visible = true;

    if (mousePressedOver(reset)){
      player.collide(ground);
      stonesGroup.setLifetimeEach(0);
      player.scale = 0.1;
      backgr.velocityX = -4;
      gameState = PLAY;
      score = 0;
    }
  }

  if (bananasGroup.isTouching(player)){
    score = score+1;
    bananasGroup.setLifetimeEach(0);
    player.scale = player.scale + 0.02;
  }
   
  drawSprites();

  fill("Skyblue");
  textSize(20);
  text("Score = "+score,700,30);
 
}

function spawnBananas(){
  if (frameCount% 50 == 0){
    banana = createSprite(800,random(50,250),30,40);
    banana.addImage(banana_img);
    banana.scale = 0.07;
    banana.velocityX = -5;
    banana.lifetime = 160;
    bananasGroup.add(banana);
  }
}

function spawnStones(){
  if (frameCount% 80 == 0){
    stone = createSprite(800,320,30,40);
    stone.addImage(stone_img);
    stone.scale = 0.1;
    stone.velocityX = -5;
    stone.lifetime = 160;
    stonesGroup.add(stone);
  }
}


