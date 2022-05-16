var questionCount = 0;
var score = 0;
var interval;
var buttonEl = document.getElementById("play-button");
var windowEls = document.querySelectorAll(".window");
var questionHeader = document.getElementById("question");
var answerButtonEls = document.querySelectorAll(".answerButton");
var timerEl = document.getElementById("timer-element");
var timerValueEl = document.getElementById("time-clock");
var highScoreInputEl = document.getElementById("high-score-input");
var highScoreButtonEl = document.getElementById("high-score-button");
var highScoreHeaderEl = document.getElementById("high-score-header");
var highScoreLinkEl = document.getElementById("view-high-scores");
var questionsArray = [
  {
    question: "How can I declare a function in JavaScript",
    answers: [
      "function name () {}",
      "var name = funciton() {}",
      "var name = () => {} ",
      "All of the above",
    ],
    correctAnswer: 3,
  },
  {
    question: "The operator === is _________",
    answers: [
      "The logical operator for and",
      "The logical operator for or",
      "The strict equal sign",
      "The loose equal sign",
    ],
    correctAnswer: 2,
  },
  {
    question: "Commonly used data types do NOT include",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: 2,
  },
  {
    question: "The condition of an if/else statement is enclosed with ________",
    answers: ["quotes,", "curly brackets", "parenthesis", "square brackets"],
    correctAnswer: 2,
  },
  {
    question: "Arrays in JavaScript can be used to store ...",
    answers: ["numbers and strings", "booleans", "objects", "all of the above"],
    correctAnswer: 3,
  },
];
var highScoresListEl = document.getElementById("view-high-scores");
var highScoresList = [
  { initials: "AAA", score: 0 },
  { initials: "BBB", score: 0 },
  { initials: "CCC", score: 0 },
  { initials: "DDD", score: 0 },
  { initials: "EEE", score: 0 },
];
localStorage.setItem("highScores", JSON.stringify(highScoresList));

let startQuiz = () => {
  score = 0;
  questionCount = 0;
  windowEls[0].style.display = "none";
  windowEls[1].style.display = "block";
  displayQuestion();
  timerValueEl.value = 30;
  timerValueEl.textContent = timerValueEl.value.toString();
  timerEl.style.display = "flex";
  interval = setInterval(timerFunction, 1000);
};

let timerFunction = () => {
  if (timerValueEl.value > 0) {
    timerValueEl.value--;
    timerValueEl.textContent = timerValueEl.value.toString();
  } else {
    alert("You ran out of time! Try again next time!");
    showHighScoreWindow();
  }
};

let displayQuestion = () => {
  if (questionCount < questionsArray.length) {
    questionHeader.textContent = questionsArray[questionCount].question;
    for (i = 0; i < questionsArray[questionCount].answers.length; i++) {
      answerButtonEls[i].textContent = questionsArray[questionCount].answers[i];
      answerButtonEls[i].addEventListener("click", checkAnswer);
    }
  } else {
    showHighScoreWindow();
  }
};

let checkAnswer = (e) => {
  var targetEl = e.target;
  if (
    targetEl.textContent ===
    questionsArray[questionCount].answers[
      questionsArray[questionCount].correctAnswer
    ]
  ) {
    alert("Congratulations! You have chosen the correct answer!");
    timerValueEl.value += 11;
    timerValueEl.textContent = timerValueEl.value.toString();
  } else {
    alert("Unfortunately you have chosen the incorrect answer!");
    timerValueEl.value -= 9;
    timerValueEl.textContent = timerValueEl.value.toString();
  }
  questionCount += 1;
  displayQuestion();
};

let showHighScoreWindow = () => {
  score = timerValueEl.value;
  clearInterval(interval);
  var getHighScoresFromLocalStorage = JSON.parse(
    localStorage.getItem("highScores")
  );
  var highScoreRank = getHighScoresFromLocalStorage.length;
  for (i = 0; i < getHighScoresFromLocalStorage.length; i++) {
    if (score > getHighScoresFromLocalStorage[i].score) {
      highScoreRank -= 1;
    }
  }
  if (highScoreRank <= getHighScoresFromLocalStorage.length - 1) {
    highScoreHeaderEl.textContent =
      "Congratulations! You got a high score of " +
      score +
      "! Please input your initials below!";
    highScoreButtonEl.textContent = "Add High Score";
    highScoreInputEl.style.display = "flex";
    highScoreButtonEl.addEventListener("click", () => {
      storeHighScore(score, getHighScoresFromLocalStorage, highScoreRank);
      restartQuiz();
    });
  } else {
    highScoreHeaderEl.textContent =
      "Unforunately, you did not get a high score this round! Please try again!";
    highScoreButtonEl.textContent = "Restart the quiz";
    highScoreInputEl.style.display = "none";
    highScoreButtonEl.addEventListener("click", restartQuiz);
  }
  windowEls[1].style.display = "none";
  windowEls[2].style.display = "flex";
  console.log("hello world");
};

let storeHighScore = (score, object, rank) => {
  var newHighScoreObject = {
    initials: highScoreInputEl.value,
    score: score,
  };
  object.splice(rank, 0, newHighScoreObject);
  object.pop();
  localStorage.setItem("highScores", JSON.stringify(object));
};

let restartQuiz = () => {
  windowEls[2].style.display = "none";
  timerEl.style.display = "none";
  windowEls[0].style.display = "block";
  var newHighScoreObject = {};
};

buttonEl.addEventListener("click", startQuiz);
highScoresListEl.addEventListener("click", () => {
  var highScoresArray = [];
  const highScoresObject = JSON.parse(localStorage.getItem("highScores"));
  for (i = 0; i < highScoresObject.length; i++) {
    highScoresArray[i] =
      " " + highScoresObject[i].initials + " - " + highScoresObject[i].score;
  }
  alert(highScoresArray);
});
