import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ShowErrorMessage from "../ShowErrorMessage/ShowErrorMessage";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formInitilizevalues = {
        username: "",
        password: "",
        confirmpassword: "",
        email: "",
    };

    const formvalidationschema = Yup.object().shape({
        username: Yup.string().required("Enter your UserName pls"),
        password: Yup.string()
            .required("Enter your Password pls")
            .min(8, "Password must be at least 8 characters")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d).+$/,
                "Password must contain both letters and numbers"
            ),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm your Password"),
        email: Yup.string()
            .email("Enter valid email")
            .required("Enter your email pls"),
    });
    const btnsubmit = (values, { resetForm }) => {
        const valuesofinput = {
            username: values.username.trim(),
            password: values.password,
            email: values.email.trim().toLowerCase(),
        };

        fetch("http://localhost:5000/addusers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valuesofinput),
        })
            .then((x) => x.json())
            .then((data) => {
                if (data.result === true) {
                    alert("You Signed Up Successfully");
                    resetForm();
                } else if (data.message === "EMAIL_ALREADY_EXISTS") {
                    alert("This email is already registered");
                } else if (data.message === "MISSING_FIELDS") {
                    alert("Please fill all fields");
                } else {
                    alert("Failed to sign up");
                }
            })
            .catch(() => {
                alert("Server error");
            });
    };


    const styles = {
        page: {
            minHeight: "100vh",
            background: "linear-gradient(180deg, #0b1120 0%, #111827 45%, #1f2937 100%)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "Arial, sans-serif",
        },
        navbar: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 60px",
            background: "rgba(17, 24, 39, 0.78)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
            position: "sticky",
            top: "0",
            zIndex: "100",
            boxSizing: "border-box",
        },
        logo: {
            fontSize: "28px",
            fontWeight: "800",
            color: "#f9fafb",
            textDecoration: "none",
            letterSpacing: "0.4px",
        },
        navLinks: {
            display: "flex",
            gap: "12px",
        },
        homeBtn: {
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: "12px",
            fontWeight: "600",
            color: "#e5e7eb",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
        },
        loginBtn: {
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: "12px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#ffffff",
            border: "none",
            boxShadow: "0 12px 28px rgba(37, 99, 235, 0.30)",
        },
        main: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 20px",
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
            fontSize: "30px",
            letterSpacing: "0.3px",
        },
        subtitle: {
            textAlign: "center",
            color: "rgba(255,255,255,0.62)",
            marginBottom: "28px",
            fontSize: "15px",
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
            marginTop: "10px",
            cursor: "pointer",
            boxShadow: "0 14px 30px rgba(37, 99, 235, 0.28)",
        },
        bottomText: {
            textAlign: "center",
            marginTop: "18px",
            color: "rgba(255,255,255,0.62)",
            fontSize: "14px",
        },
        bottomLink: {
            color: "#60a5fa",
            textDecoration: "none",
            fontWeight: "700",
            marginLeft: "6px",
        },
        footer: {
            background: "linear-gradient(180deg, #0f172a, #111827)",
            color: "#ffffff",
            padding: "40px 60px 20px",
            marginTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
        },
        footerContent: {
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
        },
        footerTitle: {
            fontSize: "20px",
            marginBottom: "12px",
            color: "#ffffff",
            fontWeight: "700",
        },
        footerText: {
            color: "rgba(255,255,255,0.72)",
            lineHeight: "1.8",
            fontSize: "15px",
        },
        footerLinks: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        },
        footerLink: {
            color: "rgba(255,255,255,0.72)",
            textDecoration: "none",
            fontSize: "15px",
        },
        footerBottom: {
            borderTop: "1px solid rgba(255,255,255,0.10)",
            marginTop: "28px",
            paddingTop: "15px",
            textAlign: "center",
            color: "rgba(255,255,255,0.52)",
            fontSize: "14px",
        },
    };

    return (
        <div style={styles.page}>
            <nav style={styles.navbar}>
                <Link to="/" style={styles.logo}>TaskFlow</Link>
                <div style={styles.navLinks}>
                    <Link to="/" style={styles.homeBtn}>Home</Link>
                    <Link to="/signin" style={styles.loginBtn}>Login</Link>
                </div>
            </nav>

            <main style={styles.main}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Create Account</h2>
                    <p style={styles.subtitle}>
                        Join TaskFlow and start managing your tasks easily
                    </p>

                    <Formik
                        initialValues={formInitilizevalues}
                        validationSchema={formvalidationschema}
                        onSubmit={btnsubmit}
                    >
                        <Form>
                            <div style={{ marginBottom: "16px" }}>
                                <Field
                                    name="username"
                                    type="text"
                                    placeholder="Enter Username"
                                    style={styles.input}
                                />
                                <ErrorMessage name="username" component={ShowErrorMessage} />
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <div style={styles.passwordRow}>
                                    <Field
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Password"
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
                                <ErrorMessage name="password" component={ShowErrorMessage} />
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <div style={styles.passwordRow}>
                                    <Field
                                        name="confirmpassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        style={styles.passwordInput}
                                    />
                                    <button
                                        type="button"
                                        style={styles.eyeBtn}
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="confirmpassword"
                                    component={ShowErrorMessage}
                                />
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    style={styles.input}
                                />
                                <ErrorMessage name="email" component={ShowErrorMessage} />
                            </div>

                            <button type="submit" style={styles.submitBtn}>Sign Up</button>

                            <p style={styles.bottomText}>
                                Already have an account?
                                <Link to="/signin" style={styles.bottomLink}>Login</Link>
                            </p>
                        </Form>
                    </Formik>
                </div>
            </main>

            <footer style={styles.footer}>
                <div style={styles.footerContent}>
                    <div>
                        <h3 style={styles.footerTitle}>TaskFlow</h3>
                        <p style={styles.footerText}>
                            Organize your work, improve focus, and stay productive every day.
                        </p>
                    </div>
                    <div>
                        <h3 style={styles.footerTitle}>Quick Links</h3>
                        <div style={styles.footerLinks}>
                            <Link to="/" style={styles.footerLink}>Home</Link>
                            <Link to="/signin" style={styles.footerLink}>Login</Link>
                            <Link to="/signup" style={styles.footerLink}>Sign Up</Link>
                        </div>
                    </div>
                    <div>
                        <h3 style={styles.footerTitle}>About</h3>
                        <p style={styles.footerText}>
                            Managing tasks has never been easier with TaskFlow.
                        </p>
                    </div>
                </div>
                <div style={styles.footerBottom}>© 2025 TaskFlow. All rights reserved.</div>
            </footer>
        </div>
    );
};

export default SignUp;