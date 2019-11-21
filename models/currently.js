class Currently {
  constructor(current) {
    this.summary = current.summary,
    this.icon = current.icon,
    this.precipIntensity = current.precipIntensity,
    this.precipProbability = current.precipProbability,
    this.temperature = current.temperature,
    this.humidity = current.humidity,
    this.pressure = current.pressure,
    this.windSpeed = current.windSpeed,
    this.windGust = current.windGust,
    this.windBearing = current.windBearing,
    this.cloudCover = current.cloudCover,
    this.visibility = current.visibility
  }
}

module.exports = Currently;