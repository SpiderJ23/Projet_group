var express = require('express');

var app = express();

var mongoose = require('mongoose');

var   bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false }));


require ("dotenv").config()


var dbURL = process.env.DATABASE_URL

mongoose.set('strictQuery', false)

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("MongoDB connected !"))
.catch(err => console.log("Error : "+ err));







// Routes
app.get('/HomePage', function (req, res) {
    res.render('Home');
});
app.get('/HomeAdmin', function (req, res) {
    res.render('Admin');
});
app.get('/Login', function (req, res) {
    res.render('UserPage');
});
app.get('/Avis', function (req, res) {
    res.render('Avis');
});
app.get('/Sign', function (req, res) {
    res.render('Inscription');
});
// app.get('/Avis', function (req, res) {
//     res.render('Avis');
// });





var server = app.listen(5000, function () {
    console.log("Le Serveur est en route 5000");
});