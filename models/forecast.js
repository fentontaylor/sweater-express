class Forecast {
  constructor(city, forecast) {
    this.location = city;
    this.currentWeather = this.currently(forecast.currently);
    this.daily = this.dailyForecast(forecast.daily);
    this.hourly = this.hourlyForecast(forecast.hourly);
  }

  currently(fc) {
    return {
      summary: fc.summary,
      icon: fc.icon,
      precipIntensity: fc.precipIntensity,
      precipProbability: fc.precipProbability,
      temperature: fc.temperature,
      humidity: fc.humidity,
      pressure: fc.pressure,
      windSpeed: fc.windSpeed,
      windGust: fc.windGust,
      windBearing: fc.windBearing,
      cloudCover: fc.cloudCover,
      visibility: fc.visibility
    }
  }

  dailyForecast(fc) {
    return {
      summary: fc.summary,
      icon: fc.icon,
      data: fc.data.slice(0,7)
    }
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