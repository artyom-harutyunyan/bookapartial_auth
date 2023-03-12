import { Schema, model } from 'mongoose';

const schema = new Schema({
    type: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: null
    },
    company: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    bussinessType: {
        type: String,
        default: null
    },
    usDotNumber: {
        type: String,
        default: null
    },
    mcNumber: {
        type: String,
        default: null
    },
    isActive: {
        type: Number,
        required: true
    },
    changedPasswordAt: {
        type: String,
        default: null
    },
    logoutAt: {
        type: Date,
        default: null
    },
    loginAt: {
        type: Date,
        default: null
    },
    createdDt: {
        type: Date,
        default: new Date()
    }
});

export default model('users', schema)