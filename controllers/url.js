const shortid = require('shortid');
const URL = require('../models/url.js');


async function handleGenerateNewShortURL(req,res)
{
  if(!req.body.url)    //Αν στείλω request στον server, χωρίς να έχω καταχωρήσει url (Postman)
  {
    return res.status(400).json({Error: 'Url is required'})
  }
  const shortID = shortid();
  await URL.create(
    {
      shortId: shortID,
      redirectURL: req.body.url,   //To URL που καταχώρησα όταν έκανα το request
      visitHistory: []
    }
  );
  return res.json({shortId: shortID});   //O server επιστρέφει ως response (στο Postman) το shortId
}


async function handleGetAnalytics(req,res)
{
  const shortId = req.params.shortId;    //To shortId που ορίζω στο link του Postman
  const result = await URL.findOne({shortId});   //Όλη η εγγραφή (object) που έχει ως shortId, το shortId που όρισα στο link του Postman
  return res.json(
  {
    totalClicks: result.visitHistory.length,    //Το πλήθος των objects του πίνακα visitHistory που είναι ιδιότητα μιας εγγραφής (object)
    analytics: result.visitHistory
  });
}


module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics
}
