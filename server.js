require("dotenv").config()
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverwide = require("method-override");
const User = require("./src/app/Models/ServerModel/userModel");
const expressSanitizer = require("express-sanitizer");




mongoose.connect(process.env.LOCALDATABASE || process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set('useFindAndModify', false);
// mongoose.set("useCreateIndex", false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/dist/gastrolinked"));
app.use(methodOverwide("_method"));
app.use(expressSanitizer());

app.use(require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    console.log("app")
    console.log(res.locals.currentUser);
    next();
});


// var testSchema = new mongoose.Schema({ name: String, test: Boolean });
// var Test = mongoose.model("Test", testSchema);

// var notadmin = new Test({
//     name: "MongoAtlas Connected",
//     test: true
// });

// notadmin.save(function (err, test) {
//     if (err) {
//         console.log("something was wrong");
//     } else {
//         console.log("test add to the database");
//         console.log(test);
//     }
// });

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/gastrolinked/index.html"));
});

// app.get("/api/test", function (req, res) {
//     Test.find({}, function (err, tests) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(tests);
//         }
//     });

// });

app.post("/api/register", function (req, res) {
    const newUser = new User({ name: req.body.name, username: req.body.username, email: req.body.email });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            res.status(500).send(err);
        }
        passport.authenticate("local")(req, res, function () {
            console.log("Register Succesful : " + user.username);
            res.send(user);

        });
    });


});

app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // console.log("post");
    // console.log(req.user);
    if (req.user) {
        const loggedUser = {
            // _id: req.user._id,
            // name: req.user.name,
            username: req.user.username,
            loggedIn: true
        };


        res.send(loggedUser);
    }


})

app.get("/api/currentUser", function (req, res) {
    if (res.locals.currentUser) {
        const loggedUser = {
            username: res.locals.currentUser.username,
            loggedIn: true
        }
        res.send(loggedUser);

    } else {
        const loggedUser = {
            username: "Hello Stranger",
            loggedIn: false
        }
        res.send(loggedUser);

    }


});






app.listen(process.env.PORT || 8080, function () {

    console.log("Gastrolinked has started");
});