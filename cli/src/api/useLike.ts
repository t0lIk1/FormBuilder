import { useEffect, useState } from "react";
import { useUsers } from "src/api/useUsers";
import { useNowUser } from "src/context/UserContext";

interface TemplateLike {
  userId: number;
}

export function useLike(templateId: number, initialLikes: (TemplateLike | number)[] = []) {
  const { user } = useNowUser();
  const { toggleLike } = useUsers();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes.length);

  useEffect(() => {
    if (user?.id) {
      const userLiked = initialLikes.some((like) =>
        typeof like === "number" ? like === user.id : like.userId === user.id
      );
      setIsLiked(userLiked);
    } else {
      setIsLiked(false);
    }

    setLikeCount(initialLikes.length);
  }, [user, initialLikes]);

  const handleLike = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      console.log("User not logged in");
      return;
    }

    try {
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);

      const res = await toggleLike(templateId);

      if (res.data?.liked !== undefined) {
        setIsLiked(res.data.liked);
      }
    } catch (error) {
      console.error("Like error:", error);
      setIsLiked(prev => !prev);
      setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
    }
  };

  return {
    isLiked,
    likeCount,
    handleLike,
    isDisabled: !user
  };
}
