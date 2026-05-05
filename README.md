# Student To-Do Planner

Student To-Do Planner is a MERN stack web application that helps students manage assignments, due dates, and course information.

## Tech Stack

- MongoDB
- Express.js
- React
- Node.js
- Mongoose
- Axios
- React Router

## Features

- Add, view, update, and delete assignments
- Track assignment status
- Manage course information
- Store data in MongoDB
- Use React Router for page navigation
- Use Axios to connect the frontend to the backend

## Project Structure

```txt
TeamMUG_Final/
├── client/
├── server/
│   ├── models/
│   │   ├── Assignment.js
│   │   └── Course.js
│   ├── routes/
│   │   ├── assignments.js
│   │   └── courses.js
│   └── server.js
└── README.md
```

## API Routes

### Assignments

| Method | Route | Description |
|---|---|---|
| GET | `/api/assignments` | Get all assignments |
| POST | `/api/assignments` | Add an assignment |
| PUT | `/api/assignments/:id` | Update an assignment |
| DELETE | `/api/assignments/:id` | Delete an assignment |

### Courses

| Method | Route | Description |
|---|---|---|
| GET | `/api/courses` | Get all courses |
| POST | `/api/courses` | Add a course |
| PUT | `/api/courses/:id` | Update a course |
| DELETE | `/api/courses/:id` | Delete a course |

## Setup Instructions

### Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/studentTodoPlanner
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The backend runs at:

```txt
http://localhost:5000
```

### Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs at:

```txt
http://localhost:5173
```

## Running the App

Run the backend and frontend at the same time.

Then open:

```txt
http://localhost:5173
```

## Project Requirements Met

- React frontend with routing
- Axios used for frontend/backend communication
- Express backend with API routes
- MongoDB database connected through Mongoose
- Two Mongoose models: `Assignment` and `Course`
- CRUD functionality included

## Video Presentation

YouTube Video Link: `[link]`

## Team Members and Roles

| Team Member | Role / Contributions |
|---|---|
| Jose Torres-Gomez | Frontend development, README |
| Mako Chirisa | Frontend development and styling |
| Cole Puls | Backend development, models, routes, and README |
| Graham Roesel | Backend development, Presentation |
