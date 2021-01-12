console.log("from js file");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=Boston").then((response) => {
//   response.json().then((weather) => {
//     if (weather.error) {
//       console.log(weather.error);
//     } else {
//       console.log(weather);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      message1.textContent = "loading....";
      message2.textContent = "";
      response.json().then((weather) => {
        if (weather.error) {
          console.log(weather.error);
          message1.textContent = weather.error;
        } else {
          console.log(weather);
          message1.textContent = weather.WeatherForecast;
          message2.textContent = weather.WeatherForecast;
        }
      });
    }
  );
});
