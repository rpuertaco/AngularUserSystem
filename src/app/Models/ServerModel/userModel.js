const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true, required: true },
    password: String,
    email: { type: String, unique: true, required: true }

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);

