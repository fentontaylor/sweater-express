class favForecast {
  constructor(city, forecast) {
    this.location = city,
    this.current_weather = this.format(forecast.currently)
  }

  format(fc) {
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
}

module.exports = favForecast;

