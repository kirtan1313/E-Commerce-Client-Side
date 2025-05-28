import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [logInDetails, setLogInDetails] = useState({
    email: '',
    password: '',
    conPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignInField = (e) => {
    const { name, value } = e.target;
    setLogInDetails({ ...logInDetails, [name]: value });
    setError('');
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (!logInDetails.email || !logInDetails.password) {
      setError("All fields are required!");
      return;
    }
    // if (logInDetails.password !== logInDetails.conPassword) {
    //   setError("Passwords do not match!");
    //   return;
    // }

    try {
      const response = await axios.post('http://localhost:3005/userLogin', {
        email: logInDetails.email,
        password: logInDetails.password,
      });
      console.log("LogIn response:", response.data);

      if (response.status === 201) {
        const { jwtToken,name } = response.data
        localStorage.setItem("token", jwtToken); 
        localStorage.setItem("Name", name); // Save token in local storage


        setLogInDetails({ email: "", password: "" });
        navigate("/");
      } else {
        setError(response.data.message || "Unknown error occurred.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogIn}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            onChange={handleSignInField}
            name="email"
            value={logInDetails.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={handleSignInField}
            name="password"
            value={logInDetails.password}
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
