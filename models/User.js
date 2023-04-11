const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [, "First name must be more than 3 characters"],
        maxlength: [99, "This is too much man..... Chill!!!"]
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last name must be more than 3 characters"],
        maxlength: [99, "This is too much man..... Chill!!!"]
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase:true,
        unique: true
    },
    phoneNum:{
        type: String,
        required: true,
        minlength: [8]
    },
    password:{
        type: String,
        required: true,
        minlength: [6, "khalaas... your password is too weak"]
    },
    pfp: {
        type: Buffer
    }

},
{
    timestamps: true
})

// verifyPassword
userSchema.methods.verifyPassword = function(password){
    console.log(password);
    console.log(this.password);
    return bcrypt.compareSync(password, this.password);
}

// User Model
const User = mongoose.model("User", userSchema);


// Exports
module.exports = User;