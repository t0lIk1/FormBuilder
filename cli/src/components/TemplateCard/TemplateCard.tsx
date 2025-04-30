import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  Menu,
  MenuItem
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TemplateI } from "src/types/type";
import { useLike } from "src/api/useLike";
import Box from "@mui/material/Box";
import { useNowUser } from "src/context/UserContext.tsx";
import { useNavigate } from "react-router-dom";
import { useTemplates } from "src/api/useTemplates.ts";
import { useState } from "react";

interface TemplateCardProps extends TemplateI {
  onDeleteSuccess?: () => void;
}

const TemplateCard = ({ id, title, description, likes, updatedAt, authorId, onDeleteSuccess }: TemplateCardProps) => {
  const { isLiked, likeCount, handleLike, isDisabled } = useLike(id, likes);
  const { user } = useNowUser();
  const navigate = useNavigate();
  const { deleteTemplates } = useTemplates();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isAuthor = user?.id === authorId;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/templates/${id}/edit`);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await deleteTemplates(id);
        if (onDeleteSuccess) {
          onDeleteSuccess(); // Вызываем функцию обновления после успешного удаления
        }
      } catch (error) {
        console.error('Failed to delete template', error);
      }
    }
    handleMenuClose();
  };

  return (
    <Paper elevation={3}>
      <Card sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader
          title={title}
          subheader={new Date(updatedAt).toLocaleDateString()}
          action={
            isAuthor && (
              <>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleEdit}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Delete
                  </MenuItem>
                </Menu>
              </>
            )
          }
        />
        <CardContent sx={{ flex: 1, overflow: "hidden" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{
          justifyContent: "space-between",
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 1
          }}>
            <Tooltip title={isDisabled ? "Login to like" : ""}>
              <span>
                <IconButton
                  onClick={handleLike}
                  color={isLiked ? "error" : "default"}
                  disabled={isDisabled}
                >
                  <FavoriteIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Typography>{likeCount}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" href={`/templates/${id}`}>View</Button>
          </Box>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default TemplateCard;