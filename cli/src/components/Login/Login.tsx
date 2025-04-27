import {Button, CircularProgress, Container, Grid, Link as MuiLink, Stack, TextField, Typography,} from "@mui/material"
import Box from "@mui/material/Box";
import {Lock as LockIcon} from '@mui/icons-material';
import {Link, useNavigate} from "react-router-dom"
import * as Yup from "yup";
import {useFormik} from "formik";
import {useUsers} from "../../api/useUsers.ts";
import {useEffect} from "react";

const Login = () => {

  const {auth, loading} = useUsers()
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);


  const validationSchema = Yup.object({
    email: Yup.string().email("Uncorrect email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      await auth(values, 'login')
    }
  })


  return (
    <Container component='main' maxWidth='sm'>
      <Box sx={{
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center'
      }}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            padding: '12px',
            borderRadius: '100%',
            color: 'white',
            marginBottom: '16px'
          }}
        >
          <LockIcon fontSize="medium"/>
        </Box>

        <Typography component="h1" variant="h5">
          Логин
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 1, width: '100%'}}>
          <Stack spacing={2}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              label="password"
              variant="outlined"
              autoComplete="password"
              value={formik.values.password}
              onChange={formik.handleChange}
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
            {loading ? <CircularProgress size={24}/> : 'Войти'}
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <MuiLink component={Link} to="/register" variant="body2">
                У вас нету аккаунта, зарегестрируйтесь
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login;