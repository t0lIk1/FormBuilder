import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Question {
  id: string;
  text: string;
}

export const TemplateCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleQuestionChange = (id: string, text: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Здесь будет логика сохранения шаблона
      console.log('Сохранение шаблона:', { name, questions });
    } catch (error) {
      console.error('Ошибка при сохранении шаблона:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Название шаблона"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          margin="normal"
        />

        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
          Вопросы
        </Typography>

        {questions.map((question) => (
          <Box key={question.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TextField
              fullWidth
              label="Вопрос"
              value={question.text}
              onChange={(e) => handleQuestionChange(question.id, e.target.value)}
              required
              margin="normal"
            />
            <IconButton
              onClick={() => handleRemoveQuestion(question.id)}
              color="error"
              sx={{ ml: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          startIcon={<AddIcon />}
          onClick={handleAddQuestion}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Добавить вопрос
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Создать шаблон
        </Button>
      </Box>
    </Paper>
  );
}; 