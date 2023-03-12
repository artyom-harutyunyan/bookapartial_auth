import { Router } from "express"
import AuthController from './auth.js'
import RegistrationRequestsController from './reg_req.js'

class BaseController {
    router = Router()

    constructor() {
        this.routes()
    }

    routes() {
        this.router.use('/auth', AuthController)
        this.router.use('/registrations', RegistrationRequestsController)
    }
}

export default new BaseController().router
