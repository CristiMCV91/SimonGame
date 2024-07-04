// 1. Variables and Initializations

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

// Initialize high score display on document ready
$(document).ready(function() {
    var highScore = localStorage.getItem("highScore") || 0;
    $("#high-score").text("Your High Score: " + highScore);
});

// 2. Event Listeners

// Event listener to start the game when 'A' key is pressed
document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === "a" && !gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

// Event listener to start the game for tochscreen
$("h1#level-title").on("click", function() {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});


// Event listener for button clicks
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// 3. Game Functions

// Function to generate the next sequence in the game
function nextSequence() {
    userClickedPattern = [];
    $("h1#level-title").text("Level " + level);
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
}

// Function to check the user's answer against the game pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        startOver();
    }
}

// Function to reset the game when the user makes a mistake
function startOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1#level-title").text("Game Over, Click here or press A key to Restart");

    // Update high score in local storage
    var highScore = localStorage.getItem("highScore") || 0;
    if (level > highScore) {
        localStorage.setItem("highScore", level);
        $("#high-score").text("Your High Score: " + level);
    }

    level = 0;
    gamePattern = [];
    gameStarted = false;
}

// 4. Auxiliary Functions

// Function to play sound based on the button color
function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
