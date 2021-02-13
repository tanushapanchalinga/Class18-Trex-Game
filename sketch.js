var gamestate = "play"
var play = 1
var end = 0
var score = 0
var cloudsgroup,obstaclegroup

var trex, trexrunning, trexcolliding, invisibleground ;
var ground, groundimg;
var cloudimg, cloud;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameover, gameoverimg, restartimg, restart;

function preload() {
  trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexcolliding = loadImage("trex_collided.png");
  groundimg = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png")
}

function reset(){
  gamestate = "play";
  gameover.visible = false;
  restart.visible = false;
  obstaclegroup.destroyEach();
  cloudsgroup.destroyEach();
  score = 0
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  trex = createSprite(50, height-30, 20, 50);
  trex.addAnimation("running", trexrunning);
  trex.addAnimation("collide", trexcolliding)
  trex.scale = 0.5;
  trex.x = 50;

  invisibleground = createSprite(width/2, height-30, width, 10)
  invisibleground.visible = false;
  
  cloudsgroup = createGroup();
  obstaclegroup = createGroup();

  ground = createSprite(width/2, height-50, width, 20);
  ground.addImage("ground", groundimg);
  ground.x = ground.width / 2
  ground.velocityX = -2;
  
  trex.setCollider("circle",0,0,40);
  trex.debug = "true";
  
  gameover = createSprite(width/2,height/2-40);
  restart = createSprite(width/2,height/2);
  gameover.addImage(gameoverimg);
  restart.addImage(restartimg);
  gameover.scale = 0.5;
  restart.scale = 0.5;
}

function draw() {
  background(180);
  text("Score: "+score,500,50);
  
  if(gamestate === "play"){
    
    trex.changeAnimation("running",trexrunning)
    
    score = score+Math.round(frameCount/60)
    
    if(touches.length>0||keyDown("space")&&trex.y>=height-120){
      trex.velocityY = -10;
      touches = []
    }
    
  gameover.visible = false
  restart.visible = false
    
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  trex.velocityY = trex.velocityY + 0.8;

  spawnObstacles();
  spawnClouds();
    
  if(obstaclegroup.isTouching(trex)){
    gamestate = end;
  }
  }
  else if(gamestate === end){
    
    gameover.visible = true 
    restart.visible = true 
    ground.velocityX= 0;
    obstaclegroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    trex.changeAnimation("collide",trexcolliding)

    if(touches.length>0||keyDown("space")){
      reset();
      touches = [];
    }
    
  }
  trex.collide(invisibleground)

  drawSprites()
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(width+30, height-200, 40, 10)
    cloud.addImage(cloudimg);
    cloud.scale = 0.4;
    cloud.velocityX = -5;
    cloud.y = Math.round(random(10, 60));
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    cloud.lifetime = 200
    cloudsgroup.add(cloud)
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400, height-50, 10, 40);
    obstacle.velocityX = -6;
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle)

    var selectsprites = Math.round(random(1, 6))
    switch (selectsprites) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }
  }
}