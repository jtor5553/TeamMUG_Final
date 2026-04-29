import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/assignments";

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
                <h1>Student To-Do Planner</h1>
                <p className="subtitle">Track homework, quizzes, exams, and projects.</p>

                <form onSubmit={addAssignment} className="form">
                    <input
                        type="text"
                        placeholder="Course Name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        minLength="2"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Assignment Title"
                        value={assignmentTitle}
                        onChange={(e) => setAssignmentTitle(e.target.value)}
                        minLength="2"
                        required
                    />

                    <input
                        type="date"
                        value={dueDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />

                    <button type="submit">Add Assignment</button>
                </form>

                <div className="filters">
                    <input
                        type="text"
                        placeholder="Filter by course"
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
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
                                    <button onClick={() => markComplete(assignment)}>
                                        {assignment.status === "Completed"
                                            ? "Mark Pending"
                                            : "Mark Complete"}
                                    </button>

                                    <button
                                        className="delete"
                                        onClick={() => deleteAssignment(assignment._id)}
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

export default App;