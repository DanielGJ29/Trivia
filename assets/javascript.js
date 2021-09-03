const form = document.getElementById("triviaForm");
const mainDiv = document.getElementById("question");
const main = document.getElementById("main");
let amount = document.getElementById("amout").value;
const buttonExit = document.getElementById("exit");
const scoreDiv = document.getElementById("container-score");
console.log(scoreDiv)
console.log("amount =>"+amount);


let questions = [];
let incorrectAnwer = [];
let unionAnswer = [];
let i = 0;
let answer = {};
score = 0;

const createApiUrl = (e)=>{
    e.preventDefault();
    
    amount = document.getElementById("amout").value;
    console.log("amount de la funcion=>"+amount);
    const category = document.getElementById("category").value;
    const dificulty = document.getElementById("dificult").value;
    const type = document.getElementById("type").value;
    const API = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${dificulty}&type=${type}`
    console.log(API);
    fetchDataApi(API,amount);
    main.classList.add("main-inactive");
}

const fetchDataApi = (url,amount)=>{
    fetch(url)
    .then(response => response.json())
    .then(result => fillQuestion(result.results, amount))
    .catch(err => console.log(err));
}

const fillQuestion = (questionApi, amount) =>{
    questions = questionApi;
    renderQuestion(amount);
}


const renderQuestion = (amount) =>{
        // amount =  amount;
        const container = document.createElement("div");
        container.classList.add("main-info");
        const title = document.createElement("h1");
        // title.innerText = questions[i].question;
        title.innerHTML = `<p class="questionMain">${questions[i].question}</p>`

        const divAnwer = document.createElement("div");
        divAnwer.classList.add("answer");
       
         const incorrects = questions[i].incorrect_answers;
         const correct = questions[i].correct_answer;
       
         unionAnswer = incorrects.push(correct);
        
         
        var t = incorrects.sort(function(a,b) {return (Math.random()-0.5)});
        //console.log("t: "+t)
        // questions[i].incorrect_answers.forEach(incorrect => {
            //console.log(questions)
            t.forEach((incorrect) => {
            const Anwer = document.createElement("button");
            Anwer.classList.add("btn");
            Anwer.classList.add("question-item");
            // Anwer.innerText = incorrect;
            Anwer.innerHTML = `${incorrect}`
            divAnwer.appendChild(Anwer);
            //const btn = mainDiv.querySelectorAll("button");
            Anwer.addEventListener("click", ()=>{
                Anwer.classList.add("question-item");
                
                Anwer.disabled = false;
                if(incorrect ===correct){
                    score = score + 10;
                    // scoreCorrect(score);
                }
                // console.log("amount de clik: " + t);
                nextQuestion(score);
            })
        });

        mainDiv.appendChild(container);
        container.appendChild(title);
        container.appendChild(divAnwer);
}


//Funciones
const nextQuestion =(score)=>{

     mainDiv.innerHTML = "";
     form.reset();
     i++;
     console.log("i=>"+i);
     if(i==amount){    
         mainDiv.innerHTML = "";
         mainDiv.classList.add("main-question-none");
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