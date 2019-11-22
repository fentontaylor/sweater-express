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
Sweater Weather Express is simple lightweight API that uses the [Dark Sky API](https://darksky.net/dev/docs) and the [Google Geocode API](https://developers.google.com/maps/documentation/geocoding/start) to return forecast data for specific cities or for cities in a user's favorites. Users can send POST or DELETE requests to manage their favorites. To get started right away with the production API, view the [API documentation](#api_docs). Or if you want to tinker with the code, follow the setup steps below.

## Initial Setup <a name="setup"></a>
1) To get started using this app, you'll first need to clone it and install dependencies.
```
git clone git@github.com:fentontaylor/sweater-express.git
npm install
```
2) Next, you'll need to set up the database
```
psql
CREATE DATABASE sweater_express_dev;
CREATE DATABASE sweater_express_test;
\q

knex migrate:latest
knex migrate:latest --env test
knex seed:run
```
3) Finally to start the server using:
```
npm start
```
4) Use your favorite client, like Postman, or send curl requests to the base url:
```
http://localhost:3000/
```

## How to Run Tests <a name="tests"></a>
Run tests with the command:
```
npm test
```

## API Documentation <a name="api_docs"></a>

### All Requests
#### Base url:
```
https://sweater-express.herokuapp.com
```
#### Endpoints:
- [GET /api/v1/forecast?location={location}](#get_forecast)
- [GET /api/v1/favorites](#get_favorites)
- [POST /api/v1/favorites](#post_favorites)
- [DELETE /api/v1/favorites](#delete_favorites)

- Every request must include the API key in the JSON body of the request with the key "api_key". You can use the key `jgn983hy48thw9begh98h4539h4` to test the API.

**Example**
```
body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
- If no API key or an incorrect key is provided, the server will respond with status 401 (Unauthorized) and an error message.

- All requests should include the following headers:
```
Content-Type: application/json
Accept: application/json
```

### Forecast Request <a name="get_forecast"></a>

```
GET /api/v1/forecast?location={location}
```
Provides current weather, hourly forecast for the next 8 hours, and daily forecast for the next 7 days. `{location}` query param should be a "City, State" combination such as "Denver, CO" or "Los Angeles, CA". 
#### Example
```
GET https://sweater-express.herokuapp.com/api/v1/forecast?location=Denver, CO
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
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```

### Add Favorites Request <a name="post_favorites"></a>
```
POST /api/v1/favorites
```
Add favorite location for the user. If successful, the JSON response (status 200) will include a message verifying that the location was added to your favorites. To avoid creating duplicate records, the JSON response (status 409) will include a message that notifies the user that a location is already in their favorites if they try to add it again. 
#### Example
```
POST https://sweater-express.herokuapp.com/api/v1/favorites
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

### Delete Favorites Request <a name="delete_favorites"></a>
```
DELETE /api/v1/favorites
```
- Successful deletion responds with status 204.
- If the location specified is not found in the favorites, response status is 404.

#### Example
```
DELETE https://sweater-express.herokuapp.com/api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

### Favorite Location Forecast Request <a name="get_favorites"></a>
```
GET /api/v1/favorites
```
- Returns current weather summary for all of a user's favorite locations.
- Responds with status 422 if location is missing in JSON request.
- Responds with 409 if the location already exists for the user.

#### Example
```
GET https://sweater-express.herokuapp.com/api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
**Success Response**
```
[
  {
    "location": "Denver, CO",
    "current_weather": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
    "location": "Golden, CO",
    "current_weather": {
      "summary": "Sunny",
      "icon": "sunny",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 71.00,
      "humidity": 0.50,
      "pressure": 1015.10,
      "windSpeed": 10.16,
      "windGust": 13.40,
      "windBearing": 200,
      "cloudCover": 0,
      "visibility": 8.11,
    }
  }
]
```

## Schema Design <a name="schema"></a>
<img width="629" alt="Screen Shot 2019-11-21 at 9 06 37 PM" src="https://user-images.githubusercontent.com/18686466/69397352-061d2f80-0ca3-11ea-8065-bd22d0d4d606.png">

## Tech Stack <a name="stack"></a>
- [Node.js](https://nodejs.org/en/)
- [knex](https://www.npmjs.com/package/knex)
- [PostgreSQL](https://www.postgresql.org/)
- [Heroku](heroku.com)

## Contributors <a name="contributors"></a>
Fenton Taylor
- [GitHub](https://github.com/fentontaylor)
- [LinkedIn](https://www.linkedin.com/in/fenton-taylor-006057122/)

