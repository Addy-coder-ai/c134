img = "";
Status = "";
objects = [];// u use [] for array, "" for var;

function preload() {
    img = loadImage("dog_cat.jpg");
}


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting...";
}

function modelLoaded() {
    console.log("model loaded");
    Status = true;
}


function draw() {
    image(video, 0, 0, 380, 380);

    if (Status != "") {

        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Object Detected!";
            document.getElementById("no_of_objects").innerHTML = "Number of objects detected:" + objects.length;

            fill(r,g,b);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }






   /* fill("red");
    text("Dog", 60, 92);
    noFill();
    stroke("red");
    rect(30, 60, 300, 250);

    fill("blue");
    text("Cat", 320, 90);
    noFill();
    stroke("blue");
    rect(310, 80, 300, 240);
  */
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

