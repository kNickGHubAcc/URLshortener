const express = require('express');
const mongoose = require('mongoose');
const urlRoute = require('./routes/url.js');
const URL = require('./models/url');
const app = express();


mongoose
  .connect("mongodb://127.0.0.1:27017/shortUrlDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo err", err));


app.use(express.json());
app.use('/url', urlRoute);


app.get('/:shortId', async function (req, res) {
  const shortId = req.params.shortId;     //Το shortId που βάζω στο link του Postman
  const entry = await URL.findOneAndUpdate     //Βρίσκω την εγγραφή (object) που έχει το παραπάνω shortId
  ({
    $push:     //Εισάγω στον πίνακα visitHistory (ιδιότητα object) ενα timestamp
    {
      visitHistory: {
        timestamp: Date.now()
      }
    }
  })
  res.redirect(entry.redirectURL);   //Ο server δίνει ως response (στο Postman) την σελίδα στην οποία αντιστοιχεί το shortId
})


app.listen(3000, function () {
  console.log("Server is running in port 3000...");
})