const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ContactSchema = new Schema({
    email: { type: String, trim: true, lowercase: true, required: true },
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
<<<<<<< 55da757d912e0737902a8791ef91e5d37479124e
    },
    unreaded: { type: Boolean, default: true },
    classReaded: { type: String, default: "" }
=======
    }
>>>>>>> First commit
});


module.exports = mongoose.model('Contact', ContactSchema);