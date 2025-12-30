const express = require("express");
const router = express.Router();
const Zone = require("../models/Zone");
const SmartBin = require("../models/SmartBin");
const WasteRecord = require("../models/WasteRecord");
const Feedback = require("../models/Feedback");

router.get("/zones", async (req, res) => {
  res.json(await Zone.find());
});

router.get("/bins", async (req, res) => {
  res.json(await SmartBin.find());
});

router.get("/waste-records", async (req, res) => {
  res.json(await WasteRecord.find());
});

router.get("/feedback", async (req, res) => {
  res.json(await Feedback.find());
});

module.exports = router;
