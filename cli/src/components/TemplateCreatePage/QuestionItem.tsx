import {
  Box,
  Typography,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { QuestionType } from "src/types/type";
import { Draggable } from '@hello-pangea/dnd';

const QuestionItem = ({
                        question,
                        index,
                        updateQuestion,
                        deleteQuestion,
                        addOption,
                        updateOption,
                        deleteOption
                      }) => {
  return (
    <Draggable draggableId={question.id} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{ p: 2, mb: 2 }}
          elevation={2}
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
              sx={{ cursor: "move", display: 'flex', alignItems: 'center' }}
            >
              <Typography variant="subtitle1">
                Question #{index + 1}
              </Typography>
            </Box>
            <IconButton
              onClick={() => deleteQuestion(question.id)}
              aria-label="delete question"
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          <TextField
            value={question.question}
            onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
            label="Question Text"
            fullWidth
            margin="normal"
            autoFocus
            error={!question.question.trim()}
            helperText={!question.question.trim() ? "Question text is required" : ""}
          />

          <TextField
            value={question.description}
            onChange={(e) => updateQuestion(question.id, "description", e.target.value)}
            label="Description (optional)"
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Question Type</InputLabel>
            <Select
              value={question.type}
              onChange={(e) => updateQuestion(question.id, "type", e.target.value)}
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
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle2">Options</Typography>
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
                    onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                    fullWidth
                    size="small"
                    required
                    error={!option.trim()}
                    helperText={!option.trim() ? "Option text is required" : ""}
                  />
                  <IconButton
                    onClick={() => deleteOption(question.id, optionIndex)}
                    aria-label="delete option"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddCircleIcon />}
                onClick={() => addOption(question.id)}
                size="small"
                variant="outlined"
              >
                Add Option
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Required</InputLabel>
              <Select
                label="Required"
                value={question.isRequired}
                onChange={(e) => updateQuestion(question.id, "isRequired", e.target.value)}
                size="small"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Show in table</InputLabel>
              <Select
                label="Show in table"
                value={question.showInTable}
                onChange={(e) => updateQuestion(question.id, "showInTable", e.target.value)}
                size="small"
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
      )}
    </Draggable>
  );
};

export default QuestionItem;