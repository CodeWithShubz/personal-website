require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')
const auth = require("./middleware/auth");
const port = 4000;

require("./db/conn");        // Importing mongoose in app
const Register = require("./models/registers")    // Importing modules which we create in registers.js

// set the path
const staticPath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials")

// asking app the info about the hbs,partials, express 
app.set('view engine', 'hbs');
app.set('views', template_path);
app.use(express.static(staticPath));
app.use(cookieParser());
hbs.registerPartials(partials_path);

app.use(express.json());    //To handel the json code comming from the server
app.use(express.urlencoded({ extended: false }));      //To tell the server you don't show me the undefined 


app.get("/", (req, res) => {
    res.render('index')
});
app.get("/secret", auth, (req, res) => {
    res.render('secret')
});
app.get("/about", (req, res) => {
    res.render('about')
});
app.get("/contact", (req, res) => {
    res.render('contact')
});
// app.get("/register", (req, res) => {
//     res.render('register')
// });
app.get("*", (req, res) => {
    res.render('404err')
});

// SignUp / Registeration
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword

        if (password === confirmpassword) {

            const registerEmployee = new Register({
                email: req.body.email,
                password: password,
                conformpassword: confirmpassword,
                notrobot: req.body.notrobot
            });

            // To generate a token while registration and define in register.js
            const token = await registerEmployee.generateAuthToken();
            console.log("The token part" + token)


            // To add a token in cookie while Registration 
            res.cookie("jwt", token, {
                // expires: new Date(date.now() + 50000),
                httpOnly: true,
                // secure:true
            });


            // To save the all data 
            const register = await registerEmployee.save();
            res.status(201).render('index');

        } else {
            res.send(" Password are not Matching")
        }

    } catch (error) {
        res.status(400).send(error);
    }
});
app.get("/login", (req, res) => {
    res.render("login")
});

// LogIn check
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Register.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, userEmail.password);

        // To generate a token while logIn and define in register.js
        const token = await userEmail.generateAuthToken();
        console.log("The token part" + token)

        // To add a token in cookie while Registration 
        res.cookie("jwt", token, {
            httpOnly: true
        });

        if (isMatch) {
            res.status(400).render("index")
        } else {
            res.send("invalid logIN datials")
        }
    } catch (error) {
        res.status(400).send("Invalid Email")
    }
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});