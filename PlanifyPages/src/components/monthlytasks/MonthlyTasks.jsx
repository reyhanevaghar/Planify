import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MonthlyTasks = () => {
    const [selectedMonth, setSelectedMonth] = useState("")
    const [tasks, setTasks] = useState([])
    var nav = useNavigate()
    const selectmonths = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ]

    useEffect(() => {
        if (selectedMonth !== "") {
            getTasksByMonth(selectedMonth);
        }
    }, [selectedMonth]);

    const getTasksByMonth = (month) => {
        const token = localStorage.getItem("UserToken");

        if (!token) {
            alert("Please login first")
            nav('/signin')
            return;
        }

        fetch(`http://localhost:5000/tasksmonth/${month}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("UserToken");
                    localStorage.removeItem("user");
                    alert("Your session has expired. Please login again.");
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                    setTasks(data.result || []);
                }
            })
            .catch((err) => console.log(err));
    };


    const toggleComplete = (task) => {
        const token = localStorage.getItem("UserToken");

        if (!token) {
            alert("Please login first");
            return;
        }

        const status = !task.completed;

        fetch(`http://localhost:5000/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...task,
                completed: !task.completed
            })
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("UserToken");
                    localStorage.removeItem("user");
                    alert("Your session has expired. Please login again.");
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                if (data && data.result === true) {
                    setTasks((prev) =>
                        prev.map((t) =>
                            t.id === task.id
                                ? { ...t, completed: !t.completed }
                                : t
                        )
                    );

                    if (status === true) {
                        alert("task is done");
                    }
                }
            })
            .catch((err) => console.log(err));
    };


    return (
        <div
            className="container mt-4"
            style={{ minHeight: "100vh", paddingTop: "30px", paddingBottom: "30px" }}
        >
            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    padding: "32px",
                    borderRadius: "24px",
                    background: "linear-gradient(180deg, #111827, #1f2937)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.35)"
                }}
            >
                <h2
                    style={{
                        color: "#f9fafb",
                        fontWeight: "800",
                        marginBottom: "24px",
                        textAlign: "center"
                    }}
                >
                    Monthly Tasks
                </h2>

                <div className="mb-3">
                    <label
                        style={{
                            display: "block",
                            color: "#e5e7eb",
                            fontWeight: "600",
                            marginBottom: "8px"
                        }}
                    >
                        Select Month
                    </label>

                    <select
                        className="form-control"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        style={{
                            height: "48px",
                            borderRadius: "12px",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#ffffff",
                            boxShadow: "none"
                        }}
                    >
                        <option value="" style={{ color: "#000" }}>select a month</option>
                        {selectmonths.map((m) => (
                            <option key={m} value={m} style={{ color: "#000" }}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    {tasks.length === 0 ? (
                        <p
                            style={{
                                color: "rgba(255,255,255,0.65)",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "16px",
                                padding: "16px",
                                marginTop: "16px"
                            }}
                        >
                            no tasks for this month
                        </p>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className="card mb-2 p-3 d-flex flex-row justify-content-between align-items-center"
                                style={{
                                    background: task.completed
                                        ? "rgba(34,197,94,0.10)"
                                        : "rgba(255,255,255,0.04)",
                                    border: task.completed
                                        ? "1px solid rgba(34,197,94,0.25)"
                                        : "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "16px",
                                    boxShadow: "0 10px 24px rgba(0,0,0,0.18)"
                                }}
                            >
                                <div>
                                    <h5
                                        style={{
                                            color: "#f9fafb",
                                            marginBottom: "8px",
                                            textDecoration: task.completed ? "line-through" : "none"
                                        }}
                                    >
                                        {task.title}
                                    </h5>
                                    <p
                                        style={{
                                            color: "rgba(255,255,255,0.72)",
                                            marginBottom: "8px",
                                            textDecoration: task.completed ? "line-through" : "none"
                                        }}
                                    >
                                        {task.details}
                                    </p>
                                    <small style={{ color: "rgba(255,255,255,0.55)" }}>
                                        date: {task.day} {task.month}
                                    </small>
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleComplete(task)}
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                            cursor: "pointer"
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MonthlyTasks;
