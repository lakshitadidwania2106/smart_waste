const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  binId: { type: mongoose.Schema.Types.ObjectId, ref: "SmartBin" },
  message: String,
  rating: Number
});

module.exports = mongoose.model("Feedback", feedbackSchema);
