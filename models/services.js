const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ServicesSchema = new Schema({
    nameService: { type: String, trim: true, default: "Nuevo servicio creado" },
    description: { type: String, trim: true, default: "Nueva descripcion del servicio creada" },
});


module.exports = mongoose.model('Services', ServicesSchema);