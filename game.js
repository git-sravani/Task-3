const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progresText=document.getElementById('progresText');
const scoreText=document.getElementById('score');
const progressBarFull=document.getElementById('progressBarFull');
const game=document.getElementById('game');
const loader=document.getElementById('loader')
let currentQuestion = {};
let acceptinAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res=>{
        return res.json();
    })
    .then(loadedQuestions=>{
        console.log(loadedQuestions.results);
        questions=loadedQuestions.results.map(loadedQuestion=>{
            const formattedQuestion={
                question:loadedQuestion.question
            };
            const ansChoices=[...loadedQuestion.incorrect_answers];
            formattedQuestion.answer=Math.floor(Math.random()*3)+1;
            ansChoices.splice(formattedQuestion.answer-1,0,loadedQuestion.correct_answer);
    
        ansChoices.forEach((choice,index)=>{
            formattedQuestion["choice"+(index+1)]=choice;
        })
        return formattedQuestion;
        })
    
        startGame();
    })
const MAX_QUESTIONS=5;
const BONUS_POINTS=10;
startGame = () => {
    questionCounter=0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore",score);
    return window.location.assign("end.html");
    }
    questionCounter++;
    progresText.innerText=`Question:${questionCounter}/${MAX_QUESTIONS}`;
    const persnt=(questionCounter/MAX_QUESTIONS)*100;
    progressBarFull.style.width=`${persnt}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;
    choices.forEach((choice) => {
        const number = choice.dataset.number;
        choice.innerHTML = currentQuestion["choice" + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptinAnswer = true;
};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptinAnswer) {
            return;
        }
        acceptinAnswer = false;
        const selectedchoice = e.target;
        const selectedanswer = selectedchoice.dataset['number'];
        
       
        const classToAplly = (selectedanswer ==currentQuestion.answer) ? "correct" : "incorrect";
        console.log(currentQuestion);
        console.log(currentQuestion.answer);
        if(classToAplly=="correct")
        {
            scoreIncrement(BONUS_POINTS);
        }
        
        selectedchoice.parentElement.classList.add(classToAplly);
        setTimeout(() => {
            selectedchoice.parentElement.classList.remove(classToAplly);
            getNewQuestion();
        }, 1000);

    })
});
scoreIncrement=(num)=>{
    score+=num;
    scoreText.innerText=score;
}
