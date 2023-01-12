const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    question1 : { type:"String", required: true},
})


module.exports = mongoose.model ("Admin",userSchema);