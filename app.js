const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require("./routes/auth");
const rideRoutes = require('./routes/rides');
const companionRoutes = require('./routes/companion');
const verifyToken = require('./middleware/verifyToken');
var cors = require('cors')


const app = express();
const port = 8000;
app.use(cors())

app.use(bodyParser.json());


mongoose.connect('mongodb+srv://shubhamsingh15052001:i04B5kkaXyx1B9b3@cluster0.qc5ldut.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{console.log("database Connected")}).catch(()=>{console.log("Not Connected")});

app.use('/auth', authRoutes);
app.use('/rides', verifyToken, rideRoutes);
// app.use('/companion', verifyToken, companionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
