
const mongoose = require('mongoose');

const equipeSchema = new mongoose.Schema({

    wording: {
        type: String,
        required: [true, 'Une équipe doit avoir un libelle'],
        trim: true,
        unique: true,
        maxLength: 64,
    },

    trainer: {
        type: String,
        required: [true, 'Une équipe doit avoir un entraineur'],
        trim: true,
        maxLength: 128,
    },

    slot: {
        type: String,
        required: [true, 'Une équipe doit avoir un creneaux'],
        trim: true,
        maxLength: 128,
    },

    photo: {
        type: String,
        required: [true, 'Une équipe doit avoir une photo'],
        trim: true,
    },

    urlCalendar: {
        type: String,
        required: false,
        trim: true,
    },

    comment: {
        type: String,
        trim: true,
    }

})




const Equipe = mongoose.model('Equipe', equipeSchema);
module.exports = Equipe;