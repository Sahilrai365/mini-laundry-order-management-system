const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const pricing = require("./pricing");
const Order = require("./models/Order");

const app = express();
const PORT = process.env.PORT || 3000;

/* ------------------ MONGODB CONNECTION + SERVER START ------------------ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });

/* ------------------ MIDDLEWARE ------------------ */
app.use(express.json());
app.use(express.static("public"));

/* ------------------ CREATE ORDER ------------------ */
app.post("/orders", async (req, res) => {
  try {
    const { customerName, phone, garments } = req.body;

    // Validation
    if (!customerName || !phone || !garments || !Array.isArray(garments)) {
      return res.status(400).json({
        message: "Please provide customerName, phone, and garments array",
      });
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be exactly 10 digits",
      });
    }

    let totalBill = 0;

    for (let item of garments) {
      const { type, quantity } = item;

      if (!pricing[type]) {
        return res.status(400).json({
          message: `Invalid garment type: ${type}`,
        });
      }

      if (!quantity || quantity <= 0) {
        return res.status(400).json({
          message: `Invalid quantity for ${type}`,
        });
      }

      totalBill += pricing[type] * quantity;
    }
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

    // Create new order
    const newOrder = new Order({
      customerName,
      phone,
      garments,
      totalBill,
      status: "RECEIVED",
      estimatedDeliveryDate,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

/* ------------------ GET ALL ORDERS + FILTER ------------------ */
app.get("/orders", async (req, res) => {
  try {
    const { status, search } = req.query;

    let filter = {};

    // Status filter
    if (status) {
      filter.status = status.toUpperCase();
    }

    // Search by customer name OR phone
    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

/* ------------------ UPDATE ORDER STATUS ------------------ */
app.put("/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"];

    // Validate status
    if (!status || !validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({
        message: `Invalid status. Valid statuses are: ${validStatuses.join(
          ", "
        )}`,
      });
    }

    // Find and update order
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: status.toUpperCase() },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

/* ------------------ DASHBOARD ------------------ */
app.get("/dashboard", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    // Total revenue
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalBill" },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Orders per status
    const statusData = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const ordersPerStatus = {
      RECEIVED: 0,
      PROCESSING: 0,
      READY: 0,
      DELIVERED: 0,
    };

    statusData.forEach((item) => {
      ordersPerStatus[item._id] = item.count;
    });

    res.status(200).json({
      totalOrders,
      totalRevenue,
      ordersPerStatus,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
app.delete("/orders", async (req, res) => {
  await Order.deleteMany({});
  res.json({ message: "All orders deleted successfully" });
});