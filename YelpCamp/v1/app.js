var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds =[
   {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1436285122087-89584a1d9398?dpr=2&auto=format&fit=crop&w=1199&h=850&q=80&cs=tinysrgb&crop="},
   {name: "Granite Hill", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?dpr=2&auto=format&fit=crop&w=1199&h=755&q=80&cs=tinysrgb&crop="},
   {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b?dpr=2&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop="},
   {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1436285122087-89584a1d9398?dpr=2&auto=format&fit=crop&w=1199&h=850&q=80&cs=tinysrgb&crop="},
   {name: "Granite Hill", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?dpr=2&auto=format&fit=crop&w=1199&h=755&q=80&cs=tinysrgb&crop="},
   {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b?dpr=2&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop="}
  ];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
 res.render("landing");
});

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds, campgrounds});
});

app.get("/campgrounds/new", function(req, res){
 res.render("new");
});

app.post("/campgrounds", function(req, res){
 var name = req.body.name;
 var image = req.body.image;
 var newCampground = {name: name, image: image};
 
 campgrounds.push(newCampground);
 res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Listening");
})