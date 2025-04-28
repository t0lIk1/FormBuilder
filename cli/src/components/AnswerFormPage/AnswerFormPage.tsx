import { useNavigate, useParams } from "react-router-dom";
import { useTemplates } from "src/api/useTemplates";
import { useEffect, useState } from "react";
import { QuestionI, QuestionType, TemplateI } from "src/types/type";
import { Box, Button, Checkbox, TextField, Typography, Paper, Container, Select, MenuItem, FormControl, FormControlLabel, FormGroup, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const AnswerFormPage = () => {
  const [template, setTemplate] = useState<TemplateI | null>(null);
  const { id } = useParams();
  const { getTemplateById, loading } = useTemplates();
  const navigate = useNavigate();

  // 1. Загрузка шаблона
  useEffect(() => {
    const fetchTemplate = async () => {
      if (id) {
        const res = await getTemplateById(id);
        setTemplate(res);
        // Инициализация пустых значений для формы
        const emptyAnswers = res.questions?.reduce((acc, question: QuestionI): object => {
          console.log(acc, question)
          acc[question.id] = question.type === QuestionType.CHECKBOX ? [] : "";
          return acc;
        }, {});
        formik.setValues(emptyAnswers || {});
      }
    };
    fetchTemplate();
  }, [id]);

  // 2. Простая валидация - проверяем только обязательные поля
  const getValidationRules = () => {
    const rules = {};
    template?.questions?.forEach(question => {
      if (!question.isRequired) return;

      if (question.type === QuestionType.CHECKBOX) {
        rules[question.id] = Yup.array()
          .min(1, 'Выберите хотя бы один вариант')
          .required('Это обязательный вопрос');
      } else if (question.type === QuestionType.NUMBER) {
        rules[question.id] = Yup.number().required('Введите число');
      } else {
        rules[question.id] = Yup.string().required('Это обязательный вопрос');
      }
    });
    return Yup.object().shape(rules);
  };

  // 3. Форма с валидацией
  const formik = useFormik({
    initialValues: {},
    validationSchema: getValidationRules(),
    onSubmit: (values) => {
      console.log("Ответы:", values);
      navigate(`/templates/${id}`);
    },
    enableReinitialize: true
  });

  // 4. Обработка чекбоксов (исправленная версия)
  const handleCheckbox = (questionId: number, option: string) => {
    const current = formik.values[questionId] || []; // Используем questionId вместо question.id
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    formik.setFieldValue(String(questionId), updated);
  };

  // 5. Рендер полей с валидацией
  const renderField = (question: QuestionI) => {
    const error = formik.touched[question.id] && formik.errors[question.id];

    const commonProps = {
      name: String(question.id),
      value: formik.values[question.id] || (question.type === QuestionType.CHECKBOX ? [] : ""),
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!error,
      helperText: error,
      required: question.isRequired
    };

    switch (question.type) {
      case QuestionType.TEXT:
        return <TextField fullWidth {...commonProps} />;

      case QuestionType.TEXTAREA:
        return <TextField multiline rows={4} fullWidth {...commonProps} />;

      case QuestionType.NUMBER:
        return <TextField type="number" fullWidth {...commonProps} />;

      case QuestionType.CHECKBOX:
        return (
          <FormControl error={!!error}>
            <FormGroup>
              {question.options?.map(option => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={(formik.values[question.id] || []).includes(option)}
                      onChange={() => handleCheckbox(question.id, option)} // Передаем question.id
                      name={String(question.id)} // Добавляем name для корректной работы Formik
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case QuestionType.SELECT:
        return (
          <FormControl fullWidth error={!!error}>
            <Select {...commonProps}>
              {question.options?.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      default:
        return <TextField fullWidth {...commonProps} />;
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (!template) return <div>Шаблон не найден</div>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4">{template.title}</Typography>
        <Typography color="text.secondary">{template.description}</Typography>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          {template.questions?.map(question => (
            <Box key={question.id} sx={{ mb: 3 }}>
              <Typography>
                {question.question}
                {question.isRequired && <span style={{ color: 'red' }}>*</span>}
              </Typography>
              {question.description && (
                <Typography variant="body2" color="text.secondary">
                  {question.description}
                </Typography>
              )}
              {renderField(question)}
            </Box>
          ))}

          <Button
            type="submit"
            variant="contained"
            disabled={!formik.isValid}
          >
            Отправить
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AnswerFormPage;