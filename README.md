# CampusFind

CampusFind is a professional MERN Stack Lost & Found Management System for Teerthanker Mahaveer University (TMU), Moradabad.

## Features
- User registration and login with JWT auth
- Lost/found report creation
- Search, filter, and browse functionality
- Dashboard for users and admins
- Claim request workflow
- MongoDB-ready backend architecture
- Responsive university portal UI

## Tech Stack
- Frontend: React + Vite + React Router DOM
- Backend: Node.js + Express + MongoDB + Mongoose
- Auth: JWT + bcrypt
- Styling: Custom CSS

## Project Structure
- `client/` — frontend app
- `server/` — backend API

## Run locally

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## Environment variables
Create a `.env` file in the `server` folder using `.env.example`.

## Notes
This project is set up for local development and MongoDB integration.
