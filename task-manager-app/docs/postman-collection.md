# Postman Testing — Task Manager API

Import **`Task_Manager_API.postman_collection.json`** (repo root of `task-manager-app/`) into Postman.
Base URL for local runs: `http://localhost:5000` (or `http://localhost:5001` if 5000 is busy).
Add header `Content-Type: application/json` on all POST/PUT requests.

## Test Cases

| # | Name | Method | Endpoint | Expected |
|---|---|---|---|---|
| 1 | Health Check | GET | `/` | 200, `success: true` |
| 2 | Create Task | POST | `/api/tasks` | **201**, task object |
| 3 | Get All Tasks | GET | `/api/tasks` | **200**, `count` + `tasks[]` |
| 4 | Get Single Task | GET | `/api/tasks/:id` | **200**, task object |
| 5 | Update Task | PUT | `/api/tasks/:id` | **200**, updated task |
| 6 | Delete Task | DELETE | `/api/tasks/:id` | **200**, "Task deleted successfully" |
| 7 | Generate AI Plan | POST | `/api/ai/plan-task` | **200**, `plan{summary,priority,estimatedHours,steps[]}` |
| 8 | AI — Empty Description | POST | `/api/ai/plan-task` | **400** "Description is required" |
| 9 | Invalid Task ID | GET | `/api/tasks/badid` | **400** "Invalid task ID" |
| 10 | Missing Title | POST | `/api/tasks` | **400** "Title is required" |

Additional checks: valid-looking but non-existent ID → **404** "Task not found"; unknown route → **404**.

## Sample Requests

### Create Task
```
POST http://localhost:5000/api/tasks
{
  "title": "Learn React",
  "description": "Complete React basics and hooks",
  "status": "pending",
  "dueDate": "2026-10-25"
}
```

### Generate AI Plan
```
POST http://localhost:5000/api/ai/plan-task
{
  "description": "I need to build a portfolio website within three days."
}
```

Expected response:
```json
{
  "success": true,
  "plan": {
    "summary": "Build and launch a personal portfolio website.",
    "priority": "high",
    "estimatedHours": 12,
    "steps": ["Plan the website structure", "Build the responsive layout", "Test and deploy"]
  }
}
```

### Error: Missing Title
```
POST http://localhost:5000/api/tasks
{ "description": "no title" }        -> 400 { "success": false, "message": "Title is required" }
```

### Error: Invalid ID
```
GET http://localhost:5000/api/tasks/not-an-id   -> 400 { "success": false, "message": "Invalid task ID" }
```

### Error: Empty AI Description
```
POST http://localhost:5000/api/ai/plan-task
{ "description": "" }                -> 400 { "success": false, "message": "Description is required" }
```

## Scripted Test (optional)
`docs/test-ai.js` calls the AI endpoint from the CLI:
```bash
cd backend && npm start          # terminal 1
node ../docs/test-ai.js          # terminal 2
```
