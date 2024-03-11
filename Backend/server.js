const express = require('express');
const mongoose = require('mongoose');
const activityRouter = require('./routes/activities');

const app = express();
app.use(express.json());


mongoose.connect('mongodb://localhost/yourdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use('/activities', activityRouter);


app.listen(3000, () => console.log('Server started'));