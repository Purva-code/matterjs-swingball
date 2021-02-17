const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Composites = Matter.Composites;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var Example = Example || {};
var gameState = "onSling";
var score = 0;
//game sounds
var birdSelectSound,birdFlySound,pigSnortSound;

function preload(){
    // backgroundImg = loadImage("sprites/skyBackground.jpg");
}

function setup(){
// var canvas = createCanvas(1535,600);
    engine = Engine.create();
    world = engine.world;
    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showAngleIndicator: true,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    
     // add bodies
    var rows = 5,
        yy = 600 - 25 - 40 * rows;
    
    var stack = Composites.stack(400, yy, 5, rows, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 40, 40);
    });
    var stack2 = Bodies.rectangle(500, 500, 40, 40, {
        render:{
                fillStyle: 'green',
                strokeStyle: 'darkgreen',
                lineWidth: 20,
                constraint: {
                stiffness: 2,
                render: {
                    visible: true
                }
            },
                 options: {
              wireframes: false,


    }
            }
    });
    
    World.add(world, [
        stack, stack2,
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true}),
        
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);
        var ball = Bodies.circle(100, 400, 50, { density: 0.04, frictionAir: 0.005});
        ball.frictionAir=2;
        ball.restitution=1;
            console.log(ball.angularVelocity)
           if(Matter.SAT.collides(stack2, ball).collided){
            // ball.fill="red";
            stack2.render.visible= false;
            // stack2.Visibility = false;
        }
        // if(ball.body.speed>10) 
        // stack2.body.render.visible = false;
        // stack.Visibility = false;
        engine.timing.timeScale=0.5;
    World.add(world, ball);
    World.add(world, Constraint.create({
        pointA: { x: 300, y: 100 },
        bodyB: ball
    }));

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
    
};

Example.wreckingBall.for = '>=0.14.2';

if (typeof module !== 'undefined') {
    module.exports = Example.wreckingBall;
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
      
}

function mouseDragged(){
   // if (gameState!=="launched"){
        // birdSelectSound.play()
        // Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    // slingshot.fly();
    // birdFlySound.play()
    // gameState = "launched";
   
}

function keyPressed(){
    // if(keyCode === 32){
    //     Matter.Body.setPosition(bird.body, {x: 200 , y: 200});
    //     slingshot.attach(bird.body);
    //    birdSelectSound.play()
    // }
}
