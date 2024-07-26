function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteAllCookies() {
  for (let x of checkList) {
    if (getCookie(x) === "") {
      return;
    } else {
      var c = document.cookie.split("; ");
      for (i in c)
        document.cookie =
          /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}

const playerOneScoreText = document.querySelector("#player1");
const playerTwoScoreText = document.querySelector("#player2");
const playTill = document.querySelector("#playToNum");
const playerOneBtn = document.querySelector("#playerOneBtn");
const playerTwoBtn = document.querySelector("#playerTwoBtn");
const resetBtn = document.querySelector("#resetBtn");

const checkList = ["playerOneScore", "playerTwoScore", "maxScore"];
let scores = {
  playerOneScore: parseInt(playerOneScoreText.innerText),
  playerTwoScore: parseInt(playerTwoScoreText.innerText),
  maxScore: parseInt(playTill.value),
};

for (let x of checkList) {
  if (getCookie(x) === "") {
    if (x === "maxScore") {
      setCookie(x, 5, 365);
    } else {
      setCookie(x, 0, 365);
    }
  } else {
    scores[x] = parseInt(getCookie(x));
    if (scores.playerOneScore !== 0 || scores.playerTwoScore !== 0) {
      playTill.disabled = true;
    }
    if (
      scores.playerOneScore >= scores.maxScore ||
      scores.playerTwoScore >= scores.maxScore
    ) {
      gameOver();
    }
  }
}

playerOneScoreText.innerText = scores.playerOneScore;
playerTwoScoreText.innerText = scores.playerTwoScore;
playTill.value = scores.maxScore;

resetBtn.addEventListener("click", () => {
  resetGame();
});

playerOneBtn.addEventListener("click", () => {
  playTill.disabled = true;
  scores.playerOneScore = parseInt(scores.playerOneScore) + 1;
  // ==================================================================
  setCookie("playerOneScore", scores.playerOneScore, 365);
  // ==================================================================
  playerOneScoreText.classList.add("flip");
  setTimeout(removeFlipPlayerOne, 250);
  if (scores.playerOneScore === scores.maxScore) {
    gameOver();
    playerOneScoreText.classList.add("winner");
    playerTwoScoreText.classList.add("loser");
  }
});

playerTwoBtn.addEventListener("click", () => {
  playTill.disabled = true;
  scores.playerTwoScore = parseInt(scores.playerTwoScore) + 1;
  // ==================================================================
  setCookie("playerTwoScore", scores.playerTwoScore, 365);
  // ==================================================================
  playerTwoScoreText.classList.add("flip");
  setTimeout(removeFlipPlayerTwo, 250);
  if (scores.playerTwoScore === scores.maxScore) {
    gameOver();
    playerTwoScoreText.classList.add("winner");
    playerOneScoreText.classList.add("loser");
  }
});

playTill.addEventListener("change", () => {
  scores.maxScore = parseInt(playTill.value);
  setCookie("maxScore", scores.maxScore, 365);
});

function removeFlipPlayerOne() {
  playerOneScoreText.innerText = scores.playerOneScore;
  playerOneScoreText.classList.remove("flip");
}

function removeFlipPlayerTwo() {
  playerTwoScoreText.innerText = scores.playerTwoScore;
  playerTwoScoreText.classList.remove("flip");
}

function gameOver() {
  playerOneBtn.disabled = true;
  playerTwoBtn.disabled = true;
}

function removeFlipReset() {
  playerOneScoreText.innerText = "0";
  playerOneScoreText.classList.remove("flip");
  playerTwoScoreText.innerText = "0";
  playerTwoScoreText.classList.remove("flip");
}

function resetNums() {
  playerOneScoreText.classList.remove("winner");
  playerTwoScoreText.classList.remove("winner");
  playerOneScoreText.classList.remove("loser");
  playerTwoScoreText.classList.remove("loser");
}

function resetGame() {
  scores.playerOneScore = 0;
  scores.playerTwoScore = 0;
  scores.maxScore = 5;
  playTill.value = scores.maxScore;
  playerOneScoreText.classList.add("flip");
  playerTwoScoreText.classList.add("flip");
  setTimeout(removeFlipPlayerOne, 250);
  setTimeout(removeFlipPlayerTwo, 250);
  setTimeout(resetNums, 250);
  playerOneBtn.disabled = false;
  playerTwoBtn.disabled = false;
  playTill.disabled = false;
  deleteAllCookies();
}
