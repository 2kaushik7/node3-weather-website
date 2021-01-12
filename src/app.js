const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const app = express();

//Define paths for express config
const pathToPublicDirectory = path.join(__dirname, "../public");
const pathToViews = path.join(__dirname, "../templates/views");
const hbsPartialsPath = path.join(__dirname, "../templates/partials");
app.use(express.static(pathToPublicDirectory));

//Configure handlebars and view folder
app.set("view engine", "hbs");
app.set("views", pathToViews);
hbs.registerPartials(hbsPartialsPath);

//Define routes
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please send a address" });
  } else {
    geocode(req.query.address, (error, { lattitude, longitude } = {}) => {
      if (error) {
        return res.send({ error: error });
      } else {
        forecast(lattitude, longitude, (error, data) => {
          if (error) {
            return res.send({ error: error });
          } else {
            return res.send({ WeatherForecast: data });
          }
        });
      }
    });
  }
});

app.get("", (req, res) => {
  res.render("index", {
    name: "Sai",
    title: "Weather",
    footer: "Created by Sai",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sai",
    footer: "Created by Sai",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Please provide a search term" });
  }
  res.send({
    products: [],
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a help message",
    title: "Help Page",
    footer: "Created by Sai",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    footer: "Created by Sai",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    footer: "Created by Sai",
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
