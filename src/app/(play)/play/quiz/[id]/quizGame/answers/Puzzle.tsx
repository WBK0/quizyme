import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import GameData from "../GameData.types";

const Puzzle = ({ answers, setAnswers }: { answers: GameData['question']['answers'] }) => {
  const colors = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow'];

  const handleDragEnd = (result: any) => {
    setAnswers((prevAnswers) => {
      console.log(prevAnswers, result)

      let newArray = prevAnswers;
      newArray[result.destination.index] = prevAnswers[result.source.index];
      newArray[result.source.index] = prevAnswers[result.destination.index];

      console.log(newArray, result)

      return newArray;
    })
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
                    className={`bg-blue w-1/4 gap-4 mx-2.5 min-h-[240px] ${colors[index]} rounded-xl px-3 py-12 text-white font-bold flex items-center relative`}
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