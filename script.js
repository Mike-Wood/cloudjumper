var player;
var players = {};
var highestHighscore = 0;
var idCounter = 0;
var tableRow = 1;
var tableRow2 = 1;
$(document).ready(function () {
    $("body").css("overflow", "hidden");
    player = document.getElementById("jumper");
    player.style.left = "100px";
    player.style.top = "0px";
    for (var k = 0; k < 33; k++) {
        $("<div id='platform" + counter + "' class=\"platforms \" style='width: " + divWidth + "px; height: " + divWidth + "px; background: white; position: absolute; left: " + (px1stplatform + plus) + "px; top: 300px;'></div>").appendTo("body");
        plus += 50;
        counter++;
    }
    plus = 0;
    canJump = false;
    if (localStorage.getItem("players") != null) {
        if (localStorage.getItem("players").length > 0) {
            players = JSON.parse(localStorage.getItem("players"));
        }
    }
    for (var key in players) {
        if (tableRow <= 5) {
            document.getElementById(tableRow + "stName").innerText = key;
            document.getElementById(tableRow + "stScore").innerText = players[key].highscore;
            tableRow++;
            document.getElementById("more").style.visibility = "hidden";
        } else {
            document.getElementById("more").style.visibility = "visible";
        }
        idCounter++;
    }

    $('#changeUser').width($('#changeUser').height());
    $('#topHighscoreList').width($('#topHighscoreList').height());
});
var counter = 0;
var divWidth = 50;
var isFalling = true;
var canJump = true;
var px = Math.round(window.innerWidth / 50) * 50;
var px1stplatform = 100;

var plus = 0;
var gamePaused = true;
var classCounter = 0;
var secondsalive = 0;
var topval = 500;
var platform;
function pausePlay() {
    if (gamePaused) {
        gamePaused = false;
        $("#pausebutton").html('Pause');
        $("#pausebutton").blur();
    } else {
        gamePaused = true;
        $("#pausebutton").html('Play');
        $("#pausebutton").blur();
    }
}
setInterval(function() {
    if (!(gamePaused)) {
        secondsalive = secondsalive + 1;
        $("#score").html("Score: " + secondsalive);
    }
}, 1);
var newPlatformInterval = setInterval(function () {
    if (!(gamePaused)) {
        topval = 200 + Math.round(Math.random() * 200 / 50) * 50;
        for (var k = 0; k < Math.round((Math.random() * 9) + 5); k++) {
            var random = Math.random();
            if (random > 0.5) {
                //$("<div id='platform" + counter + "' class=\"platforms platform" + classCounter + "\" style='width: " + divWidth + "px; height: " + divWidth + "px; background: yellow; position: absolute; left: " + (px + plus) + "px; top: " + (topval - divWidth) + "px;'></div>").appendTo("body");
                //counter++;
                $("<div id='platform" + counter + "' class=\"platforms platform" + classCounter + "\" style='width: " + divWidth + "px; height: " + divWidth + "px; background: white; position: absolute; left: " + (px + plus) + "px; top: " + topval + "px;'></div>").appendTo("body");
                plus += 50;
                counter++;
            } else {
                $("<div id='platform" + counter + "' class=\"platforms platform" + classCounter + "\" style='width: " + divWidth + "px; height: " + divWidth + "px; background: white; position: absolute; left: " + (px + plus) + "px; top: " + topval + "px;'></div>").appendTo("body");
                plus += 50;
                counter++;
            }
        }
        plus = 0;
        classCounter++;
    }
}, 1000);
var speed = 200;
var animationSpeed = speed / 2;
var animateInterval = setInterval(function () {
    if (!(gamePaused)) {
        canJump = true;
        var allPlatforms = document.querySelectorAll(".platforms");
        for (var i = 0; i < allPlatforms.length; i++) {
            platform = allPlatforms[i];
            console.log(parseInt(platform.style.left, 10) + " > " + parseInt(player.style.left, 10) + " && " + parseInt(platform.style.left, 10) + " < " + (parseInt(player.style.left, 10) + " + " + divWidth)  + " && " + parseInt(platform.style.top, 10) + " > " + parseInt(player.style.top, 10) + " && " + parseInt(platform.style.top, 10) + " <= " + (parseInt(player.style.top, 10) + " + " + divWidth));
            if (parseInt(platform.style.left, 10) >= parseInt(player.style.left, 10) &&
                parseInt(platform.style.left, 10) <= (parseInt(player.style.left, 10) + divWidth) &&
                parseInt(platform.style.top, 10) >= parseInt(player.style.top, 10) &&
                parseInt(platform.style.top, 10) <= (parseInt(player.style.top, 10) + divWidth)) {
                isFalling = false;
                canJump = true;
                console.log("i am not falling");
                break;
            } else {
                isFalling = true;
                canJump = false;
                console.log("i am falling");
            }
        }
        if (isFalling) {
            $("#jumper").animate({top: "+=50px"}, animationSpeed, "linear");
        }
        for (var u = 0; u < allPlatforms.length; u++) {
            var platform1 = allPlatforms[u];

            $("#" + platform1.id).animate({left: "-=50px"}, animationSpeed, "linear");
            if (parseInt(platform1.style.left, 10) < 0) {
                $("#" + platform1.id).remove();
            }
        }
        if (parseInt(player.style.top, 10) >= 650) {
            $("#jumper").remove();
            clearInterval(animateInterval);
            clearInterval(newPlatformInterval);
            gamePaused = true;
            document.getElementById("pausebutton").disabled = true;
            var nameInput = $("<input id=\"nameInput\" placeholder=\"Name\" type=\"text\">").appendTo("#center");
            var saveButton = $("<button id='saveButton'>SAVE</button>").appendTo("#center");
            saveButton.click(function() {
                var name = nameInput.val();
                // Update object with new highscore and name.
                if (!players.hasOwnProperty(name)) {
                    players[name] = {
                        highscore: secondsalive,
                        color: "red"
                    };
                }
                if (secondsalive >= players[name].highscore) {
                    players[name].highscore = secondsalive;
                    localStorage.setItem("players", JSON.stringify(players));
                    for (var key2 in players) {
                        if (players.hasOwnProperty(key2)) {
                            if (highestHighscore < players[key2].highscore) {
                                highestHighscore = players[key2].highscore;
                            }
                        }
                        if (tableRow2 <= 5) {
                            document.getElementById(tableRow2 + "stName").innerText = key2;
                            document.getElementById(tableRow2 + "stScore").innerText = players[key2].highscore;
                            tableRow2++;
                        }
                        sortTheTable();
                        document.getElementById("saveButton").disabled = true;
                    }
                }

                //console.log(highestHighscore);
                //console.log(players);
            });
        }
    }
},  speed);
window.addEventListener('keyup', function (e) {
    if (e.which != 32) {
        if (canJump) {
            canJump = false;
            $("#jumper").stop();
            $("#jumper").animate({top: "-=250px"}, 400, "linear");
            canJump = false;
            isFalling = true;
        }
    } else {
        document.getElementById("pausebutton").click();
    }
});
window.addEventListener('click', function () {
    if (canJump) {
        canJump = false;
        $("#jumper").stop();
        $("#jumper").animate({top: "-=250px"}, 300, "linear");
        canJump = false;
        isFalling = true;
    }
});