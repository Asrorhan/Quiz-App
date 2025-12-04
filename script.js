// Array of quiz questions
const questions = [
    {
        question: "Which is the largest animal in the world ?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Elephant", correct: false},
            {text: "Bear", correct: false},
            {text: "Blue Whale", correct: true}
        ]
    },
    {
        question: "Which is the smallest country in the world ?",
        answers: [
            {text: "Vatican", correct: true},
            {text: "Turkey", correct: false},
            {text: "Russia", correct: false},
            {text: "France", correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world ?",
        answers: [
            {text: "Sahara", correct: false},
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Antarctica", correct: true}
        ]
    },
    {
        question: "Which is the smallest continent in the world ?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Arctica", correct: false},
            {text: "Australia", correct: true},
            {text: "Africa", correct: false}
        ]
    }
];


// Selecting HTML elements
const questionElement = document.getElementById("questions");
const answerBtns = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

// Variables to track progress
let currentQuestionIndex = 0;
let score = 0;

// Start the quiz from question 1
function startQuiz(){
      currentQuestionIndex = 0;
      score = 0;
      nextBtn.innerHTML = "Next";
      showQuestion();
}

// Show current question and its answers
function showQuestion() {
      resetState();  // Clear previous question's buttons

      let currentQuestion = questions[currentQuestionIndex];
      let questionNum = currentQuestionIndex + 1;

      // Display the question text
      questionElement.innerHTML = questionNum + '. ' + currentQuestion.question;

      // Create answer buttons for each answer
      currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");

            // Add button to the page
            answerBtns.appendChild(button);

            // Store if this answer is correct
            if(answer.correct) {
                  button.dataset.correct = answer.correct;
            }

            // Add click event
            button.addEventListener("click", selectAnswer);
      });
}

// Remove old answer buttons and hide next button
function resetState() {
      nextBtn.style.display = "none";
      while(answerBtns.firstChild){
            answerBtns.removeChild(answerBtns.firstChild);
      }
}

// Called when user selects an answer
function selectAnswer(e) {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";

      // Mark selected button
      if(isCorrect){
            selectedBtn.classList.add("correct");
            score++; // increase score
      } else {
            selectedBtn.classList.add("incorrect");
      }

      // Show correct answer and disable all buttons
      Array.from(answerBtns.children).forEach(button => {
            if(button.dataset.correct === "true"){
                  button.classList.add("correct");
            }
            button.disabled = true; // prevent clicking again
      });

      nextBtn.style.display = "block"; // show next button
}

// Show final result
function showScore() {
      resetState();
      questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
      nextBtn.innerHTML = "Play Again";
}

// Go to next question or show score
function handleNextButton() {
      currentQuestionIndex++;
      if(currentQuestionIndex < questions.length){
            showQuestion();
      } else {
            showScore();
      }
}

// When Next button is clicked
nextBtn.addEventListener("click", () => {
      if(currentQuestionIndex < questions.length){
            handleNextButton();
      } else {
            startQuiz(); // restart quiz
      }
});

// Start the quiz on page load
startQuiz();
