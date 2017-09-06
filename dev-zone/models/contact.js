const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ContactSchema = new Schema({
    email: { type: String, trim: true, lowercase: true, required: true },
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    unreaded: { type: Boolean, default: true },
    classReaded: { type: String, default: "" }
});


module.exports = mongoose.model('Contact', ContactSchema);