import {Link, useNavigate} from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link as MuiLink,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {Person as PersonIcon} from '@mui/icons-material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useContext, useState} from "react";
import {useNowUser} from "src/context/UserContext.tsx";
import {NotificationContext} from 'src/context/NotificationContext';
import api from "src/api/axios.ts";

const EditProfile = () => {
  const navigate = useNavigate();
  const {user, updateUser} = useNowUser();
  const [loading, setLoading] = useState(false);
  const {showNotification} = useContext(NotificationContext);

  const validationSchema = Yup.object({
    name: Yup.string().required('Введите имя'),
    email: Yup.string().email('Некорректный email').required('Введите email'),
    password: Yup.string().min(6, 'Минимум 6 символов')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const updateData = {
          name: values.name,
          email: values.email,
          ...(values.password && {password: values.password})
        };

        const response = await api.put('/users/edit', updateData);
        updateUser(response.data);
        showNotification('Профиль успешно обновлен', 'success');
        navigate('/profile');
      } catch (error) {
        const message = error.response?.data?.message || 'Ошибка при обновлении профиля';
        showNotification(message, 'error');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            padding: '12px',
            borderRadius: '100%',
            color: 'white',
            marginBottom: '16px'
          }}
        >
          <PersonIcon fontSize="medium"/>
        </Box>

        <Typography component="h1" variant="h5">
          Редактирование профиля
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{mt: 1, width: '100%'}}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Имя"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Новый пароль (оставьте пустым, если не хотите менять)"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24}/> : 'Сохранить изменения'}
          </Button>

          <Grid container justifyContent="space-between">
            <Grid item>
              <MuiLink component={Link} to="/profile" variant="body2">
                Вернуться в профиль
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProfile;