Mini Laundry Order Management System
Objective

A lightweight laundry management system for dry cleaning stores to:

Create customer orders
Track order status
Calculate billing automatically
View dashboard insights
Tech Stack
Node.js
Express.js
MongoDB (Mongoose)
HTML/CSS/JavaScript Frontend
dotenv
Setup Instructions
1. Install dependencies:
npm install express mongoose dotenv
2. Configure environment:

Create a .env file in the root folder:

MONGO_URI=mongodb://127.0.0.1:27017/laundryDB
PORT=3000
3. Start MongoDB:

If MongoDB is installed as a Windows service:

net start MongoDB
4. Run server:
node server.js
OR
npx nodemon server.js
5. Open application:
http://localhost:3000
Features Implemented
Core Features:
1. Create Order
Customer Name
Phone Number
Multiple garment types
Quantity per garment
Dynamic pricing using configurable pricing structure
Automatic total bill calculation
Unique MongoDB Order ID
2. Order Status Management

Supported statuses:

RECEIVED
PROCESSING
READY
DELIVERED
Includes:
Status update via API
Frontend dropdown controls
3. View Orders
List all orders
Search by customer name
Search by phone number
Filter by order status
4. Dashboard

Displays:

Total orders
Total revenue
Orders per status
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
Garment cart
Live billing workflow
Order list
Search + filter
Status update controls
Dashboard analytics
Project Structure
Laundry_system/
 ┣ .env
 ┣ package.json
 ┣ server.js
 ┣ pricing.js
 ┣ models/
 ┃ ┗ Order.js
 ┗ public/
    ┣ index.html
    ┣ style.css
    ┗ script.js
AI Usage Report (Critical Requirement)
AI Tools Used:
ChatGPT
GitHub Copilot (optional)
Sample Prompts Used:
“Build Express.js POST API for laundry order creation”
“Create dashboard route for total revenue and order counts”
“Fix Cannot GET /orders issue”
“Convert in-memory laundry system to MongoDB”
“Fix MongoDB _id vs custom orderId mismatch”
“Build frontend UI for laundry management system”
Where AI Helped:
Backend scaffolding
API route generation
Billing logic
Validation structure
Dashboard logic
Frontend JavaScript
Debugging route issues
MongoDB migration guidance
What AI Got Wrong:
Initially generated in-memory storage instead of MongoDB
Route mismatches (Cannot GET, Cannot POST)
Frontend initially used orderId instead of MongoDB _id
Required manual debugging for Postman testing
Minor UI/logic mismatches
Improvements I Made:
Migrated architecture from in-memory storage to MongoDB
Added frontend UI
Added search and filtering
Added dashboard analytics
Fixed AI-generated route mismatches
Improved validation
Added error handling
Corrected MongoDB integration issues
Tradeoffs
Skipped:
Authentication
Role-based access
Deployment
Estimated delivery date
Search by garment type
Notifications
With More Time:
React frontend
Admin dashboard
Authentication system
Cloud deployment (Render/Railway/Vercel)
Estimated delivery dates
Garment-type analytics
Customer notifications
Problem Solving Approach
Started quickly with AI-generated backend scaffolding
Iteratively debugged API issues using Postman
Upgraded from basic in-memory version to MongoDB
Added frontend for bonus value
Prioritized practical functionality over over-engineering
Fixed AI mistakes manually where needed
Demo Options
Browser UI:
http://localhost:3000
API Testing:

Use Postman for:

Order creation
Status updates
Filtering
Dashboard
What This Project Demonstrates
Speed of execution
Effective AI leverage
Practical debugging
Ownership over AI-generated mistakes
Full-stack problem solving