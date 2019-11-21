const Currently = require('./currently')
const Daily = require('./daily')
const Hourly = require('./hourly')

class Forecast {
  constructor(city, forecast) {
    this.location = city;
    this.currentWeather = new Currently(forecast.currently);
    this.daily = this.dailyForecast(forecast.daily);
    this.hourly = this.hourlyForecast(forecast.hourly);
  }

  dailyForecast(fc) {
    let dailyData = fc.data.slice(0, 7);
    return dailyData.map(data => new Daily(data));
  }

  hourlyForecast(fc) {
    let hourlyData = fc.data.slice(0,8);
    return hourlyData.map(data => new Hourly(data));
  }
}

module.exports = Forecast;