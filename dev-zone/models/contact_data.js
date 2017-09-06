const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const DataSchema = new Schema({
    email: { type: String, trim: true, lowercase: true, required: true },
    phone: { type: String, trim: true, required: true, default: "676-016-211" }
});


module.exports = mongoose.model('Data', DataSchema);