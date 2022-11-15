"use strict";
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const posterShema = schema({
    imgurl: {
        type: String
    },
    data: {
        type: String
    },
    tag: {
        type: String
    },
    requestCount: {
        type: Number,
        default:0
    }
})
const poster = new mongoose.model("posters"/*name of collection giving wrong name will create collection with that name*/, posterShema)

const homeSchema = schema({
    "my_poster_list": {
        "type": [
            "Mixed"
        ]
    },
    "my_category": {
        "type": [
            "Mixed"
        ]
    },
    "version_code": {
        type: Number
    },
    "update_dialog_cancelable": {
        type: "Boolean",
        required: true
    }
})
const home = new mongoose.model('home', homeSchema);

const posterJsonSchema = schema({
    "bg_gradient": {
        "gEnd": {
          "type": "String"
        },
        "gStart": {
          "type": "String"
        },
        "type": {
          "type": "Number"
        },
        "gradientRadius": {
          "type": "Number"
        }
      },
    background: {
        type: String
    },
    "children": {
        "type": [
            "Mixed"
        ]
    },
    "fonts": {
        "type": [
            "String"
        ]
    },
    layout_height: {
        type: Number
    },
    layout_width: {
        type: Number
    },
    tag: {
        type: String
    }
})
const posterJson = new mongoose.model('posterjsons', posterJsonSchema);

module.exports = { home, poster, posterJson };