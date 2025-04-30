import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {UserI} from "src/types/type";
import {useAdmin} from "src/api/useAdmin";
import api from "src/api/axios";
import {useUsers} from "src/api/useUsers.ts";
import {NotificationContext} from "src/context/NotificationContext.tsx";
import Loader from "src/components/Loader/Loader.tsx";

const AdminPanelTab = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [allUsers, setAllUsers] = useState<UserI[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'block' | 'unblock' | 'toggle-role' | null>(null);
  const {getAllUsers, loading} = useUsers();
  const {showNotification} = useContext(NotificationContext)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const {adminAction} = useAdmin();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers()
      setAllUsers(res || []);
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedUsers(checked ? allUsers.map(user => user.id) : []);
  };

  const handleAction = async () => {
    if (!actionType || selectedUsers.length === 0) return;

    try {
      await adminAction(actionType, selectedUsers);

      const response = await api.get('/users');
      setAllUsers(response.data || []);
      setSelectedUsers([]);

      showNotification(
        'Действие выполнено успешно',
        'success');
    } catch (error) {
      showNotification(error.response?.data?.message || 'Ошибка выполнения действия', 'error');
    } finally {
      setConfirmOpen(false);
      setActionType(null);
    }
  };

  const handleActionClick = (type: typeof actionType) => {
    setActionType(type);
    setConfirmOpen(true);
  };
  if (loading) return <Loader/>

  return (
    <Box sx={{mt: 2}}>

      <Box sx={{
        mb: 2,
        overflowX: 'auto',
        '& .MuiButtonGroup-root': {
          flexWrap: isMobile ? 'wrap' : 'nowrap'
        }
      }}>
        <ButtonGroup variant="contained" sx={{mb: isMobile ? 1 : 0}}>
          <Button
            color="error"
            disabled={selectedUsers.length === 0}
            onClick={() => handleActionClick('delete')}
            sx={{mb: isMobile ? 1 : 0}}
          >
            Удалить
          </Button>
          <Button
            color="warning"
            disabled={selectedUsers.length === 0}
            onClick={() => handleActionClick('block')}
            sx={{mb: isMobile ? 1 : 0}}
          >
            Блокировать
          </Button>
          <Button
            color="success"
            disabled={selectedUsers.length === 0}
            onClick={() => handleActionClick('unblock')}
            sx={{mb: isMobile ? 1 : 0}}
          >
            Разблокировать
          </Button>
          <Button
            color="info"
            disabled={selectedUsers.length === 0}
            onClick={() => handleActionClick('toggle-role')}
          >
            Изменить роль
          </Button>
        </ButtonGroup>
      </Box>

      <TableContainer component={Paper} sx={{
        maxWidth: '100%',
        overflowX: 'auto'
      }}>
        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedUsers.length === allUsers.length && allUsers.length > 0}
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < allUsers.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </TableCell>
              {!isMobile && <TableCell>ID</TableCell>}
              <TableCell>Имя</TableCell>
              {!isMobile && <TableCell>Email</TableCell>}
              <TableCell>Роль</TableCell>
              <TableCell>Статус</TableCell>
              {!isMobile && <TableCell>Дата регистрации</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map(user => (
              <TableRow key={user.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </TableCell>
                {!isMobile && <TableCell>{user.id}</TableCell>}
                <TableCell>{user.name}</TableCell>
                {!isMobile && <TableCell>{user.email}</TableCell>}
                <TableCell>
                  <Chip
                    label={user.role}
                    size={isMobile ? 'small' : 'medium'}
                    color={user.role === 'ADMIN' ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.isBlocked ? 'Заблок.' : 'Активен'}
                    size={isMobile ? 'small' : 'medium'}
                    color={user.isBlocked ? 'error' : 'success'}
                  />
                </TableCell>
                {!isMobile && (
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        fullScreen={isMobile}
      >
        <DialogTitle>Подтверждение действия</DialogTitle>
        <DialogContent>
          Вы уверены, что хотите {getActionText(actionType)} {selectedUsers.length} пользователей?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Отмена</Button>
          <Button
            onClick={handleAction}
            color="primary"
            autoFocus
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const getActionText = (action: string | null) => {
  switch (action) {
    case 'delete':
      return 'удалить';
    case 'block':
      return 'заблокировать';
    case 'unblock':
      return 'разблокировать';
    case 'toggle-role':
      return 'изменить роль для';
    default:
      return 'выполнить действие для';
  }
};

export default AdminPanelTab;