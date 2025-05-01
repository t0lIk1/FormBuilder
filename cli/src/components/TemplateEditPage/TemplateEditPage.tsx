import React, {useContext, useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import {useTemplates} from 'src/api/useTemplates';
import {useNavigate, useParams} from "react-router-dom";
import Loader from "src/components/Loader/Loader.tsx";
import {QuestionI, QuestionType, TagI, TemplateI} from 'src/types/type';
import {NotificationContext} from 'src/context/NotificationContext';

const templateValidationSchema = yup.object({
  topic: yup.string().required('Topic is required'),
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  isPublic: yup.boolean(),
});

const questionValidationSchema = yup.object({
  question: yup.string().required('Question text is required'),
  description: yup.string(),
  type: yup.string().oneOf(Object.values(QuestionType)).required(),
  isRequired: yup.boolean(),
  options: yup.array().when('type', {
    is: (type: QuestionType) => [QuestionType.CHECKBOX, QuestionType.SELECT].includes(type),
    then: yup.array().of(yup.string().required('Option cannot be empty')).min(1, 'At least one option is required'),
  }),
  showInTable: yup.boolean(),
});

const TemplateEditPage = () => {
  const {id} = useParams();
  const [tags, setTags] = useState<TagI[]>([]);
  const [tagInput, setTagInput] = useState('');
  const {updateTemplate, loading} = useTemplates();
  const [questions, setQuestions] = useState<QuestionI[]>([]);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {getTemplateById} = useTemplates();
  const {showNotification} = useContext(NotificationContext);


  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const template = await getTemplateById(Number(id));
        templateFormik.setValues({
          topic: template.topic,
          title: template.title,
          description: template.description,
          isPublic: template.isPublic,
        });

        setQuestions(template.questions.map(q => ({
          question: q.question,
          description: q.description,
          type: q.type as QuestionType,
          isRequired: q.isRequired,
          options: q.options,
          showInTable: q.showInTable
        })));

        setTags(template.tags.map((tag: TagI) => ({
          id: tag.id,
          name: tag.name,
        })));
      } catch (error) {
        showNotification('Failed to load template', "error");
        navigate('/templates', {replace: true});
      }
    };

    loadTemplate();
  }, []);


  const templateFormik = useFormik<TemplateI>({
    initialValues: {
      topic: '',
      title: '',
      description: '',
      isPublic: false,
    },
    validationSchema: templateValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true)
        await updateTemplate({
          ...values,
          questions,
          tags: tags.map(tag => tag.name),
        }, id);
        navigate('/');
      } catch (error) {
        showNotification('Error updating template:', "error");
      }
    },
  });

  const addQuestion = () => {
    const newQuestion: QuestionI = {
      question: '',
      description: '',
      type: QuestionType.TEXT,
      isRequired: false,
      showInTable: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, updatedData: Partial<QuestionI>) => {
    setQuestions(questions.map((question, i) =>
      i === index ? {...question, ...updatedData} : question
    ));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedQuestions = Array.from(questions);
    const [removed] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, removed);

    setQuestions(reorderedQuestions);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.some(tag => tag.name === tagInput.trim())) {
      setTags([...tags, {id: `tag-${Date.now()}`, name: tagInput.trim()}]);
      setTagInput('');
    }
  };

  const removeTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  if (loading) return <Loader/>

  return (
    <Container maxWidth="lg">
      <Box component="form" onSubmit={templateFormik.handleSubmit} sx={{p: 3}}>
        <Typography variant="h4" gutterBottom>Update Template</Typography>
        <Paper elevation={2} sx={{p: 3, mb: 3}}>
          <Typography variant="h6" gutterBottom>Template Information</Typography>

          {/* ... (остальная разметка формы остается такой же) ... */}

          {/* Submit Button */}
          <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2}}>
            <Button
              variant="outlined"
              onClick={() => navigate('/templates')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={templateFormik.isSubmitting}
              startIcon={templateFormik.isSubmitting ? <CircularProgress size={20}/> : null}
            >
              {templateFormik.isSubmitting ? 'Updating...' : 'Update Template'}
            </Button>
          </Box>
        </Paper>
        {/* Template Information Section */}
        <Paper elevation={2} sx={{p: 3, mb: 3}}>
          <Typography variant="h6" gutterBottom>Template Information</Typography>

          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <TextField
              fullWidth
              id="topic"
              name="topic"
              label="Topic"
              value={templateFormik.values.topic}
              onChange={templateFormik.handleChange}
              error={templateFormik.touched.topic && Boolean(templateFormik.errors.topic)}
              helperText={templateFormik.touched.topic && templateFormik.errors.topic}
            />

            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={templateFormik.values.title}
              onChange={templateFormik.handleChange}
              error={templateFormik.touched.title && Boolean(templateFormik.errors.title)}
              helperText={templateFormik.touched.title && templateFormik.errors.title}
            />

            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={templateFormik.values.description}
              onChange={templateFormik.handleChange}
              error={templateFormik.touched.description && Boolean(templateFormik.errors.description)}
              helperText={templateFormik.touched.description && templateFormik.errors.description}
            />

            <FormControlLabel
              control={
                <Checkbox
                  id="isPublic"
                  name="isPublic"
                  checked={templateFormik.values.isPublic}
                  onChange={templateFormik.handleChange}
                />
              }
              label="Make this template public"
            />

            <Box>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <TextField
                  label="Add Tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  sx={{flexGrow: 1}}
                />
                <Button onClick={addTag} variant="outlined">Add</Button>
              </Box>
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1}}>
                {tags.map(tag => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    onDelete={() => removeTag(tag.id)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Questions Section */}
        <Paper elevation={2} sx={{p: 3, mb: 3}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
            <Typography variant="h6">Questions</Typography>
            <Button onClick={addQuestion} startIcon={<AddIcon/>} variant="contained">
              Add Question
            </Button>
          </Box>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questions.map((question, index) => (
                    <Draggable key={index} draggableId={`question-${index}`} index={index}>
                      {(provided) => (
                        <Paper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          elevation={1}
                          sx={{p: 2, mb: 2, position: 'relative'}}
                        >
                          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box {...provided.dragHandleProps} sx={{cursor: 'grab'}}>
                              <DragHandleIcon/>
                            </Box>
                            <IconButton onClick={() => removeQuestion(index)}>
                              <DeleteIcon/>
                            </IconButton>
                          </Box>

                          <QuestionForm
                            question={question}
                            updateQuestion={(updatedData) => updateQuestion(index, updatedData)}
                          />
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Paper>

        {/* Submit Button */}
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
            save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const QuestionForm: React.FC<{
  question: QuestionI;
  updateQuestion: (updatedData: Partial<QuestionI>) => void;
}> = ({question, updateQuestion}) => {
  const [optionInput, setOptionInput] = useState('');

  const addOption = () => {
    if (optionInput.trim()) {
      const newOptions = [...(question.options || []), optionInput.trim()];
      updateQuestion({options: newOptions});
      setOptionInput('');
    }
  };

  const removeOption = (index: number) => {
    const newOptions = [...(question.options || [])];
    newOptions.splice(index, 1);
    updateQuestion({options: newOptions});
  };

  const validateQuestion = async () => {
    try {
      await questionValidationSchema.validate(question, {abortEarly: false});
      return {};
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return err.inner.reduce((acc, curr) => {
          return {...acc, [curr.path || '']: curr.message};
        }, {});
      }
      return {};
    }
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    updateQuestion({[name]: value});
    validateQuestion().then(setErrors);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    updateQuestion({[name]: checked});
    validateQuestion().then(setErrors);
  };

  const handleSelectChange = (e: any) => {
    const {name, value} = e.target;
    updateQuestion({[name]: value});
    validateQuestion().then(setErrors);
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      <TextField
        fullWidth
        name="question"
        label="Question Text"
        value={question.question}
        onChange={handleChange}
        error={Boolean(errors.question)}
        helperText={errors.question}
        required
      />

      <TextField
        fullWidth
        name="description"
        label="Description (optional)"
        value={question.description}
        onChange={handleChange}
        multiline
        rows={2}
      />

      <FormControl fullWidth>
        <InputLabel id="question-type-label">Question Type</InputLabel>
        <Select
          labelId="question-type-label"
          name="type"
          value={question.type}
          label="Question Type"
          onChange={handleSelectChange}
        >
          {Object.values(QuestionType).map(type => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{display: 'flex', gap: 2}}>
        <FormControlLabel
          control={
            <Checkbox
              name="isRequired"
              checked={question.isRequired}
              onChange={handleCheckboxChange}
            />
          }
          label="Required"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="showInTable"
              checked={question.showInTable}
              onChange={handleCheckboxChange}
            />
          }
          label="Show in table"
        />
      </Box>

      {[QuestionType.CHECKBOX, QuestionType.SELECT].includes(question.type) && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>Options</Typography>
          {errors.options && (
            <FormHelperText error>{errors.options}</FormHelperText>
          )}

          <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
            <TextField
              label="Add Option"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addOption()}
              sx={{flexGrow: 1}}
            />
            <Button onClick={addOption} variant="outlined">Add</Button>
          </Box>

          <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}>
            {question.options?.map((option, index) => (
              <Chip
                key={index}
                label={option}
                onDelete={() => removeOption(index)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TemplateEditPage;