import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const TemplateCard = ({ description, title, tags, likes }) => {
  return (
    <Card
      sx={{
        width: "100%", // Занимает всю ширину ячейки сетки
        height: "100%", // Занимает всю высоту ячейки сетки
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader title={title} subheader="Date" />

      <CardContent sx={{ flex: 1, overflow: "hidden" }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            wordBreak: "break-word",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, // Ограничение в 3 строки (можно изменить)
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TemplateCard;