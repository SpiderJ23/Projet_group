const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    titre: { type:"String", required: true},
    question: { type:"String", required: true},
    note: { type:"Number", },
    user: {type : "String", required: true}
    
})


module.exports = mongoose.model ("Admin",AdminSchema);
