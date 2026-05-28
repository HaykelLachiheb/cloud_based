import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';
import axios from 'axios';

export default function AuthPanel({ onAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = `/api/auth/${mode}`;
      const res = await axios.post(url, { username, password });
      if (mode === 'login') {
        localStorage.setItem('token', res.data.token);
        onAuth(res.data.token);
      } else {
        setMode('login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>{mode === 'login' ? 'Login' : 'Register'}</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <Button type="submit" variant="contained" fullWidth>{mode === 'login' ? 'Login' : 'Register'}</Button>
      </Box>
      <Button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} sx={{ mt: 2 }}>
        {mode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Container>
  );
}
