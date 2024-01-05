import Answer from "./answer.type";

const checkPuzzleAnswer = (answer : string[], answers : Answer) => {
  for(let i = 0; i < answers.length; i++){
    if(answers[i].id !== answer[i]){
      return answers;
    }
  }

  return true;
};

export default checkPuzzleAnswer;