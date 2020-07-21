const express = require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")


})

app.post("/",function(req,res){

  console.log(req.body.cityName)
  const query=req.body.cityName
  const unit="metric"
  const apiKey="0f4b93e4c3b498275dd57775b0210178"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+req.body.cityName+"&units="+unit+"&appid="+apiKey;
  https.get(url,function(response){
    console.log(response.statusCode);
    // To get hold of data
    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const icon=weatherData.weather[0].icon
      const imgURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
      console.log(weatherData)
      var temp=weatherData.main.temp
      weatherDescription=weatherData.weather[0].description
      res.write("<p>The weather is currently "+weatherDescription+ "<p>")
      res.write("<h1>Temprature in "+req.body.cityName+" is "+temp+" degree celcius</h1>")
      res.write("<img src="+ imgURL+">")
      res.send()
    })

  })

})






app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
