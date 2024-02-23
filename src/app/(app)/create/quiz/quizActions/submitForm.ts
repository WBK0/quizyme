import { toast } from "react-toastify"

type OnSubmitProps = {
  formValues: FormValues,
  removeLocalStorage: Function,
  setFormValues: Function,
  router: any,
  method: 'create' | 'update',
  id?: string
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

export const onSubmit = async ({formValues, removeLocalStorage, setFormValues, router, method, id} : OnSubmitProps) => {
  if(!formValues.questions || formValues.questions?.length === 0){
    toast.error('You need to add at least one question');
    return;
  }

  toast.promise(
    async () => {
      const response = await fetch(method === 'create' ? '/api/create/quiz' : `/api/update/${id}/quiz`, {
        method: method === 'create' ? 'POST' : 'PATCH',
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
                time: Number(question.answerTime.toString().split(' ')[0]),
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
        throw new Error(`Error ${method === 'create' ? 'creating' : 'updating'} quiz`);
      }

      const data = await response.json();
    
      removeLocalStorage();
      setFormValues({});
    
      router.push(`/study/${formValues.topic.replaceAll(' ', '-')}-${data.id}`);
    },
    {
      pending: `${method === 'create' ? 'Creating' : 'Updating'} quiz...`,
      success: `Quiz ${method === 'create' ? 'created' : 'updated'}!`,
      error: `Error while ${method === 'create' ? 'creating' : 'updating'} quiz. Try again later!`
    }
  )
}