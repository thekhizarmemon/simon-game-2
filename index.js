var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var currentScore = [];
var highScore = 0;

$(window).on("keydown", function () {
    if (!started) {
        $("#title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".start-btn").on("click", function () {
    if (!started) {
        $(".start-btn").text("Level " + level);
        $(".start-btn").addClass("pressed");
        setTimeout(function () {
            $(".start-btn").removeClass("pressed");
        }, 100);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    if (started) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        makeAnimation(userChosenColor);
        makeSound(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
    else {
        makeSound("wrong");
        fadeoutFadein("title>span");
        fadeoutFadein("start-btn")
    }
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#title").text("Level " + level);
    $(".start-btn").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function () {
            makeSound(gamePattern[i]);
            fadeoutFadein(gamePattern[i]);
        }, i * 500);
    }
}

function makeSound(selector) {
    var audio = new Audio("sounds/" + selector + ".mp3");
    audio.play();
}

function fadeoutFadein(selector) {
    $("#" + selector).fadeOut(100).fadeIn(100);
}

function makeAnimation(selector) {
    $("#" + selector).addClass("pressed");
    setTimeout(function () {
        $("#" + selector).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                currentScore.push(level);
                nextSequence();
                $(".current-score").text("Current Score: " + currentScore[currentScore.length - 1]);
            }, 1000);
        }
    }
    else {
        startOver();
        $(".current-score").text("Current Score: _ _");
        $(".high-score").text("High Score: " + highScore);

        makeSound("wrong");
        $("#title").html("Game Over, Press Any <span>Key</span> To Restart");
        $("#title-2").html("Game Over, Press To Restart");
        $(".start-btn").removeClass("hide");
        $(".start-btn").text("Restart");
        $("body").addClass("game-over-body");
        $(".btn").addClass("game-over-div");
        setTimeout(function () {
            $("body").removeClass("game-over-body");
            $(".btn").removeClass("game-over-div");
        }, 200);
    }
}

function startOver() {
    if ((currentScore.length - 1) >= highScore) {
        highScore = currentScore[currentScore.length - 1];
    }
    level = 0;
    started = false;
    gamePattern = [];
}