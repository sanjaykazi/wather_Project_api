const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");


  // console.log(desc);
  // const object = {
  //   name: "sanjay",
  //   favouriteFood: "sawarma"
  // }
  // console.log(JSON.stringify(object));

  // res.send("Server is up and running!");
});
app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "7556123248040ea621d59f72e2615c0a"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const image_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      // console.log(temp);
      const desc = weatherData.weather[0].description;
      res.write("<p> The weather is currently: " + desc + "</p>");
      res.write("<h1>The temperature in "+query+" is: " + temp + " degree celcious.</h1>");
      res.write("<img src=" + image_url + ">");
      res.send();
    });
  });
})

app.listen(3000, function() {
  console.log("server is running on port 3000.");
});
