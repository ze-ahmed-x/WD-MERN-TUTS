const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

// static funtion for signup

userSchema.statics.signup = async function (email, password) {
    //validation
    if (!email || !password){
        throw Error("All fields must be filled");
    }
    else if (!validator.isEmail(email)){
        throw Error("Please enter valid email address");
    }
    else if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong engough");
    }
    const exist = await this.findOne({email});
    if (exist){
        throw Error('Email aleady in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = this.create({email, password: hash});
    return user;
}
userSchema.statics.login = async function(email, password) {
    if (!email || !password){
        throw Error("All fields must be filled");
    }
    const user = await this.findOne({email});
    if (!user){
        throw Error ("Invalid email address");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match){
        throw Error("Invalid Password");
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);

