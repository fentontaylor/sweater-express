class favForecast {
  constructor(city, forecast) {
    this.location = city,
    this.current_weather = forecast['currently']
  }
}

module.exports = favForecast;