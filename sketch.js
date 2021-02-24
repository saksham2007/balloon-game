var balloon, db, position;

function preload() {
    backgroundImg = loadImage("images/bg.png");
    balloon_moving = loadAnimation("images/balloon1.png", "images/balloon2.png", "images/balloon3.png");
}

function setup() {
    createCanvas(1200, 550);
    balloon = createSprite(250, 250, 10, 10);
    balloon.addAnimation("moving", balloon_moving);


    db = firebase.database();
    balloonref = db.ref("balloon/position")
    balloonref.on("value", readPosition, showErrors)
}


function draw() {
    background(backgroundImg);
    if (position !== undefined) {

        if (keyDown(LEFT_ARROW)) {
           changePosition(-10,0)
        }
        else if (keyDown(RIGHT_ARROW)) {
            changePosition(10,0)
        }
        else if (keyDown(UP_ARROW)) {
            changePosition(0,-10)
        }
        else if (keyDown(DOWN_ARROW)) {
            changePosition(0,10)
        }

 
        drawSprites();
    }

    if(keyDown(UP_ARROW)){
      balloon.scale=balloon.scale-0.01
    }

    else if (keyDown(DOWN_ARROW)) {
      balloon.scale=balloon.scale+0.01
}
}

function changePosition(x, y) {
    // ball.x = ball.x + x;
    // ball.y = ball.y + y;
    db.ref("balloon/position").update({
        x: position.x + x,
        y: position.y + y
    });
}

function readPosition(data) {
    position = data.val()
    balloon.x = position.x
    balloon.y = position.y
}

function showErrors() {
    console.log("Error in database")
}