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
```
Provides current weather, hourly forecast for the next 8 hours, and daily forecast for the next 7 days.
#### Example
```
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

## Contributors <a name="stack"></a>

