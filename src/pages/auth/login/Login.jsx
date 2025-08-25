import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { Avatar, Backdrop, Box, Button, CircularProgress, Container, CssBaseline, TextField, Typography, Link } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/auth/auth";
import { saveToken } from "../../../utility/common";
import { enqueueSnackbar } from "notistack";

const defaultTheme = createTheme();

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Manipula as mudanças no input de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const response = await login(formData);

      if (response.status === 200) {
        const responseData = response.data;
        saveToken(responseData.token);
        navigate("/dashboard");
        enqueueSnackbar(`Welcome ${responseData.name}`, { variant: "success", autoHideDuration: 5000 });
      }

    } catch (error) {
      console.error("Signup Error:", error);
      enqueueSnackbar("Sign in failed!", { variant: "error", autoHideDuration: 5000 });
    } finally {
      setLoading(false)
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              type="email"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />

            <TextField
              type="password"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              value={formData.password}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formData.email || !formData.password || loading}
              aria-label="submit-login"
            >
              {loading ? <CircularProgress color="info" size={24} /> : "Sign In"}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                variant="body2"
                onClick={() => navigate('/register')}
                sx={{ cursor: 'pointer', textDecoration: 'none' }}
              >
                Don't have an account? Sign Up
              </Link>

            </Box>
          </Box>
        </Box>
      </Container>

      {/* Backdrop de loading */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="success" />
      </Backdrop>
    </ThemeProvider>
  );
};

export default Login;
