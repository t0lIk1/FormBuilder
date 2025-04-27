import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Tooltip,
  Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TemplateI } from "src/types/type";
import { useLike } from "src/api/useLike";
import Box from "@mui/material/Box";

const TemplateCard = ({ id, title, description, likes, updatedAt }: TemplateI) => {
  const { isLiked, likeCount, handleLike, isDisabled } = useLike(id, likes);

  return (
    <Paper elevation={3}>
      <Card sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader
          title={title}
          subheader={new Date(updatedAt).toLocaleDateString()}
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
          {localStorage.getItem("token") && <Button size="small" href={`/templates/${id}`}>View</Button>}
        </CardActions>
      </Card>
    </Paper>
  );
};

export default TemplateCard;
