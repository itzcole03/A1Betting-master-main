import React from 'react.ts';
import { useState } from 'react.ts';
import { Link as RouterLink } from 'react-router-dom.ts';
import { Box, Button, TextField, Link, Typography, Alert } from '@mui/material.ts';
import { ApiService } from '@/services/api.ts';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      // Placeholder for forgot password functionality;
      // console statement removed
      // await ApiService.forgotPassword(email); // TODO: Implement when backend ready;
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmit} key={966550}>
      <Typography sx={{ mb: 2 }} variant="h6" key={641443}>
        Reset your password;
      </Typography>

      <Typography sx={{ mb: 3 }} variant="body2" key={913841}>
        Enter your email address and we'll send you a link to reset your;
        password.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} key={957932}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} key={382437}>
          Password reset email sent. Please check your inbox.
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

      <Button;
        fullWidth;
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
        type="submit"
        variant="contained"
       key={11735}>
        {isLoading ? "Sending..." : "Send Reset Link"}
      </Button>

      <Box sx={{ textAlign: "center" }} key={243046}>
        <Link component={RouterLink} to="/login" variant="body2" key={750720}>
          Back to Sign In;
        </Link>
      </Box>
    </Box>
  );
}
