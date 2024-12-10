const questionBank = JSON.parse(document.getElementById("question-bank").textContent);

let qNo = document.getElementById("Qno");
let scoreElem = document.getElementById("score");
let questionElem = document.getElementById("question");
let buttons = document.querySelectorAll(".answer-btn");
let nextQuestionBtn = document.getElementById("next-question-btn");
let finalScoreElem = document.getElementById("final-score");

let currentQuestionIndex = 0; 
let currentScore = 0; 

function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]]; 
    }
}

function getRandomQuestions() {
    const shuffledQuestions = questionBank.sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, 5);
}

function nextQuestion() {
    if (currentQuestionIndex >= 5) {
        endGame();
        return;
    }

    const currentQuestion = randomQuestions[currentQuestionIndex];
    questionElem.innerHTML = currentQuestion.question;

    const options = [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers];
    shuffleOptions(options);

    buttons.forEach((button, i) => {
        button.innerText = options[i];
        button.dataset.rawAnswer = options[i];
        button.classList.remove("correct", "incorrect");
        button.disabled = false;
        button.onclick = () => checkAnswer(button.dataset.rawAnswer, currentQuestion.correctAnswer, button);
    });

    qNo.innerText = currentQuestionIndex + 1;
    nextQuestionBtn.classList.add("hidden"); 
    currentQuestionIndex++; 

    MathJax.typeset();
}

function checkAnswer(selectedRawAnswer, correctAnswer, selectedButton) {
    buttons.forEach(button => button.disabled = true);

    if (selectedRawAnswer.trim() === correctAnswer.trim()) {
        currentScore += 10; 
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
    }

    scoreElem.innerText = currentScore;
    nextQuestionBtn.classList.remove("hidden");
}

function endGame() {
    finalScoreElem.innerText = `Game Over! Your final score is: ${currentScore}`;
    document.getElementById("end-game").classList.remove("hidden");
    document.getElementById("in-game").classList.add("hidden");
}

document.getElementById("start-btn").addEventListener("click", () => {
    randomQuestions = getRandomQuestions();
    document.getElementById("start-game").classList.add("hidden");
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("in-game").classList.remove("hidden");
    nextQuestion();
});

nextQuestionBtn.addEventListener("click", nextQuestion);