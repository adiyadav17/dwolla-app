const express = require('express');
const router = express.Router();
const dwollaconfig = require('../config/dwolla');
// Bring in the database object
const dwolla = require('dwolla-v2');
const appKey = dwollaconfig.key;
const appSecret = dwollaconfig.secret;
const User = require('../models/Users');
// POST api.dwolla.com/resource {"foo":"bar"}
const client = new dwolla.Client({
    key: appKey,
    secret: appSecret,
    environment: 'sandbox' // optional - defaults to production
  });

router.post("/add", (req, res) => {
    var el = req.body;
    client.auth.client()
    .then(function(appToken) {
      return appToken.post('customers', el);
    })
    .then(res => res.headers.get('location')); 
    console.log(res);
});


module.exports = router;