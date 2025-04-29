import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useNowUser } from "src/context/UserContext.tsx";
import {
  Box, Typography, TextField, Button, Paper, IconButton, Stack, Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const token = `Bearer ${localStorage.getItem('token')}`;
const socket: Socket = io('http://localhost:3000', {
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
}

interface CommentsProps {
  templateId: number;
}

const Comments: React.FC<CommentsProps> = ({ templateId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const { user } = useNowUser();

  useEffect(() => {

    console.log('Emit get_comments with', templateId);
    socket.emit('get_comments', templateId);

    socket.on('comments_list', (data: Comment[]) => {
      console.log('Received comments_list:', data);
      setComments(data);
    });

    socket.on('new_comment', (comment: Comment) => {
      console.log('New comment received:', comment);
      setComments((prev) => [...prev, comment]);
    });

    socket.on('comment_deleted', (commentId: number) => {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    });

    socket.on('comment_updated', (updatedComment: Comment) => {
      setComments((prev) =>
        prev.map((c) => (c.id === updatedComment.id ? updatedComment : c))
      );
    });

    return () => {
      socket.off('comments_list');
      socket.off('new_comment');
      socket.off('comment_deleted');
      socket.off('comment_updated');
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
    socket.emit('delete_comment', { commentId });
  };

  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditingContent(comment.content);
  };

  const handleSaveEdit = () => {
    if (editingContent.trim()) {
      socket.emit('edit_comment', {
        commentId: editingId,
        content: editingContent.trim(),
      });
      setEditingId(null);
      setEditingContent('');
    }
  };

  return (
    <Box mt={5}>
      <Typography variant="h5" gutterBottom>
        Комментарии
      </Typography>

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
        <Button variant="contained" onClick={handleAddComment} disabled={!newComment.trim()}>
          Отправить
        </Button>
      </Stack>

      <Stack spacing={2}>
        {comments.map((comment) => (
          <Paper key={comment.id} elevation={2} sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box flex={1}>
                <Typography variant="subtitle2" color="text.secondary">
                  {comment.user.name}
                </Typography>

                {editingId === comment.id ? (
                  <Stack spacing={1} mt={1}>
                    <TextField
                      multiline
                      fullWidth
                      variant="outlined"
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                    />
                    <Button onClick={handleSaveEdit} variant="outlined" size="small">
                      Сохранить
                    </Button>
                  </Stack>
                ) : (
                  <Typography variant="body1" mt={1}>
                    {comment.content}
                  </Typography>
                )}
              </Box>

              {comment.userId === user?.id && (
                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => handleEdit(comment)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(comment.id)} size="small">
                    <DeleteIcon fontSize="small" />
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
