// DOMS ELEMENTS  ---------------------------------------------------------
const dom_start = document.getElementById("start");
const dom_quiz = document.getElementById("quiz");
const dom_question = document.getElementById("question");
const dom_choiceA = document.getElementById("A");
const dom_choiceB = document.getElementById("B");
const dom_choiceC = document.getElementById("C");
const dom_choiceD = document.getElementById("D");

const dom_score = document.getElementById("score");
const dom_score_p = document.getElementById("score_p");
const dom_score_img = document.getElementById("score_img");

// DATA  ---------------------------------------------------------
let questions = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets ",
    choiceD: "I don't know !",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Junior stars",
    choiceB: "Justing Star",
    choiceC: "Javascript",
    choiceD: "RonanScript",
    correct: "C",
  },
];
let score = 0;
let currentQuestionIndex = 0;

// FUNCTION  ---------------------------------------------------------

function loadQuestions() {
  let storedQuestion = JSON.parse(localStorage.getItem("questions"));
  if (storedQuestion !== null) {
    questions = storedQuestion;
  }
}

// Hide a given element
function hide(element) {
  element.style.display = "none";
}

// Show a given element
function show(element) {
  element.style.display = "block";
}

function renderQuestion() {
  let question = questions[currentQuestionIndex];
  dom_question.textContent = question.title;
  dom_choiceA.textContent = question.choiceA;
  dom_choiceB.textContent = question.choiceB;
  dom_choiceC.textContent = question.choiceC;
  dom_choiceD.textContent = question.choiceD;
}

dom_start.addEventListener("click", (event) => {
  hide(dom_start);
  show(dom_quiz);

  // 1 - load the questions from local storage
  loadQuestions();

  // 2- Reet the question index to 0
  currentQuestionIndex = 0;

  // 2 - Render the first question
  renderQuestion();
});

// ---------------------

function checkAnswer(choice) {
  let question = questions[currentQuestionIndex];
  if (choice === question.correct) {
    score += 1;
  }
  if (currentQuestionIndex < questions.length - 1) {
    // progress_bar
    progress_bar.value=(currentQuestionIndex+2)/questions.length * 100;
    // Go to the next question
    currentQuestionIndex += 1;
    // Render the nex quesiton
    renderQuestion();
  } else {
    // display score
    showScore();
  }
}

function showScore() {
  hide(dom_quiz);
  show(dom_score);
  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  // choose the image based on the scorePerCent
  let comment = "";
  let image = "../../img/";

  if (scorePerCent <= 20) {
    comment = "HUMM !";
    image += "20.png";
  } else if (scorePerCent <= 40) {
    comment = "YOU CAN IMPROVE !";
    image += "40.png";
  } else if (scorePerCent <= 60) {
    comment = "NOT BAD BUT... !";
    image += "60.png";
  } else if (scorePerCent <= 80) {
    comment = " GOOD !";
    image += "80.png";
  } else {
    comment = "CRAZY AMAZING !";
    image += "100.png";
  }

  dom_score_p.textContent = comment + " : " + scorePerCent + " %";
  dom_score_img.src = image;
}
