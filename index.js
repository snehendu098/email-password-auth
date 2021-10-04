require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");

// config
app.use(express.json());
app.use(cors());

connectDB();

// routes
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
