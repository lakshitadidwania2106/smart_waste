const mongoose = require("mongoose");

const smartBinSchema = new mongoose.Schema({
  binCode: String,
  zoneId: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
  location: String,
  wasteType: String,
  fillLevel: Number,
  status: String
});

module.exports = mongoose.model("SmartBin", smartBinSchema);
