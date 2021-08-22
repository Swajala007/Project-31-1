const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var town;
var bridge;
var leftWall,rightWall;
var joinPoint;
var joinLink;
var zombie;
var zombie1,zombie2,zombie3,zombie4;
var breakButton;
var backgroundImage;
var sad;

var stones = [];


function preload(){
backgroundImage = loadImage("background1.png");
zombie1 = loadImage("zombie1 (1).png");
zombie2 = loadImage("zombie2.png");
zombie3 = loadImage("zombie3.png");
zombie4 = loadImage("zombie4.png");
sad = loadImage("zombie0.png");


}

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  town = new Town(0,height-10,width*2,20);
  leftWall = new Town(100,height-300,200,height/2+100);
  rightWall = new Town(width-100,height-300,200,height/2+100);
  bridge = new Bridge(20,{x:50,y:height/2-140});
  joinPoint = new Town(width-250,height/2-100,40,20);

  Matter.Composite.add(bridge.body,joinPoint);
  joinLink = new Link(bridge,joinPoint);
 
  for(var i = 0; i <= 8; i++){
    var x = random(width / 2 - 200,width/2 + 300);
    var y = random(-100,100); 
    var stone = new Stone(x , y , 80, 80);
    stones.push(stone);
  }

  zombie = createSprite(width/2,height-110);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie.addAnimation("crying",sad);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createImg("axe.png");
  breakButton.position(800,30);
  breakButton.size(50,50);
  breakButton.mouseClicked(drop);
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

 for(var stone of stones){
    stone.display();
    var pos = stone.body.position;
    var distance = dist(zombie.position.x,zombie.position.y,pos.x,pos.y);
    if(distance <= 50){
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, {x:10,y:-10});
      zombie.changeAnimation("crying");
      zombie.scale = 0.3;
      collided = true;
    }
 }
 

if(zombie.position.x >= width-300){
  zombie.velocityX = -10;
  zombie.changeAnimation("righttoleft");
}

if(zombie.position.x <= 300){
  zombie.velocityX = 10;
  zombie.changeAnimation("lefttoright");
}

drawSprites();
}

function drop(){
  joinLink.dettach();
 setTimeout(() => {
   bridge.break();
 },1500);
}