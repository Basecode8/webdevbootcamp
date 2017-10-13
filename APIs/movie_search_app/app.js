var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
 res.render("search")
});

app.get("/results", function(req, res){
 var query = req.query.search;
 var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
 
 request(url, function(err, response, body){
  if(!err && response.statusCode === 200){
   var data = JSON.parse(body);
   res.render("results", {data: data});
  } else {
   res.send("Something went wrong:" + err);
  }
 });
});

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Listening");
});