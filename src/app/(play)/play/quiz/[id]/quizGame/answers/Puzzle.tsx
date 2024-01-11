import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import GameData from "../GameData.types";
import { useEffect, useState } from "react";

type PuzzleProps = {
  quizAnswers: GameData['question']['answers'];
  handleSubmit: (answer: string | string[]) => void;
  correctAnswer: string | string[] | null;
};

const Puzzle = ({ quizAnswers, handleSubmit, correctAnswer }: PuzzleProps) => {
  const colors = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow'];
  const [width, setWidth] = useState(window.innerWidth);
  const [answers, setAnswers] = useState<GameData['question']['answers']>(quizAnswers);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setAnswers((prevAnswers) => {
      prevAnswers.forEach((element, index) => {
        prevAnswers[index]['color'] = colors[index];
      });
      return prevAnswers;
    });
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    setAnswers((prevAnswers) => {
      const startIndex = result.source.index;
      const endIndex = result.destination.index;

      const updatedAnswers = [...prevAnswers];
      const [removed] = updatedAnswers.splice(startIndex, 1);
      updatedAnswers.splice(endIndex, 0, removed);

      return updatedAnswers;
    });
  };

  console.log(answers, correctAnswer)

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction={width < 768 ? 'vertical' : 'horizontal'}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`grid md:grid-cols-${quizAnswers.length} grid-cols-1 grid-flow-row w-full lg:px-3`}
          >
            {answers.map((answer, index) => (
              <Draggable
                key={index}
                draggableId={index.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    key={answer.id}
                    className={`${correctAnswer && correctAnswer[index] !== answers[index].id && 'opacity-20'} gap-4 mx-2.5 my-2.5 min-h-[240px] ${answer.color || colors[index]} rounded-xl px-3 py-12 text-white font-bold flex items-center relative`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {
                      ...!correctAnswer && {...provided.dragHandleProps}
                    }
                    tabIndex={-1}
                  >
                    <button className="absolute top-3 right-3 cursor-grabbing">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                      >
                        <rect width="24" height="3" rx="2" />
                        <rect y="6" width="24" height="3" rx="2" />
                        <rect y="12" width="24" height="3" rx="2" />
                      </svg>
                    </button>
                    <h1 className="text-center w-full">{answer.answer}</h1>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        type="button"
        className="bg-black text-white px-16 rounded-full py-2.5 font-bold w-fit mx-auto hover:bg-white hover:text-black duration-300 hover:ring-2 hover:ring-black"
        onClick={() => handleSubmit(answers.map((answer) => answer.id))}
      >
        SUBMIT
      </button>
    </DragDropContext>
  );
};

export default Puzzle;
