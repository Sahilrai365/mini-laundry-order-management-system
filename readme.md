Mini Laundry Order Management System (AI-First)
Objective

A lightweight laundry management system for dry cleaning stores that allows users to:

Create customer orders
Track order status
Calculate billing automatically
View dashboard insights

This project was built rapidly using AI-assisted development, then iteratively improved through debugging, MongoDB migration, frontend integration, and cloud deployment.

Live Demo
Deployed Application:
https://mini-laundry-order-management-system-sid0.onrender.com/
Public Code Repository
GitHub:
https://github.com/Sahilrai365/mini-laundry-order-management-system
Tech Stack
Node.js
Express.js
MongoDB (Mongoose)
MongoDB Atlas (Cloud Database)
HTML/CSS/JavaScript Frontend
Render Deployment
Setup Instructions
1. Clone Repository
git clone https://github.com/Sahilrai365/mini-laundry-order-management-system.git
cd mini-laundry-order-management-system
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env file in the project root and add:

MONGO_URI=your_mongodb_connection_string
PORT=3000
4. Run Server
node server.js
OR:
npx nodemon server.js
5. Open Application
http://localhost:3000
Features Implemented
Core Features
1. Create Order

Supports:

Customer Name
Phone Number
Multiple garment types
Quantity per garment
Configurable garment pricing
Automatic total bill calculation
Unique MongoDB Order ID
Example Garments:
Shirt
Pants
Saree
TShirt
Jacket
Bedsheet
2. Order Status Management

Supported lifecycle:

RECEIVED
PROCESSING
READY
DELIVERED
Includes:
API status updates
Frontend dropdown controls
Validation for invalid statuses
3. View Orders

Supports:

View all orders
Search by customer name
Search by phone number
Filter by order status
4. Dashboard

Displays:

Total orders
Total revenue
Orders per status
Bonus Features Implemented
Simple frontend UI
MongoDB database integration
MongoDB Atlas cloud database
Render deployment
Search + filter functionality
Full-stack deployment
Public GitHub repository
API Endpoints
Create Order
POST /orders
View All Orders
GET /orders
Filter Orders
GET /orders?status=RECEIVED
GET /orders?search=Rahul
Update Order Status
PUT /orders/:id/status
Dashboard
GET /dashboard
Frontend Features
Create order form
Garment cart system
Dynamic billing workflow
Order list
Search + filter controls
Status update controls
Dashboard analytics
Project Structure
Laundry_system/
 ┣ package.json
 ┣ package-lock.json
 ┣ server.js
 ┣ pricing.js
 ┣ data.js
 ┣ models/
 ┃ ┗ Order.js
 ┗ public/
    ┣ index.html
    ┣ index.css (or style.css based on final version)
    ┗ script.js
AI Usage Report (Critical Requirement)
AI Tools Used
ChatGPT
GitHub Copilot (optional)
