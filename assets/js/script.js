var interval;
var beginQuizEl = document.getElementById("play-button");
beginQuizEl.addEventListener("click", startQuiz);

function startQuiz() {
  var questionsArray = [
    {
      question: "How are you?",
      answers: ["Good", "Bad", "Mediocre", "Unknown"],
      correctAnswer: 1,
    },
    {
      question: "What are you doing this weekend?",
      answers: [
        "Nothing",
        "I have a hot date",
        "Coding",
        "Hanging out at the beach",
      ],
      correctAnswer: 2,
    },
  ];
  var timerEl = document.getElementById("timer-element");
  var countDownEl = document.getElementById("time-clock");
  var quizEl = document.getElementById("question-window");
  var questionEl = document.getElementById("question");
  var answerListEl = document.getElementById("answers");
  var answersElArray = document.querySelectorAll(".answerButton");
  var startEl = document.getElementById("start-window");
  var count = 0;
  startEl.style.display = "none";
  quizEl.style.display = "block";
  displayQuestion(
    count,
    questionsArray,
    answersElArray,
    questionEl,
    quizEl,
    countDownEl
  );
  answerListEl.addEventListener("click", function (event) {
    var targetEl = event.target;
    count = checkAnswers(targetEl, countDownEl, questionsArray, count, quizEl);
    displayQuestion(
      count,
      questionsArray,
      answersElArray,
      questionEl,
      quizEl,
      countDownEl
    );
  });
  countDownEl.value = 10;
  countDownEl.textContent = countDownEl.value.toString();
  timerEl.style.display = "flex";
  interval = setInterval(function () {
    quizTimer(countDownEl, quizEl);
  }, 1000);
}

function quizTimer(countDownEl, quizEl) {
  if (countDownEl.value > 0) {
    countDownEl.value--;
    countDownEl.textContent = countDownEl.value.toString();
  } else {
    alert("You have run out of time! Better luck next time!");
    displayHighScoreWindow(countDownEl.value, quizEl);
  }
}

function displayQuestion(count, array1, array2, element1, element2, element3) {
  if (count < array1.length) {
    element1.textContent = array1[count].question;
    for (i = 0; i < array2.length; i++) {
      array2[i].textContent = array1[count].answers[i];
    }
  } else {
    displayHighScoreWindow(element3.value, element2);
  }
}

function displayHighScoreWindow(score, quizElement) {
  clearInterval(interval);
  quizElement.style.display = "none";
  // highScoreArray = localStorage.getItem().toArray()
  var highScoreEl = document.getElementById("high-score-window");
  //var highScoreValueEl = document.getElementById("high-score-value");
  var highScoreInputEl = document.getElementById("high-score-input");
  var highScoreHeaderEl = document.getElementById("");
  var highScoreButtonEl = document.getElementById("high-score-button");
  highScoreEl.style.display = "flex";
  if (score >= 1) {
    highScoreHeaderEl.textContent =
      "Congratulations! You got a new high Score of " +
      score +
      "Please put your initials below!";
  } else {
    highScoreHeaderEl.textContnent =
      "You did not get a high score on this quiz! Please try again!";
    highScoreInputEl.style.display = "none";
    highScoreButtonEl.style.display = "none";
  }
}

function checkAnswers(target, timer, array, count) {
  if (target.textContent === array[count].answers[array[count].correctAnswer]) {
    alert("You chose the correct answer!");
    timer.value += 11;
    timer.textContent = timer.value.toString();
  } else {
    alert("You chose an incorrect answer!");
    timer.value -= 9;
    timer.textContent = timer.value.toString();
  }
  count += 1;
  return count;
}
