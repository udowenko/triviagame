
//timer which beigns when start button is clicked

$("#start").on("click", function(){

  var count= 30;
  setInterval(function(){
  count= count - 1;

  if (count >= 0)
  {
      $("#start").text(count + "  seconds ");
  }
     
  if (count === 0){
    alert('Sorry, you are out of time');
    clearInterval(count);
     //counter ended, do something here
     // return;
  }
}, 1000); //1000 will  run it every 1 second
  //Do code for showing the number of seconds here
});

(function() {
  function buildQuiz() {
    //store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // storing the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
         <br>
         <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `Your Score: ${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "What animal is on House Baratheon's sigil?",
      answers: {
        a: "BOAR",
        b: "BEAR",
        c: "STAG",
        d: "LION"
      },
      correctAnswer: "c"
    },
    {
      question: "Which of Daenerys Targaryen's three dragons are the largest?",
      answers: {
        a: "RHAEGAL",
        b: "DROGON",
        c: "VISERION",
        d: "BALERION"
      },
      correctAnswer: "b"
    },
    {
      question: "Who teaches Arya Stark to 'stick 'em with the pointy end?",
      answers: {
        a: "SYRIO FOREL",
        b: "JAIME LANNISTER",
        c: "NED STARK",
        d: "JON SNOW"
      },
      correctAnswer: "d"
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();