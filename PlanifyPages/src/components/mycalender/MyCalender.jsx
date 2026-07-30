import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyCalendar = () => {
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(2026);
    const [tasks, setTasks] = useState([]);
    var navigate = useNavigate()

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
        "december",
    ];

   
    useEffect(() => {
        const token = localStorage.getItem("UserToken");

        if (!token) {
            alert("Please login first");
            return;
        }

        const monthName = selectmonths[month];

        fetch(`http://localhost:5000/tasksmonth/${monthName}`, {
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
    }, [month]);


    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear((prev) => prev + 1);
        } else {
            setMonth((prev) => prev + 1);
        }
    };

    const prevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear((prev) => prev - 1);
        } else {
            setMonth((prev) => prev - 1);
        }
    };

    const getTasksForDay = (dayNumber) => {
        return tasks.filter((task) => Number(task.day) === dayNumber);
    };

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const styles = {
        page: {
            minHeight: "100vh",
            background: "linear-gradient(180deg, #0b1120 0%, #111827 45%, #1f2937 100%)",
            padding: "40px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Arial, sans-serif",
        },
        card: {
            width: "100%",
            maxWidth: "1100px",
            borderRadius: "24px",
            background: "linear-gradient(180deg, #111827, #1f2937)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
            padding: "32px",
        },
        topSection: {
            textAlign: "center",
            marginBottom: "28px",
        },
        iconBox: {
            width: "64px",
            height: "64px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            boxShadow: "0 14px 30px rgba(37, 99, 235, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
        },
        title: {
            color: "#f9fafb",
            fontWeight: "800",
            marginBottom: "8px",
            letterSpacing: "0.3px",
            fontSize: "34px",
            textTransform: "capitalize",
        },
        subtitle: {
            color: "rgba(255,255,255,0.62)",
            marginBottom: "14px",
            fontSize: "14px",
        },
        yearBadge: {
            display: "inline-block",
            padding: "10px 18px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#ffffff",
            fontWeight: "800",
            fontSize: "16px",
            boxShadow: "0 14px 30px rgba(37, 99, 235, 0.28)",
        },
        controls: {
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "26px",
        },
        secondaryBtn: {
            minWidth: "160px",
            height: "48px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            color: "#e5e7eb",
            fontWeight: "700",
            cursor: "pointer",
        },
        primaryBtn: {
            minWidth: "160px",
            height: "48px",
            borderRadius: "12px",
            border: "none",
            color: "#ffffff",
            fontWeight: "700",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            boxShadow: "0 14px 30px rgba(37, 99, 235, 0.28)",
            cursor: "pointer",
        },
        calendarBox: {
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "20px",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
        },
        dayCard: {
            padding: "14px",
            minHeight: "150px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
        },
        dayNumber: {
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "12px",
            color: "#ffffff",
            fontWeight: "800",
            fontSize: "14px",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            boxShadow: "0 14px 24px rgba(37, 99, 235, 0.24)",
        },
        emptyText: {
            color: "rgba(255,255,255,0.45)",
            fontSize: "13px",
        },
        taskPending: {
            fontSize: "12px",
            marginBottom: "8px",
            padding: "8px 10px",
            borderRadius: "10px",
            background: "rgba(59, 130, 246, 0.18)",
            border: "1px solid rgba(59, 130, 246, 0.35)",
            color: "#ffffff",
            fontWeight: "600",
            wordBreak: "break-word",
        },
        taskDone: {
            fontSize: "12px",
            marginBottom: "8px",
            padding: "8px 10px",
            borderRadius: "10px",
            background: "rgba(34, 197, 94, 0.18)",
            border: "1px solid rgba(34, 197, 94, 0.35)",
            color: "#ffffff",
            fontWeight: "600",
            textDecoration: "line-through",
            wordBreak: "break-word",
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.topSection}>
                    <div style={styles.iconBox}>
                        <i
                            className="fa fa-calendar"
                            style={{ color: "#ffffff", fontSize: "22px" }}
                        ></i>
                    </div>

                    <h1 style={styles.title}>{selectmonths[month]}</h1>

                    <p style={styles.subtitle}>
                        Manage your monthly tasks in a clean and modern workspace
                    </p>

                    <div style={styles.yearBadge}>{year}</div>
                </div>

                <div style={styles.controls}>
                    <button onClick={prevMonth} style={styles.secondaryBtn}>
                        Previous Month
                    </button>

                    <button onClick={nextMonth} style={styles.primaryBtn}>
                        Next Month
                    </button>
                </div>

                <div style={styles.calendarBox}>
                    <div style={styles.grid}>
                        {dayNumbers.map((day) => (
                            <div key={day} style={styles.dayCard}>
                                <div style={styles.dayNumber}>{day}</div>

                                {getTasksForDay(day).length === 0 ? (
                                    <div style={styles.emptyText}>No tasks</div>
                                ) : (
                                    getTasksForDay(day).map((task) => (
                                        <div
                                            key={task.id}
                                            style={
                                                task.completed
                                                    ? styles.taskDone
                                                    : styles.taskPending
                                            }
                                        >
                                            {task.title}
                                        </div>
                                    ))
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCalendar;
