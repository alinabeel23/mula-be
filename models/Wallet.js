// Require Mongoose
const mongoose = require('mongoose');

// Schema
const walletSchema = mongoose.Schema({
    coin: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
    // author: String,
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // }
},{ timestamps: true }) // means createdAt and updatedAt

// Model
const Wallet = mongoose.model("Wallet", walletSchema);

// Export model to share it with controller
module.exports = Wallet;