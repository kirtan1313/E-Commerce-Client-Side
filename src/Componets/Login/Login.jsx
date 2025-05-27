import React from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logged in!");
    // Navigate to dashboard or another page after successful login
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Link to="/signIn">Don't have an account? Sign Up</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
