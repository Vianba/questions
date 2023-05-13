import questions from "./questions.js";

const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".answers");
const spnQtdElement = document.querySelector(".spnQtd");
const textFinishElement = document.querySelector(".finish span");
const contentElement = document.querySelector(".content");
const contentFinishElement = document.querySelector(".finish");
const btnRestartElement = document.querySelector(".finish button");

let currentIndex = 0;
let questionsCorrect = 0;

btnRestartElement.addEventListener("click", restart);

function restart() {
  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
  showContent();
}

function showContent() {
  contentElement.style.display = "flex";
  contentFinishElement.style.display = "none";
}

function nextQuestion(e) {
  const selectedOption = e.target.getAttribute("data-correct");
  if (selectedOption === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  const totalQuestions = questions.length;
  textFinishElement.textContent = `Você acertou ${questionsCorrect} de ${totalQuestions}`;
  contentElement.style.display = "none";
  contentFinishElement.style.display = "flex";
}

function loadQuestion() {
  const currentQuestion = questions[currentIndex];
  spnQtdElement.textContent = `${currentIndex + 1}/${questions.length}`;
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.className = "answer";
    answerButton.textContent = answer.option;
    answerButton.setAttribute("data-correct", answer.correct);

    answerButton.addEventListener("click", nextQuestion);
    answersElement.appendChild(answerButton);
  });
}

restart();
