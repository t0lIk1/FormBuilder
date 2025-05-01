import {useEffect, useState} from 'react';
import {Avatar, Box, Button, Chip, Container, Paper, Tab, Tabs, Typography} from '@mui/material';
import Loader from "src/components/Loader/Loader";
import TemplatesList from "src/components/TemplatesList/TemplatesList";
import {useAsync} from 'src/api/useAsync';
import {useNowUser} from "src/context/UserContext";
import AdminPanelTab from "src/components/ProfilePage/tabs/AdminPanelTab";
import FormsTab from "src/components/ProfilePage/tabs/FormsTab.tsx";
import {useNavigate} from "react-router-dom";
import {useUsers} from "src/api/useUsers.ts";

type ProfileTab = 'templates' | 'forms' | 'admin-panel';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('templates');
  const [isMobile, setIsMobile] = useState(false);
  const {loading} = useAsync();
  const {user, logout} = useNowUser();
  const {deleteUser} = useUsers()
  const navigate = useNavigate();
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


  const handleDeleteProfile = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить профиль?')) return;

    try {
      await deleteUser();
      logout();
      navigate('/');
    } catch (error) {
      alert('Ошибка при удалении профиля');
      console.error(error);
    }
  };


  const handleTabChange = (_event: React.SyntheticEvent, newValue: ProfileTab) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return <Loader/>;
  }

  if (!user) {
    return (

      <Container maxWidth="lg" sx={{mt: 4}}>
        <Typography variant="h6" color="text.secondary">
          Пользователь не найден
        </Typography>
      </Container>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'templates':
        return <TemplatesList type="user"/>;
      case 'forms':
        return (
          <FormsTab/>
        );
      case 'admin-panel':
        return user.role === "ADMIN" ? <AdminPanelTab/> : null;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{py: 4}}>
      <Box
        display="flex"
        alignItems={isMobile ? 'flex-start' : 'center'}
        flexDirection={isMobile ? 'column' : 'row'}
        mb={4}
        gap={isMobile ? 2 : 3}
      >
        <Avatar sx={{
          width: isMobile ? 80 : 100,
          height: isMobile ? 80 : 100,
          fontSize: isMobile ? 32 : 40
        }}>
          {user.name.charAt(0)}
        </Avatar>

        <Box>
          <Typography variant={isMobile ? "h5" : "h4"} component="h1">
            {user.name}
            <Chip
              label={user.role}
              color="primary"
              size={isMobile ? "small" : "medium"}
              sx={{ml: 2, verticalAlign: 'middle'}}
            />
          </Typography>

          <Box mt={2} display="flex" gap={2}>
            <Button variant="outlined" color="primary" onClick={() => navigate('/profile/edit')}>
              Редактировать профиль
            </Button>
            <Button variant="outlined" color="error" onClick={handleDeleteProfile}>
              Удалить профиль
            </Button>
          </Box>


          <Typography variant="subtitle1" color="text.secondary">
            {user.email}
          </Typography>

          <Typography variant="body2" mt={1}>
            На сайте с {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      <Paper sx={{mb: 3, overflowX: 'auto'}}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? true : false}
          allowScrollButtonsMobile
        >
          <Tab label="Мои шаблоны" value="templates"/>
          <Tab label="Мои формы" value="forms"/>
          {user.role === "ADMIN" && (
            <Tab label="Админ Панель" value="admin-panel"/>
          )}
        </Tabs>
      </Paper>

      <Box sx={{minHeight: '60vh'}}>
        {renderTabContent()}
      </Box>
    </Container>
  );
};

export default ProfilePage;