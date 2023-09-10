const questionParent = document.querySelector(".question-container");
const optionsParent = document.querySelector(".option-container");
const nextBtn = document.querySelector(".next");
const quizCategory = document.querySelector(".quiz-category");
const qnsCount = document.querySelector(".qns-count");
const curScore = document.querySelector(".cur-score");




const URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

let quizes = [];
let currentQuestionIndex = 0;
let score = 0;


const getData = async(url) =>{
    try{
        const{ data: { results }}= await axios.get(url)
        return results;
    }catch(error){
        console.log(error);
    }
}

const getQuizes = async() =>{
    quizes = await getData(URL);
    console.log(quizes);
}

getQuizes();

function createQuestionAndOption(quizes,index){
    quizCategory.innerText =  quizes[index].category;
    qnsCount.innerText = `Q${index + 1}/${quizes.length}`;
    const questionEle = document.createElement("p");
    questionEle.innerText = quizes[index].question;
    questionParent.appendChild(questionEle);
    let options = [quizes[index].correct_answer,...quizes[index].incorrect_answers].sort(()=>Math.random() - 0.5);
    for(let option of options){
        const optionBtn = document.createElement("button");
        optionBtn.classList.add("button");
        optionBtn.innerText = option;
        optionsParent.appendChild(optionBtn);
    }
}

function disableOption(){
    document.querySelectorAll(".button").forEach((button)=>(button.disabled = true));
}

optionsParent.addEventListener("click",(e)=>{
    if(e.target.innerText === quizes[currentQuestionIndex].correct_answer){
        e.target.classList.add("correct");
        score++;
        curScore.innerText = `Score: ${score}`;
        disableOption();
    }else if(e.target.innerText !== quizes[currentQuestionIndex].correct_answer){
        e.target.classList.add("incorrect");
        disableOption();
    }
});

nextBtn.addEventListener("click",()=>{
    currentQuestionIndex++;
    questionParent.innerHTML = "";
    optionsParent.innerHTML = "";
    createQuestionAndOption(quizes,currentQuestionIndex);
})
setTimeout(()=>createQuestionAndOption(quizes,currentQuestionIndex),2000);