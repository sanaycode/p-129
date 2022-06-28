hp_music="";
pp_music="";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreLeftWrist=0;
random="";
function preload(){
    hp_music=loadSound("music.mp3");
    pp_muisc=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(300, 300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video , 0, 0, 300, 300); 
    fill("#FF0000");
    stroke("#FF0000");
    random=pp_music.isPlaying();
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY);
        hp_music.stop();
        if(pp_music.isPlaying()=="false"){
            pp_music.play();
            document.getElementById("song").innerHTML="Peter Pan";
        }
    }
}
function modelLoaded(){
    console.log("PoseNet is Initialized");
}
function gotPoses(error, results){
    if(results > 0){
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        scoreLeftWrist=result[0].pose.keypoints[9].score;
    }
}