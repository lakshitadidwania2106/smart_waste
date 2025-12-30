const mongoose = require("mongoose");

const wasteRecordSchema = new mongoose.Schema({
  binId: { type: mongoose.Schema.Types.ObjectId, ref: "SmartBin" },
  wasteType: String,
  weight: Number,
  segregationQuality: Number,
  collectedAt: Date
});

module.exports = mongoose.model("WasteRecord", wasteRecordSchema);
