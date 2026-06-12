const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    notrobot: {                    // Quenstion = How to create Schema of checkbox of html form in mongodb nodeJS
        type: String               // Question = How to create database and save by mongodb without starting localHost
    },                              // Question = How to show error of same or registered or used Email address is signUp Page mongoDB
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
});


// Define the generated token 
employeeSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token });
        await this.save;
        return token;
    } catch (error) {
        res.send("The Error part" + error);
        console.log("The Error part" + error);
    }
}



// To Create bcyprit password 
employeeSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})


// Now we need to create a Collection 

const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;