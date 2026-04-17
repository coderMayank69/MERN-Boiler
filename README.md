# MERN Boilerplate (Frontend + Backend)

Production-ready MERN starter designed to fast-track new projects with solid defaults.

## Included Stack

### Frontend
- React 19 + Vite
- React Router DOM
- Tailwind CSS
- shadcn/ui-ready setup
- Axios API client

### Backend
- Express 5
- MongoDB (Mongoose)
- Helmet, CORS, Rate Limit, HPP, Compression
- Zod validation
- Structured routes/controllers/middleware

### Deployment and DevOps
- Vercel monorepo config (frontend + backend together)
- Dockerfiles for frontend and backend
- Docker Compose for local containerized runs

## Project Structure

- Backend
  - api/index.js (Vercel serverless function entry)
  - server.js (local server entry)
  - src/app.js
  - src/config/cors.js
  - src/db/db.js
  - src/controllers
  - src/routes
  - src/middlewares
  - src/models
  - src/validations
- Frontend
  - src/pages
  - src/components/ui
  - src/services
  - tailwind.config.js
  - components.json
- vercel.json
- docker-compose.yml

## Environment Setup

### 1) Backend env
Create Backend/.env using Backend/.env.example:

NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=mern_boilerplate
CLIENT_ORIGIN=http://localhost:5173

### 2) Frontend env
Create Frontend/.env using Frontend/.env.example:

VITE_API_BASE_URL=http://localhost:5000/api

## Local Development (without Docker)

### Backend
cd Backend
npm install
npm run dev

### Frontend
cd Frontend
npm install
npm run dev

Open http://localhost:5173

## API Endpoints

- GET /api/health
- GET /api/posts
- POST /api/posts
  - body:
    - title (string, required)
    - content (string, required)
    - imageUrl (string URL, optional)

## Docker Setup

### Build and Run
From the project root:

docker compose up --build

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Vercel Deployment (Monorepo)

This repo includes vercel.json to deploy both apps together:
- Frontend static build from Frontend
- Backend serverless function from Backend/api/index.js
- API routed through /api/*

### Required Vercel Environment Variables
Set in your Vercel project settings:
- MONGO_URI
- MONGO_DB_NAME
- CLIENT_ORIGIN
- NODE_ENV=production

For CLIENT_ORIGIN, use your deployed Vercel domain, for example:
https://your-project.vercel.app

### Important Note on Containers
Vercel does not run your Docker containers directly for this setup.
Dockerfiles are included for local/dev and non-Vercel hosting.
On Vercel, deployment uses vercel.json builders and serverless runtime.

## Push to GitHub

Your target repository:
git@github.com:coderMayank69/MERN-Boiler.git

Run from root:

git init
git branch -M main
git remote add origin git@github.com:coderMayank69/MERN-Boiler.git
git add .
git commit -m "chore: initialize production-ready MERN boilerplate"
git push -u origin main

If remote already exists:

git remote set-url origin git@github.com:coderMayank69/MERN-Boiler.git
git add .
git commit -m "chore: upgrade MERN boilerplate with Tailwind, shadcn, Docker, and Vercel"
git push

## Best Practices Included

- Separation of concerns (routes/controllers/middleware)
- Input validation with Zod
- Secure defaults in Express
- Env-driven API and CORS configuration
- Frontend API abstraction layer
- Reusable UI components and utility helpers

## Next Improvements You Can Add Fast

- Auth (JWT + refresh tokens)
- Global state (Redux Toolkit or Zustand)
- Testing (Vitest + Supertest)
- File storage strategy (Cloudinary/S3)
- CI pipeline (GitHub Actions)
