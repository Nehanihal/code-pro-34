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

var helicopter
var water,medicine,house1,house2,house3,button
var rope
var medicine_con
function preload()
{


medicine=loadImage('medicine.png')

house1=loadImage('house1.png')
house2=loadImage('house2.png')
house3=loadImage('house3.png')

}


function setup() {
  createCanvas(400,400);

  
  engine = Engine.create();
  world = engine.world;

  button = createImg('button.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  house1 = createImg('house1.png');
  house1.position(110,90);
  house1.size(60,50);
  
  house2 = createImg('house2.png');
  house2.position(120,100);
  house2.size(60,50);

  house3 = createImg('house3.png');
  house3.position(130,110);
  house3.size(60,50);

  helicopter = createImg('helianimation.gif');
  helicopter.position(120,350);
  helicopter.size(80,60);

   water = createSprite(420,620,100,100);
  water.scale = 200;
  water.addImage('water.png')
  


  rope = new Rope(8,{x:40,y:30});
  
  ground = new Ground(200,690,600,20);

   medicine = Bodies.rectangle(300,300,20);
  Matter.Composite.add(rope.body,medicine)
  

    
  medicine_con = new Link(rope,medicine);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}


function draw() 
{
  background(51);
 
  image(water,0,0,490,690);

  push();
  imageMode(CENTER);
  if(medicine!=null){
    image(medicine,medicine.position.x,medicine.position.y,80,80);
  }
  pop();
  Engine.update(engine);
 

  rope.show();
  ground.show();

  drawSprites();

}
function drop()
{
  
  rope.break();
  medicine_con.detach();
  medicine_con = null; 
}
function collide(medicine,water)
{
  if(medicine!=null)
        {
         var d = dist(medicine.position.x,medicine.position.y,water.position.x,water.position.y);
          if(d<=80)
            {
              World.remove(engine.world,medicine);
               medicine = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

