var mongoose = require("mongoose");

var TestSchema = new mongoose.Schema({
    name: String,
    test: Boolean

});

module.exports = mongoose.model("test", TestSchema);

