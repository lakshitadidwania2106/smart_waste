const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  zoneId: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" }
});

module.exports = mongoose.model("Customer", customerSchema);
