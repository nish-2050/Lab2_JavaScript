function Question (questionText, questionNo){

    this.questionText = questionText;
    this.questionNo = questionNo; 
  }
  
  const q1 = new Question("Which of the following is not JavaScript Data Types?", 1);
  const q2 = new Question("Which type of JavaScript language is ___", 2);
  const q3 = new Question("The function and var are known as:", 3);
  const q4 = new Question("Which company developed JavaScript?", 4);
  const q5 = new Question("JavaScript ignores?", 5);
  
  function Answer(answerText){
  
    this.answerText = answerText
  }
  
  function QuestionAnswerPair (questionObj, multipleOptionsObj, correctAnswerObj) {
  
    this.questionObj = questionObj;
    this.multipleOptionsObj = multipleOptionsObj;
    this.correctAnswerObj = correctAnswerObj;
  
    this.checkAnswer = function(userAnswerText){
  
      if (correctAnswerObj.answerText === userAnswerText){
  
        console.log(`Answer is corrrect`);
        return true;
      }else{
        console.log(`Answer is corrrect`);
        return false;
      }
    }
  }
  
  const a1 = new Answer("Float")

  const qaPair1 = new QuestionAnswerPair ( 
    q1, [
      a1,new Answer("Undefined"),
      new Answer("Number"), new Answer("Boolean")
    ], 
    a1 
  );

  const a2 = new Answer("Object-Based")

  const qaPair2 = new QuestionAnswerPair ( 
    q2, [
      new Answer("Object-Oriented"),a2,
      new Answer("Assembly-language"), new Answer("High-level")
    ], 
    a2 
  );

  const a3 = new Answer("Declaration statements")
  const qaPair3 = new QuestionAnswerPair ( 
    q3, [
      a3,new Answer("Keywords"),
      new Answer("Data types"), new Answer("Prototypes")
    ], 
    a3 
  );

  const a4 = new Answer("Netscape")
  const qaPair4 = new QuestionAnswerPair ( 
    q4, [
      new Answer("Bell Labs"),new Answer("IBM"), 
      a4,new Answer("Sun Microsystems")
    ], 
    a4
  );

  const a5 = new Answer("All of the above")
  const qaPair5 = new QuestionAnswerPair ( 
    q5, [
      new Answer("spaces"),new Answer("tabs"), 
      new Answer("newlines"), a5
    ], 
    a5
  );
  
  
  function QuestionProgressBar (pageIndex, totalNoOfQuestions){
  
    this.pageIndex = pageIndex;
    this.totalNoOfQuestions = totalNoOfQuestions;
  
    this.getProgressText = function(){
  
      const progressText = `Question ${pageIndex + 1} of ${totalNoOfQuestions}`;
      return progressText;
    }
  }
  
  function ResultPage(score, markPercentage){
  
    this.score = score;
    this.markPercentage = markPercentage;
  
    this.getContent = function(){
  
      const content = `Your score : ${score}. Mark percentage is ${markPercentage} %`;
      return content;
    }
  
    this.display = function(){
  
      const content = this.getContent();
  
      const htmlFragment = 
      `
      <h1>Result<h1>
      <h3 id='score'>${content}</h3>
      `;
  
      const quizElement = document.getElementById("quiz");
      quizElement.innerHTML =  htmlFragment;
    }
  }
  
  function QuizPage (pageIndex, qaPair, qaPairArray) {
  
    this.pageIndex = pageIndex;
    this.qaPair = qaPair;
    this.qaPairArray = qaPairArray;
  
    this.display = function(){
  
      // Update the question
      const questionElement = document.getElementById("question");
      questionElement.innerHTML = 
        qaPair.questionObj.questionText;
  
      // Update all the answer choices
      for (let index = 0; index < qaPair.multipleOptionsObj.length; index ++){
  
        const answerObj = qaPair.multipleOptionsObj[index];
  
        const choiceID = "choice" + index;
  
        const answerChoiceElement = document.getElementById(choiceID);
        answerChoiceElement.innerHTML = answerObj.answerText; 
      }
  
      // Update question progress bar
  
      const progressElement = document.getElementById("progress");
  
      const progressBarObj = new QuestionProgressBar(
        this.pageIndex, qaPairArray.length);    
      progressElement.innerHTML = progressBarObj.getProgressText();
    }
  }
  
  function QuizApplication (qaPairArray) {
  
    this.qaPairArray = qaPairArray;
    this.score = 0;
    this.pageIndex = 0;
  
    this.start = function(){
  
      this.registerListeners();
      this.displayQuizPage();
    }
  
    this.registerListeners = function(){
  
      const currentQuizAppObject = this;
  
      const buttonsCount = qaPairArray[this.pageIndex].multipleOptionsObj.length;
  
      for (let index = 0; index < buttonsCount; index ++){
  
        const buttonId = `btn${index}`;
        const buttonElement = document.getElementById(buttonId);    
  
        console.log("Invoked successfully...")
  
        this.associateEventListener(buttonElement, currentQuizAppObject);
      }
    }
  
    this.associateEventListener = function(
      buttonElement, currentQuizAppObject){
  
      buttonElement.onclick = function(event){
  
        // Have a reference to 'quizApp' object
        // quizApp.handleUserAnswerSelection(event)
        // console.log("printing this...")
        // console.log(this);
        currentQuizAppObject.handleUserAnswerSelection(event);
      }  
    }
  
    this.handleUserAnswerSelection = function(event){
     
      // Get the user-response (answer)
      const target = event.currentTarget;
      const userAnswerText = target.children[0].innerText;
  
      // Check whether the user-response (answer) is correct or not
      const qaPair = qaPairArray[this.pageIndex];
  
      const outcome = qaPair.checkAnswer(userAnswerText);
      if (outcome){
        this.incrementScore();
      }
      // Increment the score
      
      this.nextPage();
    }
  
    this.getScore = function(){
      return this.score;
    }
  
    this.incrementScore = function(){
      this.score ++; 
    }
  
    this.getMarkPercentage = function(){
  
      // ( 2 / 5 ) * 100
  
      const percentage = (this.getScore() / this.qaPairArray.length ) * 100;
      return percentage;
    }
  
    this.nextPage = function(){
      
      if (this.pageIndex == (this.qaPairArray.length - 1)){
  
        console.log("Result Page.")
  
        const resultPage = new ResultPage(
          this.getScore(), this.getMarkPercentage()
        );
        resultPage.display();
      }else{
  
        this.initPage();
      }
    }
  
    this.initPage = function(){
  
      this.pageIndex = this.pageIndex + 1;
      this.registerListeners();
      this.displayQuizPage();
    }
  
  
    this.displayQuizPage = function(){
  
      console.log("Display Quiz Page")
  
      const qaPair = this.qaPairArray[this.pageIndex];
  
      const quizPage = new QuizPage(
        this.pageIndex, qaPair, this.qaPairArray);
      quizPage.display();
    }
  
  
  }
  
  const quizApp = new QuizApplication(
    [qaPair1, qaPair2, qaPair3, qaPair4, qaPair5]
  );
  quizApp.start();