import app from './app.js'
import http from 'http'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

mongoose.connect(process.env.MONGO_URL, (err) => {
    if (!err) {
        console.log(`Mongodb_ connected`);
    } else console.log(err);
})

http.createServer(app).listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

