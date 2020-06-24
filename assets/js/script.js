let imgbox = document.querySelector(".imgbox");
let title = document.querySelector(".title");
let options = document.querySelector(".list");
let quizContainer = document.querySelector(".quizcontainer");
let homeContainer = document.querySelector(".homecontainer");
let scorecard = document.querySelector(".scorecard");
let progressbar = document.querySelector("progress");
let table = document.querySelector(".table");
let nextbtn = document.querySelector(".next");
let btnbox = document.querySelector(".buttonbox")
btnbox.style.display = "none";

class Quiz {
   constructor (questions, answers = [], activeIndex = 0, score = 0) {
      this.questions = questions;
      this.activeIndex = activeIndex;
      this.score = score;
      this.answers = answers;
   }
   checkAnswer(userAnswer) {
      return (this.questions[this.activeIndex].answer == userAnswer);
   }
   restart() {
      localStorage.clear();

      this.activeIndex = 0;
      this.score = 0;
      this.answers = [];
      this.createUI();
   }
   reset(){
      this.activeIndex = 0;
      this.score = 0;
      this.answers = 0;
      localStorage.clear();
   }
   incrementScore() {
      this.score += 1;
   }
   showScorecard() {

      nextbtn.disabled = true;
      quizContainer.style.display = "none";
      scorecard.style.display = "block";
      scorecard.innerHTML = `         <div class="sheet">
      <table class="table">
         <tr>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>Your Answer</th>
            <th>Right/Wrong</th>
         </tr>
      </table>
   </div>`;

      this.questions.forEach(quest => {
// DISPLAY SCORECARD TABLE
         let row = document.createElement("tr");
         row.innerHTML = `<td>${quest.title}</td><td>${quest.answer}</td><td>${this.answers[this.questions.indexOf(quest)]}</td><td style = "text-align: center">${quest.answer == this.answers[this.questions.indexOf(quest)] ? "✓" : "x"}</td>`
         document.querySelector(".table").append(row);
         
      })
      let final = document.createElement("p");
      final.innerText = `Final Score: ${this.score}/10`;
      document.querySelector(".sheet").append(final);
      final.style.color = "green";
      final.style.margin = "1rem";

      this.activeIndex = 0;
      this.score = 0;
      this.answers = 0;
      localStorage.clear();
   }
   
   nextQuestion() {
      
      progressbar.value = ((this.activeIndex + 1) * 10);
   //   document.querySelector(".prognum").innerText = this.activeIndex + 1;
      
      this.answers.push(userAns);
      if (this.checkAnswer(userAns)) {
         this.incrementScore();
      }

      if (this.activeIndex == this.questions.length - 1) {
         return this.showScorecard();
      }
       else if (this.activeIndex < this.questions.length) {
          this.activeIndex = this.activeIndex + 1;
         //  localStorage.quizSelected = JSON.stringify(this);
         localStorage.clear();

          localStorage.setItem("quizSelected", JSON.stringify(this));
         
          this.questions[this.activeIndex].createQUI();
       }

      // localStorage.clear();
      // localStorage.setItem("quizSelected", JSON.stringify(this));
      // localStorage.setItem("quizSelected", this.toString())

   }
   goHome() {
      quizContainer.style.display = "none";
      homeContainer.style.display = "flex";
      scorecard.style.display = "none";
      localStorage.clear();
      this.activeIndex = 0;
      this.score = 0;
      this.answers = [];
      btnbox.style.display = "none";
   }
   createUI() {
      btnbox.style.display = "block";
      homeContainer.style.display = "none";
      scorecard.style.display = "none";
      quizContainer.style.display = "block";

      progressbar.value = ((this.activeIndex + 1) * 10);
      // document.querySelector(".prognum").innerText = this.activeIndex;

      document.querySelector(".restart").addEventListener("click", () => {
         this.restart();
      });
      
      document.querySelector(".home").addEventListener("click", () => {
         this.goHome();
      })
      
      document.querySelector(".next").addEventListener("click", () => {
         localStorage.clear();
         this.nextQuestion()
      })

      this.questions[this.activeIndex].createQUI();

      // if (document.getElementById("selected")) {
         // var userAns = document.getElementById("selected").innerText;
      // }

   }
}

class Question {
   constructor (image, title, opts, answer) {
      this.image = image;
      this.title = title;
      this.opts = opts;
      this.answer = answer;
   }
   createQUI() {
      imgbox.innerHTML = `<img src="${this.image}" alt="#">`;
      title.innerHTML = `<h2>Q. ${this.title}</h2>`;
      options.innerHTML = "";
         this.opts.forEach(opt => {
            let item = document.createElement("li");
            item.innerText = opt;
            item.classList.add("option")
            options.append(item);
      });
      // 
      // 
      nextbtn.disabled = true;

      document.querySelectorAll(".option").forEach(li => {
         li.addEventListener("click", (e) => {
            document.querySelectorAll(".option").forEach(op => {
               op.id = "";
            });
            e.target.id = "selected";
            // console.log(e.target.innerText);
            userAns = e.target.innerText;
            nextbtn.disabled = false;

         })
      })
      // 
      // above from qui
   }
}

var userAns = "";




document.querySelectorAll(".box").forEach(box => box.addEventListener("click", (e) => 
{
   if (e.target.closest("div").id == "one") {
      // localStorage.setItem("quizSelected", quiz1.toString());
      localStorage.clear();
      (new Quiz([q11, q12, q13, q14, q15, q16, q17, q18, q19, q110])).createUI();
   }
   else if (e.target.closest("div").id == "two") { 
      // localStorage.setItem("quizSelected", riverQuiz.toString());
      localStorage.clear();
      (new Quiz([q21, q22, q23, q24, q25, q26, q27, q28, q29, q210])).createUI()
   }
}
));

if (localStorage.quizSelected) {
   let qArr = [];
   let quizObj = JSON.parse(localStorage.quizSelected)
   quizObj.questions.forEach(ques => {
      let q = new Question(ques.image, ques.title, ques.opts, ques.answer)
      qArr.push(q);
   });
   (new Quiz(qArr, quizObj.answers, quizObj.activeIndex, quizObj.score)).createUI();
}