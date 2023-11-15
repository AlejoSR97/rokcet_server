const mongoose = require('mongoose');

const PokemonSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    types: {
        type: [String],
        required: true
    },
});

module.exports = mongoose.model('Pokemon', PokemonSchema);