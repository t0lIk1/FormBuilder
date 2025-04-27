import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Button, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import QuestionItem from "./QuestionItem";

const QuestionsList = ({
                         questions,
                         addQuestion,
                         updateQuestion,
                         deleteQuestion,
                         addOption,
                         updateOption,
                         deleteOption
                       }) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedQuestions = Array.from(questions);
    const [removed] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, removed);

    const updatedQuestions = reorderedQuestions.map((q, index) => ({
      ...q,
      order: index,
    }));

    updateQuestions(updatedQuestions);
  };

  return (
    <>
      {questions.length === 0 && (
        <Typography color="textSecondary" sx={{ mb: 2 }}>
          No questions added yet. Click "Add Question" to get started.
        </Typography>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions.map((question, index) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  index={index}
                  updateQuestion={updateQuestion}
                  deleteQuestion={deleteQuestion}
                  addOption={addOption}
                  updateOption={updateOption}
                  deleteOption={deleteOption}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        startIcon={<AddCircleIcon />}
        onClick={addQuestion}
        variant="outlined"
        sx={{ mt: 2 }}
      >
        Add Question
      </Button>
    </>
  );
};

export default QuestionsList;