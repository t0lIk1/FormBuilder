import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import api from "src/api/axios";
import TemplateCard from "src/TemplateCard/TemplateCard";

// Типы данных
interface User {
  id: number;
  name: string;
  email: string;
  templatesCount: number;
  formsCount: number;
  createdAt: string;
}

interface Template {
  id: number;
  title: string;
  description: string;
  topic: string;
  isPublic: boolean;
  createdAt: string;
}

// Типы для табов
type ProfileTab = 'templates' | 'forms' | 'activity';

 const ProfilePage = () => {
  // Состояния компонента
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('templates');

  // Получаем токен из localStorage
  const token = localStorage.getItem("token");

  // Загрузка данных профиля
  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!token) {
          throw new Error('Требуется авторизация');
        }

        // Параллельно загружаем данные пользователя и шаблоны
        const [userResponse, templatesResponse] = await Promise.all([
          api.get('/users/now', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/templates/user', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setCurrentUser(userResponse.data);
        setTemplates(templatesResponse.data || []);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  // Обработчик смены таба
  const handleTabChange = (event: React.SyntheticEvent, newValue: ProfileTab) => {
    setActiveTab(newValue);
  };

  // Отображение загрузки
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Отображение ошибок
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Проверка наличия данных пользователя
  if (!currentUser) {
    return <Typography>Пользователь не найден</Typography>;
  }

  // Содержимое табов
  const tabContent = {
    templates: (
      <>
        {templates.length > 0 ? (
          <TemplatesGrid templates={templates} />
        ) : (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            У вас пока нет шаблонов
          </Typography>
        )}
      </>
    ),
    forms: (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Раздел форм находится в разработке
      </Typography>
    ),
    activity: (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        История активности появится здесь
      </Typography>
    )
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Шапка профиля */}
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar sx={{ width: 100, height: 100, fontSize: 40, mr: 3 }}>
            {currentUser.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1">
              {currentUser.name}
              <Chip label="Вы" color="primary" sx={{ ml: 2 }} />
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {currentUser.email}
            </Typography>
            <Typography variant="body2" mt={1}>
              На сайте с {new Date(currentUser.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {/* Статистика */}
        <Box display="flex" gap={3} mb={4}>
          <StatBlock value={currentUser.templatesCount} label="Шаблонов" />
          <StatBlock value={currentUser.formsCount} label="Форм создано" />
        </Box>

        {/* Табы */}
        <Paper sx={{ mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
          >
            <Tab label="Мои шаблоны" value="templates" />
            <Tab label="Мои формы" value="forms" />
            <Tab label="Активность" value="activity" />
          </Tabs>
        </Paper>

        {/* Содержимое активного таба */}
        {tabContent[activeTab]}
      </Box>
    </Container>
  );
};

// Компонент блока статистики
const StatBlock = ({ value, label }: { value: number, label: string }) => (
  <Box p={2} bgcolor="background.paper" borderRadius={2} textAlign="center">
    <Typography variant="h6">{value}</Typography>
    <Typography variant="body2">{label}</Typography>
  </Box>
);

// Компонент сетки шаблонов
const TemplatesGrid = ({ templates }: { templates: Template[] }) => (
  <Box sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
    },
    gap: 3,
  }}>
    {templates.map(template => (
      <TemplateCard key={template.id} {...template} />
    ))}
  </Box>
);

export default ProfilePage