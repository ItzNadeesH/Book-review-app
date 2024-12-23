const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const reviewRoutes = require("./routes/review");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/reviews", reviewRoutes);

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        "connected to the db & listing on port",
        process.env.PORT || 5000
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
