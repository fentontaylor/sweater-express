const Currently = require('./currently')
const Daily = require('./daily')

class Forecast {
  constructor(city, forecast) {
    this.location = city;
    this.currentWeather = new Currently(forecast.currently);
    this.daily = this.dailyForecast(forecast.daily);
    this.hourly = this.hourlyForecast(forecast.hourly);
  }

  dailyForecast(fc) {
    let dailyData = fc.data.slice(0, 7)
    return dailyData.map(data => new this.daily(data))
  }

  hourlyForecast(fc) {
    return {
      summary: fc.summary,
      icon: fc.icon,
      data: fc.data.slice(0,8)
    }
  }
}

module.exports = Forecast;