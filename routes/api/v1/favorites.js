var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

async function findUser(apiKey) {
  let user = await database('users').where('api_key', apiKey);
  return user;
}

async function findFavorite(user, location) {
  let favorite = await database('favorites')
    .where({ user_id: user[0].id, location: location })
  return favorite;
}

router.get('/', (request, response) => {
  
});

router.post('/', (request, response) => {
  var key = request.body.api_key;
  var location = request.body.location;

  if (!key) { return response.status(401).send({ error: 'Invalid or missing API key' })}

  findUser(key)
    .then(user => {
      if (user.length) {
        findFavorite(user, location)
          .then(favorite => {
            if (!favorite.length) {
              return database('favorites').insert({
                user_id: user[0].id, location: location
              })
              .then(() => {
                response.status(200).json({ message: `${location} has been added to your favorites` })
              })
            } else {
              return response.status(409).json({ message: `${location} is already in your favorites`})
            };
          })
          .catch((error) => {
            response.status(500).json({ error });
          });
      } else {
        return response.status(401).send({ error: 'Invalid or missing API key' })
      };
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

module.exports = router;
