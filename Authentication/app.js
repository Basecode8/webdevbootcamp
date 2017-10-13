var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    LocalStrategy         = require("passport-local").Strategy,
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");
    
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
 secret: "Party of the Disco",
 resave: false,
 saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes

app.get("/", function(req, res){
 res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
 res.render("secret");
});

app.get("/register", function(req, res){
 res.render("register");
});

app.post("/register", function(req, res){
 User.register(new User({username: req.body.username}), req.body.password, function(err, user){
  if(err){
   console.log(err);
   res.redirect("/register");
  } else{
   passport.authenticate("local")(req, res, function(){
    console.log("Successful authentication");
    res.redirect("/secret");
   })
  }
 })
});

// Login routes

app.get("/login", function(req, res){
 res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
 req.logout();
 res.redirect("/");
});

// Check if logged in

function isLoggedIn(req, res, next){
 if(req.isAuthenticated()){
  return next();
 }
 res.redirect("/");
};

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("The server has started");
});