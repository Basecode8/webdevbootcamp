var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, Welcome to my assignment!")
});

app.get("/speak/:animal", function(req, res){
    switch (String(req.params.animal.toLowerCase())) {
        case 'pig':
            res.send("Oink");
            break;
        case 'cow':
            res.send("Moo");
            break;
        case 'dog':
            res.send("Woof Woof!");
            break;
        case 'cat':
            res.send("MOEW");
            break;
        case 'mouse':
            res.send("squeak");
            break;
        default:
            res.send("Hmm, I've never heard of that animal");
    }
});

app.get("/repeat/:str/:num", function(req, res){
    var t = "";
    for (var i = 0; i < req.params.num; i++){
        if (i < req.params.num - 1) {
            t += String(req.params.str) + " "
        } else{
            t += String(req.params.str)
        }
    }
    
    res.send(t);
});

app.get("*", function(req, res){
    res.send("Sorry, page not found ... What are you doing with your life?")
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});