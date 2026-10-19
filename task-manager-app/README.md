# Task Manager Application - Complete Implementation

## Overview
This is a full-stack Task Manager application with AI-powered task planning capabilities, built as per the requirements. The project includes a Node.js/Express backend with MongoDB and a React frontend.

## Project Structure
```
task-manager-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   └── taskController.js  # All 5 CRUD operations + validation
│   │   ├── models/
│   │   │   └── Task.js            # Mongoose schema (title, description, status, dueDate)
│   │   ├── routes/
│   │   │   ├── taskRoutes.js      # /api/tasks
│   │   │   └── aiRoutes.js        # /api/ai/plan-task
│   │   └── server.js              # Express app, middleware, error handler
│   ├── .env.example
│   ├── .env                       # local only, git-ignored
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx       # Add / edit task form
│   │   │   ├── TaskList.jsx       # Task list with actions
│   │   │   └── AIPlanner.jsx      # AI plan generator UI
│   │   ├── App.jsx                # State + API calls
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js             # dev proxy /api -> :5001
│   └── package.json
├── docs/
│   ├── postman-collection.md
│   └── test-ai.js
├── Task_Manager_API.postman_collection.json
├── render.yaml                    # Render deployment config
└── README.md
```

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
- Copy `.env.example` to `.env`
- Update the following variables:
  - `MONGODB_URI`: Your MongoDB connection string
  - `GROQ_API_KEY`: Your Groq API key (get from https://console.groq.com/)

### 3. Get Groq API Key (for AI Integration)
1. Go to https://console.groq.com/
2. Sign up/login and navigate to API Keys
3. Create a new API key
4. Add it to your `.env` file

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

## API Endpoints

### Tasks CRUD
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a single task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### AI Task Planning
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/plan-task` | Generate AI task plan from description |

## Testing with Postman

### Create Task
```json
POST http://localhost:5000/api/tasks
{
  "title": "Learn React",
  "description": "Complete React basics",
  "status": "pending",
  "dueDate": "2026-10-20"
}
```

### Generate AI Plan
```json
POST http://localhost:5000/api/ai/plan-task
{
  "description": "I need to build a portfolio website within three days."
}
```

## How the AI API Was Integrated (Part 2 Explanation)

The backend integrates **Groq** (`https://api.groq.com/openai/v1/chat/completions`) as the external AI provider:

1. **Endpoint** — `POST /api/ai/plan-task` in `backend/src/routes/aiRoutes.js` accepts `{ "description": "..." }`.
2. **Key storage** — the key lives only in `backend/.env` as `GROQ_API_KEY` and is read via `process.env`. It is never sent to the frontend, never hard-coded, and `.env` is git-ignored so it is not uploaded to GitHub.
3. **Prompting** — the description is embedded in a system-style prompt that instructs the model to return **only** a JSON object with `summary`, `priority` (`low|medium|high`), `estimatedHours` (number) and `steps` (array of actionable steps).
4. **Model fallback** — the code tries `openai/gpt-oss-20b`, then `llama-3.1-8b-instant`, then `llama-3.3-70b-versatile`, so a deprecated/quota-limited model does not break the endpoint.
5. **Response handling** — markdown fences are stripped, `JSON.parse`d, then structurally validated before being returned as `{ success: true, plan: {...} }`.
6. **Error handling** — empty/missing description → `400`; missing key → `500`; unparseable or malformed AI output → `500`; upstream API failure → `500` with a clear message. A 30s timeout prevents hangs.

## Deployment (Render)

Config is in `render.yaml` (build: `cd backend && npm install`, start: `cd backend && npm start`).

Environment variables to set on Render:
- `MONGODB_URI` — MongoDB Atlas connection string
- `GROQ_API_KEY` — Groq key
- `NODE_ENV` = `production`
- `PORT` = `10000` (set by render.yaml)

**Live API URL:** _filled in below after deployment_

## Features
- ✅ Complete CRUD operations for tasks
- ✅ AI-powered task plan generation using Groq API
- ✅ Proper validation and error handling
- ✅ MongoDB integration with Mongoose
- ✅ CORS enabled
- ✅ Environment variable management
- ✅ Structured API responses
- ✅ Input validation (required fields, valid IDs, enum values)