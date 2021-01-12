const request = require("postman-request");

const geocode = (location, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(location) +
    ".json?access_token=pk.eyJ1IjoidHJpbmFzIiwiYSI6ImNrajdsaWVkMjZrMWgycXFqNnUzOTR5czYifQ.NtNgoP1emWknEUDc1CwEcg&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to Mapbox", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find the location", undefined);
    } else {
      callback(undefined, {
        lattitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.query[0],
      });
    }
  });
};

module.exports = geocode;
