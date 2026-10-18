# Task Manager - SDLC & Implementation Guide
## Rapid Development using AI Tools, CLI & Browser Skills

**Goal:** Complete the entire Task Manager project (frontend + backend + deployment + docs) in 20 minutes using AI tools, CLI automation, and browser skills.

**Target:** From PDF review → Full working project → Ready for submission

---

## ⚡ 20-MINUTE EXECUTION PLAN

### TIMELINE BREAKDOWN
| Phase | Time | Goal |
|---|---|---|
| Phase 1: Setup & Analysis | 0-3 min | Review PDF, create structure, initialize |
| Phase 2: Backend Core (CRUD) | 3-8 min | Models, routes, controllers, DB setup |
| Phase 3: AI Integration | 8-10 min | Groq API integration, prompt engineering |
| Phase 4: Frontend Build | 10-14 min | React UI with all functionality |
| Phase 5: Testing & Polish | 14-17 min | Postman tests, error handling, validation |
| Phase 6: Deploy & Docs | 17-20 min | Git, deployment prep, README, submission files |

---

## 🛠️ TOOLS TO USE (CLI + AI + BROWSER)

### CLI Tools (PowerShell/Git/npm)
```bash
# Quick commands to use throughout
mkdir, npx create-react-app, npm init, npm install
git init, git add, git commit
node src/server.js, npm start, npm run dev
```

### AI Tools (Leverage Opencode capabilities)
- **Code Generation**: Generate complete files in one go (models, controllers, routes)
- **Prompt Engineering**: Craft AI prompt for task planning
- **Bug Fixing**: Instant error resolution
- **Refactoring**: Clean, organized code structure
- **Documentation**: Auto-generate READMEs, .env.examples

### Browser Skills (For rapid research & setup)
- **Groq API Setup**: Quickly create API key at console.groq.com
- **MongoDB Atlas**: Setup cluster & get connection string
- **Render/Railway/Render**: Deploy backend in clicks
- **Postman**: Test all endpoints rapidly
- **GitHub**: Create repo, push code

---

## STEP-BY-STEP EXECUTION (Copy-Paste Commands)

### STEP 1: PROJECT INITIALIZATION (0-3 MIN)
```powershell
# Navigate to project
cd D:\Task_Manager_project

# Create main project folder
mkdir task-manager-complete
cd task-manager-complete

# Initialize git
git init

# Backend init
mkdir backend\src\{config,models,controllers,routes,middlewares,utils}
cd backend
npm init -y
npm i express mongoose dotenv cors morgan axios
npm i -D nodemon
cd ..
```

### STEP 2: BUILD BACKEND CRUD (3-8 MIN)
Using AI to generate files instantly:
- **Task Model** (`backend/src/models/Task.js`) - Mongoose schema with title, description, status, dueDate
- **DB Config** (`backend/src/config/db.js`) - MongoDB connection
- **Controllers** (`backend/src/controllers/taskController.js`) - All 5 CRUD operations with validation
- **Routes** (`backend/src/routes/taskRoutes.js`) - RESTful routes
- **Server** (`backend/src/server.js`) - Express setup

### STEP 3: AI INTEGRATION (8-10 MIN)
Create `backend/src/routes/aiRoutes.js` with:
- POST `/api/ai/plan-task` endpoint
- Groq API call to `llama-3.1-8b-instant`
- Prompt to return structured JSON (summary, priority, estimatedHours, steps)
- Error handling for missing description, API failures, invalid responses
- Key stored in .env (never exposed)

**Groq Endpoint:** `https://api.groq.com/openai/v1/chat/completions`

### STEP 4: FRONTEND QUICK BUILD (10-14 MIN)
```powershell
# Create React app
npx create-react-app frontend --template minimal
cd frontend
npm i axios react-icons
cd ..
```

Generate components:
- **TaskForm.js** - Add/Edit tasks
- **TaskList.js** - Display all tasks with actions
- **AIPlanner.js** - AI plan generator interface
- **App.js** - Main app with state management
- **index.css** - Clean styling

### STEP 5: TESTING (14-17 MIN)
- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm start`
- Test all CRUD via Postman/curl
- Test AI endpoint with sample data
- Verify validation (invalid IDs, missing fields)
- Check error messages

### STEP 6: DEPLOYMENT & SUBMISSION (17-20 MIN)
**GitHub:**
```bash
echo "node_modules" > .gitignore
echo ".env" >> .gitignore
git add .
git commit -m "Complete Task Manager with AI Integration"
gh repo create task-manager-ai --public --source . --push  # if gh CLI available
```

**Render Deployment (Backend):**
1. Push to GitHub
2. Go to render.com → New Web Service → Connect repo
3. Build: `npm install`, Start: `npm start`
4. Add env vars (MONGODB_URI, GROQ_API_KEY, PORT)
5. Deploy & get live URL

**Submission Files:**
- ✅ Source code/GitHub link
- ✅ Postman collection (export JSON) or screenshots
- ✅ Live API URL (if deployed)
- ✅ `.env.example` (no secrets)
- ✅ AI integration explanation in README

---

## AI PROMPT FOR RAPID GENERATION

Copy this entire prompt to Opencode/any AI to generate the full project in seconds:

```text
Create a complete Task Manager app with:
1. Backend: Node.js+Express+MongoDB+Mongoose
2. CRUD: POST/GET/GET:id/PUT/DELETE /api/tasks with validation
3. AI: POST /api/ai/plan-task using Groq API (llama-3.1-8b-instant)
4. Return structured plan: {summary, priority, estimatedHours, steps}
5. Frontend: React with forms, lists, AI planner UI
6. Error handling for all cases
7. .env.example without secrets
8. Clean folder structure
9. Working code, no placeholders
```

---

## QUICK VALIDATION CHECKLIST
- [ ] All 5 CRUD endpoints working (201/200/400/404)
- [ ] AI endpoint returns correct JSON structure
- [ ] Invalid ID handled (400)
- [ ] Missing required fields handled (400)
- [ ] Empty AI description handled (400)
- [ ] API key not exposed
- [ ] MongoDB connected successfully
- [ ] Frontend connected to backend
- [ ] .env.example has correct var names
- [ ] Git repo clean (no node_modules, no .env)

---

## PRO TIPS FOR 20-MIN SUCCESS
1. **Generate in bulk** - Don't write line by line, generate entire files
2. **Use parallel** - Run frontend & backend in parallel terminals
3. **Test early** - Test CRUD after step 2, don't wait till end
4. **Browser-first** - Use browser skills to grab API keys/URLs instantly
5. **Copy proven code** - Use the exact schema from PDF requirements
6. **Skip perfection** - Focus on working > beautiful

**Execute aggressively. Speed > polish. Working project > perfect project.**