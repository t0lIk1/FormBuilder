// components/AddTemplateButton.tsx
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 32,
  right: 32,
});

const AddTemplateButton = () => {
  const navigate = useNavigate();

  return (
    <StyledFab
      color="primary"
      aria-label="add"
      onClick={() => navigate("/templates/new")}
    >
      <AddIcon />
    </StyledFab>
  );
};

export default AddTemplateButton;