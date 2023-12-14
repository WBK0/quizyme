type FormValues = {
  topic: string,
  visibility: string,
  tags: string,
  points: string,
  mainImage: string,
  description: string,
  questions: Array<{
    question: string,
    answerPoints: string,
    answerTime: string,
    responseType: string,
    image: string,
    answers: Array<{
      answer: string,
      isCorrect: boolean,
    }>
  }>

}

export const onSubmit = async (formValues : FormValues) => {
  const result = await fetch('/api/create/quiz', {
    method: 'POST',
    body: JSON.stringify({
      topic: formValues.topic,
      visibility: formValues.visibility,
      tags: formValues.tags,
      pointsMethod: formValues.points,
      image: formValues.mainImage,
      description: formValues.description,
      collectionId: "657a113b54eb35a503e8ada1",
      questions:
        formValues.questions.map((question: any) => {
          return {
            question: question.question,
            points: Number(question.answerPoints),
            time: Number(question.answerTime.split(' ')[0]),
            type: question.responseType,
            image: question.image,
            answers:
              question.answers.map((answer: any) => {
                return {
                  answer: answer.answer,
                  isCorrect: answer.isCorrect,
                }
              })
          }
        }),
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}