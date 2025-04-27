import { Box, Typography, TextField, Button, Chip } from "@mui/material";

const TagsSection = ({ tags, tagInput, setTagInput, handleTagAdd, handleTagDelete }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Tags
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {tags.map((tag) => (
          <Chip
            key={tag.name}
            label={tag.name}
            onDelete={() => handleTagDelete(tag)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TagsSection;