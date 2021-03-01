var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver , gameOverImage ,restart , restartImage;
var invisibleGround , trex , ground;
var cloudsGroup , cloudImage;
var obstaclesGroup , obstacle1 , obstacle2 ,obstacle3 , obstacle4, obstacle5, obstacle6;
var score = 0;

//Animations and Images
var trex_running, trex_collided , groundImage;

function preload() {
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(displayWidth + 100 ,displayHeight-100);
  
  trex = createSprite(50,200,15,15);
  trex.addAnimation("trex_running", trex_running);
  trex.addAnimation("trex_collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(512,230,600,4);
  ground.addImage("ground", groundImage);
  ground.x = ground.width/2;
  
  ground.velocityX = -(6+3*score/100);
  
  invisibleGround = createSprite(300,235,600,4);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300,100,50,20);
  gameOver.addImage("gameOver" , gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  restart = createSprite(300,120,30,10);
  restart.addImage('restart' , restartImage);
  restart.visible = false;
  restart.scale = 0.5;
}

function draw() {
  background(180);
  
  text("score:" + score,100 ,100);
  if (gameState === PLAY) {
    
  
    score = score + 1;
  
    if (keyDown("Space")) {
      trex.velocityY = -15;
    }
    trex.velocityY = trex.velocityY + 1;
    trex.collide(invisibleGround);
  
    //Moving Ground
    if (ground.x < 200) {
      ground.x = ground.width/100;
    }
    spawnClouds();
    spawnObstacles();
    
    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }

  camera.position.x = displayWidth/2;
  camera.position.y = trex.y;
  
  if(mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,170,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    if (cloud.x < 0) {
      cloud.destroy;
    }
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
    console.log(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(600,215,10,40);
    obstacle.velocityX = -10;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
              default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    if (obstacle.x < 0) {
      obstacle.destroy
    }
    
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
}