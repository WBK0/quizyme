import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import GameData from "../GameData.types";
import { useEffect } from "react";

type PuzzleProps = {
  answers: GameData['question']['answers'];
  setAnswers: React.Dispatch<React.SetStateAction<GameData['question']['answers']>>;
};

const Puzzle = ({ answers, setAnswers }: PuzzleProps) => {
  const colors = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow'];

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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-row w-full px-12"
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
                    className={`bg-blue w-1/4 gap-4 mx-2.5 min-h-[240px] ${answer.color || colors[index]} rounded-xl px-3 py-12 text-white font-bold flex items-center relative`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
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
    </DragDropContext>
  );
};

export default Puzzle;
