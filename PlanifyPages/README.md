# 📝 Planify - Full Stack Task Manager (React & SQL Server)

Planify is a comprehensive full-stack task management application designed to help users organize, monitor, and optimize their daily and monthly workflows. Built with a robust **React** frontend and a secure **Node.js/Express** backend backed by **Microsoft SQL Server**, this project implements modern web development standards including secure session management and database parameterization.

---


## 🌟 Key Features

### 🔐 Authentication & Authorization
- **Hashed Password Storage:** User passwords are encrypted on signup using `bcrypt` with 10 salt rounds before being written to the database.
- **Stateless Session Management:** Implements **JSON Web Tokens (JWT)** for verifying active sessions and securing access to endpoints.
- **Protected Routes & Custom Middleware:** Middleware (`verifyToken`) intercepting all task-related and profile-related requests to validate headers.

### 📋 Task Management (CRUD Operations)
- **Parameterized Query Execution:** Prevents SQL Injection attacks by binding and validating user inputs using the `mssql` SQL parameter format.
- **Flexible Scheduling:** Creates and assigns tasks to specific months and days of the year.
- **Completion States:** Toggle status between completed and pending.
- **Dynamic Task Filtering:** Retrieves tasks grouped by specific calendar months.

### 👤 Profile Customization
- **Persistent Profile Management:** Supports customizing user credentials such as `FullName`, `PhoneNumber`, and a personal `Bio`.
- **Validation Controls:** Server-side constraints enforcing input limit regulations (e.g., maximum 80 characters for names, 250 for biography text) to prevent database overflow or malicious inputs.

---

--------------------------------------------------------------------------------------

## Database Schema
The database uses Microsoft SQL Server (DB_TaskManager) with two primary tables:

1. Table_Users
Stores account parameters and customizable user profile details.

id: INT (Primary Key, Identity)
username: NVARCHAR(100)
email: NVARCHAR(150) (Unique Index)
password: NVARCHAR(MAX) (Bcrypt Hashed)
FullName: NVARCHAR(80) (Nullable)
PhoneNumber: NVARCHAR(20) (Nullable)
Bio: NVARCHAR(250) (Nullable)
2. Table_AddTask
Stores tasks assigned to individual user IDs.

id: INT (Primary Key, Identity)
title: NVARCHAR(150)
details: NVARCHAR(MAX)
month: NVARCHAR(20) (e.g., “January”)
day: INT
completed: BIT (Default: 0)
userId: INT (Foreign Key referencing Table_Users.id)

2. Table_AddTask
Stores tasks assigned to individual user IDs.

id: INT (Primary Key, Identity)
title: NVARCHAR(150)
details: NVARCHAR(MAX)
month: NVARCHAR(20) (e.g., “January”)
day: INT
completed: BIT (Default: 0)
userId: INT (Foreign Key referencing Table_Users.id)

------------------------------------------------------------------------------------------

## 🛠️ Complete Setup and Installation Guide
Follow these steps to configure both the backend database and the frontend runtime environment locally.

📋 Prerequisites
Ensure the following tools are installed on your workstation:

Node.js (v16.x or newer)
npm (v8.x or newer)
Microsoft SQL Server (configured with local server . or localhost)

---------------------------------------------------------------------------------------

## Step 1: Clone and Prepare directory
Clone the repository using Git bash or cmd:
git clone https://github.com/reyhanevaghar/Planify.git
cd Planify

## Step 2: Configure the Backend (Server)
Open the backend folder:
   cd backend
   
Install all required Node.js packages:
   npm install
   
Create a .env file in the root of the backend/ folder:
   JWT_SECRET=YourSuperSecretSignatureKeyHere
   
Run the backend server:
   node server.js
   
The backend will start and log: app connected to port 5000.

## Step 3: Configure the Frontend (React UI)
Open a new terminal instance and navigate to the frontend folder:
   cd frontend
   

Install React dependency tree:
   npm install
   
Start the React live-reloading development server:
 npm start

The application will boot and open in your default browser at http://localhost:3000.

-------------------------------------------------------------------------------------------------

## 🔒 Security Best Practices Implemented
Dotenv Isolation: All sensitive credentials and encryption keys are segregated into .env which is ignored by version control (.gitignore).
SQL Parameter Injection Defense: Uses SQL inputs dynamically bound to prevent command manipulation (e.g., @userId, @FullName).
Cryptographic Hashing: Salted hashes for credentials prevent raw leakage in the event of database access leakage.

------------------------------------------------------------------------------------------------

## 📂 Project Directory Structure
```text
Planify/
│
├── backend/
│   ├── app.js                 # Entry point of the Express API and DB connection
│   ├── package.json           # Node dependencies (express, mssql, bcrypt, jwt, dotenv)
│   └── .env                   # Configuration file (Contains JWT_SECRET, Database credentials)
│
├── frontend/
│   ├── public/                # Static assets, index.html, favicon
│   ├── src/
│   │   ├── components/        # Layout elements (Header, Footer, Sidebar, Navigation)
│   │   ├── pages/             # Page components (Dashboard, Calendar, Tasks, MyProfile.jsx)
│   │   ├── App.jsx            # Main routing configuration
│   │   ├── index.js           # DOM renderer
│   │   └── styles/            # CSS files / Bootstrap modifications
│   └── package.json           # React dependencies (Formik, Yup, React Router, icons)
│
└── README.md                  # Project documentation (This file)

