const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/system',require('./routes/system'));



app.listen(5000, () => {
    console.log("Server has started on port")
});