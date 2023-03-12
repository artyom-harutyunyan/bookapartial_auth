import { Schema, model } from "mongoose"

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
        default: null
    },
    password: {
        type: String,
        default: null
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
    businessType: {
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
        default: null
    },
    createdDt: {
        type: Date,
        default: new Date()
    }
})

export default model('registration_requests', schema)