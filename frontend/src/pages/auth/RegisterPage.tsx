import React from 'react.ts';
import { useState } from 'react.ts';
import { useNavigate, Link as RouterLink } from 'react-router-dom.ts';
import {
  Box,
  Button,
  TextField,
  Link,
  Typography,
  Alert,
  Grid,
} from '@mui/material.ts';
import { useStore } from '@/store.ts';
import { ApiService } from '@/services/api.ts';

export default function RegisterPage() {


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement key={553350}>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const user = await ApiService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmit} key={966550}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} key={957932}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} key={272161}>
        <Grid item sm={6} xs={12} key={72011}>
          <TextField;
            fullWidth;
            required;
            autoComplete="given-name"
            id="firstName"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          / key={255875}>
        </Grid>
        <Grid item sm={6} xs={12} key={72011}>
          <TextField;
            fullWidth;
            required;
            autoComplete="family-name"
            id="lastName"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          / key={834443}>
        </Grid>
      </Grid>

      <TextField;
        fullWidth;
        required;
        autoComplete="email"
        id="email"
        label="Email Address"
        margin="normal"
        name="email"
        value={formData.email}
        onChange={handleChange}
      / key={961280}>

      <TextField;
        fullWidth;
        required;
        autoComplete="new-password"
        id="password"
        label="Password"
        margin="normal"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      / key={319083}>

      <TextField;
        fullWidth;
        required;
        autoComplete="new-password"
        id="confirmPassword"
        label="Confirm Password"
        margin="normal"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
      / key={950671}>

      <Button;
        fullWidth;
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
        type="submit"
        variant="contained"
       key={11735}>
        {isLoading ? "Creating Account..." : "Sign Up"}
      </Button>

      <Box sx={{ textAlign: "center" }} key={243046}>
        <Typography variant="body2" key={679167}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/login" variant="body2" key={750720}>
            Sign in;
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
