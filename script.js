const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const scoreElement = document.getElementById('score');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: 'Which of the following is not a social networking site?',
        answers: [
            { text: 'Google', correct: false },
            { text: 'Instagram', correct: false },
            { text: 'Bing', correct: true },
            { text: 'Twitter', correct: false }
        ]
    },
    {
        question: 'What is the motto of the Olympic Games?',
        answers: [
            { text: 'Faster, Higher, Stronger', correct: false },
            { text: 'Unity, Diversity, Excellence', correct: false },
            { text: 'Citius, Altius, Fortius', correct: false },
            { text: 'All of the above', correct: true }
        ]
    },
    {
        question: 'Which city hosted the first modern Olympic Games in 1896?',
        answers: [
            { text: 'London, UK', correct: false },
            { text: 'Rome, Italy', correct: false },
            { text: 'Paris, France', correct: false },
            { text: 'Athens, Greece', correct: true }
        ]
    },
    {
        question: 'Who is the founder of the modern Olympic Games?',
        answers: [
            { text: 'Pierre de Coubertin', correct: true },
            { text: 'Baron de Coubertin', correct: false },
            { text: 'Pierre de Fredy', correct: false },
            { text: 'Baron de Fredy', correct: false }
        ]
    },
    {
        question: 'What is the name of the Olympic oath taken by athletes during the opening ceremony?',
        answers: [
            { text: `Athlete's Promise`, correct: false },
            { text: 'Olympic Oath', correct: true },
            { text: `Sportsperson's Pledge`, correct: false },
            { text: `Champion's Vow`, correct: false }
        ]
    }
];

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.remove('hide');
    prevButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    const questionElement = document.getElementById('question');
    questionElement.textContent = question.question;
    answerButtons.innerHTML = '';
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
        scoreElement.textContent = score;
    }
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.classList.remove('hide');
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.classList.add('hide');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        prevButton.classList.remove('hide');
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.classList.add('hide');
        }
    } else {
        showResult();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.remove('hide');
        if (currentQuestionIndex === 0) {
            prevButton.classList.add('hide');
        }
    }
}

function showResult() {
    questionContainer.innerHTML = `
        <h2>Your score: ${score} out of ${questions.length}</h2>
        <button class="btn" onclick="startGame()">Restart</button>
    `;
    nextButton.classList.add('hide');
    prevButton.classList.add('hide');
}

startGame();