const express = require("express");
const router = express.Router();
const SmartBin = require("../models/SmartBin");
const RecycleScore = require("../models/RecycleScore");
const Feedback = require("../models/Feedback");

router.get("/bins/:zoneId", async (req, res) => {
  const bins = await SmartBin.find({ zoneId: req.params.zoneId });
  res.json(bins);
});

router.get("/recycle-score/:customerId", async (req, res) => {
  const score = await RecycleScore.findOne({ customerId: req.params.customerId });
  res.json(score);
});

router.post("/feedback", async (req, res) => {
  const feedback = await Feedback.create(req.body);
  res.json(feedback);
});

module.exports = router;
