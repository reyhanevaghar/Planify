import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
    const navigate = useNavigate();

    const [tasks, settasks] = useState([]);
    const [ShowModal, setShowModal] = useState(false);
    const [id, setId] = useState(-1);
    const [title, settitle] = useState();

    
    useEffect(() => {
        const token = localStorage.getItem("UserToken")

        if (!token) {
            alert("Please login first")
            navigate("/signin")
            return
        }

        fetch("http://localhost:5000/mytasks", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("UserToken")
                    localStorage.removeItem("user")
                    alert("Your session has expired. Please login again.");
                    navigate("/signin");
                    return null
                }
                return res.json()
            })
            .then((data) => {
                if (data.result === true) {
                    settasks(data.tasks);
                }
            })
            .catch((err) => console.log(err));
    }, [navigate]);


    const BtnYes = (id) => {
        const token = localStorage.getItem("UserToken");

        if (!token) {
            alert("Please login first");
            navigate("/signin");
            return;
        }

        setShowModal(false);

        fetch(`http://localhost:5000/deleteTask/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("UserToken");
                    localStorage.removeItem("user");
                    alert("Your session has expired. Please login again.");
                    navigate("/signin");
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                if (data && data.result === true) {
                    settasks((prev) => prev.filter((t) => t.id !== id));
                }
            })
            .catch((err) => console.log(err));
    };


    const BtnDelete = (id, title) => {
        settitle(title);
        setId(id);
        setShowModal(true);
    };

    const BtnEdit = (id) => {
        navigate(`/updatetask/${id}`);
    };

    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold" style={{ color: "#111827", marginBottom: "4px" }}>Tasks</h2>
                    <p className="text-muted small mb-0">Manage and organize your daily activities</p>
                </div>
                <button
                    className="btn btn-dark px-4 py-2"
                    style={{ borderRadius: "12px", fontWeight: "600" }}
                    onClick={() => navigate('/addtask')}
                >
                    + New Task
                </button>
            </div>

            {/* Table Card */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: "16px", overflow: "hidden" }}>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead style={{ backgroundColor: "#f9fafb" }}>
                                <tr>
                                    <th className="py-3 ps-4 text-secondary font-weight-bold">Title</th>
                                    <th className="py-3 text-secondary">Details</th>
                                    <th className="py-3 text-secondary">Month</th>
                                    <th className="py-3 text-secondary">Day</th>
                                    <th className="py-3 text-end pe-4 text-secondary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length > 0 ? (
                                    tasks.map(x => (
                                        <tr key={x.id}>
                                            <td className="ps-4 fw-bold text-dark">{x.title}</td>
                                            <td className="text-muted">{x.details}</td>
                                            <td><span className="badge rounded-pill bg-light text-dark border">{x.month}</span></td>
                                            <td><span className="badge rounded-pill bg-light text-dark border">{x.day}</span></td>
                                            <td className="text-end pe-4">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                    style={{ borderRadius: "8px" }}
                                                    onClick={() => BtnEdit(x.id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    style={{ borderRadius: "8px" }}
                                                    onClick={() => BtnDelete(x.id, x.title)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5 text-muted">No tasks available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {ShowModal && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(17, 24, 39, 0.4)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "20px" }}>
                            <div className="modal-body p-4 text-center">
                                <div className="mb-3">
                                    <i className="fa fa-exclamation-triangle text-warning" style={{ fontSize: "3rem" }}></i>
                                </div>
                                <h5 className="fw-bold mb-2">Delete Task</h5>
                                <p className="text-muted mb-4">Are you sure you want to delete <strong className="text-dark">{title}</strong>? This action cannot be undone.</p>
                                <div className="d-flex justify-content-center gap-2">
                                    <button className="btn btn-danger px-4" style={{ borderRadius: "10px" }} onClick={() => BtnYes(id)}>Delete</button>
                                    <button className="btn btn-light px-4" style={{ borderRadius: "10px" }} onClick={() => setShowModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks
