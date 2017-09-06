const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const BenefitSchema = new Schema({
    title: { type: String, trim: true, default: "Aqui va el titulo" },
    imageURL: String,
});


module.exports = mongoose.model('Benefit', BenefitSchema);