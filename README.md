# 💸 Mern PortFolio

A Full Stack application to help users show and analyze their work with ease.

---

## 🔗 Live Demo

Check it out here: https://mern-portfolio-1-1y6d.onrender.com

---

## 📁 Repository

[https://github.com/Manishkumar010/EXPENSETRACKER-APP](https://github.com/Manishkumar010/Mern-Portfolio)

---

## 🚀 Technologies Used

- **Frontend:** React.js, Tailwind CSS (or whatever you used), React Router, Axios  
- **Backend:** Node.js, Express, MongoDB (or your chosen DB), Mongoose  
- **Authentication:** JWT-based login/signup  
- **Deployment:** Frontend on Render, Backend on Render/another platform

---

## 🔍 Features

- ✅ **User Authentication & Authorization**  
  - Secure signup/login flows using JWT  
  - Protects personal expense data

- ✅ **Work Management**  
  - Add, edit, delete expenses  
  - Fields include: `Services`,

- ✅ **Dashboard View**  
  - Overview of total Work  
  - Category-wise distribution   
  - Recent work list
  - 

- ✅ **Responsive UI**  
  - Fully responsive design — works well on both desktop and mobile devices  

---

## 🧩 How It Works (Demo)

1. **Frontend Walkthrough**  
   - After logging in, you land on the Dashboard  
   - You can **add** a new work using the form, view all workList, filter and sort  
   - Charts and totals update automatically

2. **Backend API**  
   - RESTful endpoints for authentication 
   - Requests protected using JWT middleware

3. **Local Setup & Run**  
   ```bash
   # Clone the repo
   git clone https://github.com/Manishkumar010/EXPENSETRACKER-APP.git
   cd EXPENSETRACKER-APP
   
   # Frontend
   cd frontend
   cd expense-ui
   npm install
   npm start   # Runs on http://localhost:8000

   # Backend
   cd backend
   npm install
   # Create a .env file with:
   # MONGO_URI=<your MongoDB connection string>
   # JWT_SECRET=<your secret>
   npm run dev  # Runs on http://localhost:5000
