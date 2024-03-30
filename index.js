const colors = ['green', 'red', 'yellow', 'blue'];
let currentPattern = [];
let gamePattern = [];
var level = 1;

$(document).one("keydown", Sequence);
$(".btn").on("click", Response);
$(".btn").on("click", () => checkAnswer(currentPattern.length - 1) );

function Response(){
    var selectedColor = this.id;
    console.log(selectedColor);
    animate(selectedColor);
    sound(selectedColor);
    currentPattern.push(selectedColor);
}

function checkAnswer(patternLength){
    if(gamePattern[patternLength] === currentPattern[patternLength]){

        if(currentPattern.length === gamePattern.length){
            setTimeout(() => {
                Sequence();
            },1000);
        }
    }

    if(gamePattern[patternLength] !== currentPattern[patternLength]){
        if(gamePattern.length !== currentPattern.length){
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
            $("h1").text("Game Over! Press Any Key to Restart.");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            },200);
            startOver();
        }  
    }
}


function Sequence(){
    currentPattern = [];
    
    $("h1").text("Level " + level);
    
    var rNumber = Math.floor(Math.random()*4);
    var rColor = colors[rNumber];
    gamePattern.push(rColor);
    
    $("#" + rColor).fadeOut(100).fadeIn(100);
    sound(rColor);
    level++;

}

function animate(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function sound(currentColor){
    switch(currentColor){
        case "green": 
            var green = new Audio("./sounds/green.mp3");
            green.play();
        break;
        
        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.play();
        break;
        
        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
        break;
        
        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
        break;
        
        default : 
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
        break;
    }
}

function startOver(){
    level = 1;
    gamePattern = [];
    $(document).one("keydown", Sequence);
}