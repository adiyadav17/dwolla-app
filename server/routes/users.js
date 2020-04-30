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

router.get("/get", (req, res) => {
  client.auth.client()
    .then(appToken => appToken.get('customers', {
      limit: 30
    }))
    .then(data => {
      res.status(200).json(data.body);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/add", (req, res) => {
  var el = req.body;
  client.auth.client()
    .then(function (appToken) {
      return appToken.post('customers', el);
    })
    .then(data => {
      res.status(200).json(data.body);
    })
    .catch(err => {
      if (err.status === 400) {
        res.status(400).json({
          message: 'Duplicate customer or validation error.'
        });
      } else if (err.status === 403) {
        res.status(403).json({
          message: 'Not authorized to create customers.'
        });
      } else {
        res.status(500).json({
          message: 'Internal server error.'
        });
      }
    });
});


module.exports = router;