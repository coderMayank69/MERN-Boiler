# MERN Boilerplate - Deployment Guide

This guide covers local setup, Docker containerization, and Vercel deployment.

## Quick Local Start (5 minutes)

### 1. Clone your repo
```bash
git clone git@github.com:coderMayank69/MERN-Boiler.git
cd MERN-Boiler
```

### 2. Backend Setup
```bash
cd Backend
cp .env.example .env
```
Edit `.env` and fill in:
- `MONGO_URI` – your MongoDB connection string
- `MONGO_DB_NAME` – database name (e.g., mern_boilerplate)
- `CLIENT_ORIGIN` – frontend URL (http://localhost:5173 for local)
- `PORT` – typically 5000

```bash
npm install
npm run dev
```
Backend runs on http://localhost:5000

### 3. Frontend Setup (new terminal)
```bash
cd Frontend
cp .env.example .env
```
`.env` should have:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
npm install
npm run dev
```
Frontend runs on http://localhost:5173

### 4. Test
Open http://localhost:5173 → navigate to Feed (redirects from /) → click "Create Post" → submit a post → it should appear in Feed

---

## Docker Setup (Local Containers)

From project root:

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

Access the same Feed/Create Post flow.

To stop:
```bash
docker compose down
```

---

## Vercel Deployment

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repo connected to Vercel
- MongoDB Atlas cluster or other hosted Mongo URI

### 1. Connect GitHub to Vercel
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your MERN-Boiler repo
4. Vercel auto-detects monorepo via `vercel.json`

### 2. Set Environment Variables
In Vercel project settings → Environment Variables:
- `MONGO_URI` – Your MongoDB connection string (e.g., mongodb+srv://user:pass@cluster.mongodb.net/)
- `MONGO_DB_NAME` – Database name
- `CLIENT_ORIGIN` – Your Vercel deployment URL (e.g., https://your-project.vercel.app)
- `NODE_ENV` – Set to "production"

### 3. Deploy
Just push to GitHub main:
```bash
git push origin main
```

Vercel automatically:
- Builds Frontend (Vite) → static files
- Deploys Backend serverless function (Node.js)
- Routes `/api/*` to backend
- Routes all other paths to frontend index.html (SPA)

Your app is live at `https://your-project.vercel.app`

### 4. Verify on Vercel
- Go to https://your-project.vercel.app
- Test Feed page
- Try creating a post
- Check Vercel logs for errors: Dashboard → Project → Deployments → View logs

---

## Common Issues & Fixes

### Issue: Frontend can't reach backend (CORS error)
**Cause:** `CLIENT_ORIGIN` env var mismatch
**Fix:** 
- Local: Ensure `CLIENT_ORIGIN=http://localhost:5173` in Backend/.env
- Vercel: Set `CLIENT_ORIGIN=https://your-project.vercel.app` in project settings

### Issue: Database connection fails
**Cause:** Invalid MONGO_URI or wrong credentials
**Fix:** 
- Test URI in MongoDB Atlas directly
- Check IP whitelist (Atlas → Network Access)
- Verify `MONGO_DB_NAME` matches your actual database

### Issue: 404 on Vercel frontend after deploy
**Cause:** Frontend build failed silently
**Fix:** 
- Check Vercel build logs: Dashboard → Deployment
- Ensure `npm run build` passes locally: `cd Frontend && npm run build`
- Check `vite.config.js` has correct build settings

### Issue: Backend endpoint fails (500) on Vercel
**Cause:** Missing env var or MongoDB connection timeout
**Fix:**
- Check all env variables are set in Vercel
- Increase MongoDB connection timeout: `serverSelectionTimeoutMS`
- Review Vercel Function logs for detailed error

---

## File Structure Recap

```
.
├── Backend/
│   ├── api/index.js              (Vercel serverless entry)
│   ├── server.js                 (Local dev entry)
│   ├── src/app.js               (Express app)
│   ├── src/routes/index.js       (API routes)
│   ├── src/controllers/          (Business logic)
│   ├── src/models/               (Mongoose schemas)
│   └── src/config/cors.js        (CORS setup)
├── Frontend/
│   ├── src/App.jsx              (React router wrapper)
│   ├── src/pages/               (Create Post, Feed)
│   ├── src/components/ui/       (Tailwind + Radix UI primitives)
│   ├── src/services/            (Axios API client)
│   └── vite.config.js           (Vite + proxy setup)
├── vercel.json                   (Monorepo build & route config)
├── docker-compose.yml            (Local containerization)
└── README.md                     (This file)
```

---

## Extending the Boilerplate

### Add a new API endpoint
1. Create controller in `Backend/src/controllers/`
2. Add route in `Backend/src/routes/`
3. Call from Frontend via `src/services/api-client.js`

### Add shadcn/ui components
Boilerplate comes with Button, Card, Input, Textarea, Label pre-configured.
Add more via:
```bash
cd Frontend
npx shadcn-ui@latest add [component-name]
```

### Add Authentication
- Consider using Clerk, Auth0, or JWT + refresh tokens
- Update Backend CORS to handle auth headers
- Protect routes with middleware

### Add Database Migrations
- Use Mongoose schema versioning or Mongoose Migrations library
- Test migrations in development before Vercel deploy

---

## Performance Tips

- Compress images before upload
- Use CDN for static assets (Frontend `public/` in Vercel)
- Add caching headers to API responses
- Monitor Vercel Function runtime (should be < 10s per request)

---

For more help, see the main README.md
