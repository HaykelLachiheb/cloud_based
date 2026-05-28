# Deployment & Usage Guide: Smart Waste Management Platform

## Prerequisites
- Docker & Docker Compose installed
- Node.js 20+ and npm (for local dev)
- MongoDB Atlas URI (or use local MongoDB)

## Environment Variables
Copy `.env.example` to `.env` and fill in:
- `MONGODB_URI` (e.g., from MongoDB Atlas or use `mongodb://mongo:27017/swm` for Docker)
- `JWT_SECRET` (any strong secret)
- `PORT` (default: 5000)
- `REACT_APP_API_URL` (frontend, e.g., `/api`)

## Local Development
### Backend
```
cd backend
npm install
npm run dev
```
### Frontend
```
cd frontend
npm install
npm run dev
```

## Docker Compose (Recommended)
From project root:
```
docker-compose -f infrastructure/docker-compose.yml up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## Cloud Deployment
- Deploy backend and frontend Docker images to AWS ECS, Render, or similar.
- Use managed MongoDB (Atlas) or cloud DB.
- Set environment variables in your cloud provider.

## Admin User
- Register a user, then manually set their `role` to `admin` in the database for admin access.

## CI/CD
- GitHub Actions workflow in `.github/workflows/ci.yml` runs tests and lint on push.

## Security & Production
- Use HTTPS in production.
- Set strong JWT secret and secure DB credentials.
- Review CORS and API security settings.

---
For more, see ARCHITECTURE.md and RESEARCH.md.
