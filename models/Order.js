const mongoose = require("mongoose");

const garmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },

    garments: [
      {
        type: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    totalBill: { type: Number, required: true },

    status: {
      type: String,
      enum: ["RECEIVED", "PROCESSING", "READY", "DELIVERED"],
      default: "RECEIVED",
    },

    estimatedDeliveryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);