import {Link, useNavigate} from 'react-router-dom';
import {
  Alert,
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
import {PersonAdd as PersonAddIcon} from '@mui/icons-material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useAuth} from '../../api/useAuth';
import {useEffect} from "react";

const Register = () => {


  const navigate = useNavigate();
  const {auth, loading, error} = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!!token) {
      navigate('/');
    }
  }, []);
  const validationSchema = Yup.object({
    name: Yup.string().required('Введите имя'),
    email: Yup.string().email('Некорректный email').required('Введите email'),
    password: Yup.string().min(6, 'Минимум 6 символов').required('Введите пароль')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      await auth(values, "register")
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
          <PersonAddIcon fontSize="medium"/>
        </Box>

        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>

        {error && (
          <Alert severity="error" sx={{width: '100%', mt: 2, mb: 2}}>
            {error}
          </Alert>
        )}

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
              helperText={formik.touched.name && formik.errors.name}
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
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Пароль"
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
            {loading ? <CircularProgress size={24}/> : 'Зарегистрироваться'}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <MuiLink component={Link} to="/login" variant="body2">
                Уже есть аккаунт? Войдите
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
