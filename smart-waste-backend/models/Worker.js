const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  zoneId: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" }
});

module.exports = mongoose.model("Worker", workerSchema);
