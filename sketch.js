var bg;
var pc;
var pcImage;
var obstacle,obstacleImg,obstaclesGroup;
var gameState = "play";
var score = 0;

function preload(){
  bg = loadImage("ocean.gif");
  pcImage = loadImage("narwhalPC.png");
  obstacleImg = loadImage("narwhalNPC.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  pc = createSprite(100,200);
  pc.addImage(pcImage);
  //pc.debug = true;
  pc.setCollider("rectangle", 0, 0, 100, 40)
  obstaclesGroup = createGroup();
}

function draw(){
  background("white");
  image(bg, 0, 0, width, height);
  // pc.x =mouseX;
  fill("black");
  stroke("black");
  textSize(40);
  text("Score: "+score,windowWidth - 800, 250);
  //text.position(windowWidth - 800, 250);
  //text.style('font-size', '40px');
  if (gameState == "play"){
    pc.y = mouseY;
    spawnObstacles();
    pc.bounce(obstaclesGroup,fishHit);
  }else if(gameState == "end"){
    obstaclesGroup.setVelocityXEach(0);
  }
  drawSprites();
}

function spawnObstacles(){
  if(frameCount % 50 === 0) {
    obstacle = createSprite(windowWidth,Math.round(random(50,windowHeight - 50)));
    obstacle.addImage(obstacleImg);
    //obstacle.debug = true;
    obstacle.setCollider("rectangle", 30, 0, 100, 40)
    obstacle.velocityX = -20;
    obstaclesGroup.add(obstacle);
  }
}

function fishHit(pc,obstacle){
  obstacle.remove();
  pc.velocityX = 0;
  pc.x = 100;
  score = score + 1;
}