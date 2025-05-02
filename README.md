
# Customer Management System

A full-stack customer management system built with **React + Ant Design** frontend and **Node.js + TypeScript + SQLite** backend.

---

## 📁 Project Structure

```
/frontend   → React + Ant Design frontend
/backend    → Express + SQLite backend (with TypeScript)
```

---

## 🚀 Features

- 🔐 Admin login (username: `admin`, password: `123`)
- 📋 View customer list
- ➕ Add new customers
- ✏️ Edit and update customers
- ❌ Delete customers (with confirmation)
- 🔍 Live search
- 📱 Responsive UI with Ant Design
- ✅ Protected routes using localStorage-based auth
- 📦 SQLite database with pre-filled dummy data

---

## 🧰 Technologies Used

- Frontend: React, TypeScript, Ant Design, Axios
- Backend: Node.js, Express, TypeScript, better-sqlite3
- Database: SQLite
- Authentication: Token via `localStorage`

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/matmood-dev/customer-management-system.git
cd customer-management-system
```

---

### 2. Setup Backend

```bash
cd backend
npm install
npm run seed      # Create and populate the SQLite database
npm run start     # Starts the backend at http://localhost:5000
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev       # Starts the frontend at http://localhost:5173
```

---

## 🔐 Admin Login Credentials

- **Username**: `admin`
- **Password**: `123`

---

## 📝 Notes

- Backend runs on port **5000**
- Frontend runs on port **5173**
- Make sure `backend/db/database.db` is generated after running `npm run seed`
- This project is tested and runs correctly on **Windows 10**

---

## 📅 Last Updated

2025-05-02

---

## 👨‍💻 Author

Developed by **Mahmood AlTurabi**  
[Visit my portfolio](https://matmood.netlify.app)

---
