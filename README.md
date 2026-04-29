# Student To-Do Planner

The Student To-Do Planner is a simple MERN stack web application that allows students to organize and manage academic tasks such as homework, quizzes, and exams. Users can create assignments, set due dates, and track their progress in one place.

## Features

- Add assignments with course name, title, and due date
- View all assignments
- Mark assignments as completed or pending
- Delete assignments
- Filter assignments by course or status
- Data is stored in MongoDB

## Tech Stack

- MongoDB
- Express
- React
- Node.js
- Axios

## Project Structure

TeamMUG_Final/
  client/
  server/

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/jtor5553/TeamMUG_Final.git  
cd TeamMUG_Final

### 2. Install backend dependencies

cd server  
npm install

### 3. Create environment file

Inside the server folder, create a file named `.env` and add:

MONGO_URI=mongodb://127.0.0.1:27017/studentTodoPlanner  
PORT=5000

### 4. Start the backend server

npm run dev

The backend will run at:  
http://localhost:5000

### 5. Install frontend dependencies

Open a new terminal:

cd client  
npm install

### 6. Start the frontend

npm run dev

The frontend will run at:  
http://localhost:5173

## Running the Application

You must run both the backend and frontend at the same time.

Terminal 1:

cd server  
npm run dev

Terminal 2:

cd client  
npm run dev

Then open your browser and go to:  
http://localhost:5173

## Notes

- MongoDB must be running locally before starting the backend
- The API endpoint for assignments is:  
  http://localhost:5000/api/assignments
