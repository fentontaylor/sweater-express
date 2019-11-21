const express = require('express');
const router = express.Router();

const helpers = require('../../../helpers/asyncHelpers');
const formattedForecast = helpers.formattedForecast;
const fetchForecast = helpers.fetchForecast;
const findUser = helpers.findUser;

router.get('/', (request, response) => {
  var location = request.query.location;
  var key = request.body.api_key;

  if (!key) { return response.status(401).send({ error: 'Invalid or missing API key' }) }

  findUser(key)
  .then(user => {
    if (user.length) {
      formattedForecast(location)
      .then(forecast => response.status(200).send(forecast))
      .catch(error => response.status(500).send({ error: error }));
    } else {
      response.status(401).send({ error: 'Invalid or missing API key' })
    }
  })
})

module.exports = router;