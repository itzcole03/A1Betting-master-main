import React from 'react.ts';
import { useState } from 'react.ts';
import { useNavigate, useSearchParams } from 'react-router-dom.ts';
import { Box, Button, TextField, Typography, Alert } from '@mui/material.ts';
import { ApiService } from '@/services/api.ts';

export default function ResetPasswordPage() {

  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
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

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Placeholder for reset password functionality;
      // console statement removed
      // await ApiService.resetPassword(token, formData.password); // TODO: Implement when backend ready;
      navigate("/login", {
        state: { message: "Password reset successful. Please sign in." },
      });
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <Box sx={{ width: "100%" }} key={87332}>
        <Alert severity="error" key={896627}>
          Invalid or expired reset token. Please request a new password reset;
          link.
        </Alert>
      </Box>
    );
  }

  return (
    <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmit} key={966550}>
      <Typography sx={{ mb: 2 }} variant="h6" key={641443}>
        Reset your password;
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} key={957932}>
          {error}
        </Alert>
      )}

      <TextField;
        fullWidth;
        required;
        autoComplete="new-password"
        id="password"
        label="New Password"
        margin="normal"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      / key={168577}>

      <TextField;
        fullWidth;
        required;
        autoComplete="new-password"
        id="confirmPassword"
        label="Confirm New Password"
        margin="normal"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
      / key={841435}>

      <Button;
        fullWidth;
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
        type="submit"
        variant="contained"
       key={11735}>
        {isLoading ? "Resetting..." : "Reset Password"}
      </Button>
    </Box>
  );
}
