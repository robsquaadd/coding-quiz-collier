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
  displayQuestion(count, questionsArray, answersElArray, questionEl);
  answerListEl.addEventListener("click", function (event) {
    var targetEl = event.target;
    count = checkAnswers(targetEl, countDownEl, questionsArray, count);
    displayQuestion(count, questionsArray, answersElArray, questionEl);
  });
  countDownEl.value = 10;
  countDownEl.textContent = countDownEl.value.toString();
  timerEl.style.display = "flex";
  interval = setInterval(function () {
    quizTimer(countDownEl);
  }, 1000);
}

function quizTimer(countDownEl) {
  if (countDownEl.value > 0) {
    countDownEl.value--;
    countDownEl.textContent = countDownEl.value.toString();
  } else {
    alert("You have run out of time! Better luck next time!");
    clearInterval(interval);
    return false;
  }
}

function displayQuestion(count, array1, array2, element) {
  element.textContent = array1[count].question;
  for (i = 0; i < array2.length; i++) {
    array2[i].textContent = array1[count].answers[i];
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
