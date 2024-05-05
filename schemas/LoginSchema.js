const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    }
});
 const personModel = mongoose.model('Person', personSchema);
 module.exports = personModel;