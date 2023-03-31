const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics} = require('../controllers/url');
const router = express.Router();    //H express.Router() επιστρέφει ένα router object με το οποίο μπορώ να διαχειρίζομαι requests


router.post('/', handleGenerateNewShortURL);   //Το POST request που θα κάνω στο / route, o server θα το διαχειριστεί με βάση την μέθοδο handleGenerateNewShortURL

router.get('/analytics/:shortId', handleGetAnalytics);


module.exports = router;
