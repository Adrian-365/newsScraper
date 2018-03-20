const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;