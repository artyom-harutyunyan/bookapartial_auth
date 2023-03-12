import { Schema, model } from 'mongoose'

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdDt: {
        type: Date,
        default: new Date()
    }
})

export default model('auth_users', schema)