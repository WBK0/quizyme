import ConfirmPage from "./ConfirmPage/ConfirmPage";

type ContentProps = {
  data: {
    image: string;
    title: string;
    length: number;
    topic: string;
    type: 'quiz' | 'flashcards';
  }
}

const Content = ({ data } : ContentProps) => {
  return (
    <ConfirmPage 
      data={data}
    />
  )
}

export default Content;