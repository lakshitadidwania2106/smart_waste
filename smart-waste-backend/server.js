require("dotenv").config();
const express = require("express");
const ConnectDB = require("./config/db");
const cors = require("cors");

const app = express();

ConnectDB(); // ONLY PLACE DB CONNECTS

app.use(cors());
app.use(express.json());

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/workers", require("./routes/workerRoutes"));
app.use('/api/admin/smartbins', require('./routes/smartBins'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

