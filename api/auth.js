import {Router} from 'express'
import HashingService from '../services/hash.js'
import UserSchema from '../schema/user.js'
import JwtService from '../services/jwt.js'

class AuthController {

    router = Router()

    constructor() {
        this.routes()
    }

    routes () {
        this.router.get('/register', this.register)
        this.router.post('/signIn', this.signIn)
    }

    register = async (req, res) => {
        let username = 'admin@gmail.com'
        let password = 'password1/'
        if (!username || !password || (password.length < 8)) return res.sendStatus(400)
        
        const existsUser = await UserSchema.findOne({ username: username.toLowerCase() })
        if (existsUser) return res.send({ message: 'Wrong username' })

        const passwordHash = await HashingService.encrypt(password)

        const user = await UserSchema.create({
            username: username.toLowerCase(), password: passwordHash
        })

        return res.send({
            message: 'User registered',
            data: user._id
        })

    }


    signIn = async (req, res) => {
        const { username, password } = req.body
        const user = await UserSchema.findOne({ username: username.toLowerCase() })

        if (!user) return res.send({ success: false, message: 'Wrong credientals' })
        if (!await HashingService.decrypt(user.password, password)) return res.send({ success: false, message: 'Wrong credientals' })

        const token = await JwtService.generate(user._id)

        return res.send({ success: true, message: 'User signed in', data: token })

    }


}

export default new AuthController().router