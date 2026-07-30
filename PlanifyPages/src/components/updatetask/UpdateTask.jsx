import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ShowErrorMessage from "../ShowErrorMessage/ShowErrorMessage";

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        id: "",
        title: "",
        details: "",
        month: "",
        day: ""
    });

    const selectdays = Array.from({ length: 31 }, (_, i) => i + 1);

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
    ];

    useEffect(() => {
        const token = localStorage.getItem("UserToken");

        if (!token) {
            alert("Please login first");
            navigate("/signin");
            return;
        }

        fetch(`http://localhost:5000/gettaskbyid/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
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
                if (data && data.result) {
                    setTask({
                        id: data.result.id || "",
                        title: data.result.title || "",
                        details: data.result.details || "",
                        month: data.result.month || "",
                        day: data.result.day || ""
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Error loading task data");
            });
    }, [id, navigate]);

    const formvalidationSchema = Yup.object().shape({
        title: Yup.string().required("write down the title of your task"),
        details: Yup.string().required("write down the details of the task"),
        month: Yup.string().required("pls choose one of the months"),
        day: Yup.number()
            .required("pls choose a day")
            .min(1, "day must be at least 1")
            .max(31, "day must be at most 31")
    });

    const onbtnupdate = (values) => {
        const token = localStorage.getItem("UserToken");

        if (!token) {
            alert("Please login first");
            navigate("/signin");
            return;
        }

        fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                id: values.id,
                title: values.title,
                details: values.details,
                month: values.month,
                day: Number(values.day)
            })
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem("UserToken");
                    localStorage.removeItem("user");
                    alert("Your session has expired. Please login again.");
                    navigate("/signin");
                    return null;
                }

                if (!res.ok) {
                    throw new Error("Failed to update task");
                }

                return res.json();
            })
            .then((data) => {
                if (data && data.result === true) {
                    alert("updated successfully");
                    navigate("/tasks");
                } else if (data) {
                    alert("error pls try again");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Something went wrong while updating the task.");
            });
    };

    const backinhome = () => {
        navigate("/tasks");
    };

    return (
        <div
            className="container py-5 d-flex justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
        >
            <div
                className="p-4 p-md-5"
                style={{
                    width: "100%",
                    maxWidth: "560px",
                    borderRadius: "24px",
                    background: "linear-gradient(180deg, #111827, #1f2937)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)"
                }}
            >
                <div className="text-center mb-4">
                    <div
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                        style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "18px",
                            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                            boxShadow: "0 14px 30px rgba(37, 99, 235, 0.35)"
                        }}
                    >
                        <i
                            className="fa fa-pen"
                            style={{ color: "#ffffff", fontSize: "22px" }}
                        ></i>
                    </div>

                    <h3
                        style={{
                            color: "#f9fafb",
                            fontWeight: "800",
                            marginBottom: "8px",
                            letterSpacing: "0.3px"
                        }}
                    >
                        Update Task
                    </h3>

                    <p
                        style={{
                            color: "rgba(255,255,255,0.62)",
                            marginBottom: 0,
                            fontSize: "14px"
                        }}
                    >
                        Edit your task details with a clean and modern workspace
                    </p>
                </div>

                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        id: task.id,
                        title: task.title,
                        details: task.details,
                        month: task.month,
                        day: task.day
                    }}
                    validationSchema={formvalidationSchema}
                    onSubmit={onbtnupdate}
                >
                    <Form>
                        <div className="mb-3">
                            <label
                                className="form-label"
                                style={{
                                    color: "#e5e7eb",
                                    fontWeight: "600",
                                    marginBottom: "8px"
                                }}
                            >
                                ID
                            </label>
                            <Field
                                name="id"
                                className="form-control"
                                disabled={true}
                                style={{
                                    height: "50px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    color: "rgba(255,255,255,0.55)",
                                    boxShadow: "none"
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="form-label"
                                style={{
                                    color: "#e5e7eb",
                                    fontWeight: "600",
                                    marginBottom: "8px"
                                }}
                            >
                                Title
                            </label>
                            <Field
                                name="title"
                                className="form-control"
                                placeholder="Enter task title"
                                style={{
                                    height: "50px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#ffffff",
                                    boxShadow: "none"
                                }}
                            />
                            <ErrorMessage name="title" component={ShowErrorMessage} />
                        </div>

                        <div className="mb-3">
                            <label
                                className="form-label"
                                style={{
                                    color: "#e5e7eb",
                                    fontWeight: "600",
                                    marginBottom: "8px"
                                }}
                            >
                                Details
                            </label>
                            <Field
                                name="details"
                                className="form-control"
                                placeholder="Enter task details"
                                style={{
                                    minHeight: "50px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#ffffff",
                                    boxShadow: "none"
                                }}
                            />
                            <ErrorMessage name="details" component={ShowErrorMessage} />
                        </div>

                        <div className="mb-3">
                            <label
                                className="form-label"
                                style={{
                                    color: "#e5e7eb",
                                    fontWeight: "600",
                                    marginBottom: "8px"
                                }}
                            >
                                Month
                            </label>
                            <Field
                                as="select"
                                name="month"
                                className="form-control"
                                style={{
                                    height: "50px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#ffffff",
                                    boxShadow: "none"
                                }}
                            >
                                <option value="" style={{ color: "#111827" }}>
                                    select a month
                                </option>
                                {selectmonths.map((m) => {
                                    return (
                                        <option key={m} value={m} style={{ color: "#111827" }}>
                                            {m}
                                        </option>
                                    );
                                })}
                            </Field>
                            <ErrorMessage name="month" component={ShowErrorMessage} />
                        </div>

                        <div className="mb-4">
                            <label
                                className="form-label"
                                style={{
                                    color: "#e5e7eb",
                                    fontWeight: "600",
                                    marginBottom: "8px"
                                }}
                            >
                                Day
                            </label>
                            <Field
                                as="select"
                                name="day"
                                className="form-control"
                                style={{
                                    height: "50px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "#ffffff",
                                    boxShadow: "none"
                                }}
                            >
                                <option value="" style={{ color: "#111827" }}>
                                    select a day
                                </option>
                                {selectdays.map((d) => {
                                    return (
                                        <option key={d} value={d} style={{ color: "#111827" }}>
                                            {d}
                                        </option>
                                    );
                                })}
                            </Field>
                            <ErrorMessage name="day" component={ShowErrorMessage} />
                        </div>

                        <div className="d-flex justify-content-between gap-3">
                            <button
                                type="button"
                                className="btn w-50"
                                onClick={backinhome}
                                style={{
                                    height: "46px",
                                    borderRadius: "12px",
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "#e5e7eb",
                                    fontWeight: "600"
                                }}
                            >
                                Back
                            </button>

                            <button
                                type="submit"
                                className="btn w-50"
                                style={{
                                    height: "46px",
                                    borderRadius: "12px",
                                    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                                    border: "none",
                                    color: "#ffffff",
                                    fontWeight: "600",
                                    boxShadow: "0 12px 24px rgba(37, 99, 235, 0.28)"
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default UpdateTask;
