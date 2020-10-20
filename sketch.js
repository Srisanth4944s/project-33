const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var Birds = []

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1600,700);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1900,20);
    platform = new Ground(150, 615, 300, 170);

    box1 = new Box(700,620,70,70);
    box2 = new Box(920,620,70,70);
    pig1 = new Pig(810, 650);
    log1 = new Log(810,610,300, PI/2);

    box3 = new Box(700,600,70,70);
    box4 = new Box(920,600,70,70);
    pig3 = new Pig(810, 610);

    log3 =  new Log(810,580,300, PI/2);

    box5 = new Box(810,560,70,70);
    log4 = new Log(760,560,150, PI/7);
    log5 = new Log(870,560,150, -PI/7);

    bird = new Bird(200,450);


    bird2 = new Bird(150,250);
    bird3 = new Bird(100,250);
    bird4 = new Bird(50,250);

    Birds.push(bird4)
    Birds.push(bird3)
    Birds.push(bird2)
    Birds.push(bird)
    
    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:370});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();

    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
       if (gameState!=="launched"){
        Matter.Body.setPosition(Birds[Birds.length - 1].body, {x: mouseX , y: mouseY});
        Matter.Bodie.applyForce(Birds[Birds.length - 1].body,Birds[Birds.length - 1].body.position,{x:5,y: - 5 })
        return false
      }
}


function mouseReleased(){
    slingshot.fly();
    Birds.pop()
    
    gameState = "launched";
    return false
}

function keyPressed(){
    if(keyCode === 32 && gameState === "launched"){
        if (Birds.length >= 0){
        Matter.Body.setPosition(Birds[Birds.length - 1].body, {x: 200 , y: 50})
        slingshot.attach(Birds[Birds.length - 1].body);
        gameState = "onSling"
        }
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}
