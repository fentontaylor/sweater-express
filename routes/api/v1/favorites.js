const express = require('express');
const router = express.Router();

const helpers = require('../../../helpers/asyncHelpers');
const findUser = helpers.findUser;
const findFavorite = helpers.findFavorite;
const createFavorite = helpers.createFavorite;
const deleteFavorite = helpers.deleteFavorite;
const fetchFavoriteForecasts = helpers.fetchFavoriteForecasts;

router.get('/', (request, response) => {
  var key = request.body.api_key
  var forecasts = [];

  if (!key) { return response.status(401).send({ error: 'Invalid or missing API key' }) }

  findUser(key)
  .then(user => {
    if(user.length) {
      fetchFavoriteForecasts(user)
      .then(forecasts => response.status(200).send(forecasts))
      .catch(error => response.status(500).send({ error }));
    } else {
      response.status(401).send({ error: 'Invalid or missing API key' })
    };
  })
  .catch(error => response.status(500).send({ error }));
});

router.post('/', (request, response) => {
  var key = request.body.api_key;
  var location = request.body.location;

  if (!key) { return response.status(401).send({ error: 'Invalid or missing API key' }) }
  if (!location) { return response.status(422).send({ error: "Missing required 'location' property"}) };

  findUser(key)
  .then(user => {
    if (user.length) {
      findFavorite(user, location)
      .then(favorite => {
        if (!favorite.length) {
          createFavorite(user, location)
          .then(() => {
            response.status(200).send({ message: `${location} has been added to your favorites` })
          })
        } else {
          response.status(409).send({ message: `${location} is already in your favorites`})
        };
      })
      .catch(error => response.status(500).send({ error: error }));
    } else {
      response.status(401).send({ error: 'Invalid or missing API key' })
    };
  })
  .catch(error => response.status(500).send({ error: error }));
});

router.delete('/', (request, response) => {
  var body = request.body;
  var location = body.location;
  var key = body.api_key;

  if (!key) { return response.status(401).send({ error: 'Invalid or missing API key' }) };
  if (!location) { return response.status(422).send({ error: "Missing required 'location' property"}) };

  findUser(key)
  .then(user => {
    if (user.length) {
      findFavorite(user, location)
      .then(favorite => {
        if (favorite.length) {
          deleteFavorite(user, location)
          .then(response.status(204).send())
          .catch(error => response.status(500).send({ error }))
        } else {
          response.status(400).send({ error: `<${location}> not found in your favorites` })
        }
      })
    } else {
      response.status(401).send({ error: 'Invalid or missing API key' })
    }
  })
  .catch(error => response.status(500).send({ error }))
})
module.exports = router;
