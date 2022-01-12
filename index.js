const express = require("express")
const  app = express();
const bodyParser = require("body-parser");
const https = require("https");
// const { send } = require("process");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
 res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    
    const query = req.body.CityName;
  const appkey = "39119b3a9e0c3cd864216064b689dc10";
  const unit = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appkey+"&units="+unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1> the temp in " + query +" is " + temp + " degree Celcius </h1>");
      res.write("<h2>The weather is currently " + weatherDescription + "</h2>");
      res.write("<img src=" + imageURL + ">");
      res.send();
        } );
    }); 
});
 

app.listen(3000, function (req, res) {
    console.log("server started at port 3000");
});