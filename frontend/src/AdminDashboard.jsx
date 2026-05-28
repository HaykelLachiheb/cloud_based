import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import axios from 'axios';

export default function AdminDashboard({ token }) {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
    axios.get('/api/reports', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setReports(res.data))
      .catch(() => setReports([]));
  }, [token]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Registered Users</Typography>
        <List>
          {users.map(u => (
            <ListItem key={u._id} divider>
              <ListItemText primary={u.username} secondary={`Role: ${u.role}`} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Typography variant="h6">All Bin Reports</Typography>
        <List>
          {reports.map(r => (
            <ListItem key={r._id} divider>
              <ListItemText
                primary={`Status: ${r.status}`}
                secondary={`Location: [${r.location.coordinates.join(', ')}] | Reported: ${new Date(r.reportedAt).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
