# PropManager - Real Estate Property Management System

> **Take-Home Technical Assignment for Node.js Developer Intern**  
> **Company:** NCode Technologies Inc.  
> **Author:** Mann Parekh  
> **Live Frontend URL:** [https://real-estate-property-management-iota.vercel.app](https://real-estate-property-management-iota.vercel.app)  
> **Live Backend API URL:** [https://real-estate-property-management-dq0h.onrender.com](https://real-estate-property-management-dq0h.onrender.com)  
> **GitHub Repository:** [https://github.com/Mannparekh4155/real-estate-property-management](https://github.com/Mannparekh4155/real-estate-property-management)  

---

## 📌 Project Overview
**PropManager** is a full-stack Real Estate Property Management System designed for property firms and agents to manage, search, and track residential and commercial properties.

The system features:
- **Full CRUD Management:** Create new properties, view listings, update information (including real-time status transitions), and delete records.
- **Dynamic Dashboard Metrics:** Calculates total properties, available, sold, rented, and the aggregated gross portfolio value directly via MongoDB aggregation pipeline.
- **Multi-Parameter Search & Filtering:** Filter properties by keyword name, city/area location, property type (`Residential` / `Commercial`), status (`Available`, `Sold`, `Rented`), and custom min/max price range.
- **Responsive UI:** Clean and intuitive user interface built with React, Vite, and Tailwind CSS.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Backend** | Node.js, Express.js, Mongoose (ODM), CORS, Dotenv |
| **Database** | MongoDB Atlas (Cloud NoSQL Database) |
| **Frontend** | React.js (Vite), Tailwind CSS, Lucide React Icons, Axios |
| **Deployment** | Render (Backend API), Vercel (Frontend Client), MongoDB Atlas (Database) |

---

## 📸 Application Screenshots

### 1. Dashboard Overview & Property Listings
*Featuring 5 live KPI metric cards (Total, Available, Sold, Rented, Total Portfolio Value) and property grid.*

### 2. Multi-Filter & Search in Action
*Real-time property search by name, city location, type dropdown, status, and min/max price filter with one-click reset.*

### 3. Add Property Modal Form
*Modal dialog with form validation for property name, type, location, price, area (sq. ft.), bedrooms, bathrooms, and description.*

### 4. Edit Property & Quick Status Change
*Direct card status switcher (Available ↔ Sold ↔ Rented) and comprehensive edit dialog.*

### 5. Delete Confirmation Modal
*Safe deletion verification dialog before removing records from MongoDB.*

---

## 📡 REST API Documentation

### Base URL: `/api`

### 1. Dashboard Endpoint

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard` | Returns dynamically aggregated counts for Total, Available, Sold, Rented, and Total Portfolio Value |

**Sample Response (`GET /api/dashboard`):**
```json
{
  "success": true,
  "data": {
    "totalProperties": 8,
    "availableProperties": 4,
    "soldProperties": 2,
    "rentedProperties": 2,
    "totalPropertyValue": 118000000
  }
}
```

---

### 2. Property Endpoints

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/api/properties` | List all properties with filtering | `search`, `location`, `propertyType`, `status`, `minPrice`, `maxPrice` |
| `GET` | `/api/properties/:id` | Get details of a single property | — |
| `POST` | `/api/properties` | Create a new property | — |
| `PUT` | `/api/properties/:id` | Update property info or status | — |
| `DELETE`| `/api/properties/:id` | Delete a property listing | — |

**Sample Request Body (`POST /api/properties`):**
```json
{
  "propertyName": "Sunrise Villa",
  "propertyType": "Residential",
  "location": "Satellite, Ahmedabad",
  "description": "Spacious 4 BHK villa with private garden and covered parking.",
  "price": 12500000,
  "area": 2400,
  "bedrooms": 4,
  "bathrooms": 4,
  "status": "Available"
}
```

---

## 🚀 Local Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or free MongoDB Atlas URI)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/real-estate-property-management.git
cd real-estate-property-management
```

### 2. Backend Setup
```bash
cd backend
npm install
```

1. Create a `.env` file inside `/backend`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/real_estate_db?retryWrites=true&w=majority
NODE_ENV=development
```

2. Seed Demo Properties (Optional but Recommended):
```bash
npm run seed
```

3. Start Backend Server:
```bash
npm run dev
# Server will start on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

1. Create a `.env` file inside `/frontend`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

2. Start Frontend Dev Server:
```bash
npm run dev
# Client will start on http://localhost:3000
```

---

## ☁️ Online Deployment Instructions

### 1. Database (MongoDB Atlas)
1. Create a free M0 cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create database user credentials.
3. Allow network IP access from anywhere (`0.0.0.0/0`).
4. Copy connection string into backend `MONGODB_URI`.

### 2. Backend (Render.com)
1. Create a new **Web Service** connected to your repository.
2. Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `node src/server.js`
5. Add Environment Variables: `PORT=5000`, `NODE_ENV=production`, `MONGODB_URI=<your-atlas-uri>`.

### 3. Frontend (Vercel)
1. Import repository on [Vercel](https://vercel.com).
2. Root Directory: `frontend`
3. Framework Preset: `Vite`
4. Add Environment Variable:
   - `VITE_API_BASE_URL` = `https://<your-render-backend-url>/api`
5. Click **Deploy**.

---

## 📄 License
This project was developed as a technical assessment submission for **NCode Technologies Inc.**
