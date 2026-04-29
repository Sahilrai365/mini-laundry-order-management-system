Mini Laundry Order Management System
A lightweight full-stack app for dry cleaning stores — create orders, track status, auto-calculate billing, and view dashboard insights.
Live Demo: your-render-url.onrender.com
GitHub: github.com/Sahilrai365/mini-laundry-order-management-system

Tech Stack
Node.js · Express.js · MongoDB (Mongoose) · MongoDB Atlas · Render · HTML/CSS/JS

Quick Start
bashgit clone https://github.com/Sahilrai365/mini-laundry-order-management-system.git
cd mini-laundry-order-management-system
npm install
Create a .env file:
MONGO_URI=your_mongodb_connection_string
PORT=3000
bashnode server.js
# → http://localhost:3000

Features
FeatureDetailsCreate OrderCustomer name, phone, multiple garments, auto billingStatus TrackingRECEIVED → PROCESSING → READY → DELIVEREDView & SearchFilter by name, phone, or statusDashboardTotal orders, revenue, per-status breakdown
Supported garments: Shirt, Pants, Saree, T-Shirt, Jacket, Bedsheet

API Endpoints
POST   /orders              → Create order
GET    /orders              → List all orders
GET    /orders?search=Rahul → Search by name/phone
GET    /orders?status=READY → Filter by status
PUT    /orders/:id/status   → Update status
GET    /dashboard           → Analytics

Project Structure
Laundry_system/
 ┣ server.js
 ┣ pricing.js
 ┣ models/Order.js
 ┗ public/
    ┣ index.html
    ┣ style.css
    ┗ script.js

AI Usage Report
Tools used: ChatGPT, GitHub Copilot
Where AI helped: Backend scaffolding, route generation, billing logic, MongoDB migration, deployment guidance.
What AI got wrong:

Generated in-memory storage instead of MongoDB
Route mismatches (Cannot GET/POST)
Used custom orderId instead of MongoDB _id

What I fixed manually: Migrated to MongoDB Atlas, corrected ID references, resolved route conflicts, added search/filter, deployed to Render, improved validation and error handling.

Tradeoffs & Future Scope
Skipped for now: authentication, role-based access, delivery date estimates, notifications.
With more time: React frontend, admin dashboard, garment analytics, cloud CI/CD.

This is roughly 40% shorter while keeping every meaningful piece of information. The table format for features and the clear AI section make it much faster to scan.
Dashboard
What This Project Demonstrates
Speed of execution
Effective AI leverage
Practical debugging
Ownership over AI-generated mistakes
Full-stack problem solving
