require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash"); 

var setUpPassport = require("./setuppassport");

var app = express();
setUpPassport();

app.set("port", process.env.PORT);
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(session({
    secret:"sad123hn412u3h@213",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// public thu muc uploads  
app.use(express.static(__dirname+'/uploads'));
// lay duong dan 
app.use("/", require("./routes/web"));
app.use("/backend",require("./routes/backend"));
// app.use("/api", require("./routes/api"));


app.listen(app.get("port"), function(){
    console.log("Server started on port "+app.get("port"));
});