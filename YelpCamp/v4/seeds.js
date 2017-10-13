var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    data       = [
      {
       name: "Cloud's Rest",
       image: "https://images.unsplash.com/photo-1432817495152-77aa949fb1e2?dpr=2&auto=format&fit=crop&w=1199&h=801&q=80&cs=tinysrgb&crop=",
       description: "BLAH BLAH BLAH"
      },
      {
       name: "Desert Masa",
       image: "https://images.unsplash.com/photo-1478810810369-07072c5ef88b?dpr=2&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=",
       description: "BLAH BLAH BLAH"
      },
      {
       name: "Canyon Floor",
       image: "https://images.unsplash.com/photo-1439123414876-0717652a92a9?dpr=2&auto=format&fit=crop&w=1199&h=797&q=80&cs=tinysrgb&crop=",
       description: "BLAH BLAH BLAH"
      }
     ];

function seedDB() {
 //Remove all campgrounds
 Campground.remove({}, function(err){
  if(err){
   console.log(err);
  } else{
   // Remove all comments
   Comment.remove({}, function(err){
    if(err){
     console.log(err)
    }});
   console.log("Removed Campgrounds");
   
   //Add campgrounds
   data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
     if(err){
      console.log(err);
     } else{
      //Create comment on each campground
      Comment.create(
       {
        text: "This place is great, but I wish there was internet",
        author: "Homer"
       },
       function(err, comment){
        if(err){
         console.log(err);
        } else{
         campground.comments.push(comment);
         campground.save();
         console.log("Created new comment");
        }
       })
       console.log("Added a campground");
     }
    })
   })
  }
 })
}
 
 // Add new campgrounds
 

module.exports = seedDB;