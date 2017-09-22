var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
 name: String,
 age: Number,
 temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

Cat.create({name: "George", age: 11, temperament: "Nice"}, function(err, cat){
 if(err) console.log("Something went wrong: ", err);
})

Cat.find({}, function(err, cats){
 if (err){
  console.log("Oh No! ERROR!");
  console.log(err)
 } else{
  console.log("ALL THE CATS...")
  console.log(cats);
 }
});

