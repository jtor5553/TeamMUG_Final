import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

const API_URL = "http://localhost:5001/api/assignments";

function PlannerPage({
    assignments,
    courseName,
    assignmentTitle,
    dueDate,
    courseFilter,
    statusFilter,
    onCourseNameChange,
    onAssignmentTitleChange,
    onDueDateChange,
    onCourseFilterChange,
    onStatusFilterChange,
    onAddAssignment,
    onMarkComplete,
    onDeleteAssignment
}) {
    const filteredAssignments = assignments.filter((assignment) => {
        const matchesCourse = assignment.courseName
            .toLowerCase()
            .includes(courseFilter.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || assignment.status === statusFilter;

        return matchesCourse && matchesStatus;
    });

    return (
        <div className="page">
            <div className="container">
                <div className="hero">
                    <p className="eyebrow">Student To-Do Planner</p>
                    <h1>Stay on top of every assignment.</h1>
                    <p className="subtitle">
                        Track homework, quizzes, exams, and projects from one place.
                    </p>
                </div>

                <form onSubmit={onAddAssignment} className="form">
                    <input
                        type="text"
                        placeholder="Course Name"
                        value={courseName}
                        onChange={(e) => onCourseNameChange(e.target.value)}
                        minLength="2"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Assignment Title"
                        value={assignmentTitle}
                        onChange={(e) => onAssignmentTitleChange(e.target.value)}
                        minLength="2"
                        required
                    />

                    <input
                        type="date"
                        value={dueDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => onDueDateChange(e.target.value)}
                        required
                    />

                    <button type="submit">Add Assignment</button>
                </form>

                <div className="filters">
                    <input
                        type="text"
                        placeholder="Filter by course"
                        value={courseFilter}
                        onChange={(e) => onCourseFilterChange(e.target.value)}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value)}
                    >
                        <option value="All">All Assignments</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="list">
                    {filteredAssignments.length === 0 ? (
                        <p className="empty">No assignments found.</p>
                    ) : (
                        filteredAssignments.map((assignment) => (
                            <div className="card" key={assignment._id}>
                                <div>
                                    <h2>{assignment.assignmentTitle}</h2>
                                    <p>
                                        <strong>Course:</strong> {assignment.courseName}
                                    </p>
                                    <p>
                                        <strong>Due Date:</strong> {assignment.dueDate}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={
                                                assignment.status === "Completed" ? "done" : "pending"
                                            }
                                        >
                                            {assignment.status}
                                        </span>
                                    </p>
                                </div>

                                <div className="actions">
                                    <button onClick={() => onMarkComplete(assignment)}>
                                        {assignment.status === "Completed"
                                            ? "Mark Pending"
                                            : "Mark Complete"}
                                    </button>

                                    <button
                                        className="delete"
                                        onClick={() => onDeleteAssignment(assignment._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function AboutPage() {
    return (
        <div className="page">
            <div className="container info-page">
                <p className="eyebrow">About</p>
                <h1>Built for a simple student workflow.</h1>
                <p className="subtitle">
                    This app keeps assignments in MongoDB and lets you manage them from a
                    small React interface.
                </p>
                <div className="info-grid">
                    <div className="info-card">
                        <h2>What it does</h2>
                        <p>Add, update, filter, and delete assignments.</p>
                    </div>
                    <div className="info-card">
                        <h2>How it works</h2>
                        <p>React Router handles navigation between pages.</p>
                    </div>
                    <div className="info-card">
                        <h2>Storage</h2>
                        <p>Data is saved through the Express API into MongoDB.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    const [assignments, setAssignments] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        getAssignments();
    }, []);

    const getAssignments = async () => {
        const response = await axios.get(API_URL);
        setAssignments(response.data);
    };

    const addAssignment = async (e) => {
        e.preventDefault();

        if (!courseName.trim() || !assignmentTitle.trim() || !dueDate) {
            alert("Please fill out all fields.");
            return;
        }

        if (courseName.trim().length < 2) {
            alert("Course name must be at least 2 characters.");
            return;
        }

        if (assignmentTitle.trim().length < 2) {
            alert("Assignment title must be at least 2 characters.");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(dueDate);

        if (selectedDate < today) {
            alert("Due date cannot be in the past.");
            return;
        }

        const newAssignment = {
            courseName: courseName.trim(),
            assignmentTitle: assignmentTitle.trim(),
            dueDate,
            status: "Pending"
        };

        await axios.post(API_URL, newAssignment);

        setCourseName("");
        setAssignmentTitle("");
        setDueDate("");

        getAssignments();
    };

    const markComplete = async (assignment) => {
        const newStatus =
            assignment.status === "Completed" ? "Pending" : "Completed";

        await axios.put(`${API_URL}/${assignment._id}`, {
            ...assignment,
            status: newStatus
        });

        getAssignments();
    };

    const deleteAssignment = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        getAssignments();
    };

    return (
        <>
            <header className="topbar">
                <div className="brand">Planner</div>
                <nav className="nav">
                    <Link to="/planner">Planner</Link>
                    <Link to="/about">About</Link>
                </nav>
            </header>

            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/planner" replace />}
                />
                <Route
                    path="/planner"
                    element={
                        <PlannerPage
                            assignments={assignments}
                            courseName={courseName}
                            assignmentTitle={assignmentTitle}
                            dueDate={dueDate}
                            courseFilter={courseFilter}
                            statusFilter={statusFilter}
                            onCourseNameChange={setCourseName}
                            onAssignmentTitleChange={setAssignmentTitle}
                            onDueDateChange={setDueDate}
                            onCourseFilterChange={setCourseFilter}
                            onStatusFilterChange={setStatusFilter}
                            onAddAssignment={addAssignment}
                            onMarkComplete={markComplete}
                            onDeleteAssignment={deleteAssignment}
                        />
                    }
                />
                <Route path="/about" element={<AboutPage />} />
                <Route
                    path="*"
                    element={<Navigate to="/planner" replace />}
                />
            </Routes>
        </>
    );
}

export default App;