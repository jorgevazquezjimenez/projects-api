const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    status: {
        type: Boolean,
        default: true
    },
});

ProjectSchema.methods.toJson = function() {
    const { __v, ...project } = this.toObject()
    return project
}

module.exports = model('Project', ProjectSchema)