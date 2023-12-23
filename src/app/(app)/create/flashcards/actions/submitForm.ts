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
  mainImage: string,
  collection: string,
  description: string,
  flashcards: Array<{
    concept: string,
    definition: string,
  }>
}

export const onSubmit = async ({formValues, removeLocalStorage, setFormValues, router} : OnSubmitProps) => {
  if(!formValues.flashcards || formValues.flashcards?.length < 5){
    toast.error('You need to add at least five flashcards');
    return;
  }

  toast.promise(
    async () => {
      const response = await fetch('/api/create/flashcards', {
        method: 'POST',
        body: JSON.stringify({
          topic: formValues.topic,
          visibility: formValues.visibility,
          tags: formValues.tags,
          image: formValues.mainImage,
          description: formValues.description,
          collectionName: formValues.collection,
          flashcards:
            formValues.flashcards.filter((flashcard) => flashcard.concept.length >= 2 || flashcard.definition.length >= 2).map((flashcard: any) => {
              return {
                concept: flashcard.concept,
                definition: flashcard.definition,
              }
            }),
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(!response.ok){
        throw new Error('Error creating flashcards');
      }

      const data = await response.json();
    
      removeLocalStorage();
      setFormValues({});
    
      router.push(`/study/${formValues.topic.replaceAll(' ', '-')}-${data.id}`);
    },
    {
      pending: 'Creating flashcards...',
      success: 'Flashcards created!',
      error: 'Error creating flashcards'
    }
  )
}