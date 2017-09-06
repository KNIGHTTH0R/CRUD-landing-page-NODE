const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, default: "miriam" },
});


UserSchema.pre('save', function(next) {
    let _password = this;
    bcrypt.genSalt(10, function(error, salt) {
        if (error) return next(error);
        bcrypt.hash(_password.password, salt, function(error, hash) {
            if (error) return next(error);
            _password.password = hash;
            next();
        })
    })
})

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);