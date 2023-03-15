import { Router } from 'express'
import RegistrationReqSchema from '../schema/registration_req.js'
import User from '../schema/users.js'
import BaseService from '../services/microservice.js'
// import data from '../data.json' assert {type: 'json'}
import MailerService from '../services/mailer.js'

class RegistrationRequestsController {

    router = Router()

    constructor() {
        this.routes()
    }

    routes() {
        this.router.post('/', this.create)
        this.router.post('/list', this.getList)
        this.router.post('/activate', this.activate)
        this.router.delete('/:id', this.delete)
        this.router.post('/register-user', this.registerUser)
    }

    create = async (req, res) => {
        const regReq = await RegistrationReqSchema.create(req.body)
        return res.send({ message: 'ok', data: regReq._id })
    }

    getList = async (req, res) => {
        let { search, isActive, page, limit, dateFrom, dateTo } = req.body
        if (!page || page < 0) page = 1
        let filter = {}

        if (search === 'null') search = null

        if (dateFrom && !dateTo) {
            filter['createdDt'] = {
                $gte: new Date(dateFrom)
            }
        }

        if (dateTo && !dateFrom) {
            filter['createdDt'] = {
                $lt: new Date(dateTo)
            }
        }

        if (dateFrom && dateTo) {
            filter['createdDt'] = {
                $gte: new Date(dateFrom),
                $lt: new Date(dateTo)
            }
        }


        if (Number(isActive) === 0) filter.isActive = 0
        else filter.isActive = 1

        if (search && search.length) {
            filter['$or'] = [
                { email: { $regex: '.*' + search + '.*' } },
                { username: { $regex: '.*' + search + '.*' } },
                { companyName: { $regex: '.*' + search + '.*' } },
                { phone: { $regex: '.*' + search + '.*' } },
                { usDotNumber: { $regex: '.*' + search + '.*' } },
                { mcNumber: { $regex: '.*' + search + '.*' } },
              ]
        }

        const [list, count] = await Promise.all([
            User.find(filter).sort({ _id: -1 }).skip((page - 1) * limit).limit(limit),
            User.countDocuments(filter),
        ])
        return res.send({ success: true, message: 'Registration request list', data: { list, count } })
        // return res.send(data)
    }

    delete = async (req, res) => {
        const { id } = req.params

        if (!id) return res.send({ success: false, message: 'Id is required' })

        const existsItem = await User.findById(id)
        if (!existsItem) return res.send({ success: false, message: 'Wrong id' })

        // carrier = 'carrier',
        // shipper = 'shipper',
        // broker = 'broker'

        if (existsItem.type === 'carrier') {
            
        } else if (existsItem.type === 'shipper') {

        }

        await User.deleteOne({ _id: existsItem._id })

        return res.send({ success: true, message: 'Deleted!' })
    }

    activate = async (req, res) => {
        const { id, isActive, email } = req.body
        await BaseService.activate(id, isActive)
        if (isActive) MailerService.sendEmail(email)
        return res.send({ success: true, message: `User ${isActive ? 'activated' : 'blocked'}` })
    }

    registerUser = async (req, res) => {
        const body = req.body

        if (!body.type) return res.send({ success: false, message: 'Type is required' })
        if (!body.username) return res.send({ success: false, message: 'Username is required' })
        if (!body.email) return res.send({ success: false, message: 'Email is required' })
        if (!body.password) return res.send({ success: false, message: 'Password is required' })

        const response = await BaseService.register({
            type: body.type,
            username: body.username,
            email: body.email,
            password: body.password,
            name: body.name,
            company: body.company,
            phone: body.phone,
            bussinessType: body.bussinessType,
            usDotNumber: body.usDotNumber,
            mcNumber: body.mcNumber,
            isActive: body.isActive
        })

        return res.send(response)
    }

}

export default new RegistrationRequestsController().router