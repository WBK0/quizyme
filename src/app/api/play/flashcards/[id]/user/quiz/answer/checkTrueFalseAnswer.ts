import Answer from "./answer.type";

const checkTrueFalseAnswer = (answer : string, answers : Answer) => {
  const correctAnswer = answers.find((answerObject) => answerObject.isCorrect);

  if(!correctAnswer){
    return false;
  }

  if(correctAnswer.id === answer){
    return true;
  }

  return correctAnswer.id;  
};

export default checkTrueFalseAnswer;