import {
  TextField,
  FormControlLabel,
  Switch,
  Paper
} from "@mui/material";
import TagsSection from "./TagsSection";

const TemplateForm = ({ formik, tags, tagInput, setTagInput, handleTagAdd, handleTagDelete }) => {
  return (
    <Paper component="form" id="template-form" onSubmit={formik.handleSubmit} sx={{ p: 3, mb: 3 }}>
      <TextField
        name="title"
        label="Template Title"
        fullWidth
        margin="normal"
        autoFocus
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <TextField
        name="description"
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />

      <TextField
        name="topic"
        label="Topic"
        fullWidth
        margin="normal"
        value={formik.values.topic}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.topic && Boolean(formik.errors.topic)}
        helperText={formik.touched.topic && formik.errors.topic}
      />

      <FormControlLabel
        control={
          <Switch
            name="isPublic"
            checked={formik.values.isPublic}
            onChange={formik.handleChange}
            color="primary"
          />
        }
        label="Public Template"
        sx={{ mt: 1, mb: 2 }}
      />

      <TagsSection
        tags={tags}
        tagInput={tagInput}
        setTagInput={setTagInput}
        handleTagAdd={handleTagAdd}
        handleTagDelete={handleTagDelete}
      />
    </Paper>
  );
};

export default TemplateForm;