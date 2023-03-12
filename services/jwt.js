import jwt from 'jsonwebtoken'

class JwtService {

    generate = async (id) => jwt.sign({ user: id }, process.env.PRIVATE_KEY)

    decode = async (token) => jwt.decode(token, process.env.PRIVATE_KEY)

}

export default new JwtService()