require("dotenv").config()
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
var Test = require("./src/app/Models/ServerModel/userModel");




mongoose.connect(process.env.LOCALDATABASE || process.env.DATABASE);

app.use(express.static(__dirname + "/dist/gastrolinked"));


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

app.get("/api/test", function (req, res) {
    Test.find({}, function (err, tests) {
        if (err) {
            console.log(err);
        } else {
            res.send(tests);
        }
    });

});






app.listen(process.env.PORT || 8080, function () {

    console.log("Gastrolinked has started");
});