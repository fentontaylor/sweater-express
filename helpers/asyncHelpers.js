require('dotenv').config()

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');
const FavForecast = require('../models/favForecast');
const Forecast = require('../models/forecast');

async function findUser (apiKey) {
  try {
    return await database('users').where('api_key', apiKey);
  } catch (e) {
    return e;
  }
}

async function findFavorite (user, location) {
  try {
    return await database('favorites')
      .where({ user_id: user[0].id, location: location });
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

async function deleteFavorite(user, location) {
  try {
    return await database('favorites')
      .where({ user_id: user[0].id, location: location }).del();
  } catch (e) {
    return e;
  }
}

async function _userFavoriteCities(user) {
  try {
    return await database('favorites').where({user_id: user[0].id}).pluck('location')
  } catch (e) {
    return e;
  }
}

async function _fetchGeolocation (location) {
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

async function _fetchForecast (location) {
  try {
    let latLong = await _fetchGeolocation(location);
    let key = process.env.DARKSKY_KEY;
    let coords = `${latLong.lat},${latLong.lng}`;
    let url = `https://api.darksky.net/forecast/${key}/${coords}?exclude=minutely,flags,offset`;

    let response = await fetch(url);

    return response.json();
  } catch (e) {
    return e;
  }
}

async function formattedForecast (city) {
  try {
    let forecast = await _fetchForecast(city);
    return new Forecast(city, forecast);
  } catch (e) {
    return e;
  }
}

async function _asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function fetchFavoriteForecasts(user) {
  try {
    var cities = await _userFavoriteCities(user);
    var forecasts = [];
    await _asyncForEach(cities, async (city) => {
      let fc = await _fetchForecast(city)
      let fav = new FavForecast(city, fc)
      forecasts.push(fav)
    });
    return forecasts;
  } catch (e) {
    return e;
  }
}

module.exports = {
  findUser: findUser,
  findFavorite: findFavorite,
  createFavorite: createFavorite,
  deleteFavorite: deleteFavorite,
  fetchFavoriteForecasts: fetchFavoriteForecasts,
  formattedForecast: formattedForecast
}