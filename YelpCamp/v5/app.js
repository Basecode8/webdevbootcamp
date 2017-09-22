var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB     = require("./seeds.js");
    
    
// Setup
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
seedDB();


// Paths
app.get("/", function(req, res){
 res.render("landing");
});

app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
   if(err){
    console.log(err);
   } else {
    res.render("campgrounds/index", {campgrounds: allCampgrounds})
   }
  })
});

app.get("/campgrounds/new", function(req, res){
 res.render("campgrounds/new")
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
 Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
  if(err){
   console.log(err);
  } else{
   res.render("campgrounds/show", {campground: foundCampground});
  }
 })
});

// ===================
//   COMMENTS ROUTES
// ===================

app.get("/campgrounds/:id/comments/new", function(req, res){
 Campground.findById(req.params.id, function(err, campground){
  if(err){
   console.log(err);
  } else{
   res.render("comments/new", {campground: campground});
  }
 });
});

app.post("/campgrounds/:id/comments", function(req, res){
 Campground.findById(req.params.id, function(err, campground){
  if(err){
   console.log(err);
   res.redirect("/campgrounds");
  } else{
   Comment.create(req.body.comment, function(err, comment){
    if(err){
     console.log(err);
    } else{
     campground.comments.push(comment);
     campground.save();
     res.redirect("/campgrounds/" + campground._id);
    }
   });
  }
 })
});

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Listening");
});