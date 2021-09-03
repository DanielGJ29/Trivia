const form = document.getElementById("triviaForm");
const mainDiv = document.getElementById("question");
const main = document.getElementById("main");
let amount = document.getElementById("amout").value;
const buttonExit = document.getElementById("exit");
const scoreDiv = document.getElementById("container-score");
console.log(scoreDiv)
// let amout = document.getElementById("amout").value;

let questions = [];
let incorrectAnwer = [];
let unionAnswer = [];
let i = 0;
let answer = {};
score = 0;
//console.log("amout inicio: " + amout)

const createApiUrl = (e)=>{
    e.preventDefault();
    //let amount = document.getElementById("amout").value;
    const category = document.getElementById("category").value;
    const dificulty = document.getElementById("dificult").value;
    const type = document.getElementById("type").value;
    const API = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${dificulty}&type=${type}`
    console.log(API);
    fetchDataApi(API,amount);
    main.classList.add("main-inactive");
    // amout(amout);
}

const fetchDataApi = (url,amount)=>{
    fetch(url)
    .then(response => response.json())
    .then(result => fillQuestion(result.results, amount))
    .catch(err => console.log(err));
}

const fillQuestion = (questionApi, amount) =>{
    questions = questionApi;
    //console.log(questionApi);
    renderQuestion(amount);
    
}



const renderQuestion = (amount) =>{
        // amount =  amount;
        const container = document.createElement("div");
        container.classList.add("main-info");
        const title = document.createElement("h1");
        title.innerText = questions[i].question;

        const divAnwer = document.createElement("div");
        divAnwer.classList.add("answer");
        //console.log(questions[i].incorrect_answers);
        
        // let positionAnswer = Math.floor(Math.random() * 3);
        // console.log("positionAnswer: " + positionAnswer);
         const incorrects = questions[i].incorrect_answers;
         const correct = questions[i].correct_answer;
         //console.log("arrayIncorrectas: " + incorrects);
         //console.log("arrayCorrectas: " + correct);
         unionAnswer = incorrects.push(correct);
         //let sortAnswer = incorrects.sort();
        //console.log(unionAnswer)
         
        var t = incorrects.sort(function(a,b) {return (Math.random()-0.5)});
        //console.log("t: "+t)
        // questions[i].incorrect_answers.forEach(incorrect => {
            //console.log(questions)
            t.forEach((incorrect) => {
            const Anwer = document.createElement("button");
            Anwer.classList.add("btn");
            
            Anwer.innerText = incorrect;
            divAnwer.appendChild(Anwer);
            //const btn = mainDiv.querySelectorAll("button");
            Anwer.addEventListener("click", ()=>{
                Anwer.classList.add("answer-ok");
                Anwer.disabled = false;
                if(incorrect ===correct){
                    score = score + 10;
                    // scoreCorrect(score);
                }
                // console.log("amount de clik: " + t);
                nextQuestion(score);
            })
        });
        
         const correctAnswer = document.createElement("button");
         correctAnswer.classList.add("btn");
         correctAnswer.classList.add("answer-ok");
         correctAnswer.classList.add("question-item");
         //correctAnswer.innerText = questions[i].correct_answer;
         correctAnswer.innerText = "correcta: "+questions[i].correct_answer;
        correctAnswer.onclick = nextQuestion;
        

        const divbuttonNext = document.createElement("button");
        divbuttonNext.classList.add("btn");
        divbuttonNext.classList.add("question-item");
        divbuttonNext.onclick = nextQuestion;
        // divbuttonNext.classList.add("next-active");
        divbuttonNext.innerText = "Next";   

        mainDiv.appendChild(container);
        container.appendChild(title);
        container.appendChild(divAnwer);

        divAnwer.appendChild(correctAnswer);
        container.appendChild(divbuttonNext);
}



//Funciones
const nextQuestion =(score)=>{

     mainDiv.innerHTML = "";
     form.reset();
     i++;
    //  console.log("amout=>" + questionNumber);
     console.log("i=>"+i);
     if(i==amount){
        //  alert("fin del juego");
         mainDiv.innerHTML = "";
        //  main.classList.remove("main-inactive");
         mainDiv.classList.add("main-question-none");
         //renderScore();
         scoreDiv.classList.add("container-score-activo");
         scoreCorrect(score);
     }
     renderQuestion();
     
}
const scoreCorrect = (score)=>{
    //score = score +10;
    // const scoreDiv = document.createElement("div");
    // const h1Score = document.createElement("h1");
    const pScore = document.createElement("p");
    // const buttonSCcore = document.createElement("button");
    // scoreDiv.classList.add("container-score");
    // h1Score.innerText = "Score";
    pScore.innerText = score;
    

    // scoreDiv.appendChild(h1Score);
    scoreDiv.appendChild(pScore);
    // scoreDiv.appendChild(buttonSCcore);

    console.log("score: " + score)
}
const exit = ()=>{
    location.reload();
}

form.onsubmit = createApiUrl;
// buttonNext.onclick = nextQuestion;
// nextB.onclick = nextQuestion;
buttonExit.onclick = exit;