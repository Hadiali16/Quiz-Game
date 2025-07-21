// Get elements
let questionBox = document.querySelector(".question-box");
let option1 = document.querySelector(".option1");
let option2 = document.querySelector(".option2");
let option3 = document.querySelector(".option3");
let option4 = document.querySelector(".option4");
let nextQuestion = document.querySelector(".next");

const mixedBtn = document.getElementById("mixed");
const gkBtn = document.getElementById("gk");
const mathsBtn = document.getElementById("maths");
const historyBtn = document.getElementById("history");
const carsBtn = document.getElementById("cars");
const scienceBtn = document.getElementById("science");
const artsBtn = document.getElementById("arts");
const computerBtn = document.getElementById("computer");
const hiddenh2 = document.querySelector("#hide");

let Base_URL = "";
let correct = "";
let data = null;
let index = 0;
let count = 0;

// Hide all category buttons and heading
function hideAllButtons() {
  mixedBtn.style.display = "none";
  gkBtn.style.display = "none";
  mathsBtn.style.display = "none";
  historyBtn.style.display = "none";
  carsBtn.style.display = "none";
  scienceBtn.style.display = "none";
  artsBtn.style.display = "none";
  computerBtn.style.display = "none";
  hiddenh2.style.display = "none";
}

// Decode HTML symbols
function decodeHTML(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Show question
function showQuestion(i) {
  let Question = decodeHTML(data[i].question);
  correct = decodeHTML(data[i].correct_answer);
  let incorrect = data[i].incorrect_answers.map(ans => decodeHTML(ans));

  // Combine and shuffle all 4 options
  let options = [...incorrect, correct];
  options.sort(() => Math.random() - 0.5);

  // Set the options text
  option1.innerText = options[0];
  option2.innerText = options[1];
  option3.innerText = options[2];
  option4.innerText = options[3];

  questionBox.innerHTML = Question;

  // Reset all option buttons
  [option1, option2, option3, option4].forEach(opt => {
    opt.disabled = false;
    opt.classList.remove("correct", "incorrect");
  });
}

// Check answer
const Track = (e) => {
  if (e.target.innerText === correct) {
    const correctSound = new Audio("success-340660.mp3");
    correctSound.play();
    e.target.classList.add("correct");
    count++;
  } else {
    const inCorrectSound = new Audio("wrong-buzzer-6268.mp3");
    inCorrectSound.play();
    e.target.classList.add("incorrect");
  }

  // Disable all options
  [option1, option2, option3, option4].forEach(opt => {
    opt.disabled = true;
  });
};

// Next question logic
nextQuestion.addEventListener("click", () => {
  index++;
  if (index < data.length) {
    showQuestion(index);
  } else {
    questionBox.innerText = "Quiz Finished!";
    option1.innerText = "Your Score In The Game was";
    option2.innerText = `${count} / 10`;
    option3.innerText = "";
    option4.innerText = "";
    nextQuestion.style.display = "none";

    [option1, option2, option3, option4].forEach(opt => {
      opt.classList.remove("correct", "incorrect");
    });
  }
});

// Load data from API
async function getData() {
  questionBox.innerText = "Loading...";
  let response = await fetch(Base_URL);
  let json = await response.json();
  data = json.results;
  showQuestion(index);
}

// Event listeners for options
option1.addEventListener("click", Track);
option2.addEventListener("click", Track);
option3.addEventListener("click", Track);
option4.addEventListener("click", Track);

// Category buttons
mixedBtn.addEventListener("click", () => {
  Base_URL = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
  hideAllButtons();
  getData();
});

gkBtn.addEventListener("click", () => {
  Base_URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
  hideAllButtons();
  getData();
});

mathsBtn.addEventListener("click", () => {
  Base_URL = "https://opentdb.com/api.php?amount=10&category=19&difficulty=easy&type=multiple";
  hideAllButtons();
  getData();
});

historyBtn.addEventListener("click", () => {
  Base_URL = "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple";
  hideAllButtons();
  getData();
});

carsBtn.addEventListener("click", () => {
  Base_URL = "https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple";
  hideAllButtons();
  getData();
});

scienceBtn.addEventListener("click", () => {
  Base_URL = "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple";
  hideAllButtons();
  getData();
});

artsBtn.addEventListener("click", () => {
  Base_URL = "https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multiple";
  hideAllButtons();
  getData();
});

computerBtn.addEventListener("click", () => {
  Base_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
  hideAllButtons();
  getData();
});
