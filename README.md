# Manufacturing CRM System

A full-stack Manufacturing CRM (Customer Relationship Management) system built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

This project helps manufacturing businesses manage:
- Leads
- Sales pipeline
- Customer workflows
- Revenue tracking
- Business analytics

---

# 🚀 Live Demo

## Frontend (Vercel)

https://manufacturing-crm-system.vercel.app

## Backend API (Render)

https://crm-backend-2rkm.onrender.com

---

# 📌 Features

## Authentication
- JWT Authentication
- Protected Routes
- Secure Login System
- Session Management

## Dashboard
- Total Leads Analytics
- Qualified Leads Tracking
- Closed Deals Analytics
- Revenue Statistics
- Real-Time Charts

## Lead Management
- Create Lead
- Edit Lead
- Delete Lead
- Search Leads
- Filter Leads by Status

## CRM Lead Pipeline
- New
- Contacted
- Qualified
- Proposal Sent
- Negotiation
- Closed Won
- Closed Lost

## UI Features
- Responsive Dashboard
- Professional Sidebar
- Toast Notifications
- Charts & Analytics
- Modern SaaS UI

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Deployment
- Vercel
- Render
- MongoDB Atlas

---

# 📂 Project Structure

```bash
manufacturing-crm-system/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/saikrishna1235/manufacturing-crm-system.git
```

---

# 🔹 Backend Setup

## Navigate to server

```bash
cd server
```

## Install dependencies

```bash
npm install
```

## Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_uri

JWT_SECRET=mysecretkey
```

## Run backend

```bash
npm run dev
```

---

# 🔹 Frontend Setup

## Navigate to client

```bash
cd client
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

---

# 🌐 Environment Variables

## Backend `.env`

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/crmDB?retryWrites=true&w=majority

JWT_SECRET=mysecretkey
```

---

# 📊 API Endpoints

## Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

## Lead Routes

| Method | Endpoint |
|---|---|
| GET | `/api/leads` |
| POST | `/api/leads` |
| PUT | `/api/leads/:id` |
| DELETE | `/api/leads/:id` |

---

## Analytics Routes

| Method | Endpoint |
|---|---|
| GET | `/api/analytics/summary` |

---

# 🔒 Authentication

JWT token-based authentication is implemented.

Protected routes require:

```txt
Authorization: Bearer <token>
```

---

# 📈 Future Improvements

- Role-based Access Control
- Email Notifications
- PDF Reports
- Sales Forecasting
- Real-time Chat
- AI Lead Prediction

---

# 👨‍💻 Author

## Sai Krishna

GitHub:
https://github.com/saikrishna1235

---

# ⭐ Support

If you like this project:
- Star the repository
- Fork the project
- Share with others

---

# 📄 License

This project is licensed under the MIT License.