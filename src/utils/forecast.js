const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=31db3843e00a7b6156c1d0076b83d3e5&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to find the host", undefined);
    } else if (body.error) {
      callback(
        "unable to find the weather forecast for the location provided",
        undefined
      );
    } else {
      callback(
        undefined,
        "Temperature at " +
          body.location.region +
          " is " +
          body.current.temperature +
          " and it feels like " +
          body.current.feelslike +
          " and humidity is " +
          body.current.humidity
      );
    }
  });
};

module.exports = forecast;
