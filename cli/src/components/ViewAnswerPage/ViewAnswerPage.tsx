import { useNavigate, useParams } from "react-router-dom";
import { useTemplates } from "src/api/useTemplates";
import { useEffect, useState } from "react";
import { QuestionI, QuestionType, TemplateI } from "src/types/type";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  Chip
} from "@mui/material";
import { useForm } from "src/api/useForm.ts";
import Loader from "src/components/Loader/Loader.tsx";
import { useNowUser } from "src/context/UserContext";

const ViewFormResponsePage = () => {
  const [template, setTemplate] = useState<TemplateI | null>(null);
  const [formResponse, setFormResponse] = useState<any>(null);
  const { templateId, responseId } = useParams();
  const { getTemplateById, loading } = useTemplates();
  const { getFormResponse } = useForm();
  const { user } = useNowUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(responseId, templateId);
        const templateData = await getTemplateById(templateId);
        setTemplate(templateData);

        const responseData = await getFormResponse(responseId);
        console.log(responseData);
        setFormResponse(responseData);

        if (responseData.userId !== user.id) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [templateId, responseId, user.id, navigate, getTemplateById, getFormResponse]);

  const answersMap = formResponse?.answers?.reduce((acc, answer) => {
    acc[answer.questionId] = answer.value;
    return acc;
  }, {});

  const renderAnswer = (question: QuestionI) => {
    const answer = answersMap?.[question.id];

    switch (question.type) {
      case QuestionType.TEXT:
        return (
          <TextField
            fullWidth
            value={answer || ""}
            disabled
            variant="outlined"
            margin="normal"
          />
        );

      case QuestionType.TEXTAREA:
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            value={answer || ""}
            disabled
            variant="outlined"
            margin="normal"
          />
        );

      case QuestionType.NUMBER:
        return (
          <TextField
            fullWidth
            type="number"
            value={answer || ""}
            disabled
            variant="outlined"
            margin="normal"
          />
        );

      case QuestionType.CHECKBOX:
        return (
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormGroup>
              {question.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={Array.isArray(answer) ? answer.includes(option) : false}
                      disabled
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          </FormControl>
        );

      case QuestionType.SELECT:
        return (
          <FormControl fullWidth margin="normal" disabled>
            <InputLabel>{question.question}</InputLabel>
            <Select
              value={answer || ""}
              label={question.question}
            >
              {question.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      default:
        return (
          <TextField
            fullWidth
            value={answer || ""}
            disabled
            variant="outlined"
            margin="normal"
          />
        );
    }
  };

  if (loading) return <Loader />;
  if (!template || !formResponse) return <div>Данные не найдены</div>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {template.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Ответ от {new Date(formResponse.submittedAt).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box component="form">
          {template.questions?.map((question) => (
            <Box key={question.id} sx={{ mb: 3 }}>
              <Typography fontWeight="bold" gutterBottom>
                {question.question}
                {question.isRequired && <span style={{ color: 'red' }}>*</span>}
              </Typography>
              {question.description && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {question.description}
                </Typography>
              )}
              {renderAnswer(question)}
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewFormResponsePage;