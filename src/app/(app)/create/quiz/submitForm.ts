import { toast } from "react-toastify"

type FormValues = {
  topic: string,
  visibility: string,
  tags: string,
  points: string,
  mainImage: string,
  collection: string,
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
  toast.promise(
    async () => {
      const response = await fetch('/api/create/quiz', {
        method: 'POST',
        body: JSON.stringify({
          topic: formValues.topic,
          visibility: formValues.visibility,
          tags: formValues.tags,
          pointsMethod: formValues.points,
          image: formValues.mainImage,
          description: formValues.description,
          collectionName: formValues.collection,
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

      if(!response.ok){
        throw new Error('Error creating quiz');
      }
    
    },
    {
      pending: 'Creating quiz...',
      success: 'Quiz created!',
      error: 'Error creating quiz'
    }
  )
}