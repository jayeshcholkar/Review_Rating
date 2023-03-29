const express = require("express");
require("./models/config");
const Router = require("./routes/userRouter");
const companyRouter = require("./routes/companyRouter");
require('dotenv').config()
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", Router);
app.use("/", companyRouter);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port ${process.env.PORT}`);
});
