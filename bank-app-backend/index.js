const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require("./src/config/database");
const UserAPI = require("./src/api/user.api");
const FundTransferAPI = require("./src/api/fundTransfer.api");

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("Hello Node");
});

app.use("/user", UserAPI());
app.use("/fundTransfer", FundTransferAPI());


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});