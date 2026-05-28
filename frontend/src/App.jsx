
import { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import axios from 'axios';
import AuthPanel from './AuthPanel';
import AdminDashboard from './AdminDashboard';

  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState('full');
  const [coords, setCoords] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState('citizen');

  useEffect(() => {
    if (!token) return;
    // Decode JWT to get role
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setRole(payload.role || 'citizen');
    } catch {
      setRole('citizen');
    }
    axios.get('/api/reports', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setReports(res.data))
      .catch(() => setReports([]));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const [lng, lat] = coords.split(',').map(Number);
      const res = await axios.post('/api/reports', { coordinates: [lng, lat], status }, { headers: { Authorization: `Bearer ${token}` } });
      setReports([res.data, ...reports]);
      setCoords('');
    } catch {}
    setLoading(false);
  };

  if (!token) return <AuthPanel onAuth={setToken} />;

  if (role === 'admin') return <AdminDashboard token={token} />;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Smart Waste Management</Typography>
      <Button sx={{ mb: 2 }} onClick={() => { localStorage.removeItem('token'); setToken(''); }}>Logout</Button>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <TextField
          label="Coordinates (lng,lat)"
          value={coords}
          onChange={e => setCoords(e.target.value)}
          size="small"
          sx={{ mr: 1 }}
        />
        <TextField
          label="Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          size="small"
          sx={{ mr: 1 }}
        />
        <Button type="submit" variant="contained" disabled={loading}>Report Bin</Button>
      </Box>
      <Typography variant="h6">Recent Reports</Typography>
      <List>
        {reports.map((r) => (
          <ListItem key={r._id} divider>
            <ListItemText
              primary={`Status: ${r.status}`}
              secondary={`Location: [${r.location.coordinates.join(', ')}] | Reported: ${new Date(r.reportedAt).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
