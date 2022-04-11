const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// getting request for https from local node ,not external
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{
    // console.log("post recieved");
    const city =  req.body.cityName;
    const appid = "xxxxxxxxxxxxxxxxxxx api id"
    const unit = "metric";
    const url = "url of openweather with these parameters" + city +"&appid="+ appid +"&units="+ unit;
    https.get(url,function(response)
    {
        console.log(response.statusCode);
        // output in terminal
        response.on("data",function(data)
        {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" +icon + "@2x.png";
            // console.log(icon);
            // const visible = weatherData.visibility;
            // console.log(visible);
            res.write("<p>The Weather in " + city +" is "+weatherDescription+"</p>");
            res.write("<img src="+imageUrl+">");
            res.write("<h1>The temperature is : "+temp+"C</h1>");
            
            res.send();
        });
    });
    
    // res.send("server is running");
    // can have only one send method at a time
    // can have multiple get and write
});



app.listen(3000,function()
    {
        console.log("server running");
    }
);