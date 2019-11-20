require('dotenv').config()

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

async function findUser (apiKey) {
  try {
    let user = await database('users').where('api_key', apiKey);
    return user;
  } catch (e) {
    return e;
  }
}

async function findFavorite (user, location) {
  try {
    let favorite = await database('favorites')
      .where({ user_id: user[0].id, location: location })
    return favorite;
  } catch (e) {
    return e;
  }
}

async function createFavorite (user, location) {
  try {
    let newFavorite = await database('favorites')
      .insert({ user_id: user[0].id, location: location })
    return newFavorite;
  } catch (e) {
    return e;
  }
}

async function fetchGeolocation (location) {
  try {
    let key = process.env.GOOGLE_KEY;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`;

    let response = await fetch(url);
    let json = await response.json();

    return json.results[0].geometry.location;
  } catch (e) {
    return e;
  }
}

async function fetchForecast (latLong) {
  try {
    let key = process.env.DARKSKY_KEY;
    let coords = `${latLong.lat},${latLong.lng}`;
    let url = `https://api.darksky.net/forecast/${key}/${coords}?exclude=minutely`;

    let response = await fetch(url);

    return response.json();
  } catch (e) {
    return e;
  }
}

module.exports = {
  findUser: findUser,
  findFavorite: findFavorite,
  createFavorite: createFavorite,
  fetchGeolocation: fetchGeolocation,
  fetchForecast: fetchForecast
}