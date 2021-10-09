const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true, required: true },
    password: String,
    email: { type: String, unique: true, required: true }

});

RestaurantSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("restaurant", RestaurantSchema);