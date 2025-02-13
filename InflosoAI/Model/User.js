const mongoose = require(`mongoose`)

const User = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum: ["infloso_owner","regular_user"],
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps:true})

module.exports = mongoose.model("User", User);