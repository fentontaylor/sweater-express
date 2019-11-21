class Hourly {
  constructor(hourly) {
    this.time = hourly.time,
    this.summary = hourly.summary,
    this.icon = hourly.icon,
    this.precipIntensity = hourly.precipIntensity,
    this.precipProbability = hourly.precipProbability,
    this.temperature = hourly.temperature,
    this.humidity = hourly.humidity,
    this.pressure = hourly.pressure,
    this.windSpeed = hourly.windSpeed,
    this.windGust = hourly.windGust,
    this.windBearing = hourly.windBearing,
    this.cloudCover = hourly.cloudCover,
    this.visibility = hourly.visibility
  }
}

module.exports = Hourly;