const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon;

var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 20

  cannon = new Cannon(180, 110, 130, 100, angle);


  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  bola = new Cannon_ball(cannon.x,cannon.y);

  

}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);
  for(var i = 0; i<balls.length; i++){
    show_balls(balls[i],i);
    colision(i);
  }
  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  cannon.show();
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  
  barcos();
  
//i++ = mais um
}



function keyPressed(){
  if(keyCode===DOWN_ARROW){
    var bola = new Cannon_ball(cannon.x,cannon.y);
    balls.push(bola);
  }
}

function show_balls(ball,index){
  if(ball){
    ball.show();
    if(ball.body.position.x>=width || ball.body.position.y>=height-50){
      ball.remove(index)
    }
  }
}

function barcos(){
  if(boats.length > 0){
    if(boats[boats.length-1].body.position.x < width-300 || boats[boats.length-1] === undefined){
      var positions = [-40,-60,-70,-20];
      var pos = random(positions);
      var boat = new Boats(width-79, height-60, 170, 170, pos);
      boats.push(boat);
    }
    for(var i = 0; i<boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9, y: 0});
        boats[i].show();
      }
    }
  } else{
      var boat = new Boats(width-79, height-60, 170, 170, -80);
      boats.push(boat);
  }
}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
    balls[balls.length-1].shot();
  }
}

function colision(index){
  for(var i = 0; i<boats.length; i++){
    if(balls[index]!==undefined && boats[i]!==undefined){
      var colisao = Matter.SAT.collides(boats[i].body,balls[index].body);
      if(colisao.collided){
        boats[i].remove(i);
        Matter.World.remove(world,balls[index].body);
        delete balls[index];
      }
    }
  }
}