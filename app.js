var express = require('express');

var app = express();

var mongoose = require('mongoose');

// var Login = require('.models/login');
var User = require('./models/User');

var   bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false }));

app.set('view engine', 'ejs'); 
require ("dotenv").config()

const bcrypt = require('bcrypt');
const User = require('./models/User');
const Admin = require('./models/Admin');


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

// Routes pour afficher les données récupérer
app.get('/Admin/:id', function (req, res) {
    Admin.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('Home', {data: data});
    }).catch(err => {console.log(err);});
})


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
        res.redirect("/login");
    }).catch(err => console.log(err));
})

app.get('/signup', function (req, res) {
    res.render('Inscription');
});




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
     if (user.admin ==true ){
        res.render('Admin');
     }
     else{  
     res.render("Home",{data:user});
     }
       
     }).catch(err=>{console.log(err)})
    });

    app.get('/login', function (req, res) {
        res.render('UserPage');
    });

    // envoie questionnaire base de donnée

    app.post ('/api/admin',function (req, res){
       console.log(req.body);
        const question = new Admin ({
            titre: req.body.titre,
            question: req.body.question,
            note: req.body.note
        })
    question.save().then(()=>
    res.redirect('/Home')
    ).catch(err=> console.log (err));  

    });

    // 

    var server = app.listen(5000, function () {
        console.log("Le Serveur est en route 5000");
    });


