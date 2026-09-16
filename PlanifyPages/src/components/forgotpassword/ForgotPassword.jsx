import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ShowErrorMessage from "../ShowErrorMessage/ShowErrorMessage";

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: وارد کردن ایمیل | 2: وارد کردن رمز جدید
    const [resetToken, setResetToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // مرحله ۱: درخواست توکن
    const handleEmailSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await fetch("http://localhost:5000/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data = await res.json();

            if (data.result) {
                setResetToken(data.resetToken);
                setStep(2);
                alert("Account verified! Please enter your new password.");
            } else {
                alert(data.message || "Failed to process request");
            }
        } catch (err) {
            alert("Connection error!");
        } finally {
            setSubmitting(false);
        }
    };

    // مرحله ۲: ثبت پسورد جدید
    const handleResetSubmit = async (values, { setSubmitting }) => {
        try {
            const res = await fetch("http://localhost:5000/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: resetToken,
                    newPassword: values.newPassword,
                }),
            });
            const data = await res.json();

            if (data.result) {
                alert("Password changed successfully! You can now login.");
                navigate("/signin");
            } else {
                alert(data.message || "Error updating password");
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            alert(`Connection error: ${err.message}`);


        } finally {
            setSubmitting(false);
        }
    };

    const styles = {
        page: {
            minHeight: "100vh",
            background: "linear-gradient(180deg, #0b1120 0%, #111827 45%, #1f2937 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
        },
        card: {
            width: "100%",
            maxWidth: "430px",
            background: "linear-gradient(180deg, rgba(17,24,39,0.96), rgba(31,41,55,0.96))",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.38)",
            padding: "34px",
        },
        title: {
            textAlign: "center",
            marginBottom: "10px",
            fontWeight: "800",
            color: "#f9fafb",
            fontSize: "26px",
        },
        subtitle: {
            textAlign: "center",
            color: "rgba(255,255,255,0.62)",
            marginBottom: "24px",
            fontSize: "14px",
        },
        input: {
            width: "100%",
            padding: "13px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.10)",
            outline: "none",
            fontSize: "15px",
            boxSizing: "border-box",
            background: "rgba(255,255,255,0.04)",
            color: "#ffffff",
        },
        passwordRow: {
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "12px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.04)",
        },
        passwordInput: {
            flex: 1,
            border: "none",
            outline: "none",
            padding: "13px 14px",
            fontSize: "15px",
            background: "transparent",
            color: "#ffffff",
        },
        eyeBtn: {
            border: "none",
            background: "rgba(255,255,255,0.03)",
            padding: "13px 14px",
            cursor: "pointer",
            color: "#d1d5db",
        },
        submitBtn: {
            width: "100%",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            padding: "13px 16px",
            fontSize: "16px",
            fontWeight: "700",
            marginTop: "16px",
            cursor: "pointer",
        },
        backLink: {
            display: "block",
            textAlign: "center",
            marginTop: "16px",
            color: "#60a5fa",
            textDecoration: "none",
            fontSize: "14px",
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Reset Password</h2>
                <p style={styles.subtitle}>
                    {step === 1 ? "Enter your account email to proceed" : "Enter your new password"}
                </p>

                {step === 1 ? (
                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={Yup.object({
                            email: Yup.string().email("Enter valid email").required("Email is required"),
                        })}
                        onSubmit={handleEmailSubmit}
                    >
                        <Form>
                            <div style={{ marginBottom: "16px" }}>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    style={styles.input}
                                />
                                <ErrorMessage name="email" component={ShowErrorMessage} />
                            </div>
                            <button type="submit" style={styles.submitBtn}>
                                Verify Email
                            </button>
                        </Form>
                    </Formik>
                ) : (
                    <Formik
                        initialValues={{ newPassword: "", confirmPassword: "" }}
                        validationSchema={Yup.object({
                            newPassword: Yup.string()
                                .required("Password is required")
                                .min(8, "Must be at least 8 characters")
                                .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Must contain letters and numbers"),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                                .required("Please confirm your password"),
                        })}
                        onSubmit={handleResetSubmit}
                    >
                        <Form>
                            <div style={{ marginBottom: "16px" }}>
                                <div style={styles.passwordRow}>
                                    <Field
                                        name="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="New Password"
                                        style={styles.passwordInput}
                                    />
                                    <button
                                        type="button"
                                        style={styles.eyeBtn}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <ErrorMessage name="newPassword" component={ShowErrorMessage} />
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm New Password"
                                    style={styles.input}
                                />
                                <ErrorMessage name="confirmPassword" component={ShowErrorMessage} />
                            </div>

                            <button type="submit" style={styles.submitBtn}>
                                Change Password
                            </button>
                        </Form>
                    </Formik>
                )}

                <Link to="/signin" style={styles.backLink}>
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
