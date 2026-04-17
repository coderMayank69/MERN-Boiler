const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5000,
    },
    imageUrl: {
        type: String,
        trim: true,
        default: "",
    },
}, { timestamps: true });


const postModel = mongoose.model("Post", postSchema);


module.exports = postModel;
