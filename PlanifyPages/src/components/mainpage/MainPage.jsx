import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
    const styles = {
        page: {
            minHeight: "100vh",
            background: "linear-gradient(180deg, #0b1120 0%, #111827 45%, #1f2937 100%)",
            color: "#f9fafb",
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
            letterSpacing: "0.4px",
        },
        navLinks: {
            display: "flex",
            gap: "12px",
        },
        loginBtn: {
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: "12px",
            fontWeight: "600",
            color: "#e5e7eb",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
        },
        signupBtn: {
            textDecoration: "none",
            padding: "10px 18px",
            borderRadius: "12px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#ffffff",
            border: "none",
            boxShadow: "0 12px 28px rgba(37, 99, 235, 0.30)",
        },
        heroSection: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "100px 20px 80px",
        },
        heroContent: {
            maxWidth: "760px",
            background: "linear-gradient(180deg, rgba(17,24,39,0.96), rgba(31,41,55,0.96))",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.38)",
            padding: "48px 32px",
        },
        heroTitle: {
            fontSize: "48px",
            lineHeight: "1.3",
            marginBottom: "20px",
            color: "#f9fafb",
        },
        heroText: {
            fontSize: "18px",
            color: "rgba(255,255,255,0.72)",
            lineHeight: "1.8",
            marginBottom: "32px",
        },
        heroButtons: {
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
        },
        primaryBtn: {
            textDecoration: "none",
            padding: "14px 24px",
            borderRadius: "14px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#ffffff",
            boxShadow: "0 14px 30px rgba(37, 99, 235, 0.28)",
        },
        secondaryBtn: {
            textDecoration: "none",
            padding: "14px 24px",
            borderRadius: "14px",
            fontWeight: "600",
            color: "#e5e7eb",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
        },
        featuresSection: {
            padding: "80px 60px",
            textAlign: "center",
        },
        featuresTitle: {
            fontSize: "36px",
            marginBottom: "40px",
            color: "#f9fafb",
        },
        featuresGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
        },
        featureCard: {
            background: "linear-gradient(180deg, rgba(17,24,39,0.96), rgba(31,41,55,0.96))",
            padding: "30px 24px",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.28)",
        },
        featureCardTitle: {
            marginBottom: "14px",
            color: "#60a5fa",
            fontSize: "22px",
        },
        featureCardText: {
            color: "rgba(255,255,255,0.72)",
            lineHeight: "1.7",
        },
        ctaSection: {
            textAlign: "center",
            padding: "80px 20px 100px",
        },
        ctaBox: {
            maxWidth: "760px",
            margin: "0 auto",
            background: "linear-gradient(180deg, rgba(17,24,39,0.96), rgba(31,41,55,0.96))",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.38)",
            padding: "40px 28px",
        },
        ctaTitle: {
            fontSize: "34px",
            marginBottom: "16px",
            color: "#f9fafb",
        },
        ctaText: {
            fontSize: "18px",
            color: "rgba(255,255,255,0.72)",
            marginBottom: "28px",
        },
        ctaBtn: {
            display: "inline-block",
            textDecoration: "none",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#ffffff",
            padding: "14px 28px",
            borderRadius: "14px",
            fontWeight: "700",
            boxShadow: "0 14px 30px rgba(37, 99, 235, 0.28)",
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
                <div style={styles.logo}>Planify</div>

                <div style={styles.navLinks}>
                    <Link to="/signin" style={styles.loginBtn}>
                        Login
                    </Link>
                    <Link to="/signup" style={styles.signupBtn}>
                        Sign Up
                    </Link>
                </div>
            </nav>

            <section style={styles.heroSection}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        Organize your tasks and boost your productivity
                    </h1>

                    <p style={styles.heroText}>
                        Manage your daily tasks, track progress, and stay focused with
                        Planify, a simple and powerful task manager.
                    </p>

                    <div style={styles.heroButtons}>
                        <Link to="/signup" style={styles.primaryBtn}>
                            Get Started
                        </Link>

                        <Link to="/signin" style={styles.secondaryBtn}>
                            Login
                        </Link>
                    </div>
                </div>
            </section>

            <section style={styles.featuresSection}>
                <h2 style={styles.featuresTitle}>Why choose Planify?</h2>

                <div style={styles.featuresGrid}>
                    <div style={styles.featureCard}>
                        <h3 style={styles.featureCardTitle}>Easy Task Management</h3>
                        <p style={styles.featureCardText}>
                            Create, edit, and organize your tasks in a clean and simple way.
                        </p>
                    </div>

                    <div style={styles.featureCard}>
                        <h3 style={styles.featureCardTitle}>Track Your Progress</h3>
                        <p style={styles.featureCardText}>
                            Keep an eye on completed, pending, and important tasks anytime.
                        </p>
                    </div>

                    <div style={styles.featureCard}>
                        <h3 style={styles.featureCardTitle}>Stay Focused</h3>
                        <p style={styles.featureCardText}>
                            Prioritize your work and stay productive throughout the day.
                        </p>
                    </div>
                </div>
            </section>

            <section style={styles.ctaSection}>
                <div style={styles.ctaBox}>
                    <h2 style={styles.ctaTitle}>Start managing your tasks today</h2>
                    <p style={styles.ctaText}>
                        Join Planify now and make your workflow easier and more organized.
                    </p>

                    <Link to="/signup" style={styles.ctaBtn}>
                        Create Account
                    </Link>
                </div>
            </section>

            <footer style={styles.footer}>
                <div style={styles.footerContent}>
                    <div>
                        <h3 style={styles.footerTitle}>Planify</h3>
                        <p style={styles.footerText}>
                            Organize your work, improve focus, and stay productive every day.
                        </p>
                    </div>

                    <div>
                        <h3 style={styles.footerTitle}>Quick Links</h3>
                        <div style={styles.footerLinks}>
                            <Link to="/" style={styles.footerLink}>
                                Home
                            </Link>
                            <Link to="/signin" style={styles.footerLink}>
                                Login
                            </Link>
                            <Link to="/signup" style={styles.footerLink}>
                                Sign Up
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 style={styles.footerTitle}>About</h3>
                        <p style={styles.footerText}>
                            Managing tasks has never been easier with Planify.
                        </p>
                    </div>
                </div>

                <div style={styles.footerBottom}>
                    © 2025 Planify. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default MainPage;
