import {useNavigate, useParams} from "react-router-dom";
import {useTemplates} from "src/api/useTemplates";
import {useEffect, useState} from "react";
import {QuestionI, QuestionType, TemplateI} from "src/types/type";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useForm} from "src/api/useForm.ts";
import Loader from "src/components/Loader/Loader.tsx";

const AnswerFormPage = () => {
  const [template, setTemplate] = useState<TemplateI | null>(null);
  const {id} = useParams();
  const {getTemplateById} = useTemplates();
  const navigate = useNavigate();
  const {submitForm, loading} = useForm()
  useEffect(() => {
    const fetchTemplate = async () => {
      if (id) {
        const res = await getTemplateById(id);
        setTemplate(res);
        const emptyAnswers = res.questions?.reduce((acc, question: QuestionI): object => {
          acc[question.id] = question.type === QuestionType.CHECKBOX ? [] : "";
          return acc;
        }, {});
        formik.setValues(emptyAnswers || {});
      }
    };
    fetchTemplate();
  }, []);

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
  const onSubmit = async (values: any) => {
    try {
      const answers = Object.entries(values).map(([questionId, value]) => ({
        questionId: parseInt(questionId),
        value: value
      }));

      const submitData = {
        answers: answers
      };
      console.log(submitData)
      await submitForm(template.id, submitData);

      navigate(`/templates/${id}`);
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: getValidationRules(),
    onSubmit: onSubmit,
    enableReinitialize: true
  });

  const handleCheckbox = (questionId: number, option: string) => {
    const current = formik.values[questionId] || [];
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    formik.setFieldValue(String(questionId), updated);
  };

  const renderField = (question: QuestionI) => {
    const error = formik.touched[question.id] && formik.errors[question.id];

    const commonProps = {
      name: String(question.id),
      value: formik.values[question.id] || (question.type === QuestionType.CHECKBOX ? [] : ""),
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: !!error,
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
                      onChange={() => handleCheckbox(question.id, option)}
                      name={String(question.id)}
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

  if (loading) return <Loader/>;
  if (!template) return <div>Шаблон не найден</div>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{p: 4, my: 4}}>
        <Typography variant="h4">{template.title}</Typography>
        <Typography color="text.secondary">{template.description}</Typography>

        <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 3}}>
          {template.questions?.map(question => (
            <Box key={question.id} sx={{mb: 3}}>
              <Typography>
                {question.question}
                {question.isRequired && <span style={{color: 'red'}}>*</span>}
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
            disabled={!formik.isValid || loading}
          >
            Отправить
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AnswerFormPage;