import React, {useEffect, useState} from 'react';
import io, {Socket} from 'socket.io-client';
import {useNowUser} from "src/context/UserContext.tsx";
import {Box, Button, IconButton, Paper, Stack, TextField, Typography,} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const token = `Bearer ${localStorage.getItem('token')}`;
const socket: Socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  transports: ['websocket'],
  auth: {
    token,
  },
});

interface Comment {
  id: number;
  userId: number;
  templateId: number;
  content: string;
  user: {
    id: number;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface CommentsProps {
  templateId: number;
}

const Comments: React.FC<CommentsProps> = ({templateId}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const {user} = useNowUser();

  useEffect(() => {
    const handleConnect = () => {
      socket.emit('get_comments', templateId);
    };

    const handleCommentsList = (data: Comment[]) => {
      setComments(data);
    };

    const handleNewComment = (newComment: Comment) => {
      setComments(prev => [...prev, newComment]);
    };

    const handleDeletedComment = (deletedId: number) => {
      setComments(prev => prev.filter(c => c.id !== deletedId));
    };

    const handleUpdatedComment = (updatedComment: Comment) => {
      setComments(prev =>
        prev.map(comment =>
          comment.id === updatedComment.id
            ? {
              ...comment,
              ...updatedComment,
              user: updatedComment.user ?? comment.user,
            }
            : comment
        )
      );
    };

    socket.on('connect', handleConnect);
    socket.on('comments_list', handleCommentsList);
    socket.on('new_comment', handleNewComment);
    socket.on('comment_deleted', handleDeletedComment);
    socket.on('comment_updated', handleUpdatedComment);

    socket.emit('get_comments', templateId);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('comments_list', handleCommentsList);
      socket.off('new_comment', handleNewComment);
      socket.off('comment_deleted', handleDeletedComment);
      socket.off('comment_updated', handleUpdatedComment);
    };
  }, [templateId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      socket.emit('add_comment', {
        templateId,
        content: newComment.trim(),
      });
      setNewComment('');
    }
  };

  const handleDelete = (commentId: number) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
    socket.emit('delete_comment', {commentId});
  };

  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditingContent(comment.content);
  };

  const handleSaveEdit = () => {
    if (editingContent.trim() && editingId) {
      setComments(prev =>
        prev.map(comment =>
          comment.id === editingId
            ? {...comment, content: editingContent.trim(), user: comment.user}
            : comment
        )
      );
      socket.emit('edit_comment', {
        commentId: editingId,
        content: editingContent.trim(),
      });
      setEditingId(null);
      setEditingContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingContent('');
  };

  return (
    <Box mt={5}>
      <Typography variant="h5" gutterBottom>
        Комментарии
      </Typography>

      {user && (
        <Stack direction="column" spacing={2} mb={3}>
          <TextField
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Введите комментарий"
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
          >
            Отправить
          </Button>
        </Stack>
      )}

      <Stack spacing={2} mb={4}>
        {comments.map((comment) => (
          <Paper key={comment.id} elevation={2} sx={{p: 2}}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box flex={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  {comment.user?.name ?? 'Неизвестный пользователь'}
                </Typography>
                {comment.createdAt && (
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                )}
                {editingId === comment.id ? (
                  <Stack spacing={1} mt={1}>
                    <TextField
                      multiline
                      fullWidth
                      variant="outlined"
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                    />
                    <Stack direction="row" spacing={1}>
                      <Button
                        onClick={handleSaveEdit}
                        variant="contained"
                        size="small"
                      >
                        Сохранить
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outlined"
                        size="small"
                      >
                        Отмена
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <Typography variant="body1" mt={1}>
                    {comment.content}
                  </Typography>
                )}
              </Box>

              {comment.userId === user?.id && editingId !== comment.id && (
                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={() => handleEdit(comment)}
                    size="small"
                  >
                    <EditIcon fontSize="small"/>
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(comment.id)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small"/>
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Comments;
