require('dotenv').config()

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

async function fetchGeolocation(location) {
  let key = process.env.GOOGLE_KEY;
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`;

  let response = await fetch(url);
  let json = await response.json();

  return json.results[0].geometry.location;
}

async function fetchForecast(latLong) {
  let key = process.env.DARKSKY_KEY;
  let coords = `${latLong.lat},${latLong.lng}`;
  let url = `https://api.darksky.net/forecast/${key}/${coords}?exclude=minutely`;

  let response = await fetch(url)
  
  return response.json()
}

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