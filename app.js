function setCookie(pOneScore, pTwoScore, maximumScore, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    "playerOneScore" +
    "=" +
    pOneScore +
    ";" +
    "playerTwoScore" +
    "=" +
    pTwoScore +
    ";" +
    "maxScore" +
    "=" +
    maximumScore +
    ";" +
    expires +
    ";path=/";
}

const playerOneBtn = document.querySelector("#playerOneBtn");
const playerTwoBtn = document.querySelector("#playerTwoBtn");
const resetBtn = document.querySelector("#resetBtn");

const playerOneScoreText = document.querySelector("#player1");
const playerTwoScoreText = document.querySelector("#player2");

let playerOneScore = parseInt(playerOneScoreText.innerText);
let playerTwoScore = parseInt(playerTwoScoreText.innerText);

playTill = document.querySelector("#playToNum");
let maxScore = parseInt(playTill.value);

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

//

//

resetBtn.addEventListener("click", () => {
  resetGame();
});

playerOneBtn.addEventListener("click", () => {
  playerOneScore += 1;
  //
  setCookie(playerOneScore, playerTwoScore, maxScore, 365);
  console.log(document.cookie);
  //
  playerOneScoreText.classList.add("flip");
  setTimeout(removeFlipPlayerOne, 250);
  if (playerOneScore == maxScore) {
    gameOver();
    playerOneScoreText.classList.add("winner");
    playerTwoScoreText.classList.add("loser");
  }
});

playerTwoBtn.addEventListener("click", () => {
  playerTwoScore += 1;
  //
  setCookie(playerOneScore, playerTwoScore, maxScore, 365);
  console.log(document.cookie);
  //
  playerTwoScoreText.classList.add("flip");
  setTimeout(removeFlipPlayerTwo, 250);
  if (playerTwoScore == maxScore) {
    gameOver();
    playerTwoScoreText.classList.add("winner");
    playerOneScoreText.classList.add("loser");
  }
});

function removeFlipPlayerOne() {
  playerOneScoreText.innerText = playerOneScore;
  playerOneScoreText.classList.remove("flip");
}

function removeFlipPlayerTwo() {
  playerTwoScoreText.innerText = playerTwoScore;
  playerTwoScoreText.classList.remove("flip");
}

playTill.addEventListener("change", () => {
  maxScore = parseInt(playTill.value);
});

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
  playerOneScore = 0;
  playerTwoScore = 0;
  playerOneScoreText.classList.add("flip");
  playerTwoScoreText.classList.add("flip");
  setTimeout(removeFlipPlayerOne, 250);
  setTimeout(removeFlipPlayerTwo, 250);
  setTimeout(resetNums, 250);
  playerOneBtn.disabled = false;
  playerTwoBtn.disabled = false;
}
