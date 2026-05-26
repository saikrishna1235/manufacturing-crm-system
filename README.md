# 🚀 Manufacturing CRM System

A production-ready full-stack CRM (Customer Relationship Management) platform built for manufacturing businesses using the MERN Stack.

This CRM helps organizations manage:

- Leads
- Sales Pipelines
- Employee Workflows
- Revenue Analytics
- Follow-up Reminders
- Team Management
- Business Insights

---

# 🌐 Live Demo

## Frontend (Vercel)

https://manufacturing-crm-system.vercel.app

## Backend API (Render)

https://crm-backend-2rkm.onrender.com

---

# ✨ Advanced Features

## 🔐 Authentication & Authorization

- JWT Authentication
- Protected Routes
- Role-Based Access Control
- Admin & Employee Dashboards
- Session Management

---

## 👨‍💼 Admin Features

- Create & Assign Leads
- Manage Employees
- Team Management
- Track Employee Performance
- View Company Analytics
- Revenue Monitoring
- Pipeline Management

---

## 👨‍💻 Employee Features

- View Assigned Leads Only
- Update Lead Status
- Manage Follow-Ups
- Track Pipeline Progress
- Activity Timeline

---

## 📊 Analytics Dashboard

- Total Leads Analytics
- Revenue Tracking
- Lead Status Analytics
- Pipeline Insights
- Employee Performance Charts
- Real-Time Data Visualization

---

## 📌 CRM Pipeline

- New
- Contacted
- Qualified
- Proposal Sent
- Negotiation
- Closed Won
- Closed Lost

---

## 📅 Reminder System

- Follow-Up Reminders
- Upcoming Client Tracking
- Overdue Follow-Ups
- Priority Management

---

## 📄 Professional PDF Quotations

- Industry-Level PDF Design
- Company Branding
- Revenue Calculations
- Client Quotation Export

---

## ⚡ Real-Time Features

- Socket.IO Integration
- Real-Time Lead Updates
- Instant Pipeline Sync

---

## 🎨 UI/UX Features

- Fully Responsive Design
- Mobile Friendly
- Professional SaaS UI
- Modern Dashboard
- Responsive Pipeline Board
- Toast Notifications

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- DnD Kit
- React Hot Toast
- Socket.IO Client

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Socket.IO
- Nodemailer

---

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
│   │   ├── utils/
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
│   ├── utils/
│   ├── socket/
│   │
│   └── server.js
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

## Navigate to Backend

```bash
cd server
```

## Install Dependencies

```bash
npm install
```

## Create `.env`

```env
PORT=5000
EMAIL_USER=saikrishnakoyyada20669@gmail.com
EMAIL_PASS=hqlknfuipbnwencz
MONGO_URI=mongodb+srv://admin:Admin123@crm-cluster.yp1sv1d.mongodb.net/crmDB?retryWrites=true&w=majority&appName=crm-cluster
JWT_SECRET=mysecretkey
```

## Run Backend

```bash
npm run dev
```

---

# 🔹 Frontend Setup

## Navigate to Frontend

```bash
cd client
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

---

# 🌍 Environment Variables

## Backend `.env`

```env
PORT=5000
EMAIL_USER=saikrishnakoyyada20669@gmail.com
EMAIL_PASS=hqlknfuipbnwencz
MONGO_URI=mongodb+srv://admin:Admin123@crm-cluster.yp1sv1d.mongodb.net/crmDB?retryWrites=true&w=majority&appName=crm-cluster
JWT_SECRET=mysecretkey
```

---

# 📡 API Endpoints

## 🔐 Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

## 📌 Lead Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leads` | Get All Leads |
| POST | `/api/leads` | Create Lead |
| PUT | `/api/leads/:id` | Update Lead |
| DELETE | `/api/leads/:id` | Delete Lead |

---

## 📊 Dashboard Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/stats` | Dashboard Analytics |

---

## 👥 User Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get Employees |
| POST | `/api/users` | Create Employee |

---

# 🔒 Security Features

- JWT-Based Authentication
- Password Hashing using bcryptjs
- Protected API Routes
- Role-Based Authorization
- Secure Route Access
- MongoDB Validation

---

# 📱 Responsive Design

This CRM is fully responsive and optimized for:

- Desktop
- Tablet
- Mobile Devices

---

# 🚀 Deployment

## Frontend Deployment

- Vercel

## Backend Deployment

- Render

## Database

- MongoDB Atlas

---

# 📈 Future Enhancements

- AI Lead Prediction
- WhatsApp Notifications
- Sales Forecasting
- CRM Chat System
- Advanced Reporting
- Multi-Tenant Support
- Email Automation

---

# 👨‍💻 Author

## Sai Krishna

GitHub:
https://github.com/saikrishna1235

LinkedIn:
https://www.linkedin.com

---

# ⭐ Support

If you like this project:

- Star the repository
- Fork the project
- Share your feedback

---

# 📄 License

This project is licensed under the MIT License.
