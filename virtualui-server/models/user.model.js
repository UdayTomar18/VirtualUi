import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    aiCredits:{
        type: Number,
        default: 150
    },
    // password: {
    //     type: String,
    //     required: true
    // }
}, {
    timestamps: true
});

export const User = mongoose.model('User', userSchema);