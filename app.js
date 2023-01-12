var express = require('express');

var app = express();

var mongoose = require('mongoose');

// var Login = require('.models/login');
// var User = require('.models/user');

var   bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false }));


require ("dotenv").config()


const User = require('./models/User');


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

app.get('/Avis', function (req, res) {
    res.render('Avis');
});

// app.get('/Avis', function (req, res) {
//     res.render('Avis');
// });



// inscription

app.post("/api/signup", function(req, res){
    const Data = new User ({
        user: req.body.user,
        email: req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        admin: false 
    })
    Data.save().then(() => {
        res.redirect("/Login");
    }).catch(err => console.log(err));
})

app.get('/Sign', function (req, res) {
    res.render('Inscription');
});



<<<<<<< HEAD
// Lancement du Serveur
var server = app.listen(5000, function () {
    console.log("Le Serveur est en route 5000");
});
=======

// connexion

app.post("/api/signin", function(req, res){
    User.findOne({ 
     email : req.body.email
 }).then(user => {
     if(!user){
         res.status(404).send("email Invalid !");
     }
     
     if (!bcrypt.compareSync(req.body.password,user.password)){
         res.status(404).send("Password Invalid !");
     }
         res.render("Home",{data:user});
       
     }).catch(err=>{console.log(err)})
    });

    app.get('/Login', function (req, res) {
        res.render('UserPage');
    });



    var server = app.listen(5000, function () {
        console.log("Le Serveur est en route 5000");
    });
>>>>>>> 17208c85c082abf595fd4e85217ef40045c33e94
