const express = require('express');
const router = express.Router();

const helpers = require('../../../helpers/asyncHelpers');
const fetchGeolocation = helpers.fetchGeolocation;
const fetchForecast = helpers.fetchForecast;

router.get('/', (request, response) => {
  var location = request.query.location;
  
  fetchGeolocation(location)
    .then(latLong => {
      fetchForecast(latLong)
        .then(forecast => {
          response.status(200).send(forecast)
        })
    })
})

module.exports = router;