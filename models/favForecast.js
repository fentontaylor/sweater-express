const Currently = require('./currently')

class FavForecast {
  constructor(city, forecast) {
    this.location = city,
    this.currentWeather = new Currently(forecast.currently)
  }
}

module.exports = FavForecast;

