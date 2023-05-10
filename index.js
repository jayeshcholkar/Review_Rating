const express = require("express");
require("./models/config");
const userRouter = require("./routes/userRouter");
const companyRouter = require("./routes/companyRouter");
const reviewRouter = require('./routes/reviewRouter')
require('dotenv').config()
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", userRouter);
app.use("/", companyRouter);
app.use("/", reviewRouter);
// app.use('/uploads', express.static('uploads'))

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port ${process.env.PORT}`);
});
