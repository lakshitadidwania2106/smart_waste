const mongoose = require("mongoose");

const recycleScoreSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  points: Number,
  level: String
});

module.exports = mongoose.model("RecycleScore", recycleScoreSchema);
