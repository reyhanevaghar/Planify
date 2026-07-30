import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("UserToken");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [profile, setProfile] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [bio, setBio] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("UserToken");
        alert("Logged out successfully");
        navigate("/signin");
    };

    const styles = {
        wrapper: {
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 20px",
            background: "linear-gradient(180deg, #0b1120 0%, #111827 45%, #1f2937 100%)",
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
            fontSize: "30px",
            letterSpacing: "0.3px",
        },
        subtitle: {
            textAlign: "center",
            color: "rgba(255,255,255,0.62)",
            marginBottom: "18px",
            fontSize: "15px",
        },
        infoContainer: { marginBottom: "18px" },
        infoBox: {
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "12px",
            padding: "14px 16px",
            marginBottom: "12px",
        },
        label: {
            display: "block",
            color: "rgba(255,255,255,0.5)",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "6px",
        },
        value: { color: "#ffffff", fontSize: "16px", fontWeight: "600" },
        input: {
            width: "100%",
            padding: "12px 12px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(255,255,255,0.06)",
            color: "#fff",
            outline: "none",
            fontSize: "14px",
            boxSizing: "border-box"
        },
        textarea: {
            width: "100%",
            padding: "12px 12px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(255,255,255,0.06)",
            color: "#fff",
            outline: "none",
            fontSize: "14px",
            minHeight: "90px",
            resize: "vertical",
            boxSizing: "border-box"
        },
        rowBtns: { display: "flex", gap: "12px", marginTop: "14px" },
        saveBtn: {
            flex: 1,
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            padding: "13px 16px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            opacity: saving ? 0.7 : 1,
        },
        logoutBtn: {
            flex: 1,
            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            padding: "13px 16px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
        },
        emptyText: { color: "#ef4444", textAlign: "center", marginBottom: "20px" },
        loginBtn: {
            width: "100%",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#ffffff",
            border: "none",
            borderRadius: "14px",
            padding: "13px 16px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            textDecoration: "none",
            textAlign: "center"
        },
        error: {
            background: "rgba(239,68,68,0.12)",
            border: "1px solid rgba(239,68,68,0.35)",
            color: "#fecaca",
            padding: "10px 12px",
            borderRadius: "12px",
            marginBottom: "12px",
            fontSize: "13px",
            textAlign: "center"
        },
    };

    useEffect(() => {
        const loadProfile = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const res = await fetch("http://localhost:5000/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 401) {
                    localStorage.removeItem("UserToken");
                    localStorage.removeItem("user");
                    navigate("/signin");
                    return;
                }

                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.message || "Failed to load profile");
                }

                const data = await res.json();

                if (data.result && data.user) {
                    const userProfile = data.user;
                    setProfile(userProfile);

                    const fullNameVal = userProfile.FullName || "";
                    const nameParts = fullNameVal.trim().split(" ");
                    setFirstName(nameParts[0] || "");
                    setLastName(nameParts.slice(1).join(" ") || "");

                    setPhone(userProfile.PhoneNumber || "");
                    setBio(userProfile.Bio || "");

                    localStorage.setItem("user", JSON.stringify(userProfile));
                } else {
                    throw new Error("Invalid response format from server");
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [token, navigate]);

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");

            const FullName = `${firstName} ${lastName}`.trim();

            const res = await fetch("http://localhost:5000/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    FullName,
                    PhoneNumber: phone,
                    Bio: bio,
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "Failed to save profile");
            }

            const data = await res.json();

            if (data.result && data.user) {
                const updatedUser = data.user;
                setProfile(updatedUser);

                const fullNameVal = updatedUser.FullName || "";
                const nameParts = fullNameVal.trim().split(" ");
                setFirstName(nameParts[0] || "");
                setLastName(nameParts.slice(1).join(" ") || "");

                setPhone(updatedUser.PhoneNumber || "");
                setBio(updatedUser.Bio || "");

                localStorage.setItem("user", JSON.stringify(updatedUser));
                alert("Profile updated successfully");
            } else {
                throw new Error("Failed to parse update response");
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setSaving(false);
        }
    };

    if (!token) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <h2 style={styles.title}>My Profile</h2>
                    <p style={styles.subtitle}>No user data found</p>
                    <p style={styles.emptyText}>Please login first.</p>
                    <button style={styles.loginBtn} onClick={() => navigate("/signin")}>
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>My Profile</h2>
                <p style={styles.subtitle}>
                    {loading ? "Loading..." : "Welcome to Planify"}
                </p>

                {!!error && <div style={styles.error}>{error}</div>}

                {!loading && profile && (
                    <>
                        <div style={styles.infoContainer}>
                            <div style={styles.infoBox}>
                                <span style={styles.label}>Username</span>
                                <div style={styles.value}>
                                    {profile.username || "No username found"}
                                </div>
                            </div>

                            <div style={styles.infoBox}>
                                <span style={styles.label}>Email</span>
                                <div style={styles.value}>
                                    {profile.email || "No email found"}
                                </div>
                            </div>

                            <div style={styles.infoBox}>
                                <span style={styles.label}>First Name</span>
                                <input
                                    style={styles.input}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter your first name"
                                />
                            </div>

                            <div style={styles.infoBox}>
                                <span style={styles.label}>Last Name</span>
                                <input
                                    style={styles.input}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your last name"
                                />
                            </div>

                            <div style={styles.infoBox}>
                                <span style={styles.label}>Phone Number</span>
                                <input
                                    style={styles.input}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <div style={styles.infoBox}>
                                <span style={styles.label}>Bio</span>
                                <textarea
                                    style={styles.textarea}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Write a short bio (max 250 chars)"
                                    maxLength={250}
                                />
                            </div>
                        </div>

                        <div style={styles.rowBtns}>
                            <button
                                onClick={handleSave}
                                style={styles.saveBtn}
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>

                            <button onClick={handleLogout} style={styles.logoutBtn}>
                                Logout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
