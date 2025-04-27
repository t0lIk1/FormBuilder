import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import {Fab} from "@mui/material";

const AddTemplateButton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const buttonStyle = {
    position: 'fixed',
    bottom: isMobile ? 16 : 32,
    right: isMobile ? 16 : 32,
    width: isMobile ? 48 : 56,
    height: isMobile ? 48 : 56,
  };

  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={() => navigate("/templates/new")}
      sx={buttonStyle}
    >
      <AddIcon sx={{ fontSize: isMobile ? '1.25rem' : '1.5rem' }} />
    </Fab>
  );
};

export default AddTemplateButton;