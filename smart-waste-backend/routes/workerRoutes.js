const express = require("express");
const router = express.Router();
const SmartBin = require("../models/SmartBin");

router.get("/bins/:zoneId", async (req, res) => {
  const bins = await SmartBin.find({ zoneId: req.params.zoneId });
  res.json(bins);
});

router.put("/bin/:id/empty", async (req, res) => {
  const bin = await SmartBin.findByIdAndUpdate(
    req.params.id,
    { fillLevel: 0, status: "Active" },
    { new: true }
  );
  res.json(bin);
});

module.exports = router;
