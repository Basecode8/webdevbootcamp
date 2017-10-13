var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
 name: String,
 image: String,
 description: String
});

// Compile to model
var Campground = mongoose.model("Campground", campgroundSchema);

//Sample Campgrounds

// Campground.create(
//  {
//   name: "Salmon Creek", 
//   image: "https://images.unsplash.com/photo-1436285122087-89584a1d9398?dpr=2&auto=format&fit=crop&w=1199&h=850&q=80&cs=tinysrgb&crop=",
//   description: "This is a creek full of salmon. Just. Salmon."
//  },
//  function(err, campground){
//   if(err){
//    console.log(err);
//   } else{
//    console.log("Newly Created Campground:")
//    console.log(campground);
//   }
//  });
 
// Campground.create(
//  {
//   name: "Granite Hill", 
//   image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?dpr=2&auto=format&fit=crop&w=1199&h=755&q=80&cs=tinysrgb&crop=",
//   description: "This a huge granite hill, no bathrooms. No water. Beautiful Granite!"
//  },
//  function(err, campground){
//   if(err){
//    console.log(err);
//   } else{
//    console.log("Newly Created Campground:")
//    console.log(campground);
//   }
//  });

// var campgrounds =[
//    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1436285122087-89584a1d9398?dpr=2&auto=format&fit=crop&w=1199&h=850&q=80&cs=tinysrgb&crop="},
//    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?dpr=2&auto=format&fit=crop&w=1199&h=755&q=80&cs=tinysrgb&crop="},
//    {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b?dpr=2&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop="},
//    {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1436285122087-89584a1d9398?dpr=2&auto=format&fit=crop&w=1199&h=850&q=80&cs=tinysrgb&crop="},
//    {name: "Granite Hill", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?dpr=2&auto=format&fit=crop&w=1199&h=755&q=80&cs=tinysrgb&crop="},
//    {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b?dpr=2&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop="}
//   ];

app.get("/", function(req, res){
 res.render("landing");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
   if(err){
    console.log(err);
   } else {
    res.render("index", {campgrounds: allCampgrounds})
   }
  })
});

app.get("/campgrounds/new", function(req, res){
 res.render("new");
});

app.post("/campgrounds", function(req, res){
 // Get name and image, and compile it into newCampground object
 var name = req.body.name;
 var image = req.body.image;
 var desc = req.body.description;
 var newCampground = {name: name, image: image, description: desc};
 
 // Create new campground in database
 Campground.create(newCampground, function(err, newlyCreated){
  if(err){
   console.log(err)
  } else{
   // redirect back to campgrounds
   
   res.redirect("/campgrounds");
  }
 });
});

app.get("/campgrounds/:id", function(req, res){
 Campground.findById(req.params.id, function(err, foundCampground){
  if(err){
   console.log(err);
  } else{
   res.render("show", {campground: foundCampground});
  }
 });
});

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Listening");
});