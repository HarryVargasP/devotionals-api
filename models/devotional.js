const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DevotionalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    verse: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        required: true
        //default: Date.now
    },
    imageURL: {
        type: String,
        required: false
    },
    audioURL: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('devotional', DevotionalSchema);