// pages/TemplateCreatePage.tsx
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useTemplates} from "src/api/useTemplates.ts";

// import { useTemplates } from "../api/useTemplates";

export enum QuestionType {
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  NUMBER = 'NUMBER',
  CHECKBOX = 'CHECKBOX',
  SELECT = 'SELECT',
}


const TemplateCreatePage = () => {
  const navigate = useNavigate();
  const { createTemplates, loading } = useTemplates();
  const {register, handleSubmit, watch} = useForm();
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const onSubmit = async (data) => {
    try {
      await createTemplates({
        ...data,
        questions,
        tags: tags.map(tag => tag.name),
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: "",
      type: QuestionType.TEXT,
      isRequired: false,
      options: [],
      order: questions.length,
      showInTable: false,
      description: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? {...q, [field]: value} : q))
    );
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const addOption = (questionId) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {...q, options: [...q.options, ""]};
        }
        return q;
      })
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return {...q, options: newOptions};
        }
        return q;
      })
    );
  };

  const deleteOption = (questionId, optionIndex) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions.splice(optionIndex, 1);
          return {...q, options: newOptions};
        }
        return q;
      })
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedQuestions = Array.from(questions);
    const [removed] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, removed);

    // Update order property based on new position
    const updatedQuestions = reorderedQuestions.map((q, index) => ({
      ...q,
      order: index,
    }));

    setQuestions(updatedQuestions);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.some(tag => tag.name === tagInput.trim())) {
      setTags([...tags, {name: tagInput.trim()}]);
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag.name !== tagToDelete.name));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{my: 4}}>
        <Button
          startIcon={<ArrowBackIcon/>}
          onClick={() => navigate("/templates")}
          sx={{mb: 2}}
        >
          Back to Templates
        </Button>

        <Typography variant="h4" component="h1" gutterBottom>
          Create New Template
        </Typography>

        <Paper sx={{p: 3, mb: 3}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("title", {required: true})}
              label="Template Title"
              fullWidth
              margin="normal"
              required
            />

            <TextField
              {...register("description")}
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />

            <TextField
              {...register("topic")}
              label="Topic"
              fullWidth
              margin="normal"
            />

            <Box sx={{my: 2}}>
              <Typography variant="subtitle1" gutterBottom>
                Tags
              </Typography>
              <Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 2}}>
                <TextField
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  label="Add tag"
                  size="small"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleTagAdd();
                    }
                  }}
                />
                <Button onClick={handleTagAdd}>Add</Button>
              </Box>
              <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                {tags.map((tag) => (
                  <Chip
                    key={tag.name}
                    label={tag.name}
                    onDelete={() => handleTagDelete(tag)}
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{my: 3}}/>

            <Typography variant="h6" gutterBottom>
              Questions
            </Typography>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {questions.map((question, index) => (
                      <Draggable
                        key={question.id}
                        draggableId={question.id}
                        index={index}
                      >
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            sx={{p: 2, mb: 2}}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Box
                                {...provided.dragHandleProps}
                                sx={{cursor: "move"}}
                              >
                                <Typography variant="subtitle1">
                                  Question #{index + 1}
                                </Typography>
                              </Box>
                              <IconButton
                                onClick={() => deleteQuestion(question.id)}
                              >
                                <DeleteIcon/>
                              </IconButton>
                            </Box>

                            <TextField
                              value={question.question}
                              onChange={(e) =>
                                updateQuestion(
                                  question.id,
                                  "question",
                                  e.target.value
                                )
                              }
                              label="Question Text"
                              fullWidth
                              margin="normal"
                              required
                            />

                            <TextField
                              value={question.description}
                              onChange={(e) =>
                                updateQuestion(
                                  question.id,
                                  "description",
                                  e.target.value
                                )
                              }
                              label="Description (optional)"
                              fullWidth
                              margin="normal"
                              multiline
                              rows={2}
                            />

                            <FormControl fullWidth margin="normal">
                              <InputLabel>Question Type</InputLabel>
                              <Select
                                value={question.type}
                                onChange={(e) =>
                                  updateQuestion(
                                    question.id,
                                    "type",
                                    e.target.value
                                  )
                                }
                                label="Question Type"
                              >
                                {Object.values(QuestionType).map((type) => (
                                  <MenuItem key={type} value={type}>
                                    {type}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>

                            {(question.type === QuestionType.SELECT ||
                              question.type === QuestionType.CHECKBOX) && (
                              <Box sx={{mt: 2, mb:2}}>
                                <Typography variant="subtitle2">
                                  Options
                                </Typography>
                                {question.options.map((option, optionIndex) => (
                                  <Box
                                    key={optionIndex}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      mb: 1,
                                    }}
                                  >
                                    <TextField
                                      value={option}
                                      onChange={(e) =>
                                        updateOption(
                                          question.id,
                                          optionIndex,
                                          e.target.value
                                        )
                                      }
                                      fullWidth
                                      size="small"
                                      required
                                    />
                                    <IconButton
                                      onClick={() =>
                                        deleteOption(question.id, optionIndex)
                                      }
                                    >
                                      <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                  </Box>
                                ))}
                                <Button
                                  startIcon={<AddCircleIcon/>}
                                  onClick={() => addOption(question.id)}
                                  size="small"
                                >
                                  Add Option
                                </Button>
                              </Box>
                            )}

                            <Box>
                              <Box sx={{display: "flex", gap: 2}}>
                                <FormControl fullWidth >
                                  <InputLabel id="required-label" >
                                    Required
                                  </InputLabel>
                                  <Select
                                    labelId="required-label"
                                    id="required"
                                    label="Required"
                                    value={question.isRequired}
                                    onChange={(e) =>
                                      updateQuestion(
                                        question.id,
                                        "isRequired",
                                        e.target.value
                                      )
                                    }
                                    size="small"
                                  >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                  </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                  <InputLabel id="show-label" >Show in table</InputLabel>
                                  <Select
                                    labelId="show-label"
                                    id="show"
                                    label="Show in table"
                                    value={question.showInTable}
                                    onChange={(e) =>
                                      updateQuestion(
                                        question.id,
                                        "showInTable",
                                        e.target.value
                                      )
                                    }
                                    lable="Show in table"
                                    size="small"
                                  >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            </Box>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <Button
              startIcon={<AddCircleIcon/>}
              onClick={addQuestion}
              variant="outlined"
              sx={{mt: 2}}
            >
              Add Question
            </Button>

            <Box sx={{mt: 4, display: "flex", justifyContent: "flex-end"}}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon/>}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Template"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default TemplateCreatePage;