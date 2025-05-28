import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [signInDetails, setSignInDetails] = useState({
    name: '',
    email: '',
    password: '',
    conPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignInField = (e) => {
    const { name, value } = e.target;
    setSignInDetails({ ...signInDetails, [name]: value });
    setError('');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!signInDetails.name || !signInDetails.email || !signInDetails.password || !signInDetails.conPassword) {
      setError("All fields are required!");
      return;
    }
    if (signInDetails.password !== signInDetails.conPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/userSignIn', {
        name: signInDetails.name,
        email: signInDetails.email,
        password: signInDetails.password,
      });
      console.log("Sign-up response:", response.data);

      console.log('----', response.data.status === 201);
      console.log('++++', response.data.status === 200);


      if (response.status === 201) {
        setSignInDetails({ name: "", email: "", password: "", conPassword: "" });
        navigate("/login"); // This line triggers the navigation
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
          Sign Up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSignUp}>
          <TextField
            onChange={handleSignInField}
            fullWidth
            label="Username"
            type="text"
            variant="outlined"
            margin="normal"
            name="name"
            value={signInDetails.name}
          />
          <TextField
            onChange={handleSignInField}
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            name="email"
            value={signInDetails.email}
          />
          <TextField
            onChange={handleSignInField}
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            name="password"
            value={signInDetails.password}
          />
          <TextField
            onChange={handleSignInField}
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            name="conPassword"
            value={signInDetails.conPassword}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Link to="/login">Already have an account? Login</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
