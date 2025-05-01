import { useState, useEffect } from "react";
import { IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNowUser } from "src/context/UserContext.tsx";
import { useUsers } from "src/api/useUsers.ts";

interface LikeButtonProps {
  templateId: number;
  initialLikes: number;
  initialIsLiked: boolean;
  onLikeToggle?: (newState: boolean) => void;
}

const LikeButton = ({
                             templateId,
                             initialLikes,
                             initialIsLiked,
                             onLikeToggle,
                           }: LikeButtonProps) => {
  const { user } = useNowUser();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const { toggleLike } = useUsers();

  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikeCount(initialLikes);
  }, [initialIsLiked, initialLikes]);

  const handleLikeClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      console.log("Пользователь не авторизован");
      return;
    }

    try {
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);

      await toggleLike(templateId);

      if (onLikeToggle) {
        onLikeToggle(newLikedState);
      }
    } catch (error) {
      console.error("Like error:", error);
      setIsLiked(prev => !prev);
      setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleLikeClick}
        color={isLiked ? "error" : "default"}
        disabled={!user}
        aria-label="like"
      >
        <FavoriteIcon />
      </IconButton>
      <Typography>{likeCount}</Typography>
    </>
  );
};

export default LikeButton