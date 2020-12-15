//creating global variables
var backGround,ground;
var landImage,land;
var player,playerImage;
var platformGroup;
var landGroup;
var starGroup;
var starImage;
var PLAY,END;
var gameState="PLAY";
var score=0;
var font;
var restart,restartImage;
var sound,jump,over;

function preload(){
  //loading images
  
 backGround=loadImage("ground3.jpg");
 landImage=loadImage("land.png");
  
 playerAnimation=loadAnimation("jump00.png","jump01.png","jump02.png","jump03.png","jump04.png","jump05.png","jump06.png","jump07.png","jump08.png","jump09.png");

 playerrAnimation=loadAnimation("run00.png","run01.png","run02.png","run03.png","run04.png","run05.png","run06.png","run07.png","run08.png","run09.png");

 starImage=loadImage("star.gif");
 font=loadFont("font.TTF");
 restartImage=loadImage("restart.png");
   
 jump=loadSound("jump.mp3");
 over=loadSound("over.wav");
 game=loadSound("game.mp3")
   
}

function setup() {
  //creating canvas
  createCanvas(windowWidth, 450);
  //creating background
  ground=createSprite(windowWidth/2,220);
  ground.addImage(backGround);
  ground.velocityX=-2;
  ground.scale=0.8;
 
 
  //creating player
  player=createSprite(90,200);
  player.addAnimation("running",playerrAnimation);
  player.addAnimation("jumping",playerAnimation);
  player.scale=2;
  player.frameDelay=1;
  player.setCollider("circle",0,0,20);
  //creating groups
  platformGroup=createGroup();
  landGroup=createGroup();
  starGroup=createGroup(); 
  //restart button
  restart=createSprite(windowWidth/2,250);
  restart.addImage(restartImage);
  restart.scale=0.3;
  //playing sound 
  game.loop()
  game.setVolume(0.05)
 
}

function draw() {
  //backGround colour
  background("black");
 
  //gameStates
  if(gameState==="PLAY"){
     landArea();
     enemy();
     restart.visible=false;
     player.collide(platformGroup);
    
    //infinite background effect
     if(ground.x<0){
        ground.x=500;
        }
 
    //run distance
     if(frameCount%50===0){
      score++;
     }
  
    //player jumping     
    if(touches.length>0||keyDown("space")&&player.y>239&&player.isTouching(landGroup)){
         player.velocityY=-20;
         jump.play();
         jump.setVolume(0.05)
      touches = [];
      }
    
    //jumping animation
    if(player.y>239){
      player.changeAnimation("running",playerrAnimation);
    }else{
      player.changeAnimation("jumping",playerAnimation);
      }
    
    //gravity
     player.velocityY=player.velocityY+0.9;
  
    //end state
    if(player.y>500||starGroup.isTouching(player)){
       gameState="END";
           
    }  
    }else if(gameState==="END"){
      ground.velocityX=0;
      player.visible=false;
      player.velocityX=0;
      starGroup.destroyEach();
      landGroup.setVelocityEach(0,0);
      platformGroup.setVelocityEach(0,0);
      landGroup.destroyEach();
      platformGroup.destroyEach();
      landGroup.visible=false;
      ground.visible=false;
      restart.visible=true;
      textSize(70);
      textFont(font);
      fill("white");
      text("Game Over",windowWidth/2-300,100);
      textSize(20);
      text("You ran " +score+" yards!",windowWidth/2-150,150);
     }
  
       //restart 
      if(touches.length>0||mousePressedOver(restart)&&gameState==="END"){
        frameCount=0;
        gameState="PLAY";
        score=0;
        ground.velocityX=-5;
        landArea();
        enemy();
        player.x=100;
        player.y=100;
        player.visible=true;
        ground.visible=true;
        landGroup.visible=true;
        touches=[];
      }
    
 drawSprites();
  
  // text
  if(gameState==="PLAY"){
  textSize(60);
  fill("white");
  stroke("black");
  strokeWeight(10);
  textFont(font);
  text(score,windowWidth-200,430);
  textSize(40);
  fill("green");
  text("Galaxy Runner",windowWidth/2-250,50)
  }
  
}
  
//spawning land
function landArea(){
  if(frameCount%100===0||frameCount===1){
  land = createSprite(1200,400);
  land.addImage(landImage);
  land.scale=0.8;
  land.lifetime=300
  land.velocityX=-(10+ score/100);
  platform=createSprite(1200,310,700,20)
  platform.velocityX=-(10+ score/100);
  platform.lifetime=300
  platform2=createSprite(850,400,20,200);
  platform2.velocityX=-(10+ score/100);
  platform2.lifetime=300
  platform.visible=false;
  platform2.visible=false;
  landGroup.add(land);
  
 }
  
  if(frameCount===1){
  land=createSprite(200,400);
  land.addImage(landImage);
  land.scale=0.8;
  land.velocityX=-(10+ score/100);
  land.lifetime=300
  platform=createSprite(300,310,500,20);
  platform.velocityX=-(10+ score/100);
  platform1=createSprite(1200,310,700,20);
  platform1.velocityX=-(10+ score/100);
  platform2=createSprite(850,400,20,200);
  platform2.velocityX=-(10+ score/100);
  platform.visible=false;
  platform2.visible=false;
  platform1.visible=false;
  landGroup.add(land);
  }
  
   platformGroup.add(platform);
   platformGroup.add(platform2); 
   platformGroup.add(platform1);
     
}
//spawing ninja starts 
function enemy(){
  if(frameCount%150===0){
   var star=createSprite(1200,random(180,300));
       star.velocityX=-10;
       star.addImage(starImage);
       star.scale=0.2;
       star.lifetime=300
       starGroup.add(star);
  }
}