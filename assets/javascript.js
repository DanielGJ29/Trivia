const form = document.getElementById("triviaForm");
const mainDiv = document.getElementById("question");
const main = document.getElementById("main");
const amout = document.getElementById("amout").value;
let questions = [];
let i = 0;
let answer = {};
const createApiUrl = (e)=>{
    e.preventDefault();
    
    const category = document.getElementById("category").value;
    const dificulty = document.getElementById("dificult").value;
    const type = document.getElementById("type").value;
    const API = `https://opentdb.com/api.php?amount=${amout}&difficulty=${dificulty}&type=${type}`
    console.log(API);
    fetchDataApi(API);
    main.classList.add("main-inactive");

}

const fetchDataApi = url=>{
    fetch(url)
    .then(response => response.json())
    .then(result => fillQuestion(result.results))
    .catch(err => console.log(err));
}

const fillQuestion = questionApi =>{
    questions = questionApi;
    //console.log(questionApi);
    
    renderQuestion();
}



const renderQuestion = () =>{

        const container = document.createElement("div");
        container.classList.add("main-info");
        const title = document.createElement("h1");
        title.innerText = questions[i].question;

        const divAnwer = document.createElement("div");
        divAnwer.classList.add("answer");

        questions[i].incorrect_answers.forEach(incorrect => {
            const incorrectAnwer = document.createElement("button");
            incorrectAnwer.classList.add("btn");
            incorrectAnwer.innerText = incorrect;
            divAnwer.appendChild(incorrectAnwer);
            //const btn = mainDiv.querySelectorAll("button");
            incorrectAnwer.onclick = nextQuestion;
            console.log(incorrectAnwer.textContent);
        });
        const correctAnswer = document.createElement("button");
        correctAnswer.classList.add("btn");
        correctAnswer.classList.add("question-item");
        correctAnswer.innerText = questions[i].correct_answer;
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
const nextQuestion =(text)=>{
    console.log(text);
     //console.log("click")
     mainDiv.innerHTML = "";
     i++;
     console.log(amout);
     console.log(i);
     if(i==amout){
         alert("fin del juego");
         mainDiv.innerHTML = "";
         main.classList.remove("main-inactive");
         mainDiv.classList.add("main-question-none");
         renderScore();
     }
     renderQuestion();
}
const renderScore = ()=>{
    console.log("Puntos");
}
// const nextQuestion = (e)=>{
//     e.preventDefault();
//     // 
//     console.log("click")
// }

form.onsubmit = createApiUrl;
// buttonNext.onclick = nextQuestion;
// nextB.onclick = nextQuestion;