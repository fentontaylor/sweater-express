var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


router.get('/', (request, response) => {
  database('favorites').select()
    .then((favorites) => {
      response.status(200).json(favorites);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

router.post('/', (request, response) => {
  var key = request.body.api_key;
  var location = request.body.location;

  if (!key) { return response.status(401).send({ error: 'Invalid or missing API key' })}

  database('users').where('api_key', key)
    .then(user => {
      if (user.length) {
        database('favorites').where({user_id: user[0].id, location: location})
          .then(favorite => {
            if (!favorite.length) {
              return database('favorites').insert({
                user_id: user[0].id, location: location
              })
              .then(() => {
                response.status(200).json({ message: `${location} has been added to your favorites` })
              })
            } else {
              return response.status(409).json({ message: `${location} already in your favorites`})
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
