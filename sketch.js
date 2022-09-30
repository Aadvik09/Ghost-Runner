var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gamestate = "play"

function preload(){

  //loading images
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //sound
  spookySound.loop();

  //Groups
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  //ghost
  ghost =  createSprite(200,200,50,50);
  ghost.scale = 0.3
  ghost.addImage("ghost", ghostImg);

  
}

function draw() {
  background(0);
  

  //gamestate play
  if (gameState = "play") {


    //commands (movement)
    if(keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }
    

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }


    //artificial gravity
    ghost.velocityY = ghost.velocityY + 0.8;

    if(tower.y > 400){
      tower.y = 300
    }

    spawnDoors();


    //collsions
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gamestate = "end"
    }
    drawSprites();
  }


  //end of games
  if (gamestate === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
  

 
}

function spawnDoors () {
  if (frameCount % 240 === 0) {

    //creating vars
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    
    //setting width + height
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    //random
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage(doorImg)
    climber.addImage(climberImg)

    //velocity
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //depth
    ghost.depth = door.depth;
    ghost.depth +=1;

    //lifetime
    door.lifetime = 800
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    //doors added to group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}


