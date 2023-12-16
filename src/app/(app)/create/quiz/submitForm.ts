import { toast } from "react-toastify"

type OnSubmitProps = {
  formValues: FormValues,
  removeLocalStorage: Function,
  setFormValues: Function,
  router: any,
}

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

export const onSubmit = async ({formValues, removeLocalStorage, setFormValues, router} : OnSubmitProps) => {
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

      const data = await response.json();
    
      removeLocalStorage();
      setFormValues({});
    
      router.push(`/study/${formValues.topic.replaceAll(' ', '-')}-${data.id}`);
    },
    {
      pending: 'Creating quiz...',
      success: 'Quiz created!',
      error: 'Error creating quiz'
    }
  )
}