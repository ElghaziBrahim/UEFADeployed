const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const userRoute = require("./routes/userRoute")
const dataRoute = require("./routes/dataRoute")
const app = express();
const path = require('path');

mongoose.connect(process.env.DataBase_URL)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/user', userRoute);
app.use('/data', dataRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(3000, () => { console.log(`Server is running on port 3000`); });
