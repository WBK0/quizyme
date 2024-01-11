import Answer from "./answer.type";

const checkMultiplechoiceAnswer = (answer : string[], answers : Answer) => {
  const correctAnswers = answers.filter((answerObject) => answerObject.isCorrect);

  if(correctAnswers.length !== answer.length) return correctAnswers.map((answer) => answer.id);

  for(let i = 0; i < correctAnswers.length; i++){
    if(!correctAnswers.find((answerObject) => answerObject.id === answer[i])){
      return correctAnswers.map((answer) => answer.id);
    }
  }
  
  return true;
};

export default checkMultiplechoiceAnswer;