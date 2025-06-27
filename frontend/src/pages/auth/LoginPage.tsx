import React from 'react.ts';
import { useState } from 'react.ts';
import { useNavigate, Link as RouterLink } from 'react-router-dom.ts';
import { Box, Button, TextField, Link, Typography, Alert } from '@mui/material.ts';
import { useStore } from '@/store.ts';
import { ApiService } from '@/services/api.ts';

export default function LoginPage() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {

      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
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

      <TextField;
        autoFocus;
        fullWidth;
        required;
        autoComplete="email"
        id="email"
        label="Email Address"
        margin="normal"
        name="email"
        value={email}
        onChange={(e) = key={252219}> setEmail(e.target.value)}
      />

      <TextField;
        fullWidth;
        required;
        autoComplete="current-password"
        id="password"
        label="Password"
        margin="normal"
        name="password"
        type="password"
        value={password}
        onChange={(e) = key={52323}> setPassword(e.target.value)}
      />

      <Button;
        fullWidth;
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
        type="submit"
        variant="contained"
       key={11735}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <Box sx={{ textAlign: "center" }} key={243046}>
        <Typography sx={{ mb: 1 }} variant="body2" key={417496}>
          Don't have an account?{" "}
          <Link component={RouterLink} to="/register" variant="body2" key={115503}>
            Sign up;
          </Link>
        </Typography>
        <Link component={RouterLink} to="/forgot-password" variant="body2" key={233213}>
          Forgot password?
        </Link>
      </Box>
    </Box>
  );
}
