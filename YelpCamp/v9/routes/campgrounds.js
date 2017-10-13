var express  = require("express"),
    passport = require("passport"),
    User     = require("../models/user"),
    Campground = require("../models/campground");
    
var router = express.Router({mergeParams: true});

router.get("/", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
   if(err){
    console.log(err);
   } else {
    res.render("campgrounds/index", {campgrounds: allCampgrounds})
   }
  })
});

router.get("/new", isLoggedIn, function(req, res){
 res.render("campgrounds/new")
});

router.post("/", isLoggedIn, function(req, res){
 // Get name and image, and compile it into newCampground object
 var name = req.body.name;
 var image = req.body.image;
 var desc = req.body.description;
 var author = {
  id: req.user._id,
  username: req.user.username
 };
 var newCampground = {name: name, image: image, description: desc, author: author};
 
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

router.get("/:id", function(req, res){
 Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
  if(err){
   console.log(err);
  } else{
   res.render("campgrounds/show", {campground: foundCampground});
  }
 })
});

function isLoggedIn(req, res, next){
 if(req.isAuthenticated()){
  return next();
 }
 res.redirect("/login");
};

module.exports = router;