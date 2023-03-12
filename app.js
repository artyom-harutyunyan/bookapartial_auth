import express from 'express'
import cors from 'cors'
import fs from 'fs'
import routes from './api/index.js'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
class Server {

    app = express()

    constructor() {
        this.config()
        this.routes()
    }

    config() {
        this.app.use(cors({ origin: '*' }))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static('public'))
        this.app.use(express.static('build'))
        this.app.use(bodyParser.json())
        if (!fs.existsSync('public')) {
            fs.mkdirSync('./public')
        }
    }

    routes() {
        this.app.get('/', async (req, res, next) => {
            if (!req.path.includes('/api')) {
                return res.sendfile(path.join(__dirname, './build', 'index.html'))
            }
        })
        this.app.use('/api', routes)
    }
}

export default new Server().app