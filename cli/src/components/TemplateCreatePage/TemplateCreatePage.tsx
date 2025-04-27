import { useNavigate } from "react-router-dom";
import { Container, Box, Button, Typography, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTemplates } from "src/api/useTemplates.ts";
import { useTemplateForm } from "src/api/useTemplateForm";
import TemplateForm from "./TemplateForm";
import QuestionsList from ".//QuestionsList";

const TemplateCreatePage = () => {
  const navigate = useNavigate();
  const { createTemplates, loading } = useTemplates();

  const {
    formik,
    questions,
    tags,
    tagInput,
    setTagInput,
    addQuestion,
    handleTagAdd,
    handleTagDelete,
    validateQuestions,
    ...questionActions
  } = useTemplateForm(createTemplates, navigate);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/templates")}
          sx={{ mb: 2 }}
        >
          Back to Templates
        </Button>

        <Typography variant="h4" component="h1" gutterBottom>
          Create New Template
        </Typography>

        <TemplateForm
          formik={formik}
          tags={tags}
          tagInput={tagInput}
          setTagInput={setTagInput}
          handleTagAdd={handleTagAdd}
          handleTagDelete={handleTagDelete}
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Questions
        </Typography>

        <QuestionsList
          questions={questions}
          addQuestion={addQuestion}
          {...questionActions}
        />

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            form="template-form"
            variant="contained"
            color="primary"
            disabled={loading || !validateQuestions()}
          >
            {loading ? "Saving..." : "Save Template"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TemplateCreatePage;