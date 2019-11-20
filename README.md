# Sweater Weather Express

## Table of Contents
1. [Introduction](#introduction)
1. [Initial Setup](#setup)
1. [How to Run Tests](#tests)
1. [API Documentation](#api_docs)
1. [Schema Design](#schema)
1. [Tech Stack](#stack)
1. [Contributors](#contributors)

## Introduction <a name="introduction"></a>
[Production Link](https://sweater-express.herokuapp.com/)

## Initial Setup <a name="setup"></a>

## How to Run Tests <a name="tests"></a>

## API Documentation <a name="api_docs"></a>

### All Requests
- Every request must include the API key in the JSON body of the request with the key "api_key".

**Example**
```
body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
- If no API key or an incorrect key is provided you will get a 401 (Unauthorized) with an error message.

- All requests should include the following headers:
```
Content-Type: application/json
Accept: application/json
```

### Forecast Request
```
GET /api/v1/forecast?location={location}
```
Provides current weather, hourly forecast for the next 8 hours, and daily forecast for the next 7 days. `{location}` query param should be a "City, State" combination such as "Denver, CO" or "Los Angeles, CA". 
#### Example
```
GET /api/v1/forecast?location=Denver, CO
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
**Success Response**
```
{
    "latitude": 39.7392358,
    "longitude": -104.990251,
    "timezone": "America/Denver",
    "currently": {
        "time": 1574282024,
        "summary": "Mostly Cloudy",
        "icon": "partly-cloudy-day",
        "nearestStormDistance": 2,
        "nearestStormBearing": 344,
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 49.39,
        "apparentTemperature": 47.64,
        "dewPoint": 30.4,
        "humidity": 0.48,
        "pressure": 1003.9,
        "windSpeed": 7.27,
        "windGust": 14.17,
        "windBearing": 28,
        "cloudCover": 0.75,
        "uvIndex": 2,
        "visibility": 10,
        "ozone": 264.2
    },
    "hourly": {
        "summary": "Possible light rain later this afternoon and this evening.",
        "icon": "rain",
        "data": [
            {
                "time": 1574280000,
                "summary": "Mostly Cloudy",
                "icon": "partly-cloudy-day",
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 50.14,
                "apparentTemperature": 50.14,
                "dewPoint": 30.48,
                "humidity": 0.47,
                "pressure": 1003.9,
                "windSpeed": 7.59,
                "windGust": 14.71,
                "windBearing": 21,
                "cloudCover": 0.7,
                "uvIndex": 2,
                "visibility": 10,
                "ozone": 263.8
            }
        ]
    },
    "daily": {
        "summary": "Possible light rain today.",
        "icon": "rain",
        "data": [
            {
                "time": 1574233200,
                "summary": "Possible light rain in the afternoon and evening.",
                "icon": "rain",
                "sunriseTime": 1574257920,
                "sunsetTime": 1574293320,
                "moonPhase": 0.8,
                "precipIntensity": 0.0071,
                "precipIntensityMax": 0.0413,
                "precipIntensityMaxTime": 1574297760,
                "precipProbability": 0.57,
                "precipType": "rain",
                "temperatureHigh": 52.47,
                "temperatureHighTime": 1574272740,
                "temperatureLow": 24.8,
                "temperatureLowTime": 1574347920,
                "apparentTemperatureHigh": 51.97,
                "apparentTemperatureHighTime": 1574272620,
                "apparentTemperatureLow": 19.19,
                "apparentTemperatureLowTime": 1574347800,
                "dewPoint": 28.77,
                "humidity": 0.58,
                "pressure": 1006.8,
                "windSpeed": 5.8,
                "windGust": 15.7,
                "windGustTime": 1574291280,
                "windBearing": 17,
                "cloudCover": 0.73,
                "uvIndex": 3,
                "uvIndexTime": 1574275800,
                "visibility": 9.071,
                "ozone": 265.3,
                "temperatureMin": 31.85,
                "temperatureMinTime": 1574319600,
                "temperatureMax": 52.47,
                "temperatureMaxTime": 1574272740,
                "apparentTemperatureMin": 25.96,
                "apparentTemperatureMinTime": 1574319600,
                "apparentTemperatureMax": 51.97,
                "apparentTemperatureMaxTime": 1574272620
            }
        ]
    }
}
```

### Add Favorites Request
```
POST /api/v1/favorites
```
Add favorite location for the user. If successful, the JSON response (status 200) will include a message verifying that the location was added to your favorites. To avoid creating duplicate records, the JSON response (status 409) will include a message that notifies the user that a location is already in their favorites if they try to add it again. 
#### Example
```
POST /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
**Success Response:**
```
status: 200
body:

{
  "message": "Denver, CO has been added to your favorites",
}
```
**Error Response:**
```
status: 409
body:

{
  "message": "Denver, CO is already in your favorites",
}
```

### Delete Favorites Request
```
```
details
#### Example
```
```

### Favorite Location Forecast Request
```
```
details
#### Example
```
```

## Schema Design <a name="schema"></a>

## Tech Stack <a name="stack"></a>

## Contributors <a name="contributors"></a>

