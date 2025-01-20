/*
Define correct answers for each question
*/
const correctAnswers = {
    q1: [], // Special answers for question 1
    q2: [],      // Special answer for question 2
    q3: ["1", "2"], // Correct answers for question 3
    q4: ["1", "3"], // Correct answers for question 4
    q5: ["1", "3"], // Correct answers for question 5
    q6: ["1", "3"], // Correct answers for question 6
    q7: ["1", "3"], // Correct answers for question 7
    q8: ["1", "3"], // Correct answers for question 8
    q9: ["1", "3"], // Correct answers for question 9
    q10: ["1", "3"], // Correct answers for question 10
};


let answers = Array(correctAnswers.length).fill(null); // User's answers


// Event Listeners
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const submitButton = document.getElementById('submitButton');



/*
Show questions one by one
*/
function showQuestion(index) {
    // Hide all questions
    document.querySelectorAll('.question').forEach((question, i) => {
        question.classList.remove('active');
        if (i === index - 1) {
            question.classList.add('active');
        }
    });

    // Update button visibility
    document.getElementById("prevButton").style.display = index === 1 ? 'none' : 'inline-block';
    document.getElementById("nextButton").style.display = index === totalQuestions ? 'none' : 'inline-block';
    document.getElementById("submitButton").style.display = index === totalQuestions ? 'inline-block' : 'none';
}



/*
Show the next question
*/
let currentQuestion = 1;

function showNext() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
        resetQuestionTimer();
    }
}



/*
Show the prev question
*/
function showPrev() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}



/*
The total of questions
*/
const totalQuestions = 10; //Ten questions
let score = 0;

function submitQuiz() {
    for (let i = 1; i <= totalQuestions; i++) {
        const selected = document.querySelectorAll(`input[name="q${i}"]:checked`);
        const selectedValues = Array.from(selected).map(q => q.value);

        const correct = correctAnswers[`q${i}`];
        const correctSelected = selectedValues.filter(value => correct.includes(value)).length;
        const incorrectSelected = selectedValues.filter(value => !correct.includes(value)).length;

        if (correctSelected === correct.length && incorrectSelected === 0) {
            score += 2; // Full correct: +2
        } else if (correctSelected > 0 || incorrectSelected > 0) {
            score -= 1; // Partial or incorrect: -1
        }
    }

    // Store the score in localStorage
    localStorage.setItem("quizScore", score);

    // end quiz
    endQuiz();

}



/* 
End Quiz and Calculate Result
*/
function endQuiz() {    
    // Check if all answers are null (unanswered) but score is 4 due to two "no-answer" questions
    const allUnanswered = answers.every(answer => answer === null);
    if (allUnanswered && score === 4) {
      localStorage.setItem("quizScore", score);  
      window.location.href = "special.html";
    } else {
      window.location.href = "result.html";
    }
}



/* 
Count down timer of 20 seconds
*/
let duration = 20 * 60; // 20 minutes in seconds
const countDown = document.getElementById("timer");

function startCountdown() {
  countdownInterval = setInterval(function () {
    var minutes = Math.floor(duration / 60);
    var seconds = duration % 60;
    countDown.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (duration <= 0) {
      clearInterval(countdownInterval);
      endQuiz();
    }

    duration -= 1;
  }, 1000);
}



/*
Question time left for every question
*/
let questionTimeLeft = 1 * 60; // 2 minutes in seconds
const questionTimerElement = document.getElementById("questionTimer");
let questionCountdownInterval; // Timer for the question countdown

function startQuestionTimer() {
  questionCountdownInterval = setInterval(function () {
    var minutes = Math.floor(questionTimeLeft / 60);
    var seconds = questionTimeLeft % 60;
    questionTimerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (questionTimeLeft <= 0) {
      clearInterval(questionCountdownInterval); // Stop the current timer
      showNext(); // Automatically goes to the next question
    }

    questionTimeLeft -= 1;
  }, 1000);
}



/*
Reset question timer
*/
function resetQuestionTimer() {
    clearInterval(questionCountdownInterval); // Stop the current timer
    questionTimeLeft = 1 * 60;
    var minutes = Math.floor(questionTimeLeft / 60);
    var seconds = questionTimeLeft % 60;
    questionTimerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    startQuestionTimer(); // Start the timer from 2 minutes for the new question
}

// Reset the question timer when you click the next button
nextButton.addEventListener('click', resetQuestionTimer);



/*
Initialize
*/
showQuestion(currentQuestion);
startCountdown();
startQuestionTimer(); // Start the timer when the page reload