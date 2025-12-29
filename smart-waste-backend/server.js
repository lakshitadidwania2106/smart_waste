const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Waste Backend is Running 🚀");
});

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/worker", require("./routes/workerRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
