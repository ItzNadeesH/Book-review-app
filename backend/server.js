const express = require('express')
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("connected to the db & listing on port", process.env.PORT || 5000);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
