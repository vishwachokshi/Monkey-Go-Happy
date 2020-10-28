var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey_stop,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,bg,bgImage;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_stop = loadAnimation("sprite_0.png");
  bgImage = loadImage("bg.jpg");
 
}

function setup() {
  
  bg = createSprite(250,250,10,10),
  bg.addImage(bgImage);
  bg.scale = 1.2;
  monkey = createSprite(70,360,15,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("stop",monkey_stop)
  monkey.scale = 0.175;
  ground = createSprite(250,475,500,10);
  ground.x = ground.width /2;
  ground.visible = false;
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("circle",60,0,200);
 monkey.debug = true;
  score = 0;
}
function draw() {
  createCanvas (500,500);
   fill("white");
  textSize (20);
  
  if (gameState === PLAY){
   bg.velocityX = -4;
  if (bg.x < 0){
  bg.x = bg.width/4.5; 
  }
    
   ground.velocityX =  -(4 + 3* score/100);
    if (ground.x < 0 ){
   ground.x = ground.width/2;
    }
    if(keyDown("space") && monkey.y > 325){
    monkey.velocityY = -12;
      }
    // adding gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    food();
  obstacles();
    
    if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 5;
  }
     if (obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  }
   if (gameState === END){
     ground.velocityX = 0;
    monkey.velocityY = 0;
     bg.velocityX =0;
     
     obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
     
     monkey.changeAnimation("stop",monkey_stop);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
   }
   bg.depth = score.depth;
   score.depth = score.depth + 1;
  monkey.collide(ground);
  drawSprites();
  text("Score : "+ score,400,50);
}
function food (){
  if (frameCount % 80 === 0){
  banana = createSprite(500,Math.round(random(180,240)),10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.15;
  banana.velocityX = -5;
  banana.lifetime = 600;
  foodGroup.add(banana);
  }
}
function obstacles(){
  if (frameCount % 300 === 0){
  obstacle = createSprite(Math.round(random(210,400)),450,20,10);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -5;
  obstacle.lifetime = 600;
  obstacleGroup.add(obstacle);
  }
}