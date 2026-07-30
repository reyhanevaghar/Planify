import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ShowErrorMessage from "../ShowErrorMessage/ShowErrorMessage";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const selectdays = Array.from({ length: 31 }, (_, i) => i + 1);
    const navigate = useNavigate();
    
    const formInitializeValues = {
        title: "",
        details: "",
        month: "",
        day: 0,
    };

    const formvalidationSchema = Yup.object().shape({
        title: Yup.string().required("write down the title of your task"),
        details: Yup.string().required("write down the deatils of the task"),
        month: Yup.string().required("pls choose one of the months"),
        day: Yup.number().required("pls choose a day"),
    });

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

    

    const onbtnsave = (values) => {

        const token = localStorage.getItem('UserToken');

        if (!token) {
            alert("You are not logged in. Please log in to add a task.");
            navigate('/signin'); 
            return;
        }

        fetch("http://localhost:5000/addtask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({
                title: values.title,
                details: values.details,
                month: values.month,
                day: values.day,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    
                    if (res.status === 401 || res.status === 403) {
                        alert("Your session has expired or you are not authorized. Please log in again.");
                        localStorage.removeItem('token'); 
                        navigate('/signin');
                    } else {
                        alert("An error occurred while adding the task.");
                    }
                    return res.json().then(data => console.error("Error details:", data)); // نمایش جزئیات خطا
                }
                return res.json();
            })
            .then((x) => {
                if (x.result === true) {
                    alert("Task inserted successfully!");
                    navigate('/tasks'); 
                } else {
                    
                    alert("Failed to add task. " + (x.message || "Please try again later."));
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                alert("Network error: Could not connect to the server. Please check your connection.");
            });
    };

    const backinhome = () => {
        navigate("/tasks");
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center py-5"
            style={{ minHeight: "80vh" }}
        >
            <div
                className="card border-0"
                style={{
                    width: "460px",
                    borderRadius: "22px",
                    background: "linear-gradient(180deg, #111827, #1f2937)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <div className="card-body p-4 p-md-5">
                    <div className="text-center mb-4">
                        <div
                            className="d-inline-flex align-items-center justify-content-center mb-3"
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "16px",
                                background: "rgba(59, 130, 246, 0.14)",
                                color: "#93c5fd",
                                fontSize: "22px",
                            }}
                        >
                            <i className="fa fa-plus"></i>
                        </div>

                        <h3
                            className="mb-2"
                            style={{
                                color: "#f9fafb",
                                fontWeight: "700",
                                letterSpacing: "0.2px",
                            }}
                        >
                            Add New Task
                        </h3>

                        <p
                            className="mb-0"
                            style={{
                                color: "rgba(255,255,255,0.58)",
                                fontSize: "14px",
                            }}
                        >
                            Create a new task and organize your schedule
                        </p>
                    </div>

                    <Formik
                        initialValues={formInitializeValues}
                        validationSchema={formvalidationSchema}
                        onSubmit={onbtnsave}
                    >
                        <Form>
                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    style={{ color: "#e5e7eb", fontWeight: "500" }}
                                >
                                    Title
                                </label>
                                <Field
                                    className="form-control"
                                    name="title"
                                    placeholder="Enter task title"
                                    style={{
                                        height: "48px",
                                        borderRadius: "12px",
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "#f9fafb",
                                        boxShadow: "none",
                                    }}
                                />
                                <ErrorMessage name="title" component={ShowErrorMessage} />
                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    style={{ color: "#e5e7eb", fontWeight: "500" }}
                                >
                                    Details
                                </label>
                                <Field
                                    className="form-control"
                                    name="details"
                                    placeholder="Enter task details"
                                    style={{
                                        minHeight: "48px",
                                        borderRadius: "12px",
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "#f9fafb",
                                        boxShadow: "none",
                                    }}
                                />
                                <ErrorMessage name="details" component={ShowErrorMessage} />
                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    style={{ color: "#e5e7eb", fontWeight: "500" }}
                                >
                                    Month
                                </label>
                                <Field
                                    as="select"
                                    className="form-control"
                                    name="month"
                                    style={{
                                        height: "48px",
                                        borderRadius: "12px",
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "#f9fafb",
                                        boxShadow: "none",
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
                                    style={{ color: "#e5e7eb", fontWeight: "500" }}
                                >
                                    Day
                                </label>
                                <Field
                                    as="select"
                                    className="form-control"
                                    name="day"
                                    style={{
                                        height: "48px",
                                        borderRadius: "12px",
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        color: "#f9fafb",
                                        boxShadow: "none",
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
                                        fontWeight: "600",
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
                                        boxShadow: "0 12px 24px rgba(37, 99, 235, 0.28)",
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
