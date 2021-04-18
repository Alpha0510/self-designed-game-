function preload(){
  ak47img=loadImage("Untitled.png")
  buildingsimg=loadImage("1.jpg")
  player1img=loadImage("Untitled1.png")
  player1gun=loadImage("145.png")
  enemyimg=loadImage("111.png")

}
function setup() {
  createCanvas(displayWidth-20, displayHeight-150);
  
  ak47 = createSprite(900, 480,10,10);
  ak47.addImage(ak47img);
  ak47.scale=0.2;
  ak47.debug=true
  ak47.setCollider("circle",0,0,100);

  player1 = createSprite(100,100,200,100)
  player1.addImage(player1img);
  player1.scale=0.3;
  player1.setCollider("circle",0,0,100);
  player1.debug=true

   enemygroup=createGroup()
   bulletgroup=createGroup()

   gamestate=0

   score=0
   
}

function draw() {
  background(buildingsimg);  
  //image(buildingsimg,0,0,displayWidth-20, displayHeight-150)
textSize(20)
text("score:"+score,100,100)

  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+10);
  }

  if(player1.isTouching(ak47)){
    
    gamestate=1
  }
  if(gamestate===1){
    player1.addImage(player1gun);
    ak47.visible=false
    if(keyDown("space")){
      createBullet(player1.x,player1.y)
        }
  }

  spawnenemy();
if(enemygroup.isTouching(player1)){
     gamestate=2   
}

  

  if(bulletgroup.isTouching(enemygroup)){
    console.log("bye")
    //gamestate=2
    enemygroup.destroyEach()
    score++
  }
  if(gamestate===2){
    background(0)
    player1.visible=false
    textSize(100)
    text("you lose",displayWidth/2-180,displayHeight/2-180)
    ak47.visible=false
    enemy.visible=false
  }
  drawSprites();
}
function writePosition(x,y){
  player1.x=player1.x+x
  player1.y=player1.y+y
}

function spawnenemy() {
  if(frameCount % 60 === 0) {
    var rand = random(0,700);
    var enemy = createSprite(1500,rand,10,40);
    enemy.velocityX =(-6);
    enemy.lifetime = 200;
    enemy.addImage(enemyimg)
  enemy.scale=0.19;
  enemy.debug=true
enemy.setCollider("circle",0,0,300)
  enemygroup.add(enemy);
  }
}

function createBullet(x,y){
  if(frameCount % 10 === 0){
    beam = createSprite(190,355,20,20);
    beam.shapeColor="red"
    beam.x=x
    beam.y=y
    beam.velocityX=6
    bulletgroup.add(beam);
  }
}