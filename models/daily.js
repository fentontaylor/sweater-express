class Daily {
  constructor(daily) {
    this.time = daily.time,
    this.summary = daily.summary,
    this.icon = daily.icon,
    this.sunriseTime = daily.sunriseTime,
    this.sunsetTime = daily.sunsetTime,
    this.precipIntensity = daily.precipIntensity,
    this.precipIntensityMax = daily.precipIntensityMax,
    this.precipIntensityMaxTime = daily.precipIntensityMaxTime,
    this.precipProbability = daily.precipProbability,
    this.precipType = daily.precipType,
    this.temperatureHigh = daily.temperatureHigh,
    this.temperatureLow = daily.temperatureLow,
    this.humidity = daily.humidity,
    this.pressure = daily.pressure,
    this.windSpeed = daily.windSpeed,
    this.windGust = daily.windGust,
    this.cloudCover = daily.cloudCover,
    this.visibility = daily.visibility,
    this.temperatureMin = daily.temperatureMin,
    this.temperatureMax = daily.temperatureMax
  }
}

module.exports = Daily;