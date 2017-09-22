var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

var postSchema = new mongoose.Schema({
 title: String,
 content: String
})

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
 email: String,
 name: String,
 posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//  email: "hermione@hogwarts.edu",
//  name: "Hermione Granger"
// });

// newUser.posts.push({
//  title: "How to brew polyjuice potion", 
//  content: "Just kidding. Go to potions class to learn it!"
// })

// newUser.save(function(err, usr){
//  if(err){
//   console.log(err);
//  } else{
//   console.log(usr);
//  }
// });

// var newPost = new Post({
//  title: "Reflections on apples",
//  content: "They are delicious"
// });

// newPost.save(function(err, post){
//  if(err){
//   console.log(err);
//  } else{
//   console.log(post);
//  }
// });

// User.findOne({name: "Hermione Granger"}, function(err, usr){
//  if(err){
//   console.log(err);
//  } else{
//   usr.posts.push({
//    title: "Three things I really hate",
//    content: "Voldemort, Voldemort, Voldemort"
//   });
//   usr.save(function(err, usr){
//    if(err){
//     console.log(err);
//    } else{
//     console.log(usr);
//    }
//   });
//  }
// });