var express = require('express');

var app = express();

var mongoose = require('mongoose');

// var Login = require('.models/login');
var User = require('./models/User');

var   bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false }));


const methodOverride = require('method-override');
app.use(methodOverride('_method'))

app.set('view engine', 'ejs'); 
require ("dotenv").config()

const bcrypt = require('bcrypt');
// const User = require('./models/User');
const Admin = require('./models/Admin');


var dbURL = process.env.DATABASE_URL

mongoose.set('strictQuery', false)

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("MongoDB connected !"))
.catch(err => console.log("Error : "+ err));


// Routes
// app.get('/homepage', function (req, res) {
//     res.render('Home');
// });
app.get('/HomeAdmin', function (req, res) {
    res.render('Admin');
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
        res.render('Admin', {data:user});
     }
     else{  
        res.redirect("/home");
     }
       
     }).catch(err=>{console.log(err)})
    });

    app.get('/login', function (req, res) {
        res.render('UserPage');
    });

    // envoie questionnaire base de donnée

    app.post('/api/admin',function (req, res){
       console.log("admin");
       console.log(req.body);
        const question = new Admin ({
            titre: req.body.titre,
            question: req.body.question,
            note: req.body.note,
            user: req.body.user
        })
    question.save().then(()=>
        res.render('Admin')
    ).catch(err=> console.log (err));  

    });

    // 

   




// Routes pour afficher les données récupérer
app.get('/home', function (req, res) {
    Admin.find().then(data => {
        res.render('Home', {data: data});
    }).catch(err => {console.log(err);});
})

app.put('/api/reponse/:id', function(req, res){
    Admin.findOne(
        {
            _id: req.params.id
        }).then(data => {
            data.note = req.body.note;
            data.save().then(()=>{
                console.log("Data changed !");
                res.redirect('/home');
            }).catch(err => console.log(err));

        }).catch(err => { console.log(err) });
});

// afficher reponse questionnaire

app.get('/Avis', function (req, res) {
    Admin.find().then(data => {
        res.render('Avis', {data: data});
    }).catch(err => {console.log(err);});
})

var server = app.listen(5000, function () {
    console.log("Le Serveur est en route 5000");
});