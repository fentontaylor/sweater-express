var express = require('express');
var router = express.Router();

const helpers = require('../../../helpers/asyncHelpers')
const findUser = helpers.findUser
const findFavorite = helpers.findFavorite
const createFavorite = helpers.createFavorite

router.get('/', (request, response) => {
  
});

router.post('/', (request, response) => {
  var key = request.body.api_key;
  var location = request.body.location;

  if (!key) { return response.status(401).send({ error: 'Invalid or missing API key' }) }

  findUser(key)
    .then(user => {
      if (user.length) {
        findFavorite(user, location)
          .then(favorite => {
            if (!favorite.length) {
              createFavorite(user, location)
                .then(() => {
                  response.status(200).json({ message: `${location} has been added to your favorites` })
                })
            } else {
              response.status(409).json({ message: `${location} is already in your favorites`})
            };
          })
          .catch((error) => {
            response.status(500).json({ error });
          });
      } else {
        response.status(401).send({ error: 'Invalid or missing API key' })
      };
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = router;
