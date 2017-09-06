const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    title: { type: String, trim: true },
    imageURL: String,
    description: String
});


module.exports = mongoose.model('Profile', ProfileSchema);