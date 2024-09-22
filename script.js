const startQuiz = document.querySelector("#startQuiz");
const highScores = document.querySelector("#highScores");
let question = document.querySelector("#question");
let options = document.querySelector("#options");
let timer = document.querySelector("#timer");
let myScores = document.querySelector("#my-scores");

//put all the quiz data in an array of objects.
let quizQuestions = [
  {
    que: "Which of the following can create a variable?",
    choices: ["5apples", "function", "_season"],
    answer: "_season"
  },
  {
    que: "Which is not a data type?",
    choices: ["String", "Array", "null"],
    answer: "Array"
  },
  {
    que: "Which of the following methods returns a boolean?",
    choices: ["includes", "toUppercase", "indexOf"],
    answer: "includes"
  },
  {
    que: "What does DOM stand for?",
    choices: ["Do Own Model", "Document Object Model", "Document Object Method"],
    answer: "Document Object Model"
  },
];
let score = 0;
let currentQuestion = 0;
let timeLeft = 20;
let displayQuiz = function () {
  let questionData = quizQuestions[currentQuestion];
  question.textContent = questionData.que;
  let questionChoices = questionData.choices;
  options.textContent = "";
  questionChoices.forEach(function (choice) {
    let listofChoices = document.createElement("button");
    options.classList.add("d-flex", "flex-column");
    listofChoices.textContent = choice;
    options.appendChild(listofChoices);
  })
};
let displayHighScores = function () {
  question.textContent = "";
  options.textContent = "";
  myScores.style.display = "block";
  startQuiz.style.display = "none";
}
startQuiz.addEventListener("click", function () {
  startQuiz.style.display = "none";
  let timerInterval = setInterval(function () {
    timer.textContent = `Time: ${timeLeft} seconds`;
    timeLeft--
    if (timeLeft < 0) {
      clearInterval(timerInterval);
    }
  }, 1000)
  displayQuiz();
})
//keep track of which question is displayed on the webpage.
$(document).on("click", "#options", function (event) {
  event.preventDefault();
  if (event.target.textContent !== quizQuestions[currentQuestion].answer) {
    timeLeft -= 2;
  } else {
    score += 25;
  }
  currentQuestion++
  if (currentQuestion === quizQuestions.length) {
    displayHighScores();
    return score;
  }
  displayQuiz();
});
$(document).on("click", "#highScores", function (event) {
  event.preventDefault();
  displayHighScores();
});