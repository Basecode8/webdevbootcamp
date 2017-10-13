var express              = require("express"),
    app                  = express(),
    bodyParser           = require("body-parser"),
    mongoose             = require("mongoose"),
    flash                = require("connect-flash"),
    passport             = require("passport"),
    LocalStrategy        = require("passport-local").Strategy,
    passpotLocalMongoose = require("passport-local-mongoose"),
    Campground           = require("./models/campground"),
    Comment              = require("./models/comment"),
    User                 = require("./models/user"),
    seedDB               = require("./seeds"),
    methodOverride       = require("method-override");
    
    
// ======
// Routes
// ======

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");
    
// Setup
mongoose.connect("mongodb://localhost/yelp_camp_v12");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//Passport Configuration
app.use(require("express-session")({
 secret: "This is the super secret key",
 resave: false,
 saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Give all routes access to the current user and any relevant error or success message
app.use(function(req, res, next) {
 res.locals.currentUser = req.user;
 res.locals.error = req.flash("error");
 res.locals.success = req.flash("success");
 next();
});

seedDB();  //Fill the database with sample data


//Routes

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Listening");
});