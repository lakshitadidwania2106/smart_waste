const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  zoneName: String,
  description: String
});

module.exports = mongoose.model("Zone", zoneSchema);
