import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  checkUserExists,
} from "../redux/actions/userActions";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

const LoginSignUpPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    loginEmail: "",
    loginPassword: "",
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    loginFormError: "",
    registerFormError: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, userInfo, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo && userInfo.token) {
      localStorage.setItem("token", userInfo.token);
      navigate(`/user`);
    } else if (userInfo) {
      console.error("Token is missing or userInfo is not set correctly");
    }
  }, [userInfo, navigate]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const validateLogin = () => {
    const { email, password } = loginData;
    let isValid = true;
    if (!email) {
      setErrors((prev) => ({ ...prev, loginEmail: "Email is required" }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, loginEmail: "" }));
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, loginPassword: "Password is required" }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, loginPassword: "" }));
    }
    return isValid;
  };

  const validateRegister = async () => {
    const { name, email, password } = registerData;
    let isValid = true;
    if (!name) {
      setErrors((prev) => ({ ...prev, registerName: "Name is required" }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, registerName: "" }));
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, registerEmail: "Email is required" }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, registerEmail: "" }));
      const exists = await dispatch(checkUserExists(email));
      if (exists) {
        setErrors((prev) => ({
          ...prev,
          registerEmail: "Email already exists",
        }));
        isValid = false;
      }
    }
    if (!password) {
      setErrors((prev) => ({
        ...prev,
        registerPassword: "Password is required",
      }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, registerPassword: "" }));
    }
    return isValid;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (validateLogin()) {
      const { email, password } = loginData;
      await dispatch(loginUser(email, password));
      if (error) {
        setErrors((prev) => ({
          ...prev,
          loginFormError: error,
        }));
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (await validateRegister()) {
      const { name, email, password } = registerData;
      await dispatch(registerUser(name, email, password));
      if (error) {
        setErrors((prev) => ({
          ...prev,
          registerFormError: error,
        }));
      }
    }
  };

  return (
    <Container
      maxWidth="xl" // Use xl for larger container width
      sx={{
        minHeight: "100vh", // Full viewport height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 1400 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Typography variant="h5" gutterBottom align="center">
                Login
              </Typography>
              {errors.loginFormError && (
                <Typography color="error" align="center">
                  {errors.loginFormError}
                </Typography>
              )}
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  label="Email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.loginEmail}
                  helperText={errors.loginEmail}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.loginPassword}
                  helperText={errors.loginPassword}
                />
                <Box textAlign="center" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Typography variant="h5" gutterBottom align="center">
                Register
              </Typography>
              {errors.registerFormError && (
                <Typography color="error" align="center">
                  {errors.registerFormError}
                </Typography>
              )}
              <form onSubmit={handleRegisterSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.registerName}
                  helperText={errors.registerName}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.registerEmail}
                  helperText={errors.registerEmail}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.registerPassword}
                  helperText={errors.registerPassword}
                />
                <Box textAlign="center" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginSignUpPage;
